import React, {Component} from "react";
import styles from './LoanAgencyContactForm.module.css';
import Header from "./Header";
import Footer from "./Footer";
import BankDataService from "../service/BankService";
import {Link} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LfLR9UZAAAAADK64qxQhNPPGdS79KYw7GlLVnGa";
const DELAY = 1500;

export default class LoanAgencyContactForm extends Component {

    constructor(props, ...args) {
        super(props, ...args);
        this.getBank = this.getBank.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAgree = this.onChangeAgree.bind(this);
        this.getBankLogo = this.getBankLogo.bind(this);
        this.setBank = this.setBank.bind(this);
        this.validationName = this.validationName.bind(this);
        this.validationEmail = this.validationEmail.bind(this);
        this.validationPhone = this.validationPhone.bind(this);

        this.state = {
            banks: [],
            bankId: this.props.match.params.bankId,
            offer: this.props.match.params.offer,
            amount: this.props.match.params.amount,
            creditPeriod: this.props.match.params.creditPeriod,
            age: this.props.match.params.age,
            chooseServiceCharge: this.props.match.params.chooseServiceCharge,
            chooseInsurance: this.props.match.params.chooseInsurance,
            name: '',
            email: '',
            phone: '',
            agree: true,
            logo: '',
            bank: null,
            readyName: false,
            readyEmail: false,
            readyPhone: false,
            readyAgree: true,
            errorName: '',
            errorEmail: '',
            errorPhone: '',
            classNameName: styles.FormControl,
            classNameEmail: styles.FormControl,
            classNamePhone: styles.FormControl,
            captchaValue: '',
            load: false
        };
        this.reCaptchaRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ load: true });
        }, DELAY);
        console.log("didMount - reCaptcha Ref-", this.reCaptchaRef);

        this.getBank(this.state.bankId);
        this.getBankLogo(this.state.bankId);
        this.setBank(this.state.bankId);
    }

    onChangeName(e) {
        this.validationName(e.target.value);
    }

    onChangeEmail(e) {
        this.validationEmail(e.target.value);
    }

    onChangePhone(e) {
        this.validationPhone(e.target.value);
    }

    onChangeAgree(e) {
        this.setState({
            agree: !this.state.agree,
            readyAgree: !this.state.readyAgree
        });
    }

    validationName(name) {
        const regexName = /^[A-Za-ząćĆęłŁńóśŚźżŻ]{3,}\s[A-Za-ząĄćĆęĘłŁńóÓśŚźŹżŻ-]{3,}$/;

        if (regexName.test(name)) {
            this.setState({
                name: name,
                classNameName: styles.FormControlValid,
                errorName: '',
                readyName: true
            });
        } else if (!regexName.test(name)) {
            this.setState({
                name: name,
                classNameName: styles.FormControlInvalid,
                errorName: 'Do wpisania imienia i nazwiska proszę używać tylko liter oraz znaku - w przypadku dwóch członów nazwiska',
                readyName: false
            });
        }
    }

    validationEmail(email) {
        const regexEmail = /[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,}){1}/;

        if (regexEmail.test(email)) {
            this.setState({
                email: email,
                classNameEmail: styles.FormControlValid,
                errorEmail: '',
                readyEmail: true
            });
        } else {
            this.setState({
                email: email,
                classNameEmail: styles.FormControlInvalid,
                errorEmail: 'Wprowadzono błędne dane - poprawny format: mail@mail.pl',
                readyEmail: false
            });
        }
    }

    validationPhone(phone) {
        const regexPhone = /^[0-9]{9}$/;

        if (regexPhone.test(phone)) {
            this.setState({
                phone: phone,
                classNamePhone: styles.FormControlValid,
                errorPhone: '',
                readyPhone: true
            });
        } else {
            this.setState({
                phone: phone,
                classNamePhone: styles.FormControlInvalid,
                errorPhone: 'Wprowadzono błędne dane - poprawny format: 000000000',
                readyPhone: false
            });
        }
    }

    getBank(id) {
        BankDataService.get(id)
            .then(response => {
                this.setState({
                    banks: response.data
                });
                console.log(response.data);
            }).catch(e => {
            console.log(e);
        });
    }

    getBankLogo(id) {
        BankDataService.get(id).then(response => {
            this.setState({
                logo: require(`../img/${response.data.logo}`)
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    setBank(id) {
        BankDataService.get(id)
            .then(response => {
                this.setState({
                    bank: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleChange = value => {
        console.log("Captcha value:", value);
        this.setState({ captchaValue: value });
    };

    asyncScriptOnLoad = () => {
        console.log("scriptLoad - reCaptcha Ref-", this.reCaptchaRef);
    };

    submitHandler = (e) => {
        e.preventDefault();
        const {name, email, phone, bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance} = this.state;
        const {readyName, readyEmail, readyPhone, readyAgree, captchaValue} = this.state;

        if (readyName && readyEmail && readyPhone && readyAgree && captchaValue !== '') {
            window.location.href = `/loanAgencyContactFormSend/${bankId}/${offer}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${name}/${email}/${phone}`;
        }
    }

    render() {
        const {logo, banks, bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance} = this.state;
        const {agree, readyAgree, name, classNameName, errorName, email, classNameEmail, errorEmail, phone, classNamePhone, errorPhone} = this.state;
        const {load} = this.state;

        return (
            <div>
                <Header/>

                <div className="container">
                    <h3 className={styles.H3Details}>
                        <img src={logo} alt={''} className={styles.Image}/>
                        <span className={styles.SpanH3}>
                            Formularz kontaktowy
                        </span>
                    </h3>

                    <div className={styles.DivReturnListAgencies}>
                        <Link
                            to={{
                                pathname: `/calculateLoan/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`
                            }}
                            className="btn btn-sm btn-primary rounded"
                        >Powrót do listy ofert
                        </Link>
                    </div>

                    <div className={styles.DivContactForm}>
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <label htmlFor="formuser" className={styles.LabelTitle}>
                                    Imię i nazwisko:
                                </label>
                                <input
                                    className={classNameName}
                                    placeholder="Wprowadź imię i nazwisko"
                                    name="name"
                                    value={name}
                                    onChange={this.onChangeName}
                                />
                                <div className={styles.ErrorParagraph}>
                                    {errorName}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formemail" className={styles.LabelTitle}>
                                    E-mail:
                                </label>
                                <input
                                    className={classNameEmail}
                                    placeholder="Wprowadź e-mail"
                                    name="email"
                                    value={email}
                                    onChange={this.onChangeEmail}
                                />
                                <div className={styles.ErrorParagraph}>
                                    {errorEmail}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formphone" className={styles.LabelTitle}>
                                    Telefon:
                                </label>
                                <input
                                    className={classNamePhone}
                                    placeholder="Wprowadź nr telefonu - 9 cyfr"
                                    name="phone"
                                    value={phone}
                                    onChange={this.onChangePhone}
                                />
                                <div className={styles.ErrorParagraph}>
                                    {errorPhone}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="formmessage" className={styles.LabelTitle}>
                                    Interesuje mnie oferta <span className={styles.SpanColor}>{offer}</span> o
                                    parametrach:
                                </label>
                                <div className={styles.FormControlInfoSend}>
                                    <p>
                                        Kwota kredytu: <span className={styles.SpanColor}>{amount}</span>
                                    </p>
                                </div>
                                <div className={styles.FormControlInfoSend}>
                                    <p>
                                        Okres kredytowania: <span className={styles.SpanColor}>{creditPeriod}</span>
                                    </p>
                                </div>
                                <div className={styles.FormControlInfoSend}>
                                    <p>
                                        Prowizja przygotowawcza: <span className={styles.SpanColor}>
                                    {chooseServiceCharge === "yes" ? "TAK" : "NIE"}
                                </span>
                                    </p>
                                </div>
                                <div className={styles.FormControlInfoSend}>
                                    <p>
                                        Ubezpieczenie: <span className={styles.SpanColor}>
                                    {chooseInsurance === "yes" ? "TAK" : "NIE"}
                                </span>
                                    </p>
                                </div>
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={agree}
                                        onChange={this.onChangeAgree}
                                    />
                                    Wyrażam zgodę
                                    na kontakt doradcy banku {banks.bankName} w celu przekazania mi
                                    informacji dotyczących szczegółów oferty banku, wymaganej listy dokumentów oraz
                                    kolejnych kroków procesu kredytowego, a także na przedstawienie propozycji
                                    spotkania w placówce banku.
                                </label>
                                <br/>
                                {readyAgree ? <p></p> :
                                    <div className={styles.ErrorParagraph}>
                                        Wyrażenie powyższej zgody jest dobrowolne, ale jednocześnie konieczne, aby
                                        pracownik banku mógł się z Tobą skontaktować.
                                    </div>
                                }
                            </div>
                            <div className={styles.DivCaptcha}>
                                <p className={styles.pCaptcha}>
                                    {load && (
                                        <ReCAPTCHA
                                            ref={this.reCaptchaRef}
                                            sitekey={SITE_KEY}
                                            onChange={this.handleChange}
                                            asyncScriptOnLoad={this.asyncScriptOnLoad}
                                        />
                                    )}
                                </p>
                                <button type="submit" className="btn btn-primary rounded">WYŚLIJ</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}