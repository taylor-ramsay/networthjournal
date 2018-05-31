import React, { Component } from 'react';
import moment from 'moment'

class AccountForm extends Component {

    render() {
        let urlPath = this.props.propsFromParent.location.pathname
        return (
            <div onClick={(e)=>{this.props.handleDateChange(e)}}>
                <div className="row">
                    <form onSubmit={(e)=>{this.props.handleSubmit(e, urlPath)}} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={this.props.name} placeholder="Enter name" id="account_name" type="text" className="validate" onChange={(e) => { this.props.handleNameChange(e) }} />
                                <label htmlFor="account_name">Name of Account</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select value={this.props.type} onChange={(e) => { this.props.handleTypeChange(e) }} ref="dropdown">
                                    <option>Choose your option</option>
                                    <option value={"Asset"}>Asset</option>
                                    <option value={"Liability"}>Liability</option>
                                </select>
                                <label>Asset or Liability?</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select value={this.props.subType} onChange={(e) => { this.props.handleSubtypeChange(e) }}>
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
                                <input value={this.props.balance} placeholder="Enter $ value" id="account_value" type="text" className="validate" onChange={(e) => { this.props.handleBalanceChange(e) }} />
                                <label htmlFor="account_value">Value of Account</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={moment(this.props.date).format("MMM DD, YYYY")} type="text" id="date" className="datepicker" />
                                <label htmlFor="date">Date</label>
                            </div>
                        </div>
                        <button className="waves-effect waves-light btn-large" type="submit" value="Submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AccountForm;