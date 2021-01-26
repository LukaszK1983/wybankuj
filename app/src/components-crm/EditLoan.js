import React, {Component} from "react";
import LoanDataService from "../service/LoanService";
import styles from "./EditBank.module.css";
import HeaderEdit from "./HeaderEdit";
import {Link} from "react-router-dom";

export default class EditLoan extends Component {
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
        this.getLoan = this.getLoan.bind(this);
        this.updateLoan = this.updateLoan.bind(this);

        this.state = {
            currentLoan: {
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
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getLoan(this.props.match.params.id);
    }

    onChangeOffer(e) {
        const offer = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    offer: offer
                }
            };
        });
    }

    onChangeCreditRate(e) {
        const creditRate = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    creditRate: creditRate
                }
            };
        });
    }

    onChangeServiceCharge(e) {
        const serviceCharge = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    serviceCharge: serviceCharge
                }
            };
        });
    }

    onChangeInsurance(e) {
        const insurance = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    insurance: insurance
                }
            };
        });
    }

    onChangeMinCreditAmount(e) {
        const minCreditAmount = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    minCreditAmount: minCreditAmount
                }
            };
        });
    }

    onChangeMaxCreditAmount(e) {
        const maxCreditAmount = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    maxCreditAmount: maxCreditAmount
                }
            };
        });
    }

    onChangeMinBorrowerAge(e) {
        const minBorrowerAge = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    minBorrowerAge: minBorrowerAge
                }
            };
        });
    }

    onChangeMaxBorrowerAge(e) {
        const maxBorrowerAge = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    maxBorrowerAge: maxBorrowerAge
                }
            };
        });
    }

    onChangeMaxCreditPeriod(e) {
        const maxCreditPeriod = e.target.value;

        this.setState(function (prevState) {
            return {
                currentLoan: {
                    ...prevState.currentLoan,
                    maxCreditPeriod: maxCreditPeriod
                }
            };
        });
    }

    getLoan(id) {
        LoanDataService.get(id)
            .then(response => {
                this.setState({
                    currentLoan: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateLoan() {
        LoanDataService.update(
            this.state.currentLoan.id,
            this.state.currentLoan
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Aktualizacja zakończona poprawnie."
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentLoan} = this.state;

        return (
            <div>
                <HeaderEdit bankId={this.props.location.bankId}/>

                <div className={'container'}>
                    {currentLoan ? (
                            <div className="edit-form">
                                <h3>Edycja oferty gotówkowej - {this.props.location.bankName}</h3>
                                <form>
                                    <div className="form-group">
                                    <label htmlFor="offer">Nazwa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="offer"
                                        required
                                        value={currentLoan.offer}
                                        onChange={this.onChangeOffer}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="creditRate">Oprocentowanie</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="creditRate"
                                        required
                                        value={currentLoan.creditRate}
                                        onChange={this.onChangeCreditRate}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="serviceCharge">Prowizja</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="serviceCharge"
                                        required
                                        value={currentLoan.serviceCharge}
                                        onChange={this.onChangeServiceCharge}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="insurance">Ubezpieczenie</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="insurance"
                                        required
                                        value={currentLoan.insurance}
                                        onChange={this.onChangeInsurance}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="minCreditAmount">Min kwota</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="minCreditAmount"
                                        required
                                        value={currentLoan.minCreditAmount}
                                        onChange={this.onChangeMinCreditAmount}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="maxCreditAmount">Max kwota</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="maxCreditAmount"
                                        required
                                        value={currentLoan.maxCreditAmount}
                                        onChange={this.onChangeMaxCreditAmount}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="minBorrowerAge">Min wiek</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="minBorrowerAge"
                                        required
                                        value={currentLoan.minBorrowerAge}
                                        onChange={this.onChangeMinBorrowerAge}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="maxBorrowerAge">Max wiek</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="maxBorrowerAge"
                                        required
                                        value={currentLoan.maxBorrowerAge}
                                        onChange={this.onChangeMaxBorrowerAge}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="maxCreditPeriod">Max okres</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="maxCreditPeriod"
                                        required
                                        value={currentLoan.maxCreditPeriod}
                                        onChange={this.onChangeMaxCreditPeriod}
                                    />
                                </div>

                                </form>

                                <span className={styles.spanBtn}>
                        <button
                            type="submit"
                            className="btn btn-sm btn-outline-success rounded"
                            onClick={this.updateLoan}
                        >
                            Zapisz
                        </button>
                            </span>

                                <br/>
                                <p className={styles.pMsg}>{this.state.message}</p>
                                <br />
                                <td className={styles.tdActions}>
                                    <Link
                                        to={{
                                            pathname: `/loans/${this.props.location.bankId}`,
                                            bankId: this.props.location.bankId,
                                            bankName: this.props.location.bankName
                                        }}
                                        className={[styles.linkStyle, styles.linkStyleOutlinePrimary, styles.linkStyleSm, styles.rounded].join(' ')}
                                    >
                                        Powrót
                                    </Link>
                                </td>
                            </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Wybierz ofertę do edycji</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}