import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Header.module.css';

class Header extends Component {

    render() {

        const logo = require('../img/logo.png');

        return(
            <div className={styles.DivHeader}>
                <nav className={'navbar navbar-expand-sm bg-light navbar-light'}>

                    <a className={'navbar-brand'} href={'/'}>
                        <img src={logo} alt="Wybankuj.pl" className={styles.ImgHeader} />
                    </a>

                    <a className={styles.NavLinkHeader} href={'/loanParameters'}>Kredyty Gotówkowe</a>
                    <a className={styles.NavLinkHeader} href={'/mortgageParameters'}>Kredyty Hipoteczne</a>
                    <a className={styles.NavLinkHeader} href="javascript:void();" onClick="scrollToTop('#about');">O nas</a>
                    <a className={styles.NavLinkHeader} href="javascript:void();"
                       onClick="scrollToTop('#contact');">Kontakt</a>

                </nav>
            </div>
        );
    }
}

export default Header;