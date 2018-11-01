(function() {
  'use strict';

  var url = 'https://dashboard.udot.utah.gov/resource/4u2v-xp6j.json?$select=count(permit_number)&$where=document_type_id%20in(%271%27,%20%20%272%27,%20%273%27)&fy_document_date=%272018%27'

  fetch(url)
    .then(function(response) {

      response.json()
        .then(function(data) {
          document.getElementById('indexNum').innerHTML = numberWithCommas(data[0].count_permit_number)
        });

    })
    .catch(function(error) {
      console.log('error', error);
    });

})();

     function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
