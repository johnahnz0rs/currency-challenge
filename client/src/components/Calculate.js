import React, { Component } from 'react';
import * as moment from 'moment';
import axios from 'axios';

class Calculate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            numberOfDays: 1,
            totalCost: null,
        };
        // bind methods here
        this.startDateHandler = this.startDateHandler.bind(this);
        this.numberOfDaysHandler = this.numberOfDaysHandler.bind(this);
        this.makeBudget = this.makeBudget.bind(this);
    }

    componentDidMount() {
        // set today's date as default startDate, then run makeBudget
        const today = moment().format('YYYY-MM-DD');
        this.setState({startDate: today}, this.makeBudget);
    }

    // handles changes to startDate
    startDateHandler = (e) => {
        const newDate = e.target.value;
        this.setState({startDate: newDate}, this.makeBudget);
    };

    // handles changes from numberOfDays
    numberOfDaysHandler = (e) => {
        const newNOD = e.target.value;
        if (newNOD < 60000) {
            this.setState({numberOfDays: newNOD}, this.makeBudget);
        }

    };

    makeBudget = () => {
        if (this.state.startDate && this.state.numberOfDays) {

            // format your post data
            const sd = this.state.startDate.split('-');
            const startDate = [sd[1], sd[2], sd[0]].join('/');
            const numberOfDays = this.state.numberOfDays;

            axios.post('/api/budget', {startDate: startDate, numberOfDays: numberOfDays})
                .then(data => {
                    const cost = data.data.totalCost;
                    this.setState({totalCost: cost});
                })
                .catch(err => console.log('*** err in makeBudget post request ***', err));
        }


    };

    render() {

        // startDate
        // default = today
        let startDate = null;
        if (this.state.startDate) {
            startDate = <input className="form-control" type="date" name="start-date" value={this.state.startDate} onChange={this.startDateHandler} />;
        }

        // numberOfDays
        // default = 1
        let numberOfDays = <input className="form-control" type="number" name="number-of-days" value={this.state.numberOfDays} onChange={this.numberOfDaysHandler} min="1" max="60000" />;


        // totalCost
        let totalCostMang = null;
        let costDiv = {
            border: '1px solid black',
            borderRadius: '8px',
            maxWidth: '380px',
        };
        if (this.state.startDate && this.state.numberOfDays && this.state.totalCost) {

            const start = this.state.startDate.split('-');
            const startDate = start[1] + '/' + start[2] + '/' + start[0];

            totalCostMang =
            <div className="my-5 mx-auto py-5" style={costDiv}>
                <h4><u>Total Cost</u></h4>
                <span>for {this.state.numberOfDays} day(s), starting on {startDate}</span><br/>
                <h4><i>${this.state.totalCost}</i></h4>
            </div>;
        }

        return(

            <div className="text-center">
                <h1 className="m-4">Bob's Banana Budget</h1>

                {/* inputs x 2 */}
                <div className="m-4">
                    <div className="form-group">
                        <label htmlFor="start-date">Enter Start Date</label>
                        {startDate}
                    </div>
                    <div className="form-group">
                        <label className="mb-0" htmlFor="number-of-days">How many days do you want to budget?</label><br/>
                        {numberOfDays}
                    </div>
                </div>

                {/* output */}
                {totalCostMang}
            </div>

        );
    }

}

export default Calculate;