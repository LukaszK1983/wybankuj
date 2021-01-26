import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeDataService from "../service/HomeService";
import styles from './CalculateLoan.module.css';
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import NumberFormat from 'react-number-format';

export default class CalculateLoan extends Component {

    constructor(props) {
        super(props);
        this.getLoans = this.getLoans.bind(this);
        this.noListReturnHandler = this.noListReturnHandler.bind(this);
        this.chooseLoansHandler = this.chooseLoansHandler.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.checkChooseLoansLength = this.checkChooseLoansLength.bind(this);
        this.state = {
            loans: [],
            amount: this.props.match.params.amount,
            creditPeriod: this.props.match.params.creditPeriod,
            age: this.props.match.params.age,
            chooseServiceCharge: this.props.match.params.chooseServiceCharge,
            chooseInsurance: this.props.match.params.chooseInsurance,
            chooseLoans: [],
            maxChecked: 0,
            showForm: false
        }
    }

    componentDidMount() {
        const {amount, creditPeriod, age, chooseServiceCharge, chooseInsurance} = this.state;

        this.getLoans(amount, creditPeriod, age, chooseServiceCharge, chooseInsurance);
        this.checkChooseLoansLength();
    }

    getLoans(amount, creditPeriod, age, chooseServiceCharge, chooseInsurance) {
        HomeDataService.getAllLoansWithPayments(amount, creditPeriod, age, chooseServiceCharge, chooseInsurance)
            .then(response => {
                this.setState({
                    loans: response.data
                });
                console.log("Loans: ", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    noListReturnHandler = () => {
        window.location = '/loanParameters';
    }

    checkChooseLoansLength() {
        const {chooseLoans} = this.state;
        if (chooseLoans.length === 0) {
            this.setState({
                showForm: false
            });
        }
    }

    checkboxHandler(e, index) {
        const {chooseLoans} = this.state;

        if (e.target.checked) {
            chooseLoans.push(e.target.value);

            this.setState(previousState => ({
                maxChecked: {
                    ...previousState.maxChecked,
                    [index]: !previousState.maxChecked[index]
                }
            }));
            this.setState({
                chooseLoans: chooseLoans,
                showForm: true
            });
        } else if (!e.target.checked) {
            for (let j = 0; j < chooseLoans.length; j++) {
                if (chooseLoans[j] === e.target.value) {
                    let filteredChooseLoans = chooseLoans.filter(id => id !== e.target.value);
                    this.setState(previousState => ({
                        maxChecked: {
                            ...previousState.maxChecked,
                            [index]: !previousState.maxChecked[index]
                        }
                    }));
                    this.setState({
                        chooseLoans: filteredChooseLoans
                    }, () => {
                        this.checkChooseLoansLength()
                    });
                }
            }
        }
    }

    chooseLoansHandler(e) {
        e.preventDefault();
        const {chooseLoans, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance} = this.state;

        window.location = `/loanDetails/${chooseLoans[0]}/${chooseLoans[1]}/${chooseLoans[2]}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`;
    }

    render() {
        const {loans, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance} = this.state;
        const {chooseLoans, showForm, maxChecked} = this.state;
        const loanId1 = chooseLoans[0];
        const loanId2 = chooseLoans[1];
        const loanId3 = chooseLoans[2];
        const checkedCount = Object.keys(maxChecked).filter(key => maxChecked[key]).length;
        const disabled = checkedCount > 2;

        return (
            <div>
                <Header/>
                <div className="container">
                    <h3 className={styles.H3details}>Symulacje ofert kredytu gotówkowego</h3>

                    {loans.length === 0 ?
                        <div className={styles.DivFadeIn}>
                            <p className={styles.PReturn}>
                                Brak ofert dla wybranych parametrów. Spróbuj ponownie.
                            </p>
                            <button className="btn btn-sm btn-primary rounded" onClick={this.noListReturnHandler}>
                                POWRÓT
                            </button>
                        </div>
                        :

                        <div>
                            <div className={styles.DivListOffers}>
                                <table className={[styles.Table, styles.TableHover, 'sticky-header'].join(' ')}>
                                    <thead className={styles.TheadLight}>
                                    <tr>
                                        <th className={styles.ThSticky}>Bank</th>
                                        <th className={styles.ThSticky}>Oferta</th>
                                        <th className={styles.ThSticky}>Kwota</th>
                                        <th className={styles.ThSticky}>Okres</th>
                                        <th className={styles.ThSticky}>Rata</th>
                                        {!showForm ?
                                            <th className={styles.ThSticky}>Porównaj (max. 3)</th>
                                            :
                                            <th className={styles.ThSticky}>
                                                <Link
                                                    to={{
                                                        pathname: `/loanDetails/${loanId1}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}`,
                                                        loanId2: loanId2,
                                                        loanId3: loanId3
                                                    }}
                                                    className="btn btn-sm btn-success rounded"
                                                >
                                                    Porównaj (max. 3)
                                                </Link>
                                            </th>
                                        }
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {loans &&
                                    loans.map((loan, index) => (
                                        <tr key={index}>
                                            <td className={styles.TdVerticalMiddle}>
                                                <img src={require('../img/' + loan.logo)} alt={''} width={'60'}
                                                     height={'40'}/>
                                            </td>
                                            <td className={styles.TdVerticalMiddle}>
                                                {loan.loan.offer}
                                            </td>
                                            <td className={styles.TdVerticalMiddle}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={amount}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                            <td className={styles.TdVerticalMiddle}>
                                                {creditPeriod} mies.
                                            </td>
                                            <td className={styles.TdVerticalMiddleWithFont}>
                                                <NumberFormat
                                                    thousandSeparator={' '}
                                                    decimalSeparator={','}
                                                    fixedDecimalScale={true}
                                                    value={loan.payment}
                                                    suffix={' zł'}
                                                    decimalScale={2}
                                                    displayType={'text'}
                                                />
                                            </td>
                                            <td className={styles.TdVerticalMiddle}>
                                                <input
                                                    key={index}
                                                    type="checkbox"
                                                    value={loan.loan.id}
                                                    onChange={(e) => this.checkboxHandler(e, index)}
                                                    checked={maxChecked[index] || false}
                                                    disabled={!maxChecked[index] && disabled}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.InfoAlert}>
                                <p>Przedstawione symulacje mają charakter informacyjny oraz nie stanowią oferty
                                    handlowej w
                                    rozumieniu Art. 66. par. 1 Kodeksu Cywilnego. Dane wykorzystane do przygotowania
                                    symulacji
                                    pochodzą bezpośrednio z poszczególnych banków, jednak finalna wersja oferty może się
                                    różnić
                                    od przedstawionej w serwisie Wybankuj.pl. Otrzymanie kredytu uzależnione jest od
                                    wielu
                                    czynników, do których należą posiadanie zdolności kredytowej, akceptowanego źródła
                                    dochodu,
                                    dobrej historii kredytowej, a dodatkowym warunkiem jest pozytywna ocena scoringowa
                                    wydana
                                    przez system bankowy.</p>
                            </div>
                        </div>
                    }
                </div>
                <Footer/>
            </div>
        );
    }
}