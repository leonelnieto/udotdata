var eminentJSON = $.getJSON("https://dashboard.udot.utah.gov/resource/ijf2-cskg.json?$select=count(eminent_domain_resolution)&$where=eminent_domain_resolution=%27Eminent%20Domain%20Not%20Used%27&fy_acquisition_cleared_date=%272018%27&ownership_id_duplicated=false&$limit=2000");

var notEminentJSON = $.getJSON("https://dashboard.udot.utah.gov/resource/ijf2-cskg.json?$select=count(eminent_domain_resolution)&$where=eminent_domain_resolution!=%27Eminent%20Domain%20Not%20Used%27&fy_acquisition_cleared_date=%272018%27&ownership_id_duplicated=false&$limit=2000");

var eminentCount;

var notEminentCount;

var result;

$.when(eminentJSON, notEminentJSON).then(function(a, b) {

  eminentCount = parseInt(a[0][0].count_eminent_domain_resolution);

  notEminentCount = parseInt(b[0][0].count_eminent_domain_resolution);

  result = ((eminentCount / (eminentCount + notEminentCount)) * 100)

  document.getElementById('indexNum').innerHTML = decimal2percent(result);

});

function decimal2percent(num) {
  var percent = parseFloat(num);
  percent = percent.toFixed(1);
  return percent.toString() + "%";
};


// unused functions below, kept for posterity
function roundNumberV1(num, scale) {
  if (!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale) + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    var i = +arr[0] + "e" + sig + (+arr[1] + scale);
    var j = Math.round(i);
    var k = +(j + "e-" + scale);
    return k;
  }
}

Number.prototype.percent = function() {
  // Round number up: Math.ceil
  // Round number: Math.round
  // Round number down: Math.floor
  return Math.ceil(this * 100) + "%";
}
