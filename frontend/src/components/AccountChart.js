import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

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
        let dataArr = []
        let datasetArr = []

        for (let i = 0; i < accounts.length; i++) {
            console.log(accounts[i].name)
            //let accountName = accounts[i].name
            // for (let j = 0; j < accounts[i].valuationAmounts.length; j++) {
            //     labelArr.push(accounts[i].valuationAmounts[j].newDate)
            //     dataArr.push(accounts[i].valuationAmounts[j].newBalance)
            //     let datasetObj = {
            //         label: accountName,
            //         fill: false,
            //         lineTension: 0.1,
            //         backgroundColor: 'rgba(75,192,192,0.4)',
            //         borderColor: 'rgba(75,192,192,1)',
            //         borderCapStyle: 'butt',
            //         borderDash: [],
            //         borderDashOffset: 0.0,
            //         borderJoinStyle: 'miter',
            //         pointBorderColor: 'rgba(75,192,192,1)',
            //         pointBackgroundColor: '#fff',
            //         pointBorderWidth: 1,
            //         pointHoverRadius: 5,
            //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            //         pointHoverBorderColor: 'rgba(220,220,220,1)',
            //         pointHoverBorderWidth: 2,
            //         pointRadius: 1,
            //         pointHitRadius: 10,
            //         data: dataArr,
            //     }
            //     datasetArr.push(datasetObj)
            // }
        }
        //console.log(labelArr)
        //console.log(dataArr)




        const data = {
            datasets: datasetArr
        };


        return (
            <div>
                <Line data={data} />
            </div>
        );
    }
}

export default AccountChart;
