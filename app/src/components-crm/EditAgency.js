import React, {Component} from "react";
import AgencyDataService from "../service/AgencyService";
import styles from "./EditBank.module.css";
import {Link} from "react-router-dom";
import HeaderEdit from "./HeaderEdit";

export default class EditAgency extends Component {
    constructor(props) {
        super(props);
        this.onChangeAgencyName = this.onChangeAgencyName.bind(this);
        this.onChangeStreet = this.onChangeStreet.bind(this);
        this.onChangeStreetNumber = this.onChangeStreetNumber.bind(this);
        this.onChangeZipCode = this.onChangeZipCode.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeHours = this.onChangeHours.bind(this);
        this.getAgency = this.getAgency.bind(this);
        this.updateAgency = this.updateAgency.bind(this);

        this.state = {
            currentAgency: {
                id: null,
                agencyName: "",
                street: "",
                streetNumber: "",
                zipCode: "",
                city: "",
                phone: "",
                email: "",
                hours: "",
                submitted: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getAgency(this.props.match.params.id);
    }

    onChangeAgencyName(e) {
        const agencyName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAgency: {
                    ...prevState.currentAgency,
                    agencyName: agencyName
                }
            };
        });
    }

    onChangeStreet(e) {
        const street = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAgency: {
                    ...prevState.currentAgency,
                    street: street
                }
            };
        });
    }

    onChangeStreetNumber(e) {
        const streetNumber = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAgency: {
                    ...prevState.currentAgency,
                    streetNumber: streetNumber
                }
            };
        });
    }

    onChangeZipCode(e) {
        const zipCode = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAgency: {
                    ...prevState.currentAgency,
                    zipCode: zipCode
                }
            };
        });
    }

    onChangeCity(e) {
        const city = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAgency: {
                    ...prevState.currentAgency,
                    city: city
                }
            };
        });
    }

    onChangePhone(e) {
        const phone = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAgency: {
                    ...prevState.currentAgency,
                    phone: phone
                }
            };
        });
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAgency: {
                    ...prevState.currentAgency,
                    email: email
                }
            };
        });
    }

    onChangeHours(e) {
        const hours = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAgency: {
                    ...prevState.currentAgency,
                    hours: hours
                }
            };
        });
    }

    getAgency(id) {
        AgencyDataService.get(id)
            .then(response => {
                this.setState({
                    currentAgency: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateAgency() {
        AgencyDataService.update(
            this.state.currentAgency.id,
            this.state.currentAgency
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
        const {currentAgency} = this.state;

        return (
            <div>
                <HeaderEdit bankId={this.props.location.bankId}/>

                <div className={'container'}>
                    {currentAgency ? (
                        <div className="edit-form">
                            <h3>Edycja oddziału - {this.props.location.bankName}</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="agencyName">Nazwa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="agencyName"
                                        value={currentAgency.agencyName}
                                        onChange={this.onChangeAgencyName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="street">Ulica</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="street"
                                        value={currentAgency.street}
                                        onChange={this.onChangeStreet}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="streetNumber">Nr ulicy</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="streetNumber"
                                        value={currentAgency.streetNumber}
                                        onChange={this.onChangeStreetNumber}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="zipCode">Kod pocztowy</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zipCode"
                                        value={currentAgency.zipCode}
                                        onChange={this.onChangeZipCode}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">Miasto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        value={currentAgency.city}
                                        onChange={this.onChangeCity}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Telefon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        value={currentAgency.phone}
                                        onChange={this.onChangePhone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        value={currentAgency.email}
                                        onChange={this.onChangeEmail}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="hours">Godziny otwarcia</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="hours"
                                        value={currentAgency.hours}
                                        onChange={this.onChangeHours}
                                    />
                                </div>

                            </form>

                            <span className={styles.spanBtn}>
                        <button
                            type="submit"
                            className="btn btn-sm btn-outline-success rounded"
                            onClick={this.updateAgency}
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
                                        pathname: `/agencies/${this.props.location.bankId}`,
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
                            <p>Wybierz oddział do edycji</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}