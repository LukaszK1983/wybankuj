import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MortgageParameters.module.css';
import Header from "./Header";
import Footer from "./Footer";

export default class MortgageParameters extends Component {
    constructor(props) {
        super(props);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeCreditPeriod = this.onChangeCreditPeriod.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeChooseServiceCharge = this.onChangeChooseServiceCharge.bind(this);
        this.onChangeChooseInsurance = this.onChangeChooseInsurance.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.validationCost = this.validationCost.bind(this);
        this.validationAmount = this.validationAmount.bind(this);
        this.validationCreditPeriod = this.validationCreditPeriod.bind(this);
        this.validationAge = this.validationAge.bind(this);
        this.infoCostHandler = this.infoCostHandler.bind(this);
        this.infoAmountHandler = this.infoAmountHandler.bind(this);
        this.infoCreditPeriodHandler = this.infoCreditPeriodHandler.bind(this);
        this.infoAgeHandler = this.infoAgeHandler.bind(this);
        this.infoChooseServiceChargeHandler = this.infoChooseServiceChargeHandler.bind(this);
        this.infoChooseInsuranceHandler = this.infoChooseInsuranceHandler.bind(this);
        this.state = {
            cost: null,
            amount: null,
            creditPeriod: null,
            age: null,
            chooseServiceCharge: 'yes',
            chooseInsurance: 'yes',
            contributionPercent: null,
            readyCost: false,
            readyAmount: false,
            readyCreditPeriod: false,
            readyAge: false,
            readyContributionPercent: false,
            errorCost: '',
            errorAmount: '',
            errorCreditPeriod: '',
            errorAge: '',
            classNameCost: styles.FormControl,
            classNameAmount: styles.FormControl,
            classNameCreditPeriod: styles.FormControl,
            classNameAge: styles.FormControl,
            showInfo: false,
            showInfoMessage: ''
        }
    }

    onChangeCost(e) {
        this.validationCost(e.target.value);
    }

    onChangeAmount(e) {
        this.validationAmount(e.target.value);
    }

    onChangeCreditPeriod(e) {
        this.validationCreditPeriod(e.target.value);
    }

    onChangeAge(e) {
        this.validationAge(e.target.value);
    }

    onChangeChooseServiceCharge(e) {
        this.setState({
            chooseServiceCharge: e.target.value
        });
    }

    onChangeChooseInsurance(e) {
        this.setState({
            chooseInsurance: e.target.value
        });
    }

    validationCost(cost) {
        const regexCost = /^[0-9]+$/;

        if (regexCost.test(cost) && cost >= 11200) {
            this.setState({
                cost: cost,
                classNameCost: styles.FormControlValid,
                errorCost: '',
                readyCost: true
            });
        } else if (cost <= 11200) {
            this.setState({
                cost: cost,
                classNameCost: styles.FormControlInvalid,
                errorCost: 'Minimalna kwota inwestycji to 11.200 zł',
                readyCost: false
            });
        } else if (!regexCost.test(cost)) {
            this.setState({
                cost: cost,
                classNameCost: styles.FormControlInvalid,
                errorCost: 'Podana wartość musi być liczbą - nie używaj liter oraz znaków specjalnych',
                readyCost: false
            });
        }
    }

    validationAmount(amount) {
        const {cost} = this.state;
        let contributionPercent =
            ((cost - amount) / cost * 100).toFixed(2);

        const regexAmount = /^[0-9]+$/;

        if ((amount < cost) && (contributionPercent >= 10) && regexAmount.test(amount) && (amount >= 10000 && amount <= 5000000)) {
            this.setState({
                amount: amount,
                contributionPercent: contributionPercent,
                classNameAmount: styles.FormControlValid,
                errorAmount: '',
                readyAmount: true,
                readyContributionPercent: true
            });
        } else if (!regexAmount.test(amount)) {
            this.setState({
                amount: amount,
                classNameAmount: styles.FormControlInvalid,
                errorAmount: 'Podana wartość musi być liczbą - nie używaj liter oraz znaków specjalnych',
                readyAmount: false
            });
        } else if (amount > cost) {
            this.setState({
                amount: amount,
                errorAmount: 'Kwota kredytu musi być mniejsza od kosztu inwestycji',
                classNameAmount: styles.FormControlInvalid,
                readyAmount: false
            });
        } else if (contributionPercent <= 10) {
            const correctContributionPercent = cost * 0.9;
            this.setState({
                amount: amount,
                errorAmount: 'Uwzględniając wymagany wkład własny, maksymalna dostępna kwota kredytu to ' + correctContributionPercent + ' zł',
                classNameAmount: styles.FormControlInvalid,
                readyAmount: false
            });
        } else if (amount < 10000 || amount > 5000000) {
            this.setState({
                amount: amount,
                classNameAmount: styles.FormControlInvalid,
                errorAmount: 'Wprowadzona kwota musi być z przedziału 10.000 - 5.000.000 zł',
                readyAmount: false
            });
        }
    }

