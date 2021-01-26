import React, {Component} from 'react';
import BankDataService from '../service/BankService';
import {Link} from "react-router-dom";
import Header from "./Header";
import styles from './BanksList.module.css'
import AgencyList from "./AgencyList";

export default class BanksList extends Component {
    constructor(props) {
        super(props);
        this.retrieveBanks = this.retrieveBanks.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBank = this.setActiveBank.bind(this);
        this.setBankId = this.setBankId.bind(this);

        this.state = {
            banks: [],
            currentBank: null,
            currentIndex: -1,
            bankId: null
        };
    }

    componentDidMount() {
        this.retrieveBanks();
    }

    retrieveBanks() {
        BankDataService.getAll()
            .then(response => {
                this.setState({
                    banks: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveBanks();
        this.setState({
            currentBank: null,
            currentIndex: -1
        });
    }

    setActiveBank(bank, index) {
        this.setState({
            currentBank: bank,
            currentIndex: index
        });
    }

    setBankId = (bank) => {
        this.setState({
            bankId: bank.id
        });
    }

    render() {
        const {banks, currentBank, currentIndex} = this.state;

        return (
            <div>
                <Header/>
                <div className={'container'}>
                    <h3>Banki</h3>

                    <table className={'table'}>
                        <thead className={'thead-light'}>
                        <tr>
                            <th>Logo</th>
                            <th>Nazwa</th>
                            <th className={styles.thCenter}>Akcje</th>
                        </tr>
                        </thead>

                        {banks &&
                        banks.map((bank, index) => (
                            <tr key={index}>
                                <td
                                    // className={
                                    //     (index === currentIndex ? "active" : "")
                                    // }
                                    onClick={() => this.setActiveBank(bank, index)}
                                    // key={index}
                                >
                                    <img src={require('../img/' + bank.logo)} alt={''} width={'60'} height={'40'} />
                                </td>
                                <td onClick={() => this.setActiveBank(bank, index)}
                                    // key={index}
                                >
                                    {bank.bankName}
                                </td>
                                <td className={styles.tdActions}>
                                    <Link
                                        to={{
                                            pathname: `/agencies/${bank.id}`,
                                            bankId: bank.id,
                                            bankName: bank.bankName
                                        }}
                                        className={[styles.linkStyle, styles.linkStyleOutlinePrimary, styles.linkStyleSm, styles.rounded].join(' ')}
                                    >
                                        Oddziały
                                    </Link>
                                    <Link
                                        to={{
                                            pathname: `/loans/${bank.id}`,
                                            bankId: bank.id,
                                            bankName: bank.bankName
                                        }}
                                        className={[styles.linkStyle, styles.linkStyleOutlinePrimary, styles.linkStyleSm, styles.rounded].join(' ')}
                                    >
                                        Oferty gotówkowe
                                    </Link>
                                    <Link
                                        to={{
                                            pathname: `/mortgages/${bank.id}`,
                                            bankId: bank.id,
                                            bankName: bank.bankName
                                        }}
                                        className={[styles.linkStyle, styles.linkStyleOutlinePrimary, styles.linkStyleSm, styles.rounded].join(' ')}
                                    >
                                        Oferty hipoteczne
                                    </Link>
                                    <Link
                                        to={"/bank/" + bank.id}
                                        className="btn btn-sm btn-outline-danger rounded"
                                    >
                                        Edycja
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td> </td>
                            <td> </td>
                            <td className={styles.tdActions}>
                                <Link
                                    to={"/bank/add"}
                                    className="btn btn-sm btn-outline-success rounded"
                                >
                                    Dodaj nowy
                                </Link>
                            </td>
                        </tr>

                        {/*{banks &&*/}
                        {/*banks.map((bank, index) => (*/}
                        {/*    <td*/}
                        {/*        className={*/}
                        {/*            "list-group-item " +*/}
                        {/*            (index === currentIndex ? "active" : "")*/}
                        {/*        }*/}
                        {/*        onClick={() => this.setActiveBank(bank, index)}*/}
                        {/*        key={index}*/}
                        {/*    >*/}
                        {/*        {bank.bankName}*/}
                        {/*    </td>*/}
                        {/*))}*/}
                        {/*</tr>*/}
                    </table>
                </div>
            </div>
        );
    }
}