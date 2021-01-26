import React, {Component} from 'react';
import {Link} from "react-router-dom";
import HeaderEdit from "./HeaderEdit";
import styles from './AgencyList.module.css'
import LoanDataService from "../service/LoanService";

export default class LoanList extends Component {

    constructor(props) {
        super(props);
        this.retrieveLoans = this.retrieveLoans.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveLoan = this.setActiveLoan.bind(this);
        this.deleteLoan = this.deleteLoan.bind(this);

        this.state = {
            loans: [],
            currentLoan: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveLoans();
    }

    retrieveLoans() {
        LoanDataService.getAll(this.props.location.bankId)
            .then(response => {
                this.setState({
                    loans: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveLoans();
        this.setState({
            currentLoan: null,
            currentIndex: -1
        });
    }

    setActiveLoan(loan, index) {
        this.setState({
            currentLoan: loan,
            currentIndex: index
        });
    }

    deleteLoan(id) {
        if (window.confirm("Czy na pewno chcesz usunąć?")) {
            LoanDataService.delete(id)
                .then(response => {
                    console.log(response.data);
                    console.log("Oddział został usunięty");
                    this.retrieveLoans();
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            console.log("Usunięcie zostało anulowane");
        }
    }

    render() {
        const {loans, currentLoan, currentIndex} = this.state;

        return (
            <div>
                <HeaderEdit bankId={this.props.location.bankId}/>

                <div className={'container'}>
                    <h3>{this.props.location.bankName} - Kredyty gotówkowe</h3>

                    <table className={'table'}>
                        <thead className={['thead-light', styles.fontThead].join(' ')}>
                        <tr>
                            <th>Nazwa</th>
                            <th>Oprocentowanie</th>
                            <th>Prowizja</th>
                            <th>Ubezpieczenie</th>
                            <th>Min kwota</th>
                            <th>Max kwota</th>
                            <th>Min wiek</th>
                            <th>Max wiek</th>
                            <th>Max okres</th>
                            <th className={styles.thCenter}>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loans &&
                        loans.map((loan, index) => (
                            <tr className={styles.fontTr} key={index}>
                                <td
                                    onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.offer}</td>
                                <td onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.creditRate}%</td>
                                <td onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.serviceCharge}%</td>
                                <td onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.insurance}%</td>
                                <td onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.minCreditAmount} zł</td>
                                <td onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.maxCreditAmount} zł</td>
                                <td onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.minBorrowerAge} lat</td>
                                <td onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.maxBorrowerAge} lat</td>
                                <td onClick={() => this.setActiveLoan(loan, index)}
                                >{loan.maxCreditPeriod} mies.</td>
                                <td className={styles.tdActions}>
                                    <Link
                                        to={{
                                            pathname: `/loan/${loan.id}`,
                                            bankId: this.props.location.bankId,
                                            bankName: this.props.location.bankName
                                        }}
                                        className={[styles.linkStyle, styles.linkStyleOutlinePrimary, styles.linkStyleSm, styles.rounded].join(' ')}
                                    >Edycja</Link>

                                    <button
                                        className="btn btn-sm btn-outline-danger rounded"
                                        onClick={() => this.deleteLoan(loan.id)}
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className={styles.tdActions}>
                                <Link
                                    to={{
                                        pathname: `/loan/add`,
                                        bankId: this.props.location.bankId,
                                        bankName: this.props.location.bankName
                                    }}
                                    className="btn btn-sm btn-outline-success rounded"
                                >
                                    Dodaj nową ofertę
                                </Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}