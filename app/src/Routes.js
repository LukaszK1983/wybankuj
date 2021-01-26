import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Home from "./components/Home";
import LoanParameters from "./components/LoanParameters";
import CalculateLoan from "./components/CalculateLoan";
import LoanDetails from "./components/LoanDetails";
import LoanAgencyContactForm from "./components/LoanAgencyContactForm";
import LoanAgencyContactFormSend from "./components/LoanAgencyContactFormSend";
import MortgageParameters from "./components/MortgageParameters";
import CalculateMortgage from "./components/CalculateMortgage";
import MortgageDetails from "./components/MortgageDetails";
import MortgageAgencyContactForm from "./components/MortgageAgencyContactForm";
import MortgageAgencyContactFormSend from "./components/MortgageAgencyContactFormSend";

import BanksList from './components-crm/BanksList';
import AddBank from './components-crm/AddBank';
import EditBank from './components-crm/EditBank';
import AgencyList from "./components-crm/AgencyList";
import AddAgency from "./components-crm/AddAgency";
import EditAgency from "./components-crm/EditAgency";
import LoanList from "./components-crm/LoanList";
import AddLoan from "./components-crm/AddLoan";
import EditLoan from "./components-crm/EditLoan";
import MortgageList from "./components-crm/MortgageList";
import AddMortgage from "./components-crm/AddMortgage";
import EditMortgage from "./components-crm/EditMortgage";

export default class Routes extends Component{
    render() {
        return(
            <div>
                <Route exact path={"/"} component={Home}/>
                <Route exact path={"/loanParameters"} component={LoanParameters}/>
                <Route exact path={"/calculateLoan/:amount/:creditPeriod/:age/:chooseServiceCharge/:chooseInsurance"}
                       component={CalculateLoan}/>
                <Route exact path={"/loanDetails/:loanId/:amount/:creditPeriod/:age/:chooseServiceCharge/:chooseInsurance"} component={LoanDetails}/>
                <Route exact path={"/loanAgencyContactForm/:bankId/:offer/:amount/:creditPeriod/:age/:chooseServiceCharge/:chooseInsurance"} component={LoanAgencyContactForm}/>
                <Route exact path={"/loanAgencyContactFormSend/:bankId/:offer/:amount/:creditPeriod/:age/:chooseServiceCharge/:chooseInsurance/:name/:email/:phone"} component={LoanAgencyContactFormSend}/>
                <Route exact path={"/mortgageParameters"} component={MortgageParameters}/>
                <Route exact path={"/calculateMortgage/:amount/:creditPeriod/:age/:chooseServiceCharge/:chooseInsurance/:contributionPercent/:cost"}
                           component={CalculateMortgage}/>
                <Route exact path={"/mortgageDetails/:mortgageId/:amount/:creditPeriod/:age/:chooseServiceCharge/:chooseInsurance/:contributionPercent/:cost"} component={MortgageDetails}/>
                <Route exact path={"/mortgageAgencyContactForm/:bankId/:offer/:amount/:creditPeriod/:age/:chooseServiceCharge/:chooseInsurance/:contributionPercent/:cost"} component={MortgageAgencyContactForm}/>
                <Route exact path={"/mortgageAgencyContactFormSend/:bankId/:offer/:amount/:creditPeriod/:age/:chooseServiceCharge/:chooseInsurance/:contributionPercent/:cost/:name/:email/:phone"} component={MortgageAgencyContactFormSend}/>

                <Route exact path={"/bank"} component={BanksList}/>
                <Route exact path="/bank/add" component={AddBank}/>
                <Route exact path="/bank/:id" component={EditBank}/>
                <Route exact path={"/agencies/:bankId"} component={AgencyList}/>
                <Route exact path={"/agency/add"} component={AddAgency}/>
                <Route exact path={"/agency/:id"} component={EditAgency}/>
                <Route exact path={"/loans/:bankId"} component={LoanList}/>
                <Route exact path={"/loan/add"} component={AddLoan}/>
                <Route exact path={"/loan/:id"} component={EditLoan}/>
                <Route exact path={"/mortgages/:bankId"} component={MortgageList}/>
                <Route exact path={"/mortgage/add"} component={AddMortgage}/>
                <Route exact path={"/mortgage/:id"} component={EditMortgage}/>
            </div>
        )
    }
}