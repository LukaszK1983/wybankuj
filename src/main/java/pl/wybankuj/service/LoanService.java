package pl.wybankuj.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;
import pl.wybankuj.entity.Loan;
import pl.wybankuj.entity.LoanWithPayment;
import pl.wybankuj.entity.UserLoan;
import pl.wybankuj.repository.LoanRepository;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.*;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@Service
public class LoanService {

    private final static int ROUND_SCALE = 2;
    private final static int CALCULATE_SCALE = 10;

    private final LoanRepository loanRepository;

    public LoanService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    //    public Map<Loan, BigDecimal> calculateLoanPayment(List<Loan> loans, int amount, int creditPeriod, int age) {
//        Map<Loan, BigDecimal> loansWithPayments = new HashMap<>();
//
//        for (Loan loan : loans) {
//            loansWithPayments.put(loan, calculateChoosenLoanPayment(loan, amount, creditPeriod));
//        }
//        loansWithPayments = sortByPayment(loansWithPayments);
//        return loansWithPayments;
//    }
    public List<LoanWithPayment> calculateLoanPayment(List<Loan> loans, int amount, int creditPeriod, int age) {
        List<LoanWithPayment> loansWithPayments = new ArrayList<>();

        for (Loan loan : loans) {
            LoanWithPayment loanWithPayment = new LoanWithPayment(loan, loan.getBank().getId(), loan.getBank().getLogo(), calculateChoosenLoanPayment(loan, amount, creditPeriod));
            loansWithPayments.add(loanWithPayment);
        }
        loansWithPayments.sort(Comparator.comparing(LoanWithPayment::getPayment));

        return loansWithPayments;
    }

    public BigDecimal calculateChoosenLoanPayment(Loan loan, int amount, int creditPeriod) {
        BigDecimal rateRatio = BigDecimal.valueOf(1).add((loan.getCreditRate().divide(BigDecimal.valueOf(100), CALCULATE_SCALE, RoundingMode.CEILING)).divide(BigDecimal.valueOf(12), CALCULATE_SCALE, RoundingMode.CEILING));
        BigDecimal totalAmount = BigDecimal.valueOf(amount).add(BigDecimal.valueOf(amount).multiply(loan.getServiceCharge().divide(BigDecimal.valueOf(100), 10, RoundingMode.CEILING))).add(BigDecimal.valueOf(amount).multiply(loan.getInsurance().divide(BigDecimal.valueOf(100), 10, RoundingMode.CEILING)));
        BigDecimal payment = totalAmount.multiply(rateRatio.pow(creditPeriod)).multiply((rateRatio.subtract(BigDecimal.valueOf(1))).divide((rateRatio.pow(creditPeriod)).subtract(BigDecimal.valueOf(1)), CALCULATE_SCALE, RoundingMode.CEILING));
        return payment.setScale(ROUND_SCALE, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateServiceCharge(Loan loan, int amount) {
        BigDecimal serviceCharge = BigDecimal.valueOf(amount).multiply(loan.getServiceCharge().divide(BigDecimal.valueOf(100), CALCULATE_SCALE, RoundingMode.CEILING));
        return serviceCharge.setScale(ROUND_SCALE, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateInsurance(Loan loan, int amount) {
        BigDecimal insurance = BigDecimal.valueOf(amount).multiply(loan.getInsurance().divide(BigDecimal.valueOf(100), CALCULATE_SCALE, RoundingMode.CEILING));
        return insurance.setScale(ROUND_SCALE, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateInterestsCost(int amount, int creditPeriod, BigDecimal payment, BigDecimal serviceCharge, BigDecimal insurance) {
        BigDecimal interests = BigDecimal.valueOf(creditPeriod).multiply(payment).subtract(BigDecimal.valueOf(amount)).subtract(serviceCharge).subtract(insurance);
        return interests.setScale(ROUND_SCALE, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateTotalCost(int amount, int creditPeriod, BigDecimal payment) {
        BigDecimal interests = BigDecimal.valueOf(creditPeriod).multiply(payment).subtract(BigDecimal.valueOf(amount));
        return interests.setScale(ROUND_SCALE, RoundingMode.HALF_UP);
    }

    private Map<Loan, BigDecimal> sortByPayment(Map<Loan, BigDecimal> mapToSort) {
        Map<Loan, BigDecimal> sortedMap =
                mapToSort.entrySet().stream()
                        .sorted(Entry.comparingByValue())
                        .collect(Collectors.toMap(Entry::getKey, Entry::getValue,
                                (e1, e2) -> e1, LinkedHashMap::new));

        return sortedMap;
    }

    public List<Loan> chooseOffers(String chooseInsurance, String chooseServiceCharge,
                                   int amount, int creditPeriod, int age) {
        List<Loan> loans = new ArrayList<>();
        if (chooseInsurance.equals("no") && chooseServiceCharge.equals("no")) {
            loans = loanRepository.findAllByParametersWithoutInsuranceAndServiceCharge(amount, creditPeriod, age);
        } else if (chooseInsurance.equals("no") && chooseServiceCharge.equals("yes")) {
            loans = loanRepository.findAllByParametersWithoutInsurance(amount, creditPeriod, age);
        } else if (chooseServiceCharge.equals("no") && chooseInsurance.equals("yes")) {
            loans = loanRepository.findAllByParametersWithoutServiceCharge(amount, creditPeriod, age);
        } else {
            loans = loanRepository.findAllByParameters(amount, creditPeriod, age);
        }
        return loans;
    }

    public void generatePDF(Loan loan, UserLoan userLoan, BigDecimal payment,
                            BigDecimal serviceCharge, BigDecimal insurance,
                            BigDecimal interests, BigDecimal totalCost) throws DocumentException, FileNotFoundException {

        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream("symulacja.pdf"));

        document.open();

        Font font = FontFactory.getFont(FontFactory.TIMES_ROMAN, 16, BaseColor.BLACK);
        Chunk chunk = new Chunk(loan.getBank().getBankName() + " - Szczegóły oferty " + loan.getOffer(), font);

        document.add(chunk);

        PdfPTable table = new PdfPTable(2);

        table.addCell("Bank");
        table.addCell(loan.getBank().getBankName());
        table.addCell("Oferta");
        table.addCell(loan.getOffer());
        table.addCell("Kwota");
        table.addCell(String.format("%d zł", userLoan.getAmount()));
        table.addCell("Okres");
        table.addCell(String.format("%d mies.", userLoan.getCreditPeriod()));
        table.addCell("Rata");
        table.addCell(String.format("%.2f zł", payment));
        table.addCell("Oprocentowanie");
        table.addCell(String.format("%.2f", loan.getCreditRate()));
        table.addCell("Prowizja");
        table.addCell(String.format("%.2f zł", serviceCharge));
        table.addCell("Ubezpieczenie");
        table.addCell(String.format("%.2f zł", insurance));
        table.addCell("Odsetki");
        table.addCell(String.format("%.2f zł", interests));
        table.addCell("Koszt całkowity");
        table.addCell(String.format("%.2f zł", totalCost));

        document.add(table);
        document.close();
    }

    public void addTableHeader(PdfPTable table) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
        header.setBorderWidth(2);
        table.addCell(header);
    }

    public void addTableCell(PdfPTable table) {
        table.addCell("Row1, Cell1");
        table.addCell("Row1, Cell2");
        table.addCell("Row1, Cell3");
    }
}
