import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment'
import _ from 'lodash'

class AccountChart extends Component {

    constructor() {
        super()
        this.state = {
            currentChart: "allAccountsChart"
        }
    }

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
        //Creating chart data for all accounts
        let labelArr = []
        let datasetArr = []
        let dataArr = []
        let dateArr = []
        let dateArrPlot = []
        let xyDataArray = []
        //Get dates for all valuations and push into array
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
        //Create data objects for charts
        for (let i = 0; i < accounts.length; i++) {
            dataArr[i] = []
            xyDataArray[i] = []
            let sortedXyDataArray = []
            
            let datasetObj = {   
                label: accounts[i].name,
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
                data: xyDataArray[i]
            }
            let valuationsSortedByDate = _.sortBy(accounts[i].valuationAmounts, ['_id', 'newDate'])
            for (let j = 0; j < valuationsSortedByDate.length; j++) {
                if (valuationsSortedByDate[j] === valuationsSortedByDate[valuationsSortedByDate.length-1]) {
                    var xyData = {
                        x: labelArr[labelArr.length-1],
                        y: valuationsSortedByDate[valuationsSortedByDate.length-1].newBalance
                    }
                    xyDataArray[i].push(xyData)
                }
                    var xyData = {
                        x: moment(valuationsSortedByDate[j].newDate).format("MM/YYYY"),
                        y: accounts[i].valuationAmounts[j].newBalance
                    }
                    xyDataArray[i].push(xyData)
            }
            datasetArr.push(datasetObj)
            sortedXyDataArray = xyDataArray[i].sort((a,b) => {
                return Number(a['x'].split('/').join('')) - Number(b['x'].split('/').join(''));
            })
        }
        
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
