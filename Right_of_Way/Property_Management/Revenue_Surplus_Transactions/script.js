(function() {
  'use strict';

  var url = "https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT%20sum(revenue)%20WHERE%20fiscal_year=%272018%27%20AND%20account_type=%2731%27%20AND%20revenue_source=%272793%27"

  fetch(url)
    .then(function(response) {

      response.json()
        .then(function(data) {
          document.getElementById('indexNum').innerHTML = numberWithCommas(data[0].sum_revenue)
        });

    })
    .catch(function(error) {
      console.log('error', error);
    });

})();

     function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
