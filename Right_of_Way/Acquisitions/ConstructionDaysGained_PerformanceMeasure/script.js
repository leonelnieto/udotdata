/*Java script file pulls data from socrata table
and build and populates an html table */

//Define Variables
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
})();
