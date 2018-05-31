import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AccountsList extends Component {

    render() {
        let accounts = this.props.accounts
        let accountsJSX = accounts.map((account, i) => {
            return (
                <li className="collection-item"><div>{account.name} <a className="secondary-content" onClick={()=>{this.props.editButtonHandler(account._id)}}><Link className="edit-link" to="/edit-account">edit</Link></a><span className="secondary-content">{account.balance}</span></div></li>
            )
        })
        return (
            <div>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Accounts</h4><a href="/add-account"><Link className="add-link" to="/add-account">add account</Link></a></li>
                    {accountsJSX}
                </ul>
            </div>
        );
    }
}

export default AccountsList;
