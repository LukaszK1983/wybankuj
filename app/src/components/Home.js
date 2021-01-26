import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";

class Home extends Component {

    state = {
        changeColorLeftBox: false,
        changeColorRightBox: false,
        fadeStyle: styles.DivFade,
        divAboutUsLeftStyle: styles.DivAboutUsLeftHidden,
        divAboutUsCenterStyle: styles.DivAboutUsCenterHidden,
        divAboutUsRightStyle: styles.DivAboutUsRightHidden,
        image1Style: styles.ImgStyleVisible,
        image2Style: styles.ImgStyleHidden,
        image3Style: styles.ImgStyleHidden,
        image4Style: styles.ImgStyleHidden
    }

    componentDidMount() {
        this.sliderRotation();
        setInterval(() => this.sliderRotation(), 16000);
    }

    toggleChangeColorLeftBoxHandler = () => {
        const isChangeColorLeftBox = this.state.changeColorLeftBox;
        this.setState({
            changeColorLeftBox: !isChangeColorLeftBox
        });
    }

    toggleChangeColorRightBoxHandler = () => {
        const isChangeColorRightBox = this.state.changeColorRightBox;
        this.setState({
            changeColorRightBox: !isChangeColorRightBox
        });
    }

    loanParametersHandler = () => {
        window.location = '/loanParameters';
    }

    mortgageParametersHandler = () => {
        window.location = '/mortgageParameters';
    }

    divFadeOn = () => {
        this.setState({
            fadeStyle: styles.DivFadeWider
        });
    }

    divFadeOut = () => {
        this.setState({
            fadeStyle: styles.DivFade
        });
    }

    divAboutUsShow = () => {
        this.setState({
            divAboutUsLeftStyle: styles.DivAboutUsLeft,
            divAboutUsCenterStyle: styles.DivAboutUsCenter,
            divAboutUsRightStyle: styles.DivAboutUsRight
        });
    }

    sliderRotation = () => {
        setTimeout(this.step1, 4000);
        setTimeout(this.step2, 8000);
        setTimeout(this.step3, 12000);
        setTimeout(this.step4, 16000);
    }

    step1 = () => {
        this.setState({
            image1Style: styles.ImgStyleHidden,
            image2Style: styles.ImgStyleVisible,
            image3Style: styles.ImgStyleHidden,
            image4Style: styles.ImgStyleHidden
        });
    }

    step2 = () => {
        this.setState({
            image1Style: styles.ImgStyleHidden,
            image2Style: styles.ImgStyleHidden,
            image3Style: styles.ImgStyleVisible,
            image4Style: styles.ImgStyleHidden
        });
    }

    step3 = () => {
        this.setState({
            image1Style: styles.ImgStyleHidden,
            image2Style: styles.ImgStyleHidden,
            image3Style: styles.ImgStyleHidden,
            image4Style: styles.ImgStyleVisible
        });
    }

    step4 = () => {
        this.setState({
            image1Style: styles.ImgStyleVisible,
            image2Style: styles.ImgStyleHidden,
            image3Style: styles.ImgStyleHidden,
            image4Style: styles.ImgStyleHidden
        });
    }

