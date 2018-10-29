//Currency Magic
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

//Define Variables

var today = new Date();
var year = today.getFullYear();
var fiscalyear,fisStartDate,fisEndDate;
if ((today.getMonth() + 1)  <= 6) {
    //Its before July, print current year as fiscal year
	fiscalyear = year;
	//console.log("Fiscal Year:"+fiscalyear);
	//Set fiscal start date to last year july 1st
	fisStartDate = new Date(year - 1, 6,1);
	//console.log("Start Date:"+fisStartDate);
	//Set fiscal end date to next year June 30th
	fisEndDate = new Date(year, 5,30);
	//console.log("End Date:"+fisEndDate);
  } else {
	//Its after July, print current year + 1 as fiscal year
    fiscalyear = today.getFullYear() + 1;
	//console.log("Fiscal Year:"+fiscalyear);
	//Set fiscal start date to July st
	fisStartDate = new Date(year,6,1);
	//console.log("Start Date:"+fisStartDate);
	//Set Fiscal End Date to current year july 1st.
	fisEndDate = new Date(fiscalyear,5,30);
	//console.log("End Date:"+fisEndDate);
  }

var domain = 'https://dashboard.udot.utah.gov/resource/';
var dataset0 = 'ie6m-xuux.json';
var query0 = '?$SELECT=avg(limitation_days_saved)';
var RightofWayDataset = domain+dataset0+query0;

(function() {
  'use strict';
  fetch(RightofWayDataset)
    .then(function(response) {

      response.json()
        .then(function(data) {
          document.getElementById('indexNum').innerHTML = Math.round(data[0].avg_limitation_days_saved * 10) / 10
        });

    })
    .catch(function(error) {
      console.log('error', error);
    });

});
