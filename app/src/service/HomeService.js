import http from '../http-common';

class HomeDataService {

    getAllLoansWithPayments(amount, creditPeriod, age, chooseServiceCharge, chooseInsurance) {
        return http.get(`/calculateLoan/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`);
    }

    getCalculations(loanId, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance) {
        return http.get(`/loanDetails/${loanId}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`);
    }

    sendEmail(bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, name, email, phone) {
         return http.get(`/loanAgencyContactFormSend/${bankId}/${offer}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${name}/${email}/${phone}`);
    }

    getAllMortgagesWithPayments(amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost) {
        return http.get(`/calculateMortgage/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${contributionPercent}/${cost}`);
    }

    getMortgageCalculations(mortgageId, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost) {
        return http.get(`/mortgageDetails/${mortgageId}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${contributionPercent}/${cost}`);
    }

    sendEmailMortgage(bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost, name, email, phone) {
        return http.get(`/mortgageAgencyContactFormSend/${bankId}/${offer}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${contributionPercent}/${cost}/${name}/${email}/${phone}`);
    }
}

export default new HomeDataService();