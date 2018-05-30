import React, { Component } from 'react'
import './App.css'
import AccountsForm from './components/AccountsForm'
import moment from 'moment'

class App extends Component {

  constructor(){
    super()
    this.state = {
      currentAccount: "",
      account: [{
        id: null,
        balance: 0,
        name: "",
        type: "",
        subType: "",
        date: moment(),
        timeStamp: moment()
      }],
      monthlyJournal: [{
        entry: "",
        date: moment(),
        timeStamp: ""
      }]
    }
  }

  render() {
    return (
      <div className="App">
        <AccountsForm accountId ={this.state.account[0].id} balance={this.state.account[0].balance} name={this.state.account[0].name} type={this.state.account[0].type} subType={this.state.account[0].subType} date={this.state.account[0].date} />
      </div>
    );
  }
}

export default App;
