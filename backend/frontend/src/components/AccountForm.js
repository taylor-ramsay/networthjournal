import React, { Component } from 'react';
import moment from 'moment'
import $ from 'jquery'
import { Link } from 'react-router-dom'

const display = {
    display: 'block'
  };
  const hide = {
    display: 'none'
  };

class AccountForm extends Component {

    constructor(){
        super()
        this.state = {
            toggle: false
        }
    }

    componentDidMount() {
        window.initMaterialize()
        window.$(document).ready(function() {
            window.$('.modal').modal();
        });
    }

    toggle = (event) => {
        this.setState(prevState => ({
          toggle: !prevState.toggle
        }));
    }

    render() {
        console.log(this.state.toggle)
        var modal = [];
        modal.push(
          <div className="modal" id="modal1" style={this.state.toggle ? display : hide}>
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a className="btn" onClick={this.toggle}>Agree</a>
          </div>
        </div>
        );

        let urlPath = this.props.propsFromParent.location.pathname
        console.log(this.props.date)
        console.log(this.props.name)
        return (
            <div onClick={(e)=>{this.props.handleDateChange(e)}}>
            <Link className="no-style-link" to="/"><label className="right valign-wrapper">Close<i class="material-icons">clear</i></label></Link>
            <h4>{this.props.propsFromParent.location.pathname === "/add-account" ? "Add a New Account" : "Edit Account"}</h4>
                <div className="row">
                    <form onSubmit={(e)=>{this.props.handleSubmit(e, urlPath)}} className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={this.props.name} placeholder="Enter name" id="account_name" type="text" className="validate" onChange={(e) => { this.props.handleNameChange(e) }} />
                                <label htmlFor="account_name" className="active">Name of Account</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select value={this.props.type} onChange={(e) => { this.props.handleTypeChange(e) }} ref="dropdown">
                                    <option>Choose your option</option>
                                    <option value={"Asset"}>Asset</option>
                                    <option value={"Liability"}>Liability</option>
                                </select>
                                <label className="active">Asset or Liability?</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <select value={this.props.subType} onChange={(e) => { this.props.handleSubtypeChange(e) }}>
                                    <option value={1} id="option1">Choose your option</option>
                                    <option value={"Credit Card"}>Credit Card</option>
                                    <option value={"Loan"}>Loan</option>
                                    <option value={"Cash"}>Cash</option>
                                    <option value={"Mortgage"}>Mortgage</option>
                                    <option value={"Investment"}>Investment</option>
                                    <option value={"Real Estate"}>Real Estate</option>
                                    <option value={"Business"}>Business</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                                <label className="active">Select Category</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={this.props.balance} placeholder="Enter $ value" id="account_value" type="text" className="validate" onChange={(e) => { this.props.handleBalanceChange(e) }} />
                                <label htmlFor="account_value" className="active">Value of Account</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input value={moment(this.props.date).format("MMM YYYY")} type="text" id="date" className="datepicker" />
                                <label htmlFor="date" className="active">Date</label>
                            </div>
                        </div>


                
                <div>
                    
        {/* Modal Trigger */}
        {/* <button data-target="modal1" class="btn modal-trigger" onClick={this.toggle}>Modal</button>
        {modal} */}
        {/* <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a> */}
        {/* Modal Structure */}
        {/* <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div> */}


      </div>


                        <button className="waves-effect waves-light btn-large submit-button" type="submit" value="Submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AccountForm;