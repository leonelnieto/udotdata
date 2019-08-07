/*Java script file pulls data from socrata table
and build and populates an html table */

//Define Variables
//var domain = 'https://dashboard.udot.utah.gov/resource/';
//var dataset0 = 'c9s4-gvqp.json';
//var query0 = '?$query=SELECT sum(amount) WHERE fiscal_year=%272018%27 AND account_type=%2722%27 AND expense_type IN ('6970','6971','6972','6987')';
//var RightofWayDataset = domain+dataset0+query0;

(function() {
  'use strict';
  var RightofWayDataset = "https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT sum(amount) WHERE fiscal_year=%272019%27 AND account_type=%2722%27 AND expense_type IN ('6970','6971','6972','6987')"

  fetch(RightofWayDataset)
    .then(function(response) {

      response.json()
        .then(function(data) {
          document.getElementById('indexNum').innerHTML = numberWithCommas(data[0].sum_amount)
        });
    })
})();

function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