    validationCreditPeriod(creditPeriod) {
        const regexCreditPeriod = /^[0-9]+$/;

        if (regexCreditPeriod.test(creditPeriod) && creditPeriod >= 6 && creditPeriod <= 360) {
            this.setState({
                creditPeriod: creditPeriod,
                classNameCreditPeriod: styles.FormControlValid,
                errorCreditPeriod: '',
                readyCreditPeriod: true
            });
        } else if (!regexCreditPeriod.test(creditPeriod)) {
            this.setState({
                creditPeriod: creditPeriod,
                classNameCreditPeriod: styles.FormControlInvalid,
                errorCreditPeriod: 'Podana wartość musi być liczbą - nie używaj liter oraz znaków specjalnych',
                readyCreditPeriod: false
            });
        } else if (creditPeriod <= 6 || creditPeriod >= 360) {
            this.setState({
                creditPeriod: creditPeriod,
                classNameCreditPeriod: styles.FormControlInvalid,
                errorCreditPeriod: 'Podana wartość musi być z przedziału 6 - 360',
                readyCreditPeriod: false
            });
        }
    }

    validationAge(age) {
        const regexAge = /^[0-9]+$/;

        if (regexAge.test(age) && age >= 18) {
            this.setState({
                age: age,
                classNameAge: styles.FormControlValid,
                errorAge: '',
                readyAge: true
            });
        } else if (!regexAge.test(age)) {
            this.setState({
                age: age,
                classNameAge: styles.FormControlInvalid,
                errorAge: 'Podana wartość musi być liczbą - nie używaj liter oraz znaków specjalnych',
                readyAge: false
            });
        } else if (age <= 18) {
            this.setState({
                age: age,
                classNameAge: styles.FormControlInvalid,
                errorAge: 'Aby złożyć wniosek o kredyt, trzeba być osobą pełnoletnią',
                readyAge: false
            });
        }
    }

    submitHandler(e) {
        e.preventDefault();

        const {cost, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, readyCost, readyAmount, readyCreditPeriod, readyAge, readyContributionPercent} = this.state;

        if (readyCost === true && readyAmount === true && readyCreditPeriod === true && readyAge === true && readyContributionPercent === true) {
            window.location.href = `/calculateMortgage/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${contributionPercent}/${cost}`;
        }
    }

    infoCostHandler() {
        this.setState({
            showInfo: true,
            showInfoMessage: 'Wprowadź łączny koszt, jaki planujesz ponieść w związku z zakupem lub budową nieruchomości.'
        });
    }

    infoAmountHandler() {
        this.setState({
            showInfo: true,
            showInfoMessage: 'Wprowadź wysokość kwoty kredytu, o którą chcesz zawnioskować.'
        });
    }

    infoCreditPeriodHandler() {
        this.setState({
            showInfo: true,
            showInfoMessage: 'Wprowadź liczbę miesięcy, w trakcie których chcesz spłacać kredyt.'
        });
    }

    infoAgeHandler() {
        this.setState({
            showInfo: true,
            showInfoMessage: 'Wprowadź swój wiek w latach.'
        });
    }

    infoChooseServiceChargeHandler() {
        this.setState({
            showInfo: true,
            showInfoMessage: 'Jeśli wybierzesz "NIE", zobaczysz tylko te oferty, w których nie ma prowizji za uruchomienie kredytu. Wybierając "TAK", zostaną wygenerowane oferty ze wszystkimi możliwościami.'
        });
    }

    infoChooseInsuranceHandler() {
        this.setState({
            showInfo: true,
            showInfoMessage: 'Jeśli wybierzesz "NIE", zobaczysz tylko te oferty, w których nie ma ubezpieczenia kredytu. Wybierając "TAK", zostaną wygenerowane oferty ze wszystkimi możliwościami.'
        });
    }

