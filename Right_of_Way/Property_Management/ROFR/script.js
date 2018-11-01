var rofrJSON = $.getJSON("https://dashboard.udot.utah.gov/resource/9656-dwmt.json?$select=count(_1st_right_of_refusal_reason)&$where=_1st_right_of_refusal_reason!=%27N/A%27&$limit=2000");
// count = 171
var notRofrJSON = $.getJSON("https://dashboard.udot.utah.gov/resource/9656-dwmt.json?$select=count(_1st_right_of_refusal_reason)&$where=_1st_right_of_refusal_reason=%27N/A%27&$limit=2000");
// count = 20

var rofrsCount;

var notRofrCount;

var result;

$.when(rofrJSON, notRofrJSON).then(function(a, b) {

  rofrCount = parseInt(a[0][0].count_1st_right_of_refusal_reason);

  notRofrCount = parseInt(b[0][0].count_1st_right_of_refusal_reason);

  result = ((rofrCount / (rofrCount + notRofrCount)) * 100);

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
