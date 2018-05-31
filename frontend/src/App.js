import React, { Component } from 'react'
import './App.css'
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import moment from 'moment'
import AddAccountForm from './components/AddAccountForm'
import AccountForm from './components/AccountForm'
import AccountsList from './components/AccountsList'
import axios from 'axios'

class App extends Component {

  constructor() {
    super()
    this.state = {
      currentAccount: {
        _id: null,
        balance: 0,
        name: "",
        type: "",
        subType: "",
        date: moment().format("MMM DD, YYYY"),
        timeStamp: moment().format("MMM DD, YYYY")
      },
      accounts: [{
        _id: null,
        balance: 0,
        name: "",
        type: "",
        subType: "",
        date: moment().format("MMM DD, YYYY"),
        timeStamp: moment().format("MMM DD, YYYY")
      }],
      monthlyJournal: [{
        entry: "",
        date: moment().format("MMM DD, YYYY"),
        timeStamp: ""
      }]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/get-accounts')
      .then(result => {
        let accountsFromServer = result.data
        this.setState({
          accounts: accountsFromServer
        })
      })
  }

  editButtonHandler = (id) => {
    let accountFound = this.state.accounts.find((el) => {
      return el._id === id
    })
    this.setState({
      currentAccount: accountFound
    })
  }

  handleNameChange = (e) => {
    this.setState({ currentAccount: { name: e.target.value } })
  }

  handleBalanceChange = (e) => {
    this.setState({ currentAccount: { balance: e.target.value } })
  }

  handleTypeChange = (e) => {
    this.setState({ currentAccount: { type: e.target.value } })
  }

  handleSubtypeChange = (e) => {
    this.setState({ currentAccount: { subtype: e.target.value } })
  }

  handleDateChange = (e) => {
    this.setState({ currentAccount: { date: document.getElementById('date').value } })
  }

  handleSubmit = (e, urlLocation) => {
    e.preventDefault()
    let formSubmissionValues = {
      type: this.state.type,
      subType: this.state.subtype,
      name: this.state.name,
      balance: this.state.value,
      date: this.state.date,
      timeStamp: this.state.timeStamp
    }
    if (urlLocation === "/add-account") {
      axios.post('http://localhost:8080/add-account', formSubmissionValues)
        .then(result => {
        })
        .catch(error => {
          console.log(error)
        })
    }
    else {
      console.log("else")
    }
  }

  render() {
    // console.log(({ location }) => (this.props.location))
    return (
      <div className="container">
        <Switch>
          <div className="row">
            <div className="col s8">
              <Route path="/" render={(props) => { return <AccountsList accounts={this.state.accounts} editButtonHandler={this.editButtonHandler} /> }} />

            </div>
            <div className="col s4">

              <Route path="/add-account" render={(props) => {return <AccountForm propsFromParent={props} handleSubmit={this.handleSubmit} currentAccount={this.state.currentAccount} getCurrentAccount={this.getCurrentAccount} _id={this.state.currentAccount._id} balance={this.state.currentAccount.balance} name={this.state.currentAccount.name} type={this.state.currentAccount.type} subType={this.state.currentAccount.subType} date={this.state.currentAccount.date} timeStamp={this.state.currentAccount.timeStamp} handleNameChange={this.handleNameChange} handleBalanceChange={this.handleBalanceChange} handleTypeChange={this.handleTypeChange} handleSubtypeChange={this.handleSubtypeChange} handleDateChange={this.handleDateChange} /> }} />
              <Route path="/edit-account" render={(props) => { return <AccountForm propsFromParent={props} handleSubmit={this.handleSubmit} currentAccount={this.state.currentAccount} getCurrentAccount={this.getCurrentAccount} _id={this.state.currentAccount._id} balance={this.state.currentAccount.balance} name={this.state.currentAccount.name} type={this.state.currentAccount.type} subType={this.state.currentAccount.subType} date={this.state.currentAccount.date} timeStamp={this.state.currentAccount.timeStamp} handleNameChange={this.handleNameChange} handleBalanceChange={this.handleBalanceChange} handleTypeChange={this.handleTypeChange} handleSubtypeChange={this.handleSubtypeChange} handleDateChange={this.handleDateChange} /> }} />

            </div>
          </div>
        </Switch>
      </div>
    );
  }
}

export default App;
