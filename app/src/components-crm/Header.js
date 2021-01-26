import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Header.module.css";

class Header extends Component {

    render() {

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
                            <a className={'nav-link'} href={'/logout'}>Wyloguj</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;
