import React, {Component} from "react";
import BankDataService from "../service/BankService";
import Header from "./Header";
import {Link} from "react-router-dom";
import styles from "./BanksList.module.css";

export default class AddBank extends Component {
    constructor(props) {
        super(props);
        this.onChangeBankName = this.onChangeBankName.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);
        this.saveBank = this.saveBank.bind(this);
        this.newBank = this.newBank.bind(this);

        this.state = {
            id: null,
            bankName: "",
            logo: "",
            submitted: false
        };
    }

    onChangeBankName(e) {
        this.setState({
            bankName: e.target.value
        });
    }

    onChangeLogo(e) {
        this.setState({
            logo: e.target.value
        });
    }

    saveBank() {
        const data = {
            bankName: this.state.bankName,
            logo: this.state.logo
        };

        BankDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    bankName: response.data.bankName,
                    logo: response.data.logo,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newBank() {
        this.setState({
            id: null,
            bankName: "",
            logo: "",
            submitted: false
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={'container'}>
                    <div className="submit-form">
                        {this.state.submitted ? (
                            <div>
                                <h4>Nowy bank został zapisany</h4>
                                <Link
                                    to={"/bank/"}
                                    className="btn btn-primary"
                                >
                                    Powrót
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <div className="form-group">
                                    <h3>Dodawanie nowego banku</h3>
                                    <label htmlFor="bankName">Nazwa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bankName"
                                        required
                                        value={this.state.bankName}
                                        onChange={this.onChangeBankName}
                                        name="bankName"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Logo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="logo"
                                        required
                                        value={this.state.logo}
                                        onChange={this.onChangeLogo}
                                        name="logo"
                                    />
                                </div>

                                <button onClick={this.saveBank} className="btn btn-success">
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