import React, { Component } from 'react'
import './App.css'
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import moment from 'moment'
import AddAccountForm from './components/AddAccountForm'
import AccountForm from './components/AccountForm'
import AccountsList from './components/AccountsList'
import AccountChart from './components/AccountChart'
import NetWorthChart from './components/NetWorthChart'
import JournalEntryForm from './components/JournalEntryForm'
import JournalEntryList from './components/JournalEntryList'
import axios from 'axios'
import uniqid from 'uniqid'
import _ from 'lodash'

class App extends Component {

  constructor() {
    super()
    this.state = {
      accountChart: {
        active: false
      },
      netWorthChart: {
        active: false
      },
      currentAccount: {
        _id: "",
        balance: 0,
        name: "",
        type: "",
        subType: "",
        date: moment().format("MMM YYYY"),
        timeStamp: moment(),
        accountId: uniqid()
      },
      accounts: [{
        _id: "",
        balance: 0,
        name: "",
        type: "",
        subType: "",
        date: moment().format("MMM YYYY"),
        valuations: [],
        timeStamp: moment(),
        accountId: uniqid()
      }],
      currentValuation: {
        newBalance: "",
        newDate: "",
        timeStamp: moment(),
        valuationId: uniqid(),
        accountId: ""
      },
      valuations: [{
        newBalance: 0,
        newDate: "",
        timeStamp: "",
        valuationId: ""
      }],
      currentMonthlyJournal: {
        entry: "",
        date: moment().format("MMM YYYY"),
        timeStamp: "",
        journalId: uniqid()
      },
      monthlyJournal: [{
        entry: "",
        date: moment().format("MMM YYYY"),
        timeStamp: moment(),
        journalId: uniqid()
      }]
    }
  }

  componentDidMount() {

    axios.all([this.getAccounts(), this.getValuations(), this.getJournals()])
      .then(axios.spread((getAcc, getVal, getJour) => {
        this.setState({
          accounts: getAcc.data,
          valuations: getVal.data,
          monthlyJournal: getJour
        })
      }))
      .catch(error => {
        console.log(error)
      })
  }

  handleAccountChart = () => {
    this.setState({
      netWorthChart: {
        active: false,
      },
      accountChart: {
        active: !this.state.accountChart.active
      }
    });
  }

  handleNetWorthChart = () => {
    this.setState({
      netWorthChart: {
        active: !this.state.netWorthChart.active,
      },
      accountChart: {
        active: false
      }
    });
  }

