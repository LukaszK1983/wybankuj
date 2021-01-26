import React, {Component} from "react";
import LoanDataService from "../service/LoanService";
import {Link} from "react-router-dom";
import BankDataService from "../service/BankService";
import styles from "./AgencyList.module.css";
import HeaderEdit from "./HeaderEdit";

export default class AddLoan extends Component {
    constructor(props) {
        super(props);
        this.onChangeOffer = this.onChangeOffer.bind(this);
        this.onChangeCreditRate = this.onChangeCreditRate.bind(this);
        this.onChangeServiceCharge = this.onChangeServiceCharge.bind(this);
        this.onChangeInsurance = this.onChangeInsurance.bind(this);
        this.onChangeMinCreditAmount = this.onChangeMinCreditAmount.bind(this);
        this.onChangeMaxCreditAmount = this.onChangeMaxCreditAmount.bind(this);
        this.onChangeMinBorrowerAge = this.onChangeMinBorrowerAge.bind(this);
        this.onChangeMaxBorrowerAge = this.onChangeMaxBorrowerAge.bind(this);
        this.onChangeMaxCreditPeriod = this.onChangeMaxCreditPeriod.bind(this);
        this.setBank = this.setBank.bind(this);
        this.saveLoan = this.saveLoan.bind(this);
        this.newLoan = this.newLoan.bind(this);

        this.state = {
            id: null,
            offer: "",
            creditRate: null,
            serviceCharge: null,
            insurance: null,
            minCreditAmount: null,
            maxCreditAmount: null,
            minBorrowerAge: null,
            maxBorrowerAge: null,
            maxCreditPeriod: null,
            bank: null,
            submitted: false
        };
    }

    componentDidMount() {
        this.setBank(this.props.location.bankId);
    }

    onChangeOffer(e) {
        this.setState({
            offer: e.target.value
        });
    }

    onChangeCreditRate(e) {
        this.setState({
            creditRate: e.target.value
        });
    }

    onChangeServiceCharge(e) {
        this.setState({
            serviceCharge: e.target.value
        });
    }

    onChangeInsurance(e) {
        this.setState({
            insurance: e.target.value
        });
    }

    onChangeMinCreditAmount(e) {
        this.setState({
            minCreditAmount: e.target.value
        });
    }

    onChangeMaxCreditAmount(e) {
        this.setState({
            maxCreditAmount: e.target.value
        });
    }

    onChangeMinBorrowerAge(e) {
        this.setState({
            minBorrowerAge: e.target.value
        });
    }

    onChangeMaxBorrowerAge(e) {
        this.setState({
            maxBorrowerAge: e.target.value
        });
    }

    onChangeMaxCreditPeriod(e) {
        this.setState({
            maxCreditPeriod: e.target.value
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

    saveLoan() {
        const data = {
            offer: this.state.offer,
            creditRate: this.state.creditRate,
            serviceCharge: this.state.serviceCharge,
            insurance: this.state.insurance,
            minCreditAmount: this.state.minCreditAmount,
            maxCreditAmount: this.state.maxCreditAmount,
            minBorrowerAge: this.state.minBorrowerAge,
            maxBorrowerAge: this.state.maxBorrowerAge,
            maxCreditPeriod: this.state.maxCreditPeriod,
            bank: this.state.bank
        };

        LoanDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    offer: response.data.offer,
                    creditRate: response.data.creditRate,
                    serviceCharge: response.data.serviceCharge,
                    insurance: response.data.insurance,
                    minCreditAmount: response.data.minCreditAmount,
                    maxCreditAmount: response.data.maxCreditAmount,
                    minBorrowerAge: response.data.minBorrowerAge,
                    maxBorrowerAge: response.data.maxBorrowerAge,
                    maxCreditPeriod: response.data.maxCreditPeriod,
                    bank: response.data.bank,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newLoan() {
        this.setState({
            id: null,
            offer: "",
            creditRate: null,
            serviceCharge: null,
            insurance: null,
            minCreditAmount: null,
            maxCreditAmount: null,
            minBorrowerAge: null,
            maxBorrowerAge: null,
            maxCreditPeriod: null,
            bank: null,
            submitted: false
        });
    }

    render() {
        return (
            <div>
                <HeaderEdit bankId={this.props.location.bankId}/>

                <div className={'container'}>
                    <div className="submit-form">
                        {this.state.submitted ? (
                            <div>
                                <h4>Nowa oferta kredytu gotówkowego została zapisana</h4>
                                <Link
                                    to={{
                                        pathname: `/loans/${this.props.location.bankId}`,
                                        bankId: this.props.location.bankId,
                                        bankName: this.props.location.bankName
                                    }}
                                    className="btn btn-primary"
                                >
                                    Powrót
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <div className="form-group">
                                    <h3>Dodawanie nowej oferty gotówkowej</h3>
                                    <label htmlFor="offer">Nazwa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="offer"
                                        required
                                        value={this.state.offer}
                                        onChange={this.onChangeOffer}
                                        name="offer"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="creditRate">Oprocentowanie</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="creditRate"
                                        required
                                        value={this.state.creditRate}
                                        onChange={this.onChangeCreditRate}
                                        name="creditRate"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="serviceCharge">Prowizja</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="serviceCharge"
                                        required
                                        value={this.state.serviceCharge}
                                        onChange={this.onChangeServiceCharge}
                                        name="serviceCharge"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="insurance">Ubezpieczenie</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="insurance"
                                        required
                                        value={this.state.insurance}
                                        onChange={this.onChangeInsurance}
                                        name="insurance"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="minCreditAmount">Min kwota</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="minCreditAmount"
                                        required
                                        value={this.state.minCreditAmount}
                                        onChange={this.onChangeMinCreditAmount}
                                        name="minCreditAmount"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="maxCreditAmount">Max kwota</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="maxCreditAmount"
                                        required
                                        value={this.state.maxCreditAmount}
                                        onChange={this.onChangeMaxCreditAmount}
                                        name="maxCreditAmount"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="minBorrowerAge">Min wiek</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="minBorrowerAge"
                                        required
                                        value={this.state.minBorrowerAge}
                                        onChange={this.onChangeMinBorrowerAge}
                                        name="minBorrowerAge"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="maxBorrowerAge">Max wiek</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="maxBorrowerAge"
                                        required
                                        value={this.state.maxBorrowerAge}
                                        onChange={this.onChangeMaxBorrowerAge}
                                        name="maxBorrowerAge"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="maxCreditPeriod">Max okres</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="maxCreditPeriod"
                                        required
                                        value={this.state.maxCreditPeriod}
                                        onChange={this.onChangeMaxCreditPeriod}
                                        name="maxCreditPeriod"
                                    />
                                </div>

                                <button onClick={this.saveLoan} className="btn btn-success">
                                    Zapisz
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}