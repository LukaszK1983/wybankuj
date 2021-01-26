import React, {Component} from "react";
import HomeDataService from "../service/HomeService";
import styles from './LoanDetails.module.css';
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import NumberFormat from 'react-number-format';

export default class LoanDetails extends Component {

    constructor(props) {
        super(props);
        this.getCalculate = this.getCalculate.bind(this);
        this.getCalculate2 = this.getCalculate2.bind(this);
        this.getCalculate3 = this.getCalculate3.bind(this);
        this.state = {
            calculations: [],
            calculations2: [],
            calculations3: [],
            loanId1: this.props.match.params.loanId,
            loanId2: this.props.location.loanId2,
            loanId3: this.props.location.loanId3,
            amount: this.props.match.params.amount,
            creditPeriod: this.props.match.params.creditPeriod,
            age: this.props.match.params.age,
            chooseServiceCharge: this.props.match.params.chooseServiceCharge,
            chooseInsurance: this.props.match.params.chooseInsurance,
            bank: []
        }
    }

    componentDidMount() {
        const {loanId1, loanId2, loanId3, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance} = this.state;

        this.getCalculate(loanId1, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance);
        if (loanId2 > 0) {
            this.getCalculate2(loanId2, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance);
        }
        if (loanId3 > 0) {
            this.getCalculate3(loanId3, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance);
        }
    }

