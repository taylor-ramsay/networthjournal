import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'
import { Link } from 'react-router-dom'

class JournalEntryList extends Component {

    render() {

        console.log(this.props)

        //Defining props
        let monthlyJournal = this.props.monthlyJournal
        let accounts = this.props.accounts
        let valuations = this.props.valuations

        let netWorthByMonth = []
        let labelArr = []
        let datasetArr = []
        let dateArr = []
        let dateArrPlot = []

        //Push ALL valuation dates into an array
        for (let i = 0; i < accounts.length; i++) {
            for (let j = 0; j < accounts[i].valuations.length; j++) {
                var dates = accounts[i].valuations[j].newDate
                dateArr.push(dates)
            }
        }

        //Find the earliest date and the last date and create an array of months within that range for x-axis
        if (dateArr.length) {
            let sortedDates = dateArr.sort()
            let earliestDate = sortedDates[0]
            let latestDate = sortedDates[sortedDates.length - 1]
            let ld = moment(latestDate)
            let ed = moment(earliestDate)
            let diffInMonths = ld.diff(ed, 'months');
            for (let i = 0; i < diffInMonths + 1; i++) {
                labelArr.push(moment(earliestDate).add(i, 'months').format("MM/YYYY"))
            }
        }

        let assetsArr = []
        let assetsTotal = []
        let liabilitiesArr = []
        let liabilitiesTotal = []

        //Get latest valuation for each account each month
        for (let i = 0; i < accounts.length; i++) {
            assetsArr[i] = []
            liabilitiesArr[i] = []
            var valuationsSortedByDate = accounts[i].valuations

            let currentVal = 0
            //Push account value by month into their respective arrays
            for (let j = 0; j < labelArr.length; j++) {
                if (valuationsSortedByDate[currentVal]) {
                    if (labelArr[j] == moment(valuationsSortedByDate[currentVal].newDate).format('MM/YYYY') && accounts[i].type === "Asset") {
                        assetsArr[i].push(valuationsSortedByDate[currentVal].newBalance)
                        currentVal = currentVal + 1
                    }
                    else if (labelArr[j] != moment(valuationsSortedByDate[currentVal].newDate).format('MM/YYYY') && accounts[i].type === "Asset") {
                        if (currentVal > 0) {
                            assetsArr[i].push(valuationsSortedByDate[currentVal - 1].newBalance)
                        }
                        else {
                            assetsArr[i].push(0)
                        }
                    }
                    else if (labelArr[j] == moment(valuationsSortedByDate[currentVal].newDate).format('MM/YYYY') && accounts[i].type === "Liability") {
                        liabilitiesArr[i].push(valuationsSortedByDate[currentVal].newBalance)
                        currentVal = currentVal + 1
                    }
                    else if (labelArr[j] != moment(valuationsSortedByDate[currentVal].newDate).format('MM/YYYY') && accounts[i].type === "Liability") {
                        if (valuationsSortedByDate.length >= 1) {
                            if (currentVal > 0) {
                                liabilitiesArr[i].push(valuationsSortedByDate[currentVal - 1].newBalance)
                            }
                            else {
                                liabilitiesArr[i].push(0)
                            }
                        }
                    }
                }
                else if (accounts[i].type === "Asset") {
                    if (currentVal > 0) {
                        assetsArr[i].push(valuationsSortedByDate[currentVal - 1].newBalance)
                    }
                    else {
                        assetsArr[i].push(valuationsSortedByDate[currentVal].newBalance)
                    }
                }
                else if (accounts[i].type === "Liability") {
                    if (currentVal > 0) {
                        if (currentVal > 0) {
                            liabilitiesArr[i].push(valuationsSortedByDate[currentVal - 1].newBalance)
                        }
                        else {
                            liabilitiesArr[i].push(valuationsSortedByDate[currentVal].newBalance)
                        }
                    }
                }
            }
        }

        //Get total assets amount by month
        let assetsByMonth = assetsArr.reduce(function (r, a) {
            a.forEach(function (b, i) {
                r[i] = (r[i] || 0) + b;
            });
            return r;
        }, []);

        //Get total liabilities amount by month
        let liabilitiesByMonth = liabilitiesArr.reduce(function (r, a) {
            a.forEach(function (b, i) {
                r[i] = (r[i] || 0) + b;
            });
            return r;
        }, []);

        //Calculate networth for eachmonth
        for (var i = 0; i < labelArr.length; i++) {
            if (assetsByMonth.length > 0 && liabilitiesByMonth.length > 0) {
                netWorthByMonth.push(assetsByMonth[i] - liabilitiesByMonth[i]);
            }
            else if (assetsByMonth.length > 0) {

                netWorthByMonth.push(assetsByMonth[i])
            }
            else if (liabilitiesByMonth.length > 0) {
                netWorthByMonth.push(-liabilitiesByMonth[i])
            }
        }

        let journalsJSX = labelArr.map((label, i) => {
            for (let j = 0; j < monthlyJournal.length; j++) {
                if (moment(monthlyJournal[j].date).format("MM/YYYY") == labelArr[i]) {
                    var journalEntry = monthlyJournal[j].entry
                }
            }
            if (i === 0) {
                var changeInNetWorth = 0
            }
            else {
                var changeInNetWorth = ((netWorthByMonth[i] - netWorthByMonth[i - 1]) / netWorthByMonth[i - 1]) * 100
            }
            return (
                <tr>
                    <td>{labelArr[i]}</td>
                    <td>{journalEntry} 
                    {/* <Link to="/journal-entry" className="secondary-content" className="edit-link" onClick={() => { this.props.editJournalHandler(labelArr[i]) }}>edit</Link> */}
                    </td>
                    <td>${netWorthByMonth[i]}.00</td>
                    <td className={changeInNetWorth === 0 ? '' : changeInNetWorth > 0 ? "asset" : "liability"}>{parseFloat(changeInNetWorth).toFixed(0)}%</td>
                </tr>
            )
        })

        if (monthlyJournal) {
            return (
                <div>
                    <h5>Net Worth Journal</h5>
                    <a href="/journal-entry"><Link className="add-link" to="/journal-entry"> create new journal entry</Link></a>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Journal Entry</th>
                                <th>Networth</th>
                                <th>% change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {journalsJSX}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default JournalEntryList;
