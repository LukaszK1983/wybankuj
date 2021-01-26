import React, {Component} from "react";
import AgencyDataService from "../service/AgencyService";
import {Link} from "react-router-dom";
import BankDataService from "../service/BankService";
import styles from "./AgencyList.module.css";

export default class AddAgency extends Component {
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
        this.setBank = this.setBank.bind(this);
        this.saveAgency = this.saveAgency.bind(this);
        this.newAgency = this.newAgency.bind(this);

        this.state = {
            id: null,
            agencyName: "",
            street: "",
            streetNumber: "",
            zipCode: "",
            city: "",
            phone: "",
            email: "",
            hours: "",
            bank: null,
            submitted: false
        };
    }

    componentDidMount() {
        this.setBank(this.props.location.bankId);
    }

    onChangeAgencyName(e) {
        this.setState({
            agencyName: e.target.value
        });
    }

    onChangeStreet(e) {
        this.setState({
            street: e.target.value
        });
    }

    onChangeStreetNumber(e) {
        this.setState({
            streetNumber: e.target.value
        });
    }

    onChangeZipCode(e) {
        this.setState({
            zipCode: e.target.value
        });
    }

    onChangeCity(e) {
        this.setState({
            city: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeHours(e) {
        this.setState({
            hours: e.target.value
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

    saveAgency() {
        const data = {
            agencyName: this.state.agencyName,
            street: this.state.street,
            streetNumber: this.state.streetNumber,
            zipCode: this.state.zipCode,
            city: this.state.city,
            phone: this.state.phone,
            email: this.state.email,
            hours: this.state.hours,
            bank: this.state.bank
        };

        AgencyDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    agencyName: response.data.agencyName,
                    street: response.data.street,
                    streetNumber: response.data.streetNumber,
                    zipCode: response.data.zipCode,
                    city: response.data.city,
                    phone: response.data.phone,
                    email: response.data.email,
                    hours: response.data.hours,
                    bank: response.data.bank,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newAgency() {
        this.setState({
            id: null,
            agencyName: "",
            street: "",
            streetNumber: "",
            zipCode: "",
            city: "",
            phone: "",
            email: "",
            hours: "",
            bank: null,
            submitted: false
        });
    }

    render() {
        return (
            <div>
                {/*<Header/>*/}
                <div className={styles.mainDiv}>
                    <nav className={'navbar navbar-expand-sm bg-dark navbar-dark fixed-top'}>
                        <a className={'navbar-brand'} href="#">
                            Wybankuj.pl
                        </a>
                        <ul className={'navbar-nav'}>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} href={'/bank'}>Banki</a>
                            </li>
                            <li className={'nav-item'}>
                                <Link
                                    to={{
                                        pathname: `/agencies/${this.props.location.bankId}`,
                                        bankId: this.props.location.bankId,
                                        bankName: this.props.location.bankName
                                    }}
                                    className={'nav-link'}>
                                    Oddziały
                                </Link>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} href={'/loan'}>Gotówkowe</a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} href={'/mortgage'}>Hipoteczne</a>
                            </li>
                            <li className={'nav-item'}>
                                <a className={'nav-link'} href={'/logout'}>Wyloguj</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={'container'}>
                    <div className="submit-form">
                        {this.state.submitted ? (
                            <div>
                                <h4>Nowy oddział został zapisany</h4>
                                <Link
                                    to={{
                                        pathname: `/agencies/${this.props.location.bankId}`,
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
                                    <h3>Dodawanie nowego oddziału</h3>
                                    <label htmlFor="agencyName">Nazwa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="agencyName"
                                        required
                                        value={this.state.agencyName}
                                        onChange={this.onChangeAgencyName}
                                        name="agencyName"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="street">Ulica</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="street"
                                        required
                                        value={this.state.street}
                                        onChange={this.onChangeStreet}
                                        name="street"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="streetNumber">Nr ulicy</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="streetNumber"
                                        required
                                        value={this.state.streetNumber}
                                        onChange={this.onChangeStreetNumber}
                                        name="streetNumber"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="zipCode">Kod pocztowy</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zipCode"
                                        required
                                        value={this.state.zipCode}
                                        onChange={this.onChangeZipCode}
                                        name="zipCode"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">Miasto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        required
                                        value={this.state.city}
                                        onChange={this.onChangeCity}
                                        name="city"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Telefon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        required
                                        value={this.state.phone}
                                        onChange={this.onChangePhone}
                                        name="phone"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        name="email"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="hours">Godziny otwarcia</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="hours"
                                        required
                                        value={this.state.hours}
                                        onChange={this.onChangeHours}
                                        name="hours"
                                    />
                                </div>

                                <button onClick={this.saveAgency} className="btn btn-success">
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