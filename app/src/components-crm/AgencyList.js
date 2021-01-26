import React, {Component} from 'react';
import AgencyDataService from "../service/AgencyService";
import {Link} from "react-router-dom";
import HeaderEdit from "./HeaderEdit";
import styles from './AgencyList.module.css'
import BankDataService from "../service/BankService";

export default class AgencyList extends Component {

    constructor(props) {
        super(props);
        this.retrieveAgencies = this.retrieveAgencies.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAgency = this.setActiveAgency.bind(this);
        this.deleteAgency = this.deleteAgency.bind(this);

        this.state = {
            agencies: [],
            currentAgency: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveAgencies();
    }

    retrieveAgencies() {
        AgencyDataService.getAll(this.props.location.bankId)
            .then(response => {
                this.setState({
                    agencies: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveAgencies();
        this.setState({
            currentAgency: null,
            currentIndex: -1
        });
    }

    setActiveAgency(agency, index) {
        this.setState({
            currentAgency: agency,
            currentIndex: index
        });
    }

    deleteAgency(id) {
        if (window.confirm("Czy na pewno chcesz usunąć?")) {
            AgencyDataService.delete(id)
                .then(response => {
                    console.log(response.data);
                    console.log("Oddział został usunięty");
                    this.retrieveAgencies();
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            console.log("Usunięcie zostało anulowane");
        }
    }

    render() {
        const {agencies, currentAgency, currentIndex} = this.state;

        return (
            <div>
                <HeaderEdit bankId={this.props.location.bankId}/>
                {/*<div className={styles.mainDiv}>*/}
                {/*    <nav className={'navbar navbar-expand-sm bg-dark navbar-dark fixed-top'}>*/}
                {/*        <a className={'navbar-brand'} href="#">*/}
                {/*            Wybankuj.pl*/}
                {/*        </a>*/}
                {/*        <ul className={'navbar-nav'}>*/}
                {/*            <li className={'nav-item'}>*/}
                {/*                <a className={'nav-link'} href={'/bank'}>Banki</a>*/}
                {/*            </li>*/}
                {/*            <li className={'nav-item'}>*/}
                {/*                <Link*/}
                {/*                    to={{*/}
                {/*                        pathname: `/agencies/${this.props.location.bankId}`,*/}
                {/*                        bankId: this.props.location.bankId,*/}
                {/*                        bankName: this.props.location.bankName*/}
                {/*                    }}*/}
                {/*                    className={'nav-link'}>*/}
                {/*                    Oddziały*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*            <li className={'nav-item'}>*/}
                {/*                <a className={'nav-link'} href={'/loan'}>Gotówkowe</a>*/}
                {/*            </li>*/}
                {/*            <li className={'nav-item'}>*/}
                {/*                <a className={'nav-link'} href={'/mortgage'}>Hipoteczne</a>*/}
                {/*            </li>*/}
                {/*            <li className={'nav-item'}>*/}
                {/*                <a className={'nav-link'} href={'/logout'}>Wyloguj</a>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </nav>*/}
                {/*</div>*/}

                <div className={'container'}>
                    <h3>Oddziały {this.props.location.bankName}</h3>

                    <table className={'table'}>
                        <thead className={['thead-light', styles.fontThead].join(' ')}>
                        <tr>
                            <th>Nazwa</th>
                            <th>Ulica</th>
                            <th>Nr ulicy</th>
                            <th>Kod pocztowy</th>
                            <th>Miasto</th>
                            <th>Telefon</th>
                            <th>E-mail</th>
                            <th>Godziny otwarcia</th>
                            <th className={styles.thCenter}>Akcje</th>
                        </tr>
                        </thead>
                        <tbody>
                        {agencies &&
                        agencies.map((agency, index) => (
                            <tr className={styles.fontTr} key={index}>
                                <td
                                    onClick={() => this.setActiveAgency(agency, index)}
                                >{agency.agencyName}</td>
                                <td onClick={() => this.setActiveAgency(agency, index)}
                                >{agency.street}</td>
                                <td onClick={() => this.setActiveAgency(agency, index)}
                                >{agency.streetNumber}</td>
                                <td onClick={() => this.setActiveAgency(agency, index)}
                                >{agency.zipCode}</td>
                                <td onClick={() => this.setActiveAgency(agency, index)}
                                >{agency.city}</td>
                                <td onClick={() => this.setActiveAgency(agency, index)}
                                >{agency.phone}</td>
                                <td onClick={() => this.setActiveAgency(agency, index)}
                                >{agency.email}</td>
                                <td onClick={() => this.setActiveAgency(agency, index)}
                                >{agency.hours}</td>
                                <td className={styles.tdActions}>
                                    <Link
                                        to={{
                                            pathname: `/agency/${agency.id}`,
                                            bankId: this.props.location.bankId,
                                            bankName: this.props.location.bankName
                                        }}
                                        className={[styles.linkStyle, styles.linkStyleOutlinePrimary, styles.linkStyleSm, styles.rounded].join(' ')}
                                    >Edycja</Link>
                                    {/*<Link*/}
                                    {/*    to={{*/}
                                    {/*        pathname: `/agency/delete/${agency.id}`,*/}
                                    {/*        bankId: this.props.location.bankId,*/}
                                    {/*        bankName: this.props.location.bankName*/}
                                    {/*    }}*/}
                                    {/*    className="btn btn-sm btn-outline-danger rounded"*/}
                                    {/*>*/}
                                    {/*    Usuń*/}
                                    {/*</Link>*/}
                                    <button
                                        className="btn btn-sm btn-outline-danger rounded"
                                        onClick={() => this.deleteAgency(agency.id)}
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
                            <td className={styles.tdActions}>
                                <Link
                                    to={{
                                        pathname: `/agency/add`,
                                        bankId: this.props.location.bankId,
                                        bankName: this.props.location.bankName
                                    }}
                                    className="btn btn-sm btn-outline-success rounded"
                                >
                                    Dodaj nowy
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