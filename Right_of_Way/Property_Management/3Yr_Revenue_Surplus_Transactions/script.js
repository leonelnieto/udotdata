(function() {
  'use strict';

  var url = "https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT%20fiscal_year,sum(revenue)%20WHERE%20account_type=%2731%27%20AND%20revenue_source=%272793%27%20GROUP%20BY%20fiscal_year ORDER BY fiscal_year"

  fetch(url)
    .then(function(response) {

      response.json()
        .then(function(data) {
          document.getElementById('indexNum').innerHTML = numberWithCommas((Number(data[0].sum_revenue) + Number(data[1].sum_revenue) + Number(data[2].sum_revenue))/3)
        });

    })
    .catch(function(error) {
      console.log('error', error);
    });

})();

     function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
