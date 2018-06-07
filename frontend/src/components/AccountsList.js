import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AccountsList extends Component {

    render() {
        let assetValues = []
        let liabilityValues = []
        let accounts = this.props.accounts
        let accountsJSX = accounts.map((account, i) => {
            if(account.type === "Asset"){
                assetValues.push(account.balance)
            }
            else if(account.type === "Liability"){
                liabilityValues.push(account.balance)
            }
            return (
                <li className="collection-item"><div>{account.name} <a className="secondary-content" className="edit-link" onClick={() => { this.props.editButtonHandler(account.accountId, account.date) }}><Link className="edit-link" to="/edit-account">edit</Link></a><span className="secondary-content">${account.balance}.00</span></div></li>
            ) 
        })
        let assetValuesTotal = assetValues.reduce(function(acc, val) { return acc + val; }, 0);
        let liabilityValuesTotal = liabilityValues.reduce(function(acc, val) { return acc + val; }, 0);
        let netWorthTotal = assetValuesTotal-liabilityValuesTotal

        return (
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Accounts</h4><a href="/add-account" onClick={() => { this.props.addButtonHandler() }}><Link className="add-link" to="/add-account">add account</Link></a><br /><a href="/journal-entry"><Link className="add-link" to="/journal-entry">create new journal entry</Link></a></li>
                    {accountsJSX}
                    <li className="collection-item"><div><b>Current Net Worth</b><span className="secondary-content">${netWorthTotal}.00</span></div></li>
                </ul>
            </div>
        );
    }
}

export default AccountsList;