    getCalculate(loanId, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance) {
        HomeDataService.getCalculations(loanId, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance)
            .then(response => {
                this.setState({
                    calculations: response.data
                });
                console.log("Calculations1: ", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getCalculate2(loanId, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance) {
        HomeDataService.getCalculations(loanId, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance)
            .then(response => {
                this.setState({
                    calculations2: response.data
                });
                console.log("Calculations2: ", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    getCalculate3(loanId, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance) {
        HomeDataService.getCalculations(loanId, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance)
            .then(response => {
                this.setState({
                    calculations3: response.data
                });
                console.log("Calculations3: ", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {calculations, calculations2, calculations3, loanId2, loanId3} = this.state;
        const {amount, creditPeriod, age, chooseServiceCharge, chooseInsurance} = this.state;

        return (
            <div>
                <Header/>
                <div className="container">
                    <h3 className={styles.H3details}>Porównanie ofert</h3>

                    <div className={styles.DivListOffers}>
                        <div className={styles.DivTable}>
                            <table className={styles.Table}>
                                <tr className={styles.ThStickyCompare}>
                                    <td> </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Oferta:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Kwota kredytu:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Okres kredytowania:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Wysokość raty:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Oprocentowanie nominalne:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Prowizja za uruchomienie:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Ubezpieczenie:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Odsetki:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.TdCompareOffers}>
                                        Koszt całkowity:
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.BtnNext}>
                                        <Link
                                            to={{
                                                pathname: `/calculateLoan/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`
                                            }}
                                            className="btn btn-sm btn-primary rounded"
                                        >Powrót
                                        </Link>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div className={styles.DivTable}>
                            <table className={styles.Table}>
                                {calculations &&
                                calculations.map((calculation, index) => (
                                    <tbody key={index}>
                                <tr className={styles.ThStickyCompare}>
                                    <td>
                                        <img src={require('../img/' + calculation.logo)} alt={''} width={'60'} height={'40'} />
                                    </td>
                                </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersNormal}>
                                            {calculation.loan.offer}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersNormalBold}>
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                value={amount}
                                                suffix={' zł'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersNormal}>
                                            {creditPeriod} mies.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersRedBold}>
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                value={calculation.payment}
                                                suffix={' zł'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersNormal}>
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                value={calculation.loan.creditRate}
                                                suffix={'%'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersRed}>
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                value={calculation.loan.serviceCharge}
                                                suffix={'%'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />, czyli
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                prefix={' '}
                                                value={calculation.serviceCharge}
                                                suffix={' zł'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersRed}>
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                value={calculation.loan.insurance}
                                                suffix={'%'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />, czyli
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                prefix={' '}
                                                value={calculation.insurance}
                                                suffix={' zł'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersRed}>
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                value={calculation.interests}
                                                suffix={' zł'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TdCompareOffersRedBold}>
                                            <NumberFormat
                                                thousandSeparator={' '}
                                                decimalSeparator={','}
                                                fixedDecimalScale={true}
                                                value={calculation.totalCost}
                                                suffix={' zł'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link
                                                to={{
                                                    pathname: `/loanAgencyContactForm/${calculation.bankId}/${calculation.loan.offer}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`
                                                }}
                                                className="btn btn-sm btn-outline-success rounded"
                                            >
                                                Skontaktuj się z bankiem
                                            </Link>
                                        </td>
                                    </tr>
                                    </tbody>
                                    ))}
                            </table>
                        </div>

                        {loanId2 > 0 ?
                            <div className={styles.DivTable}>
                                <table className={styles.Table}>
                                    {calculations2 &&
                                    calculations2.map((calculation, index) => (
                                        <tbody key={index}>
                                        <tr className={styles.ThStickyCompare}>
                                            <td>
                                                <img src={require('../img/' + calculation.logo)} alt={''} width={'60'} height={'40'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersNormal}>
                                                {calculation.loan.offer}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersNormalBold}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={amount}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersNormal}>
                                                {creditPeriod} mies.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRedBold}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.payment}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersNormal}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.loan.creditRate}
                                                    suffix={'%'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRed}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.loan.serviceCharge}
                                                    suffix={'%'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />, czyli
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    prefix={' '}
                                                    value={calculation.serviceCharge}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRed}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.loan.insurance}
                                                    suffix={'%'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />, czyli
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    prefix={' '}
                                                    value={calculation.insurance}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRed}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.interests}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRedBold}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.totalCost}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link
                                                    to={{
                                                        pathname: `/loanAgencyContactForm/${calculation.bankId}/${calculation.loan.offer}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`
                                                    }}
                                                    className="btn btn-sm btn-outline-success rounded"
                                                >
                                                    Skontaktuj się z bankiem
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            :
                            <div className={styles.DivTable}>

                            </div>
                        }

                        {loanId3 > 0 ?
                            <div className={styles.DivTable}>
                                <table className={styles.Table}>
                                    {calculations3 &&
                                    calculations3.map((calculation, index) => (
                                        <tbody key={index}>
                                        <tr className={styles.ThStickyCompare}>
                                            <td>
                                                <img src={require('../img/' + calculation.logo)} alt={''} width={'60'} height={'40'} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersNormal}>
                                                {calculation.loan.offer}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersNormalBold}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={amount}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersNormal}>
                                                {creditPeriod} mies.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRedBold}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.payment}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersNormal}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.loan.creditRate}
                                                    suffix={'%'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRed}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.loan.serviceCharge}
                                                    suffix={'%'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />, czyli
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    prefix={' '}
                                                    value={calculation.serviceCharge}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRed}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.loan.insurance}
                                                    suffix={'%'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />, czyli
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    prefix={' '}
                                                    value={calculation.insurance}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRed}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.interests}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={styles.TdCompareOffersRedBold}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={calculation.totalCost}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link
                                                    to={{
                                                        pathname: `/loanAgencyContactForm/${calculation.bankId}/${calculation.loan.offer}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`
                                                    }}
                                                    className="btn btn-sm btn-outline-success rounded"
                                                >
                                                    Skontaktuj się z bankiem
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            :
                            <div className={styles.DivTable}>

                            </div>
                        }
                    </div>

                    <div className={styles.InfoAlert}>
                        <p>Przedstawione symulacje mają charakter informacyjny oraz nie stanowią oferty handlowej w
                            rozumieniu Art. 66. par. 1 Kodeksu Cywilnego. Dane wykorzystane do przygotowania symulacji
                            pochodzą bezpośrednio z poszczególnych banków, jednak finalna wersja oferty może się różnić
                            od przedstawionej w serwisie Wybankuj.pl. Otrzymanie kredytu uzależnione jest od wielu
                            czynników, do których należą posiadanie zdolności kredytowej, akceptowanego źródła dochodu,
                            dobrej historii kredytowej, a dodatkowym warunkiem jest pozytywna ocena scoringowa wydana
                            przez system bankowy.</p>
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}