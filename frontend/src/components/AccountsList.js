import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AccountsList extends Component {

    render() {
        let accounts = this.props.accounts
        let accountsJSX = accounts.map((account, i) => {
            return (
                <li className="collection-item"><div>{account.name} <a className="secondary-content" onClick={()=>{this.props.editButtonHandler(account._id)}}><Link to="/edit-account">edit</Link></a><span className="secondary-content">{account.balance}</span></div></li>
            )
        })
        return (
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Accounts</h4><a href="/add-account">add account</a></li>
                    {accountsJSX}
                </ul>
            </div>
        );
    }
}

export default AccountsList;
