import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment'
import _ from 'lodash'

class AccountChart extends Component {

    render() {

        //Defining props
        let accounts = this.props.accounts
        let valuations = this.props.valuations

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

        let netWorthByMonth = []

        //Creating chart data for all accounts
        let labelArr = []
        let datasetArr = []
        let dataArr = []
        let dateArr = []
        let dateArrPlot = []
        let xyDataArray = []

        dataArr[i] = []
        xyDataArray[i] = []
        let datasetObj = {
            label: 'Networth',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
            data: netWorthByMonth
        }
        datasetArr.push(datasetObj)

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

        //Get latest valuation for each account each month
        let assetsArr = []
        let assetsTotal = []
        let liabilitiesArr = []
        let liabilitiesTotal = []


        for (let i = 0; i < accounts.length; i++) {
            assetsArr[i] = []
            liabilitiesArr[i] = []
            var valuationsSortedByDate = _.sortBy(accounts[i].valuationAmounts, ['_id', 'newDate'])

            let currentVal = 0

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

        for (var i = 0; i < assetsByMonth.length; i++) {
            netWorthByMonth.push(assetsByMonth[i] - liabilitiesByMonth[i]);
        }

        console.log(assetsByMonth)
        console.log(liabilitiesByMonth)
        console.log(netWorthByMonth)
        console.log(assetsArr)
        console.log(labelArr)

        //Assign computed data to chart data
        const data = {
            labels: labelArr,
            datasets: datasetArr
        };

        //Chart options
        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    distribution: 'series',
                    time: {
                        unit: 'month'
                    }
                }]
            }
        }

        return (
            <div>
                <Line data={data} width={1000} height={800} options={options} />
            </div>
        );
    }
}

export default AccountChart;
