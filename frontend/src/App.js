import React, { Component } from 'react'
import './App.css'
import { Switch, Link, Route } from 'react-router-dom'
import moment from 'moment'
import AddAccountForm from './components/AddAccountForm'
import EditAccountForm from './components/EditAccountForm'
import AccountsList from './components/AccountsList'
import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentAccount: "test",
      accounts: [{
        _id: null,
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

  componentDidMount() {
    axios.get('http://localhost:8080/get-accounts')
      .then(result => {
        let accountsFromServer = result.data
        console.log(accountsFromServer)
        this.setState({
          accounts: accountsFromServer
        })
      })
  }

  editButtonHandler = (id) => {
    this.setState({
      currentAccount: id
    })
  }

  getCurrentAccount = () => {
    console.log(this.state.currentAccount)
    let accountFound = this.state.accounts.find((el)=>{
      return el._id === this.state.currentAccount 
    })
    console.log(accountFound)
  }

  render() {
    return (
      <div className="container">
      <Switch>
        <div className="row">
          <div className="col s8">
          <Route path="/" render={()=>{return <AccountsList accounts={this.state.accounts} editButtonHandler={this.editButtonHandler} />}} />
            
          </div>
          <div className="col s4">
            
              <Route path="/add-account" render={() => { return <AddAccountForm /> }} />
              <Route path="/edit-account" render={() => { return <EditAccountForm currentAccount={this.state.currentAccount} getCurrentAccount={this.getCurrentAccount} /> }} />
            
          </div>
        </div>
        </Switch>
      </div>
    );
  }
}

export default App;
