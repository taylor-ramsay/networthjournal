import React, { Component } from 'react';

class AccountsForm extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <select>
                                    <option value disabled selected>Choose your option</option>
                                    <option value={1}>Asset</option>
                                    <option value={2}>Liability</option>
                                </select>
                                <label>Asset or Liability?</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select>
                                    <option value disabled selected>Choose your option</option>
                                    <option value={1}>Credit Card</option>
                                    <option value={2}>Loan</option>
                                    <option value={3}>Mortgage</option>
                                    <option value={4}>Investment</option>
                                    <option value={5}>Real Estate</option>
                                    <option value={6}>Business</option>
                                    <option value={7}>Other</option>
                                </select>
                                <label>Select Category</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Enter name" id="account_name" type="text" className="validate" />
                                <label htmlFor="account_name">Name of Account</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" id="date" className="datepicker" />
                                <label htmlFor="date">Date</label>
                            </div>
                        </div>
                        <a className="waves-effect waves-light btn-large">Save</a>
                    </form>
                </div>
            </div>
        );
    }
}

export default AccountsForm;