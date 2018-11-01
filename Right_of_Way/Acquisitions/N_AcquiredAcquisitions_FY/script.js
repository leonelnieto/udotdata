function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

(function() {
  'use strict';

  var url = 'https://dashboard.udot.utah.gov/resource/ijf2-cskg.json?$select=ownership_id&$where=fy_acquisition_cleared_date=%272018%27&parcel_id_duplicated=false&$limit=2000';

  fetch(url)
    .then((response) => {
      response.json()
      .then((data) => {
        console.log('data length:', data.length);
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          if (arr.indexOf(data[i].ownership_id) === -1) {
              arr.push(data[i].ownership_id)
            }
        }
        console.log('distint length:', arr.length)
        document.getElementById('indexNum').innerHTML = numberWithCommas(arr.length)
      });
    })
    .catch((error) => {
      console.log('error', error);
    });

})();
