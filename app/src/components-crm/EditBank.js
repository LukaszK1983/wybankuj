import React, {Component} from "react";
import BankDataService from "../service/BankService";
import Header from "./Header";
import styles from "./EditBank.module.css";
import HeaderEdit from "./HeaderEdit";

export default class EditBank extends Component {
    constructor(props) {
        super(props);
        this.onChangeBankName = this.onChangeBankName.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);
        this.getBank = this.getBank.bind(this);
        this.updateBank = this.updateBank.bind(this);
        this.deleteBank = this.deleteBank.bind(this);

        this.state = {
            currentBank: {
                id: null,
                bankName: "",
                logo: "",
                submitted: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getBank(this.props.match.params.id);
    }

    onChangeBankName(e) {
        const bankName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBank: {
                    ...prevState.currentBank,
                    bankName: bankName
                }
            };
        });
    }

    onChangeLogo(e) {
        const logo = e.target.value;

        this.setState(prevState => ({
            currentBank: {
                ...prevState.currentBank,
                logo: logo
            }
        }));
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

    updateBank() {
        BankDataService.update(
            this.state.currentBank.id,
            this.state.currentBank
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

    deleteBank() {
        BankDataService.delete(this.state.currentBank.id)
            .then(response => {
                console.log(response.data);
                if (window.confirm("Czy na pewno chcesz usunąć?")) {
                    console.log("Bank został usunięty");
                    this.props.history.push('/bank')
                } else {
                    console.log("Usunięcie zostało anulowane");
                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentBank} = this.state;

        return (
            <div>
                <HeaderEdit bankId={this.props.location.bankId}/>

                <div className={'container'}>
                {currentBank ? (
                    <div className="edit-form">
                        <h3>Edycja</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="bankName">Nazwa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="bankName"
                                    value={currentBank.bankName}
                                    onChange={this.onChangeBankName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="logo">Logo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="logo"
                                    value={currentBank.logo}
                                    onChange={this.onChangeLogo}
                                />
                            </div>

                        </form>

                        <span className={styles.spanBtn}>
                        <button
                            type="submit"
                            className="btn btn-sm btn-outline-success rounded"
                            onClick={this.updateBank}
                        >
                            Zapisz
                        </button>
                            </span>

                        <span>
                        <button
                            className="btn btn-sm btn-outline-danger rounded"
                            onClick={this.deleteBank}
                        >
                            Usuń
                        </button>
                            </span>

                        <br/>
                        <p className={styles.pMsg}>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Wybierz bank do edycji</p>
                    </div>
                )}
                </div>
            </div>
        );
    }
}