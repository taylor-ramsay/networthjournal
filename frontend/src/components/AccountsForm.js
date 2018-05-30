import React, { Component } from 'react';
import moment from 'moment'

class AccountsForm extends Component {

    constructor(){
        super()
        this.state = {
            type: "",
            subtype: "",
            name: "",
            value: 0,
            date: ""
        }
    }

    handleTypeChange = (e) => {
        this.setState({type: e.target.value})
    }

    handleSubtypeChange = (e) => {
        this.setState({subtype: e.target.value})
    }

    handleNameChange = (e) => {
        this.setState({name: e.target.value})
    }

    handleValueChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleDateChange = (e) => {
        this.setState({date:document.getElementById('date').value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.type)
        console.log(this.state.subtype)
        console.log(this.state.name)
        console.log(this.state.value)
        console.log(this.state.date)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <select value={this.state.type} onChange={this.handleTypeChange}>
                                    <option>Choose your option</option>
                                    <option value={"Asset"}>Asset</option>
                                    <option value={"Liability"}>Liability</option>
                                </select>
                                <label>Asset or Liability?</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select value={this.state.subtype} onChange={this.handleSubtypeChange}>
                                    <option>Choose your option</option>
                                    <option value={"Credit Card"}>Credit Card</option>
                                    <option value={"Loan"}>Loan</option>
                                    <option value={"Mortgage"}>Mortgage</option>
                                    <option value={"Investment"}>Investment</option>
                                    <option value={"Real Estate"}>Real Estate</option>
                                    <option value={"Business"}>Business</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                                <label>Select Category</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={this.state.name} placeholder="Enter name" id="account_name" type="text" className="validate" onChange={this.handleNameChange} />
                                <label htmlFor="account_name">Name of Account</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={this.state.value} placeholder="Enter $ value" id="account_value" type="text" className="validate" onChange={this.handleValueChange} />
                                <label htmlFor="account_value">Value of Account</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={this.state.date} type="text" id="date" className="datepicker" />
                                <label htmlFor="date">Date</label>
                            </div>
                        </div>
                        <button className="waves-effect waves-light btn-large" type="submit" value="Submit" onClick={this.handleDateChange}>Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AccountsForm;