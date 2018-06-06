import React, { Component } from 'react';
import moment from 'moment'
import _ from 'lodash'

class JournalEntryList extends Component {
    render() {

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
            for (let j = 0; j < accounts[i].valuationAmounts.length; j++) {
                var dates = accounts[i].valuationAmounts[j].newDate
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
            var valuationsSortedByDate = _.sortBy(accounts[i].valuationAmounts, ['_id', 'newDate'])

            let currentVal = 0
            //Push account value by month into their respective arrays
            for (let j = 0; j < labelArr.length; j++) {
                if (valuationsSortedByDate[currentVal]) {
                    if (labelArr[j] == moment(valuationsSortedByDate[currentVal].newDate).format('MM/YYYY') && accounts[i].type === "Asset") {
                        assetsArr[i].push(valuationsSortedByDate[currentVal].newBalance)
                        currentVal = currentVal + 1
                    }
                    else if (labelArr[j] != moment(valuationsSortedByDate[currentVal].newDate).format('MM/YYYY') && accounts[i].type === "Asset") {
                        assetsArr[i].push(valuationsSortedByDate[currentVal - 1].newBalance)
                    }
                    else if (labelArr[j] == moment(valuationsSortedByDate[currentVal].newDate).format('MM/YYYY') && accounts[i].type === "Liability") {
                        liabilitiesArr[i].push(valuationsSortedByDate[currentVal].newBalance)
                        currentVal = currentVal + 1
                    }
                    else if (labelArr[j] != moment(valuationsSortedByDate[currentVal].newDate).format('MM/YYYY') && accounts[i].type === "Liability") {
                        liabilitiesArr[i].push(valuationsSortedByDate[currentVal - 1].newBalance)
                    }
                }
                else if (accounts[i].type === "Asset") {
                    assetsArr[i].push(valuationsSortedByDate[currentVal - 1].newBalance)
                }
                else if (accounts[i].type === "Liability") {
                    liabilitiesArr[i].push(valuationsSortedByDate[currentVal - 1].newBalance)
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
        for (var i = 0; i < assetsByMonth.length; i++) {
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

        //Assign computed data to chart data
        const data = {
            labels: labelArr,
            datasets: datasetArr
        };


        let journalsJSX = labelArr.map((label, i) => {

            for(let j = 0; j<monthlyJournal.length; j++){
                console.log(monthlyJournal[j].date)
                console.log(labelArr[i])
                if(moment(monthlyJournal[j].date).format("MM/YYYY") == labelArr[i]){
                    var journalEntry = monthlyJournal[j].entry 
                } 
            }

            if(i === 0){
                var changeInNetWorth = 0
            }
            else{
                var changeInNetWorth = ((netWorthByMonth[i]-netWorthByMonth[i-1])/netWorthByMonth[i])*100
            }
            
            return (
                <tr>
                    <td>{labelArr[i]}</td>
                    <td>{journalEntry}</td>
                    <td>${netWorthByMonth[i]}.00</td>
                    <td>{parseFloat(changeInNetWorth).toFixed(0)}%</td>
                </tr>
            )
        })

        return (
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
        );
    }
}

export default JournalEntryList;
