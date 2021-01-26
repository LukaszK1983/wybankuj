import React, {Component} from "react";
import MortgageDataService from "../service/MortgageService";
import styles from "./EditBank.module.css";
import HeaderEdit from "./HeaderEdit";
import {Link} from "react-router-dom";

export default class EditMortgage extends Component {
    constructor(props) {
        super(props);
        this.onChangeOffer = this.onChangeOffer.bind(this);
        this.onChangeCreditRate = this.onChangeCreditRate.bind(this);
        this.onChangeServiceCharge = this.onChangeServiceCharge.bind(this);
        this.onChangeInsurance = this.onChangeInsurance.bind(this);
        this.onChangeContributionPercent = this.onChangeContributionPercent.bind(this);
        this.onChangeMinCreditAmount = this.onChangeMinCreditAmount.bind(this);
        this.onChangeMaxCreditAmount = this.onChangeMaxCreditAmount.bind(this);
        this.onChangeMinBorrowerAge = this.onChangeMinBorrowerAge.bind(this);
        this.onChangeMaxBorrowerAge = this.onChangeMaxBorrowerAge.bind(this);
        this.onChangeMaxCreditPeriod = this.onChangeMaxCreditPeriod.bind(this);
        this.getMortgage = this.getMortgage.bind(this);
        this.updateMortgage = this.updateMortgage.bind(this);

        this.state = {
            currentMortgage: {
                id: null,
                offer: "",
                creditRate: null,
                serviceCharge: null,
                insurance: null,
                contributionPercent: null,
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
        this.getMortgage(this.props.match.params.id);
    }

    onChangeOffer(e) {
        const offer = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    offer: offer
                }
            };
        });
    }

    onChangeCreditRate(e) {
        const creditRate = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    creditRate: creditRate
                }
            };
        });
    }

    onChangeServiceCharge(e) {
        const serviceCharge = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    serviceCharge: serviceCharge
                }
            };
        });
    }

    onChangeInsurance(e) {
        const insurance = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    insurance: insurance
                }
            };
        });
    }

    onChangeContributionPercent(e) {
        const contributionPercent = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    contributionPercent: contributionPercent
                }
            };
        });
    }

    onChangeMinCreditAmount(e) {
        const minCreditAmount = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    minCreditAmount: minCreditAmount
                }
            };
        });
    }

    onChangeMaxCreditAmount(e) {
        const maxCreditAmount = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    maxCreditAmount: maxCreditAmount
                }
            };
        });
    }

    onChangeMinBorrowerAge(e) {
        const minBorrowerAge = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    minBorrowerAge: minBorrowerAge
                }
            };
        });
    }

    onChangeMaxBorrowerAge(e) {
        const maxBorrowerAge = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    maxBorrowerAge: maxBorrowerAge
                }
            };
        });
    }

    onChangeMaxCreditPeriod(e) {
        const maxCreditPeriod = e.target.value;

        this.setState(function (prevState) {
            return {
                currentMortgage: {
                    ...prevState.currentMortgage,
                    maxCreditPeriod: maxCreditPeriod
                }
            };
        });
    }

    getMortgage(id) {
        MortgageDataService.get(id)
            .then(response => {
                this.setState({
                    currentMortgage: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateMortgage() {
        MortgageDataService.update(
            this.state.currentMortgage.id,
            this.state.currentMortgage
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
        const {currentMortgage} = this.state;

        return (
            <div>
                <HeaderEdit bankId={this.props.location.bankId}/>

                <div className={'container'}>
                    {currentMortgage ? (
                        <div className="edit-form">
                            <h3>Edycja oferty hipotecznej - {this.props.location.bankName}</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="offer">Nazwa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="offer"
                                        required
                                        value={currentMortgage.offer}
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
                                        value={currentMortgage.creditRate}
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
                                        value={currentMortgage.serviceCharge}
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
                                        value={currentMortgage.insurance}
                                        onChange={this.onChangeInsurance}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contributionPercent">Wkład własny</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contributionPercent"
                                        required
                                        value={currentMortgage.contributionPercent}
                                        onChange={this.onChangeContributionPercent}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="minCreditAmount">Min kwota</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="minCreditAmount"
                                        required
                                        value={currentMortgage.minCreditAmount}
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
                                        value={currentMortgage.maxCreditAmount}
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
                                        value={currentMortgage.minBorrowerAge}
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
                                        value={currentMortgage.maxBorrowerAge}
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
                                        value={currentMortgage.maxCreditPeriod}
                                        onChange={this.onChangeMaxCreditPeriod}
                                    />
                                </div>

                            </form>

                            <span className={styles.spanBtn}>
                        <button
                            type="submit"
                            className="btn btn-sm btn-outline-success rounded"
                            onClick={this.updateMortgage}
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
                                        pathname: `/mortgages/${this.props.location.bankId}`,
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