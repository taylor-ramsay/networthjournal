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
        newDate: moment().format("MMM YYYY"),
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
          monthlyJournal: getJour.data
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
        accountId: this.state.currentAccount.accountId
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
        newDate: moment(e.target.value).format("MMM YYYY"),
        timeStamp: moment(),
        valuationId: uniqid(),
        accountId: this.state.currentAccount.accountId
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
  editValuation = (currentAccountId, newValuation) => {
    console.log(currentAccountId)
    console.log(newValuation)
    return axios.put('http://localhost:8080/edit-valuation/' + currentAccountId, newValuation);
  }
  editAccount = (currentAccountId, formSubmissionValues) => {
    return axios.put('http://localhost:8080/edit-account/' + currentAccountId, formSubmissionValues);
  }
  deleteAccount = (currentAccountId) => {
    return axios.delete('http://localhost:8080/delete-account/' + currentAccountId);
  }
  deleteValuation = (currentAccountId) => {
    return axios.delete('http://localhost:8080/delete-valuations/' + currentAccountId);
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
                currentAccount: {
                  _id: null,
                  balance: 0,
                  name: null,
                  type: "",
                  subType: "",
                  date: moment().format("MMM YYYY"),
                  timeStamp: moment(),
                  accountId: uniqid()
                }
              }, window.removeSelected())
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
      let dbValuation = this.state.valuations.find((el) => {
        return el.accountId === this.state.currentAccount.accountId
      })

      //Check to see if valuation exists for a given account on a given date
      let doesValExist = (accountId, date) => {
        var valFound = false;
        for (let i = 0; i < this.state.valuations.length; i++) {
          if (moment(this.state.valuations[i].newDate).format("MMM YYYY") === date && this.state.valuations[i].accountId === accountId) {
            valFound = true;
            break;
          }
        }
        return(valFound ? true : false)
      }

      let currentAccountMonthYear = moment(this.state.currentAccount.date).format('MMYYYY')
      let currentAccountAccountId = this.state.currentAccount.accountId
      let dbAccountMonthYear = moment(dbAccount.date).format('MMYYYY')
      let dbAccountAccountId = dbAccount.accountId
      let currentValuationAccountID = this.state.currentValuation.accountId
      let dbValuationAccountID = dbValuation.accountId
      console.log(currentAccountMonthYear)
      console.log(dbAccountMonthYear)
      console.log(currentValuationAccountID)
      console.log(dbValuationAccountID)
      if (Number(currentAccountMonthYear) > Number(dbAccountMonthYear) && currentAccountAccountId === dbAccountAccountId && currentValuationAccountID === dbValuationAccountID) {
        console.log("greater than!!!")
        axios.all([this.editAccount(this.state.currentAccount.accountId, formSubmissionValues), this.addValuation(newValuation)])
          .then(axios.spread((editAcc, addVal) => {
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
      else if (Number(currentAccountMonthYear) < Number(dbAccountMonthYear) && currentAccountAccountId === dbAccountAccountId && currentValuationAccountID === dbValuationAccountID) {
        console.log("less than")
        //If valuation does exist then edit valuation
        if (doesValExist(this.state.currentAccount.accountId, this.state.currentAccount.date)) {
          console.log(doesValExist(this.state.currentAccount.accountId, this.state.currentAccount.date))
          this.editValuation(this.state.currentValuation.accountId, newValuation)
            .then(result => {
              axios.all([this.getAccounts(), this.getValuations(), this.getJournals()])
                .then(axios.spread((getAcc, getVal, getJour) => {
                  this.setState({
                    accounts: getAcc.data,
                    valuations: getVal.data,
                    monthlyJournal: getJour.data
                  })
                }))
            })
            .catch(error => {
              console.log(error)
            })
        }
        //If valuation doesn't extist then add valuation
        else {
          console.log(doesValExist(this.state.currentAccount.accountId, this.state.currentAccount.date))
          this.addValuation(newValuation)
            .then(result => {
              axios.all([this.getAccounts(), this.getValuations(), this.getJournals()])
                .then(axios.spread((getAcc, getVal, getJour) => {
                  this.setState({
                    accounts: getAcc.data,
                    valuations: getVal.data,
                    monthlyJournal: getJour.data
                  })
                }))
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
      else if (Number(currentAccountMonthYear) === Number(dbAccountMonthYear) && currentAccountAccountId === dbAccountAccountId && currentValuationAccountID === dbValuationAccountID && this.state.valuations[this.state.valuations.length - 1]) {
        console.log("equal to!!!")
        console.log(this.state.currentAccount.date)
        axios.all([this.editAccount(this.state.currentAccount.accountId, formSubmissionValues, this.editValuation(this.state.currentValuation.accountId, newValuation))])
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

  handleDeleteAccount = (accountId) => {
    axios.all([this.deleteAccount(accountId), this.deleteValuation(accountId)])
      .then(axios.spread((delAcc, delVal) => {
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
    console.log(this.state.valuations)
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">Networth Journal</a>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <div className="row">
              <div className="col s8">
                <Route path="/" render={() => { return <AccountsList accounts={this.state.accounts} editButtonHandler={this.editButtonHandler} addButtonHandler={this.addButtonHandler} handleDeleteAccount={this.handleDeleteAccount} /> }} />
                <div class="button-box">
                  <button className="waves-effect waves-light btn-small" onClick={this.handleNetWorthChart}>NetWorth Chart</button>
                  <button className="waves-effect waves-light btn-small" onClick={this.handleAccountChart}>Accounts Chart</button>
                </div>
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