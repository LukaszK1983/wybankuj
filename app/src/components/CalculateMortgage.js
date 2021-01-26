import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeDataService from "../service/HomeService";
import styles from './CalculateLoan.module.css';
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import NumberFormat from 'react-number-format';

export default class CalculateMortgage extends Component {

    constructor(props) {
        super(props);
        this.getMortgages = this.getMortgages.bind(this);
        this.noListReturnHandler = this.noListReturnHandler.bind(this);
        this.chooseMortgagesHandler = this.chooseMortgagesHandler.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
        this.checkChooseMortgagesLength = this.checkChooseMortgagesLength.bind(this);
        this.state = {
            mortgages: [],
            amount: this.props.match.params.amount,
            creditPeriod: this.props.match.params.creditPeriod,
            age: this.props.match.params.age,
            chooseServiceCharge: this.props.match.params.chooseServiceCharge,
            chooseInsurance: this.props.match.params.chooseInsurance,
            contributionPercent: this.props.match.params.contributionPercent,
            cost: this.props.match.params.cost,
            chooseMortgages: [],
            maxChecked: 0,
            showForm: false
        }
    }

    componentDidMount() {
        const {amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost} = this.state;

        this.getMortgages(amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost);
        this.checkChooseMortgagesLength();
    }

    getMortgages(amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost) {
        HomeDataService.getAllMortgagesWithPayments(amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost)
            .then(response => {
                this.setState({
                    mortgages: response.data
                });
                console.log("Mortgages: ", response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    noListReturnHandler = () => {
        window.location = '/mortgageParameters';
    }

    checkChooseMortgagesLength() {
        const {chooseMortgages} = this.state;
        if (chooseMortgages.length === 0) {
            this.setState({
                showForm: false
            });
        }
    }

    checkboxHandler(e, index) {
        const {chooseMortgages} = this.state;

        if (e.target.checked) {
            chooseMortgages.push(e.target.value);

            this.setState(previousState => ({
                maxChecked: {
                    ...previousState.maxChecked,
                    [index]: !previousState.maxChecked[index]
                }
            }));
            this.setState({
                chooseMortgages: chooseMortgages,
                showForm: true
            });
        } else if (!e.target.checked) {
            for (let j = 0; j < chooseMortgages.length; j++) {
                if (chooseMortgages[j] === e.target.value) {
                    let filteredChooseMortgages = chooseMortgages.filter(id => id !== e.target.value);
                    this.setState(previousState => ({
                        maxChecked: {
                            ...previousState.maxChecked,
                            [index]: !previousState.maxChecked[index]
                        }
                    }));
                    this.setState({
                        chooseMortgages: filteredChooseMortgages
                    }, () => {
                        this.checkChooseMortgagesLength()
                    });
                }
            }
        }
    }

    chooseMortgagesHandler(e) {
        e.preventDefault();
        const {chooseMortgages, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost} = this.state;

        window.location = `/mortgageDetails/${chooseMortgages[0]}/${chooseMortgages[1]}/${chooseMortgages[2]}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${contributionPercent}/${cost}`;
    }

    render() {
        const {mortgages, amount, creditPeriod, age, chooseServiceCharge, chooseInsurance, contributionPercent, cost} = this.state;
        const {chooseMortgages, showForm, maxChecked} = this.state;
        const mortgageId1 = chooseMortgages[0];
        const mortgageId2 = chooseMortgages[1];
        const mortgageId3 = chooseMortgages[2];
        const checkedCount = Object.keys(maxChecked).filter(key => maxChecked[key]).length;
        const disabled = checkedCount > 2;

        return (
            <div>
                <Header/>
                <div className="container">
                    <h3 className={styles.H3details}>Symulacje ofert kredytu hipotecznego</h3>

                    {mortgages.length === 0 ?
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
                                                    pathname: `/mortgageDetails/${mortgageId1}/${amount}/${creditPeriod}/${age}/${chooseServiceCharge}/${chooseInsurance}/${contributionPercent}/${cost}`,
                                                    mortgageId2: mortgageId2,
                                                    mortgageId3: mortgageId3
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
                                {mortgages &&
                                mortgages.map((mortgage, index) => (

                                    <tr key={mortgage.mortgage.id}>
                                        <td className={styles.TdVerticalMiddle}>
                                            <img src={require('../img/' + mortgage.logo)} alt={''} width={'60'}
                                                 height={'40'}/>
                                        </td>
                                        <td className={styles.TdVerticalMiddle}>
                                            {mortgage.mortgage.offer}
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
                                                value={mortgage.payment}
                                                suffix={' zł'}
                                                decimalScale={2}
                                                displayType={'text'}
                                            />
                                        </td>
                                        <td className={styles.TdVerticalMiddle}>
                                            <input
                                                key={index}
                                                type="checkbox"
                                                value={mortgage.mortgage.id}
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