const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();
//
module.exports = {

    // @ROUTE   /api/budget
    // @DESC    bobsBananaBudget() returns expected cost for any span of time.
    bobsBananaBudget: (req, res) => {

        /* ********
         VARIABLES
        ******** */
        // startDate (arg)
        const startDate = req.body.startDate.split('/');
        let month = parseInt(startDate[0]);
        let day = parseInt(startDate[1]);
        let year = parseInt(startDate[2]);
        let dayOfWeek = parseInt(moment(req.body.startDate).format('d'));
        // numberOfDays (arg)
        let numberOfDays = parseInt(req.body.numberOfDays);
        // totalCost (return value)
        let totalCost = 0;


        /* ********
          METHODS
        ******** */
        // moves the day of the week along, by index
        const advanceDayOfWeek = () => {
            if (dayOfWeek === 6) {
                dayOfWeek = 0;
            } else {
                dayOfWeek++;
            }
        };

        // moves the calendar date along, and calls advanceDayOfWeek();
        const advanceDate = () => {
            const today = year + '-' + month;
            // if last day of the month
            if (day === moment(today, 'Y-M').daysInMonth()) {
                if (month === 12) {
                    month = 1;
                    day = 1;
                    year++;
                } else {
                    month++;
                    day = 1;
                }
            // else
            } else {
                day++;
            }
            // always advance day of week
            advanceDayOfWeek();
        };


        /* *******
         SOLUTION
        ******** */
        // i'm sure i can try to reduce the response time, but this works fast enough for one lifetime (ie <60,000 numberOfDays)
        for (let i = 0; i < numberOfDays; i++ ) {

            // if weekday
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {

                // grab today's costPerBanana
                let costPerBanana;
                if (day <=7) {
                    costPerBanana = 0.05;
                } else if (day > 7 && day <= 14) {
                    costPerBanana = 0.10;
                } else if (day > 14 && day <= 21) {
                    costPerBanana = 0.15;
                } else if (day > 21 && day <= 28) {
                    costPerBanana = 0.20;
                } else {
                    costPerBanana = 0.25;
                }

                // put it on bob's tab
                totalCost += costPerBanana;
            }

            // advanceDate() at end of each iteration;
            advanceDate();
        }


        // after tabulating, format and send back totalCost
        totalCost = totalCost.toFixed(2);
        res.json({totalCost: totalCost});
    },


};