    render() {

        let leftBoxStyles = [styles.DivSimulationLeft];
        let rightBoxStyles = [styles.DivSimulationRight];

        if (this.state.changeColorLeftBox) {
            leftBoxStyles.push(styles.DivSimulationLeftSecond);
        }

        if (this.state.changeColorRightBox) {
            rightBoxStyles.push(styles.DivSimulationRightSecond);
        }

        const image1 = require('../img/slider_image_1.jpg');
        const image2 = require('../img/slider_image_2.jpg');
        const image3 = require('../img/slider_image_3.jpg');
        const image4 = require('../img/slider_image_4b.jpg');

        const {fadeStyle, divAboutUsLeftStyle, divAboutUsCenterStyle, divAboutUsRightStyle} = this.state;
        const {image1Style, image2Style, image3Style, image4Style} = this.state;

        return (
            <div className={styles.DivMain}>
                <Header />
                <div id="fb-root"/>
                <script async defer crossOrigin="anonymous"
                        src="https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v6.0"/>

                <div className={styles.SliderMain}>
                    <img src={image1} alt="" className={image1Style} />
                    <img src={image2} alt="" className={image2Style} />
                    <img src={image3} alt="" className={image3Style} />
                    <img src={image4} alt="" className={image4Style} />
                </div>

                <div className={styles.Container}>
                    <div className={styles.DivOuter}>

                        <div className={styles.DivWybankuj}>
                            <h3 className={styles.H3Simulation}>Wybankuj teraz najlepszą ofertę dla siebie</h3>
                        </div>
                        <br/>
                        <div id="loan">
                            <button onClick={this.loanParametersHandler} onMouseOver={this.toggleChangeColorLeftBoxHandler} onMouseLeave={this.toggleChangeColorLeftBoxHandler} className={leftBoxStyles.join(' ')}>
                                KREDYT GOTÓWKOWY
                            </button>
                        </div>
                        <div id="mortgage">
                            <button onClick={this.mortgageParametersHandler} onMouseOver={this.toggleChangeColorRightBoxHandler} onMouseLeave={this.toggleChangeColorRightBoxHandler} className={rightBoxStyles.join(' ')}>
                                KREDYT HIPOTECZNY
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={fadeStyle}
                    onMouseOver={this.divFadeOn}
                    onMouseLeave={this.divFadeOut}
                >
                    <h3 className={styles.H3Details}>Wybankuj, a zyskasz:</h3>
                    <div className={styles.DivDetailsUl}>
                        <ul>
                            <li className={styles.LiStyle}>Bezpłatne porównanie ofert kredytowych dostępnych na rynku</li>
                            <br/>
                            <li className={styles.LiStyle}>Wszystkie banki w jednym miejscu</li>
                            <br/>
                            <li className={styles.LiStyle}>Brak nachalnych telefonów! Ty wybierasz bank i sam się z nim kontaktujesz</li>
                            <br/>
                            <li className={styles.LiStyle}>Brak pośredników wybierających za Ciebie - to Ty tu rządzisz</li>
                            <br/>
                            <li className={styles.LiStyle}>Komfort, wygoda, spokój</li>
                        </ul>
                    </div>
                    <h4 className={styles.H3Details}>Sprawdź, jakie to proste!</h4>
                </div>

                <div className={styles.DivImageHome}>
                    <div className={styles.DivInnerImage}>
                        <p className={styles.PInnerImage}>
                           Kilkunastoletnie doświadczenie na rynku finansowym zdobyte w różnych podmiotach - banki,
                           pośrednictwa kredytowe, agencje ubezpieczeniowe - zaowocowało stworzeniem uniwersalnego
                           narzędzia dla każdego klienta. Od teraz to Klient decyduje, którą ofertę wybrać ze
                           wszystkich
                           dostępnych na rynku. Brak ukrytych kosztów, wszystko przedstawione transparentnie i zgodnie z
                           Twoimi oczekiwaniami.
                        </p>
                    </div>
                </div>

                <div
                    className={styles.DivPointsAboutUs}
                    onMouseOver={this.divAboutUsShow}
                >
                    <div className={divAboutUsLeftStyle}>
                        <p className={styles.PAboutUsTitle}>
                            Sprzedane kredyty gotówkowe
                        </p>
                        <p className={styles.PAboutUsValue}>
                            77 mln zł
                        </p>
                    </div>
                    <div className={divAboutUsCenterStyle}>
                        <p className={styles.PAboutUsTitle}>
                            Sprzedane kredyty hipoteczne
                        </p>
                        <p className={styles.PAboutUsValue}>
                            64 mln zł
                        </p>
                    </div>
                    <div className={divAboutUsRightStyle}>
                        <p className={styles.PAboutUsTitle}>
                            Doświadczenie w branży finansowej
                        </p>
                        <p className={styles.PAboutUsValue}>
                            14 lat
                        </p>
                    </div>
                </div>

                <div className={styles.DivImageHome2}>
                    <p className={styles.PHappyCustomers}>
                        Dołącz do grona zadowolonych klientów
                    </p>
                </div>

                <Footer />
            </div>
        );
    }
}

export default Home;