var relocations_count_18 = $.getJSON("https://dashboard.udot.utah.gov/resource/ijf2-cskg.json?$select=count(relocation_id)&$where=fy_acquisition_cleared_date=%272018%27%20&$limit=2000");
var relocations_count_19 = $.getJSON("https://dashboard.udot.utah.gov/resource/ijf2-cskg.json?$select=count(relocation_id)&$where=fy_acquisition_cleared_date=%272019%27%20&$limit=2000");

$.when(relocations_count_18, relocations_count_19).then(function(a, b) {

  $("#relocations_18").html("<h1>" + a[0][0].count_relocation_id + "</h1>");
  $("#relocations_18_label").html("<h6>Total Relocations FY 2018</h6>");

  $("#relocations_19").html("<h1>" + b[0][0].count_relocation_id + "</h1>");
  $("#relocations_19_label").html("<h6>Total Relocations FY 2019</h6>");

});

function CurrencyFormatted(amount) {
  var i = parseFloat(amount);
  if (isNaN(i)) {
    i = 0.00;
  }
  var minus = '';
  if (i < 0) {
    minus = '-';
  }
  i = Math.abs(i);
  i = parseInt((i + .005) * 100);
  i = i / 100;
  s = new String(i);
  if (s.indexOf('.') < 0) {
    s += '.00';
  }
  if (s.indexOf('.') == (s.length - 2)) {
    s += '0';
  }
  s = minus + s;
  return s;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
