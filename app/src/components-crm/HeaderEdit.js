import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import BankDataService from '../service/BankService';

class Header extends Component {

    constructor(props) {
        super(props);
        this.getBank = this.getBank.bind(this);

        this.state = {
            currentBank: {
                id: null,
                bankName: "",
                logo: ""
            }
        };
    }

    componentDidMount() {
        this.getBank(this.props.bankId);
    }

    getBank(id) {
        BankDataService.get(id)
            .then(response => {
                this.setState({
                    currentBank: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const bankId = this.props.bankId;
        const bankName = this.state.currentBank.bankName;

        return(
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
                                    pathname: `/agencies/${bankId}`,
                                    bankId: bankId,
                                    bankName: bankName
                                }}
                                className={'nav-link'}>
                                Oddziały {bankName}
                            </Link>
                        </li>
                        <li className={'nav-item'}>
                            <Link
                                to={{
                                    pathname: `/loans/${bankId}`,
                                    bankId: bankId,
                                    bankName: bankName
                                }}
                                className={'nav-link'}>
                                Gotówkowe {bankName}
                            </Link>
                            {/*<a className={'nav-link'} href={`/loan/${bankId}`}>Gotówkowe</a>*/}
                        </li>
                        <li className={'nav-item'}>
                            <Link
                                to={{
                                    pathname: `/mortgages/${bankId}`,
                                    bankId: bankId,
                                    bankName: bankName
                                }}
                                className={'nav-link'}>
                                Hipoteczne {bankName}
                            </Link>
                            {/*<a className={'nav-link'} href={`/mortgage/${bankId}`}>Hipoteczne</a>*/}
                        </li>
                        <li className={'nav-item'}>
                            <a className={'nav-link'} href={'/logout'}>Wyloguj</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
