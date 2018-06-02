import React, { Component } from 'react'
import './App.css'
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import moment from 'moment'
import AddAccountForm from './components/AddAccountForm'
import AccountForm from './components/AccountForm'
import AccountsList from './components/AccountsList'
import axios from 'axios'
import uniqid from 'uniqid'

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
        timeStamp: moment(),
        accountId: uniqid(),
        valuation: {}
      },
      accounts: [{
        _id: null,
        balance: 0,
        name: "",
        type: "",
        subType: "",
        date: moment().format("MMM DD, YYYY"),
        timeStamp: moment(),
        accountId: uniqid(),
      }],
      monthlyJournal: [{
        entry: "",
        date: moment().format("MMM DD, YYYY"),
        timeStamp: moment(),
        journalId: uniqid()
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

  addButtonHandler = () => {
    this.setState({
      currentAccount: {
        _id: null,
        balance: 0,
        name: "",
        type: "",
        subType: "",
        date: moment().format("MMM DD, YYYY"),
        timeStamp: moment().format("MMM DD, YYYY"),
        accountId: uniqid()
      }
    })
  }

  handleNameChange = (e) => {
    this.setState({
      currentAccount: {
        _id: this.state.currentAccount._id,
        balance: this.state.currentAccount.balance,
        name: e.target.value,
        type: this.state.currentAccount.type,
        subType: this.state.currentAccount.subType,
        date: this.state.currentAccount.date,
        timeStamp: this.state.currentAccount.timeStamp,
        accountId: this.state.currentAccount.accountId
      }
    })
  }
  
  handleBalanceChange = (e) => {
    this.setState({
      currentAccount: {
        _id: this.state.currentAccount._id,
        balance: e.target.value,
        name: this.state.currentAccount.name,
        type: this.state.currentAccount.type,
        subType: this.state.currentAccount.subType,
        date: this.state.currentAccount.date,
        timeStamp: this.state.currentAccount.timeStamp,
        accountId: this.state.currentAccount.accountId
      }
    })
  }

  handleTypeChange = (e) => {
    this.setState({
      currentAccount: {
        _id: this.state.currentAccount._id,
        balance: this.state.currentAccount.balance,
        name: this.state.currentAccount.name,
        type: e.target.value,
        subType: this.state.currentAccount.subType,
        date: this.state.currentAccount.date,
        timeStamp: this.state.currentAccount.timeStamp,
        accountId: this.state.currentAccount.accountId
      }
    })
  }

  handleSubtypeChange = (e) => {
    this.setState({
      currentAccount: {
        _id: this.state.currentAccount._id,
        balance: this.state.currentAccount.balance,
        name: this.state.currentAccount.name,
        type: this.state.currentAccount.type,
        subType: e.target.value,
        date: this.state.currentAccount.date,
        timeStamp: this.state.currentAccount.timeStamp,
        accountId: this.state.currentAccount.accountId
      }
    })
  }

  handleDateChange = (e) => {
    this.setState({
      currentAccount: {
        _id: this.state.currentAccount._id,
        balance: this.state.currentAccount.balance,
        name: this.state.currentAccount.name,
        type: this.state.currentAccount.type,
        subType: this.state.currentAccount.subType,
        date: moment(document.getElementById('date').value).format("MMM DD, YYYY"),
        timeStamp: this.state.currentAccount.timeStamp,
        accountId: this.state.currentAccount.accountId
      }
    })
  }

  handleSubmit = (e, urlLocation) => {
    e.preventDefault()
    let formSubmissionValues = {
      type: this.state.currentAccount.type,
      subType: this.state.currentAccount.subType,
      name: this.state.currentAccount.name,
      balance: this.state.currentAccount.balance,
      date: this.state.currentAccount.date,
      timeStamp: this.state.currentAccount.timeStamp,
      accountId: this.state.currentAccount.accountId
    }
    if (urlLocation === "/add-account") {
      axios.post('http://localhost:8080/add-account', formSubmissionValues)
        .then(result => {
          axios.get('http://localhost:8080/get-accounts')
          .then(result => {
            let accountsFromServer = result.data
            this.setState({
              accounts: accountsFromServer
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
    else if(urlLocation === "/edit-account") {
      let dbAccount = this.state.accounts.find((el)=>{
        return el.accountId === this.state.currentAccount.accountId
      })
      let currentAccountMonthYear = moment(this.state.currentAccount.date).format('MMM YYYY')
      let dbAccountMonthYear = moment(dbAccount.date).format('MMM YYYY')
      if(currentAccountMonthYear === dbAccountMonthYear){
        axios.put('http://localhost:8080/edit-account/'+this.state.currentAccount.accountId, formSubmissionValues)
        .then(result=>{
          axios.get('http://localhost:8080/get-accounts')
          .then(result => {
            let accountsFromServer = result.data
            this.setState({
              accounts: accountsFromServer
            })
          })
        })
        .catch(error=>{
          console.log(error)
        })    
      }
      else{
        console.log("else")
        let newValuation = {
          accountId: this.state.currentAccount.accountId,
          newBalance: this.state.currentAccount.balance,
          newDate: this.state.currentAccount.date,
          timeStamp: this.state.currentAccount.timeStamp,
          valuationId: uniqid()
        }
        axios.put('http://localhost:8080/add-valuation', newValuation)
        .then(result=>{
          axios.get('http://localhost:8080/get-accounts')
          .then(result => {
            let accountsFromServer = result.data
            this.setState({
              accounts: accountsFromServer
            })
          })
        })
        .catch(error=>{
          console.log(error)
        })   
      }
    }  
  }

  render() {
    // console.log(({ location }) => (this.props.location))
    return (
      <div className="container">
        <Switch>
          <div className="row">
            <div className="col s8">
              <Route path="/" render={(props) => { return <AccountsList accounts={this.state.accounts} editButtonHandler={this.editButtonHandler} addButtonHandler={this.addButtonHandler} /> }} />
            </div>
            <div className="col s4">
              <Route path="/add-account" render={(props) => { return <AccountForm propsFromParent={props} handleSubmit={this.handleSubmit} currentAccount={this.state.currentAccount} getCurrentAccount={this.getCurrentAccount} _id={this.state.currentAccount._id} balance={this.state.currentAccount.balance} name={this.state.currentAccount.name} type={this.state.currentAccount.type} subType={this.state.currentAccount.subType} date={this.state.currentAccount.date} timeStamp={this.state.currentAccount.timeStamp} handleNameChange={this.handleNameChange} handleBalanceChange={this.handleBalanceChange} handleTypeChange={this.handleTypeChange} handleSubtypeChange={this.handleSubtypeChange} handleDateChange={this.handleDateChange} /> }} />
              <Route path="/edit-account" render={(props) => { return <AccountForm propsFromParent={props} handleSubmit={this.handleSubmit} currentAccount={this.state.currentAccount} getCurrentAccount={this.getCurrentAccount} _id={this.state.currentAccount._id} balance={this.state.currentAccount.balance} name={this.state.currentAccount.name} type={this.state.currentAccount.type} subType={this.state.currentAccount.subType} date={this.state.currentAccount.date} timeStamp={this.state.currentAccount.timeStamp} handleNameChange={this.handleNameChange} handleBalanceChange={this.handleBalanceChange} handleTypeChange={this.handleTypeChange} handleSubtypeChange={this.handleSubtypeChange} handleDateChange={this.handleDateChange} /> }} />
            </div>
          </div>
        </Switch>
      </div>
    );
  }
}

export default App;
