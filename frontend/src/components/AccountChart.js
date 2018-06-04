import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment'
import lodash from 'lodash'

class AccountChart extends Component {

    render() {
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

        let labelArr = []
        let datasetArr = []
        let dataArr = []
        let dateArr = []
        let dateArrPlot = []
        let xyDataArray = []

        for (let i = 0; i < accounts.length; i++) {
            dataArr[i] = []
            xyDataArray[i] = []
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
                pointRadius: 1,
                pointHitRadius: 10,
                data: xyDataArray[i]
            }
            for (let j = 0; j < accounts[i].valuationAmounts.length; j++) {
                var dates = accounts[i].valuationAmounts[j].newDate
                dateArr.push(dates)
                let xyData = {
                    x: moment(accounts[i].valuationAmounts[j].newDate).format("MM/YYYY"),
                    y: accounts[i].valuationAmounts[j].newBalance
                }
                xyDataArray[i].push(xyData)
            }
            datasetArr.push(datasetObj)
        }

        //Find the earliest date and the last date and create an array of months within that range
        if (dateArr.length) {
            let sortedDates = dateArr.sort()
            let earliestDate = sortedDates[0]
            let latestDate = sortedDates[sortedDates.length - 1]
            console.log(sortedDates)

            let ld = moment(latestDate)
            let ed = moment(earliestDate)
            let diffInMonths = ld.diff(ed, 'months');
            console.log(ed)
            console.log(ld)

            console.log(diffInMonths + "DIFF")
            for (let i = 0; i < diffInMonths+1; i++) {
                labelArr.push(moment(earliestDate).add(i, 'months').format("MM/YYYY"))
            }
        }

        const data = {
            labels: labelArr,
            datasets: datasetArr
        };

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
