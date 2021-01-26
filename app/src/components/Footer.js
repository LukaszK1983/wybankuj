import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Footer.module.css';

const Footer = props => {

    return (
        <div className={styles.DivFooter}>
            <div className={'page-footer font-small blue pt-4'}>
                <div className={styles.ContainerFluid}>

                    <div className={styles.Row}>

                        <div className={styles.DivLeft}>

                            <h5 className={styles.TextUppercas}>Informacje</h5>
                            <p>Masz pytanie? Napisz lub zadzwoń:</p>
                            <p>Tel.: +48 796 37 33 00</p>
                            <p>E-mail: <a href="mailto:kontakt@wybankuj.pl"
                                          className={styles.aFooter}>kontakt@wybankuj.pl</a></p>
                            <br/>
                            <p className={styles.pInformation}>Wybankuj.pl jest własnością Big Bee Sp. z
                                o.o.</p>
                            <p className={styles.pInformation}>Administratorem danych osobowych jest Big Bee
                                Sp. z
                                o.o. z siedzibą w Katowicach przy ul. Św. Jana 11/4. Pani/Pana dane osobowe w postaci
                                imienia,
                                nazwiska, nr telefonu, adresu e-mail będą przetwarzane w celu marketingu bezpośredniego
                                produktów i usług własnych Administratora na podstawie prawnie uzasadnionego interesu
                                Administratora w promocji produktów własnych. Przysługuje Pani/Panu prawo sprzeciwu
                                wobec
                                przetwarzania danych. Więcej informacji na temat przetwarzania danych osobowych dostępne
                                jest w
                                w/w placówce Administratora, pod numerem telefonu: 796373300 albo pod adresem e-mail
                                biuro@bbee.pl</p>

                        </div>

                        <div className={styles.DivRight}>

                            <h5 className={styles.TextUppercas}>Odwiedź nas</h5>
                            <div className={'fb-page'} data-href="https://www.facebook.com/Wybankujpl-105932534387816/"
                                 data-tabs="timeline" data-width="" data-height="" data-small-header="true"
                                 data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="true">
                                <blockquote cite="https://www.facebook.com/Wybankujpl-105932534387816/"
                                            className={'fb-xfbml-parse-ignore'}><a
                                    href="https://www.facebook.com/Wybankujpl-105932534387816/">Wybankuj.pl</a>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;