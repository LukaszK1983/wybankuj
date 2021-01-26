import React, {Component} from 'react';
import {Link} from "react-router-dom";
import HeaderEdit from "./HeaderEdit";
import styles from './AgencyList.module.css'
import MortgageDataService from "../service/MortgageService";

export default class MortgageList extends Component {

    constructor(props) {
        super(props);
        this.retrieveMortgages = this.retrieveMortgages.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMortgage = this.setActiveMortgage.bind(this);
        this.deleteMortgage = this.deleteMortgage.bind(this);

        this.state = {
            mortgages: [],
            currentMortgage: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveMortgages();
    }

    retrieveMortgages() {
        MortgageDataService.getAll(this.props.location.bankId)
            .then(response => {
                this.setState({
                    mortgages: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveMortgages();
        this.setState({
            currentMortgage: null,
            currentIndex: -1
        });
    }

    setActiveMortgage(mortgage, index) {
        this.setState({
            currentMortgage: mortgage,
            currentIndex: index
        });
    }

    deleteMortgage(id) {
        if (window.confirm("Czy na pewno chcesz usunąć?")) {
            MortgageDataService.delete(id)
                .then(response => {
                    console.log(response.data);
                    console.log("Oddział został usunięty");
                    this.retrieveMortgages();
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            console.log("Usunięcie zostało anulowane");
        }
    }

    render() {
        const {mortgages, currentMortgage, currentIndex} = this.state;

        return (
            <div>
                <HeaderEdit bankId={this.props.location.bankId}/>

                <div className={'container'}>
                    <h3>{this.props.location.bankName} - Kredyty hipoteczne</h3>

                    <table className={'table'}>
                        <thead className={['thead-light', styles.fontThead].join(' ')}>
                        <tr>
                            <th>Nazwa</th>
                            <th>Oprocentowanie</th>
                            <th>Prowizja</th>
                            <th>Ubezpieczenie</th>
                            <th>Wkład własny</th>
                            <th>Min kwota</th>
                            <th>Max kwota</th>
                            <th>Min wiek</th>
                            <th>Max wiek</th>
                            <th>Max okres</th>
                            <th className={styles.thCenter}>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mortgages &&
                        mortgages.map((mortgage, index) => (
                            <tr className={styles.fontTr} key={index}>
                                <td
                                    onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.offer}</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.creditRate}%</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.serviceCharge}%</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.insurance}%</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.contributionPercent}%</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.minCreditAmount} zł</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.maxCreditAmount} zł</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.minBorrowerAge} lat</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.maxBorrowerAge} lat</td>
                                <td onClick={() => this.setActiveMortgage(mortgage, index)}
                                >{mortgage.maxCreditPeriod} mies.</td>
                                <td className={styles.tdActions}>
                                    <Link
                                        to={{
                                            pathname: `/mortgage/${mortgage.id}`,
                                            bankId: this.props.location.bankId,
                                            bankName: this.props.location.bankName
                                        }}
                                        className={[styles.linkStyle, styles.linkStyleOutlinePrimary, styles.linkStyleSm, styles.rounded].join(' ')}
                                    >Edycja</Link>

                                    <button
                                        className="btn btn-sm btn-outline-danger rounded"
                                        onClick={() => this.deleteMortgage(mortgage.id)}
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
                            <td></td>
                            <td className={styles.tdActions}>
                                <Link
                                    to={{
                                        pathname: `/mortgage/add`,
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