    render() {
        const {cost, amount, creditPeriod, age, showInfo, showInfoMessage} = this.state;
        const {classNameCost, errorCost, classNameAmount, errorAmount, classNameCreditPeriod, errorCreditPeriod, classNameAge, errorAge} = this.state;
        const image = require('../img/info3.png');

        return (
            <div>
                <Header/>
                <h3 className={styles.H3Details}>Dane do symulacji kredytu hipotecznego</h3>

                <div className="container">
                    <div className={styles.FormMortgageDetails}>

                        <form onSubmit={this.submitHandler}>
                            <div className={styles.FormGroup}>
                                <label htmlFor="formcost" className={styles.LabelTitle}>
                                    Koszt zakupu lub budowy nieruchomości:
                                </label>
                                <div className={styles.DivDisplay}>
                                    <div className={styles.DivLeft}>
                                        <input
                                            className={classNameCost} id="formcost"
                                            placeholder="Wprowadź kwotę planowanej inwestycji, np. zakup + remont"
                                            name="cost"
                                            value={cost}
                                            onChange={this.onChangeCost}
                                        />
                                    </div>
                                    <div className={styles.DivRight}>
                                        <img src={image} className={styles.ImgStyle}
                                             id="img-cost" alt="Pomoc" onClick={this.infoCostHandler}/>
                                    </div>
                                </div>
                                <div className={styles.ErrorParagraph}>
                                    {errorCost}
                                </div>
                            </div>

                            <div className={styles.FormGroup}>
                                <label htmlFor="formamount" className={styles.LabelTitle}>
                                    Kwota kredytu:
                                </label>
                                <div className={styles.DivDisplay}>
                                    <div className={styles.DivLeft}>
                                        <input
                                            className={classNameAmount} id="formamount"
                                            placeholder="Wprowadź kwotę z przedziału 10000 - 5000000"
                                            name="amount"
                                            value={amount}
                                            onChange={this.onChangeAmount}
                                        />
                                    </div>
                                    <div className={styles.DivRight}>
                                        <img src={image} className={styles.ImgStyle}
                                             id="img-amount" alt="Pomoc" onClick={this.infoAmountHandler}/>
                                    </div>
                                </div>
                                <div className={styles.ErrorParagraph}>
                                    {errorAmount}
                                </div>
                            </div>

                            <div className={styles.FormGroup}>
                                <label htmlFor="formcreditperiod" className={styles.LabelTitle}>
                                    Okres kredytowania:
                                </label>
                                <div className={styles.DivDisplay}>
                                    <div className={styles.DivLeft}>
                                        <input
                                            className={classNameCreditPeriod} id="formcreditperiod"
                                            placeholder="Wprowadź okres kredytu z przedziału 6 - 360"
                                            name="creditPeriod"
                                            value={creditPeriod}
                                            onChange={this.onChangeCreditPeriod}
                                        />
                                    </div>
                                    <div className={styles.DivRight}>
                                        <img src={image} className={styles.ImgStyle}
                                             id="img-period" alt="Pomoc" onClick={this.infoCreditPeriodHandler}/>
                                    </div>
                                </div>
                                <div className={styles.ErrorParagraph}>
                                    {errorCreditPeriod}
                                </div>
                            </div>

                            <div className={styles.FormGroup}>
                                <label htmlFor="formage" className={styles.LabelTitle}>
                                    Twój wiek:
                                </label>
                                <div className={styles.DivDisplay}>
                                    <div className={styles.DivLeft}>
                                        <input
                                            className={classNameAge} id="formage"
                                            placeholder="Wprowadź Twój wiek"
                                            name="age"
                                            value={age}
                                            onChange={this.onChangeAge}
                                        />
                                    </div>
                                    <div className={styles.DivRight}>
                                        <img src={image} className={styles.ImgStyle}
                                             id="img-age" alt="Pomoc" onClick={this.infoAgeHandler}/>
                                    </div>
                                </div>
                                <div className={styles.ErrorParagraph}>
                                    {errorAge}
                                </div>
                            </div>

                            <div className={styles.FormGroup}>
                                <label htmlFor="formservicecharge" className={styles.LabelTitle}>
                                    Prowizja za uruchomienie:
                                </label>
                                <div className={styles.DivDisplay}>
                                    <div className={styles.DivLeft}>
                                        <select
                                            name="chooseServiceCharge" id="formservicecharge"
                                            className={styles.FormControl}
                                            onChange={this.onChangeChooseServiceCharge}
                                        >
                                            <option value="yes" selected="selected">TAK</option>
                                            <option value="no">NIE</option>
                                        </select>
                                    </div>
                                    <div className={styles.DivRight}>
                                        <img src={image} className={styles.ImgStyle}
                                             id="img-charge" alt="Pomoc" onClick={this.infoChooseServiceChargeHandler}/>
                                    </div>
                                </div>
                                <div className={styles.ErrorParagraph}>
                                </div>
                            </div>

                            <div className={styles.FormGroup}>
                                <label htmlFor="forminsurance" className={styles.LabelTitle}>
                                    Ubezpieczenie kredytu:
                                </label>
                                <div className={styles.DivDisplay}>
                                    <div className={styles.DivLeft}>
                                        <select
                                            name="chooseInsurance" id="forminsurance"
                                            className={styles.FormControl}
                                            onChange={this.onChangeChooseInsurance}
                                        >
                                            <option value="yes" selected="selected">TAK</option>
                                            <option value="no">NIE</option>
                                        </select>
                                    </div>
                                    <div className={styles.DivRight}>
                                        <img src={image} className={styles.ImgStyle}
                                             id="img-insurance" alt="Pomoc" onClick={this.infoChooseInsuranceHandler}/>
                                    </div>
                                </div>
                                <div className={styles.ErrorParagraph}>
                                </div>
                            </div>

                            <div className={styles.BtnNext}>
                                <button
                                    className={'btn btn-sm btn-primary rounded'}>DALEJ
                                </button>

                            </div>
                        </form>
                    </div>

                    <div style={showInfo ? {} : {display: 'none'}}>
                        <div className={styles.DivInfo} onClick={() => {
                            this.setState({
                                showInfo: false
                            });
                        }}>
                            <p className={styles.FormPinfoMini}>
                                {showInfoMessage}
                            </p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}