(function() {
  'use strict';

  var url = 'https://dashboard.udot.utah.gov/resource/9656-dwmt.json?$select=count(trasactionid)&$where=transaction_date%20between%20%272017-07-01T00:00:00%27%20and%20%272018-06-30T23:59:59%27%20'

  fetch(url)
    .then(function(response) {

      response.json()
        .then(function(data) {
          document.getElementById('indexNum').innerHTML = numberWithCommas(data[0].count_trasactionid)
        });

    })
    .catch(function(error) {
      console.log('error', error);
    });

})();

     function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
