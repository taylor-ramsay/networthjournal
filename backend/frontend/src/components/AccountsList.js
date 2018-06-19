import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash'

class AccountsList extends Component {

    render() {
        let assetValues = []
        let liabilityValues = []
        let accounts = this.props.accounts
        let accountsJSX = accounts.map((account, i) => {
            if (account.type === "Asset") {
                assetValues.push(account.balance)
            }
            else if (account.type === "Liability") {
                liabilityValues.push(account.balance)
            }
            return (
                <li className="collection-item">{account.name}<Link to="/edit-account" className="secondary-content" className="edit-link" onClick={() => { this.props.editButtonHandler(account.accountId, account.date) }}>edit</Link><span className={account.type === 'Asset' ? 'asset' + " secondary-content valign-wrapper" : 'liability' + " secondary-content valign-wrapper"}><span className="account-value">${account.balance}.00</span><a onClick={() => { this.props.handleDeleteAccount(account.accountId) }} style={{ cursor: 'pointer' }}><i class="material-icons tiny right-align">clear</i></a></span></li>
            )
        })
        let assetValuesTotal = assetValues.reduce(function (acc, val) { return acc + val; }, 0);
        let liabilityValuesTotal = liabilityValues.reduce(function (acc, val) { return acc + val; }, 0);
        let netWorthTotal = assetValuesTotal - liabilityValuesTotal

        return (
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h3>Accounts</h3><Link className="add-link" to="/add-account" onClick={() => { this.props.addButtonHandler() }}>Add Account</Link><br /></li>
                    {accountsJSX}
                    <li className="collection-item"><div><b>Current Net Worth</b><span className={netWorthTotal === 0 ? 'secondary-content networth-value' : netWorthTotal >0 ? "asset secondary-content networth-value": "liability secondary-content networth-value"}>${netWorthTotal}.00</span></div></li>
                </ul>
            </div>
        );
    }
}

export default AccountsList;
