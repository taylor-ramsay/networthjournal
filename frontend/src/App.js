import React, { Component } from 'react'
import './App.css'
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import moment from 'moment'
import AddAccountForm from './components/AddAccountForm'
import AccountForm from './components/AccountForm'
import AccountsList from './components/AccountsList'
import AccountChart from './components/AccountChart'
import NetWorthChart from './components/NetWorthChart'
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
        date: moment().format("MMM YYYY"),
        timeStamp: moment(),
        accountId: uniqid()
      },
      accounts: [{
        _id: null,
        balance: 0,
        name: "",
        type: "",
        subType: "",
        date: moment().format("MMM YYYY"),
        valuations: [],
        timeStamp: moment(),
        accountId: uniqid(),
      }],
      valuations: [{
        newBalance: 0,
        newDate: "",
        timeStamp: "",
        valuationId: ""
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
        this.setState({
          accounts: result.data
        })
      })
      .then(result => {
        axios.get('http://localhost:8080/get-valuations')
          .then(result => {
            this.setState({
              valuations: result.data
            })
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
        date: moment().format("MMM YYYY"),
        timeStamp: moment().format("MMM YYYY"),
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
        date: moment(document.getElementById('date').value).format("MMM YYYY"),
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
    let newValuation = {
      accountId: this.state.currentAccount.accountId,
      newBalance: this.state.currentAccount.balance,
      newDate: this.state.currentAccount.date,
      timeStamp: this.state.currentAccount.timeStamp,
      valuationId: uniqid()
    }
    if (urlLocation === "/add-account") {
      axios.post('http://localhost:8080/add-account', formSubmissionValues)
        .then(result => {
          axios.put('http://localhost:8080/add-valuation', newValuation)
        })
        .then(result => {
          axios.get('http://localhost:8080/get-accounts')
            .then(result => {
              let accountsFromServer = result.data
              this.setState({
                accounts: accountsFromServer,
                valuations: newValuation
              })
            })
        })
        .catch(error => {
          console.log(error)
        })
    }
    else if (urlLocation === "/edit-account") {

      let accounts = this.state.accounts
      let valuations = this.state.valuations
      //Push valuations arrays into accounts objects as valuationAmounts
      for (let i = 0; i < accounts.length; i++) {
        let newVal = accounts[i].valuationAmounts = []
        for (let j = 0; j < accounts[i].valuations.length; j++) {
          for (let k = 0; k < valuations.length; k++) {
            if (accounts[i].valuations[j] === valuations[k]._id) {
              accounts[i].valuationAmounts.push(valuations[k])
            }
          }
        }
      }

      ///DELETE BELOW ONCE NETWORTH CHART IS COMPLETED
      //Check to see when the last valuation was and if the valuation 1 month away or more add a valuation for the gap month(s)
      let thisValuation = this.state.currentAccount.date
      let allValuationDates = []
      for (let i = 0; i < accounts.length; i++) {
        console.log(accounts[i].accountId)
        console.log(this.state.currentAccount.accountId)
        if(accounts[i].accountId === this.state.currentAccount.accountId)
        for(let j=0; j<accounts[i].valuationAmounts.length; j++){
          console.log(accounts[i])
          allValuationDates.push(accounts[i].valuationAmounts[j])
        }
      }
      let sortedValuationDates = allValuationDates.sort()
      let lastValuationDate = sortedValuationDates[sortedValuationDates.length-1]
      let ld = moment(lastValuationDate)
      let td = moment(thisValuation)
      let diff = td.diff(ld, 'months')
      console.log(allValuationDates)
      console.log(ld)
      console.log(td)
      console.log(diff)

      let updatePastValuations = []
      if (diff > 0) {
        for (let i = 1; i < diff; i++) {
          var PastValuationsObj = {
            accountId: this.state.currentAccount.accountId,
            newBalance: this.state.currentAccount.balance,
            newDate: moment(this.state.currentAccount.date).subtract(i, 'months').format('MM/YYYY'),
            timeStamp: this.state.currentAccount.timeStamp,
            valuationId: uniqid()
          }
          updatePastValuations.push(PastValuationsObj)
          console.log(updatePastValuations)
        }
      }
   ///////////////////////////////////

      let dbAccount = this.state.accounts.find((el) => {
        return el.accountId === this.state.currentAccount.accountId
      })
      let currentAccountMonthYear = moment(this.state.currentAccount.date).format('MMM YYYY')
      let dbAccountMonthYear = moment(dbAccount.date).format('MMM YYYY')
      if (currentAccountMonthYear !== dbAccountMonthYear) {
        console.log("else")
        console.log(updatePastValuations)
        axios.put('http://localhost:8080/add-valuation', newValuation)
          .then(result => {
            axios.get('http://localhost:8080/get-accounts')
              .then(result => {
                this.setState({
                  accounts: result.data
                })
              })
          })
          .catch(error => {
            console.log(error)
          })
      }
      else {
        axios.put('http://localhost:8080/edit-account/' + this.state.currentAccount.accountId, formSubmissionValues)
          .then(result => {
            axios.get('http://localhost:8080/get-accounts')
              .then(result => {
                let accountsFromServer = result.data
                this.setState({
                  accounts: accountsFromServer
                })
              })
              .then(result => {
                axios.get('http://localhost:8080/get-valuations')
                  .then(result => {
                    this.setState({
                      valuations: result.data
                    })
                  })
              })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <div className="row">
            <div className="col s8">
              <Route path="/" render={() => { return <AccountsList accounts={this.state.accounts} editButtonHandler={this.editButtonHandler} addButtonHandler={this.addButtonHandler} /> }} />
              <Route path="/" render={() => { return <AccountChart accounts={this.state.accounts} valuations={this.state.valuations} /> }} />
              <Route path="/" render={() => { return <NetWorthChart accounts={this.state.accounts} valuations={this.state.valuations} /> }} />
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