  editButtonHandler = (accountId, accountDate) => {
    let accountFound = this.state.accounts.find((el) => {
      return el.accountId === accountId
    })
    let valuationFound = this.state.valuations.find((el) => {
      return el.accountId === accountId && el.newDate == accountDate
    })
    this.setState({
      currentAccount: accountFound,
      monthlyJournal: this.state.monthlyJournal,
      accounts: this.state.accounts,
      currentValuation: valuationFound
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
        timeStamp: moment(),
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
      },
      currentValuation: {
        newBalance: e.target.value,
        newDate: this.state.currentAccount.date,
        timeStamp: moment(),
        valuationId: uniqid(),
        accountId: this.state.currentAccount._id
      },
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
      },
      currentValuation: {
        newBalance: this.state.currentAccount.balance,
        newDate: e.target.value,
        timeStamp: moment(),
        valuationId: uniqid(),
        accountId: this.state.currentAccount._id
      }
    })
  }

  addAccount = (formSubmissionValues) => {
    return axios.post('http://localhost:8080/add-account', formSubmissionValues);
  }
  getAccounts = () => {
    return axios.get('http://localhost:8080/get-accounts');
  }
  getValuations = () => {
    return axios.get('http://localhost:8080/get-valuations');
  }
  getJournals = () => {
    return axios.get('http://localhost:8080/get-journals');
  }
  addAccount = (formSubmissionValues) => {
    return axios.post('http://localhost:8080/add-account', formSubmissionValues);
  }
  addValuation = (newValuation) => {
    return axios.post('http://localhost:8080/add-valuation', newValuation);
  }
  editValuation = (currentValuationId, newValuation) => {
    return axios.put('http://localhost:8080/edit-valuation/' + currentValuationId, newValuation);
  }
  editAccount = (currentAccountId, formSubmissionValues) => {
    return axios.put('http://localhost:8080/edit-account/' + currentAccountId, formSubmissionValues);
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
      axios.all([this.addAccount(formSubmissionValues), this.addValuation(newValuation)])
        .then(axios.spread((addAcc, addVal) => {
          axios.all([this.getAccounts(), this.getValuations(), this.getJournals()])
            .then(axios.spread((getAcc, getVal, getJour) => {
              this.setState({
                accounts: getAcc.data,
                valuations: getVal.data,
                monthlyJournal: getJour.data,
              })
            }))
        }))
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

      let dbAccount = this.state.accounts.find((el) => {
        return el.accountId === this.state.currentAccount.accountId
      })
      let currentAccountMonthYear = moment(this.state.currentAccount.date).format('MMM YYYY')
      let dbAccountMonthYear = moment(dbAccount.date).format('MMM YYYY')
      if (currentAccountMonthYear !== dbAccountMonthYear) {
        console.log("else")

        axios.all([this.editAccount(this.state.currentAccount.accountId, formSubmissionValues), this.addValuation(newValuation)])
          .then(axios.spread((addAcc, addVal) => {
            axios.all([this.getAccounts(), this.getValuations(), this.getJournals()])
              .then(axios.spread((getAcc, getVal, getJour) => {
                this.setState({
                  accounts: getAcc.data,
                  valuations: getVal.data,
                  monthlyJournal: getJour.data
                })
              }))
          }))
          .catch(error => {
            console.log(error)
          })
      }
      else {
        axios.all([this.editAccount(this.state.currentAccount.accountId, formSubmissionValues, this.editValuation(this.state.currentValuation.valuationId, newValuation))])
          .then(axios.spread((editAcc, editVal) => {
            axios.all([this.getAccounts(), this.getValuations(), this.getJournals()])
              .then(axios.spread((getAcc, getVal, getJour) => {
                this.setState({
                  accounts: getAcc.data,
                  valuations: getVal.data,
                  monthlyJournal: getJour.data
                })
              }))
          }))
          .catch(error => {
            console.log(error)
          })
      }
    }
  }

  handleJournalEntryChange = (e) => {
    this.setState({
      currentMonthlyJournal: {
        entry: e.target.value,
        date: this.state.currentMonthlyJournal.date,
        timeStamp: this.state.currentMonthlyJournal.timeStamp,
        journalId: this.state.currentMonthlyJournal.journalId
      }
    })
  }

  handleJournalEntryDateChange = (e) => {
    this.setState({
      currentMonthlyJournal: {
        entry: this.state.currentMonthlyJournal.entry,
        date: moment(document.getElementById('date').value).format("MMM YYYY"),
        timeStamp: this.state.currentMonthlyJournal.timeStamp,
        journalId: this.state.currentMonthlyJournal.journalId,
      }
    })
  }

  handleJournalSubmit = (e) => {
    e.preventDefault()
    let formSubmissionValues = {
      entry: this.state.currentMonthlyJournal.entry,
      date: this.state.currentMonthlyJournal.date,
      timeStamp: this.state.currentMonthlyJournal.timeStamp,
      journalId: this.state.currentMonthlyJournal.journalId
    }
    axios.post('http://localhost:8080/add-journal-entry', formSubmissionValues)
      .then(result => {
        axios.get('http://localhost:8080/get-journals')
          .then(result => {
            let journalsFromServer = result.data
            this.setState({
              monthlyJournal: journalsFromServer,
            })
          })
      })
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">Networth Journal</a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html">Sass</a></li>
              <li><a href="badges.html">Components</a></li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <div className="row">
              <div className="col s8">
                <Route path="/" render={() => { return <AccountsList accounts={this.state.accounts} editButtonHandler={this.editButtonHandler} addButtonHandler={this.addButtonHandler} /> }} />
        <button className="waves-effect waves-light btn-small" onClick={this.handleAccountChart}>Accounts Chart</button>
        <button className="waves-effect waves-light btn-small" onClick={this.handleNetWorthChart}>NetWorth Chart</button>
                {this.state.accountChart.active && <Route path="/" render={() => { return <AccountChart accounts={this.state.accounts} valuations={this.state.valuations} /> }} />}
                {this.state.netWorthChart.active && <Route path="/" render={() => { return <NetWorthChart accounts={this.state.accounts} valuations={this.state.valuations} /> }} />}
                <Route path="/" render={() => { return <JournalEntryList monthlyJournal={this.state.monthlyJournal} accounts={this.state.accounts} valuations={this.state.valuations} /> }} />
              </div>
              <div className="col s4">
                <Route path="/add-account" render={(props) => { return <AccountForm propsFromParent={props} handleSubmit={this.handleSubmit} currentAccount={this.state.currentAccount} getCurrentAccount={this.getCurrentAccount} _id={this.state.currentAccount._id} balance={this.state.currentAccount.balance} name={this.state.currentAccount.name} type={this.state.currentAccount.type} subType={this.state.currentAccount.subType} date={this.state.currentAccount.date} timeStamp={this.state.currentAccount.timeStamp} handleNameChange={this.handleNameChange} handleBalanceChange={this.handleBalanceChange} handleTypeChange={this.handleTypeChange} handleSubtypeChange={this.handleSubtypeChange} handleDateChange={this.handleDateChange} /> }} />
                <Route path="/edit-account" render={(props) => { return <AccountForm propsFromParent={props} handleSubmit={this.handleSubmit} currentAccount={this.state.currentAccount} getCurrentAccount={this.getCurrentAccount} _id={this.state.currentAccount._id} balance={this.state.currentAccount.balance} name={this.state.currentAccount.name} type={this.state.currentAccount.type} subType={this.state.currentAccount.subType} date={this.state.currentAccount.date} timeStamp={this.state.currentAccount.timeStamp} handleNameChange={this.handleNameChange} handleBalanceChange={this.handleBalanceChange} handleTypeChange={this.handleTypeChange} handleSubtypeChange={this.handleSubtypeChange} handleDateChange={this.handleDateChange} /> }} />
                <Route path="/journal-entry" render={() => { return <JournalEntryForm handleJournalSubmit={this.handleJournalSubmit} handleJournalEntryChange={this.handleJournalEntryChange} handleJournalEntryDateChange={this.handleJournalEntryDateChange} date={this.state.currentMonthlyJournal.date} entry={this.state.currentMonthlyJournal.entry} /> }} />
              </div>
            </div>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;