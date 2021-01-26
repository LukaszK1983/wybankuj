import React, {Component} from "react";
import styles from './LoanAgencyContactForm.module.css';
import Header from "./Header";
import Footer from "./Footer";
import BankDataService from "../service/BankService";
import HomeDataService from "../service/HomeService";
import {Link} from "react-router-dom";

export default class MortgageAgencyContactForm extends Component {

    constructor(props) {
        super(props);
        this.getBank = this.getBank.bind(this);
        this.getBankLogo = this.getBankLogo.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

        this.state = {
            bank: [],
            bankId: this.props.match.params.bankId,
            offer: this.props.match.params.offer,
            amount: this.props.match.params.amount,
            creditPeriod: this.props.match.params.creditPeriod,
            age: this.props.match.params.age,
            chooseServiceCharge: this.props.match.params.chooseServiceCharge,
            chooseInsurance: this.props.match.params.chooseInsurance,
            name: this.props.match.params.name,
            email: this.props.match.params.email,
            phone: this.props.match.params.phone,
            contributionPercent: this.props.match.params.contributionPercent,
            cost: this.props.match.params.cost,
            logo: ''
        }
    }

    componentDidMount() {
        const {bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost, name, email, phone} = this.state;

        this.getBank(bankId);
        this.getBankLogo(bankId);
        this.sendEmail(bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost, name, email, phone);
    }

    getBank(id) {
        BankDataService.get(id)
            .then(response => {
                this.setState({
                    bank: response.data
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

    sendEmail(bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost, name, email, phone) {
        HomeDataService.sendEmailMortgage(bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost, name, email, phone)
            .then(response => {
                console.log("Wiadomość została wysłana pomyślnie.");
            }).catch(e => {
            console.log("Nie udało się wysłać wiadomości: ", e);
        })
    }

    render() {
        const {logo, bank, bankId, offer, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost, name} = this.state;

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

                    <h5>
                        <span className={styles.SpanColor}>{name}</span>, Twoja prośba o kontakt została przekazana do
                        pracownika <span className={styles.SpanColor}>{bank.bankName}</span>. Wkrótce
                        doradca banku skontaktuje się z Tobą w celu umówienia spotkania w placówce.
                    </h5>

                    <div className={styles.DivButtons}>
                        <div>
                            <Link
                                to={{
                                    pathname: `/calculateMortgage/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${contributionPercent}/${cost}`
                                }}
                                className="btn btn-sm btn-primary rounded"
                            >Powrót do listy ofert
                            </Link>
                        </div>
                    </div>

                </div>

                <Footer/>
            </div>
        );
    }
}