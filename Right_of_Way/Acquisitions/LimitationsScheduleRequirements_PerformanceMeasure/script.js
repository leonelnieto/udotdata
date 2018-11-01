var limitationsJSON = $.getJSON("https://dashboard.udot.utah.gov/resource/ie6m-xuux.json?$select=count(pin)&$where=limitation_days_saved%3E=0&fy_process_end=%272018%27&$limit=2000");
// count = 20
var notLimitationsJSON = $.getJSON("https://dashboard.udot.utah.gov/resource/ie6m-xuux.json?$select=count(pin)&$where=limitation_days_saved%3C0&fy_process_end=%272018%27&$limit=2000");
// count = 2

var limitationsCount;

var notLimitationsCount;

var result;

$.when(limitationsJSON, notLimitationsJSON).then(function(a, b) {

  limitationsCount = parseInt(a[0][0].count_pin);

  notLimitationsCount = parseInt(b[0][0].count_pin);

  result = ((limitationsCount / (limitationsCount + notLimitationsCount)) * 100);

  document.getElementById('indexNum').innerHTML = decimal2percent(result);

});

function decimal2percent(num) {
  var percent = parseFloat(num);
  percent = percent.toFixed(1);
  return percent.toString() + "%";
};


// unused function below, kept for posterity
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

// unused function below, kept for posterity
Number.prototype.percent = function() {
  // Round number up: Math.ceil
  // Round number: Math.round
  // Round number down: Math.floor
  return Math.ceil(this * 100) + "%";
}
