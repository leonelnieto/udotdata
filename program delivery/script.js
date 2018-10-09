//script for all regions program HEALTH
var domain = 'https://dashboard.udot.utah.gov/resource/';
//Define datasets
var dataSet = 'h2vx-sepk.json?';
var dataSet1 = '7xgd-ekuq.json?';
var dataSet2 = 'a9ty-8kkv.json?';
var dataSet3 = 'hzqv-jfdx.json?';
//Define Fiscal Year
var today = new Date();
var year = today.getFullYear();
var fisYear,fisStartDate,fisEndDate;
if ((today.getMonth() + 1)  <= 6) {
  //Its before July, print current year as fiscal year
	fisYear = year;
	//console.log("Fiscal Year:"+fisYear);
	//Set fiscal start date to last year july 1st
	fisStartDate = new Date(year - 1, 6,1);
	//console.log("Start Date:"+fisStartDate);
	//Set fiscal end date to next year June 30th
	fisEndDate = new Date(year, 5,30);
	//console.log("End Date:"+fisEndDate);
  } else {
	//Its after July, print current year + 1 as fiscal year
  fisYear = today.getFullYear() + 1;
	//console.log("Fiscal Year:"+fisYear);
	//Set fiscal start date to July st
	fisStartDate = new Date(year,6,1);
	//console.log("Start Date:"+fisStartDate);
	//Set Fiscal End Date to current year july 1st.
	fisEndDate = new Date(fisYear,5,30);
	//console.log("End Date:"+fisEndDate);
  }
//Define queries
var otQuery = '%24select=count(pin)%20AS%20ontime&%24where=committed_advertise_date%20between%20%272018-07-01T00:00:00%27%20and%20%272019-06-30T23:59:59%27%20AND%20dashboard=%27Schedule%27%20AND%20advertised_committed=1%20AND%20pdl=%27Y%27%20AND%20will_advertise_flag=%27Y%27';
var ltQuery = '%24select=count(pin)%20AS%20late&%24where=committed_advertise_date%20between%20%272018-07-01T00:00:00%27%20and%20%272019-06-30T23:59:59%27%20AND%20dashboard=%27Schedule%27%20AND%20advertised_committed=2%20AND%20pdl=%27Y%27%20AND%20will_advertise_flag=%27Y%27';
var pdQuery = '%24select=count(pin)%20as%20past&%24where=committed_advertise_date%20between%20%272018-07-01T00:00:00%27%20and%20%272019-06-30T23:59:59%27%20AND%20dashboard=%27Schedule%27%20AND%20advertised_committed=3%20AND%20pdl=%27Y%27%20AND%20will_advertise_flag=%27Y%27';
var rttQuery = '%24query=SELECT%20pin,CASE(actual_advertise_date%20is%20Null,committed_advertise_date,actual_advertise_date%20is%20not%20null,actual_advertise_date)%20AS%20advdate%20WHERE%20(actual_advertise_date%20is%20not%20null%20OR%20committed_advertise_date%20is%20not%20null)%20AND%20advdate%20between%20%272018-07-01T00:00:00%27%20and%20%272019-06-30T23:59:59%27%20AND%20pdl=%27Y%27%20AND%20will_advertise_flag=%27Y%27%20ORDER%20BY%20advdate';
var rtcQuery = '%24query=SELECT%20pin,CASE(actual_advertise_date%20is%20Null,committed_advertise_date,actual_advertise_date%20is%20not%20null,actual_advertise_date)%20AS%20advdate%20WHERE%20(actual_advertise_date%20is%20not%20null%20OR%20committed_advertise_date%20is%20not%20null)%20AND%20advdate%20between%20%272018-07-01T00:00:00%27%20and%20%272019-06-30T23:59:59%27%20AND%20pdl=%27Y%27%20AND%20will_advertise_flag=%27Y%27%20AND%20date_extract_m(advdate)%20IN%20(%279%27,%2710%27,%2711%27,%2712%27,%271%27,%272%27)%20ORDER%20BY%20advdate';
// Budget queries
var BudgetQuery = '$query=SELECT%20max(current_year_oblbigation_total) AS current, max(cy_fed_proj_value) AS planned WHERE date_extract_m(display_date) = date_extract_m(as_of_dtg)-1 AND dashboard="Fed_Fund_Oblig_Projection_WF"';
// Scope queries
var pcoverQuery = '$query=SELECT%20fiscal_post_year_display,%20((SUM(total_contract_amount)-SUM(original_contract_amount))/SUM(original_contract_amount)*100)%20AS%20percent%20WHERE%20dashboard=%27Pmt%20Trend%27%20AND%20fiscal_post_year_display=%27'+fisYear+'%27%20GROUP%20BY%20fiscal_post_year_display';
var ttlpinQuery = '$query=SELECT%20COUNT(pin)%20AS%20denominator,fiscal_post_year_display%20WHERE%20dashboard=%27Pmt%20Trend%27%20AND%20fiscal_post_year_display=%27'+fisYear+'%27%20GROUP%20BY%20fiscal_post_year_display';
var gfQuery = '$query=SELECT%20COUNT(pin)%20AS%20numerator,fiscal_post_year_display%20WHERE%20dashboard=%27Pmt%20Trend%27%20AND%20fiscal_post_year_display=%27'+fisYear+'%27%20AND%20series%20in%20(%271%27,%272%27)%20GROUP%20BY%20fiscal_post_year_display';
//Define finalvars array. Since jquery, it will only story values within function.
//values than are passed to hiden html divs.
//var finalvars = new Array("ontime","late","pastdue","rightTimeCt","rightTimeTl");
var finalvars = new Array();
$.getJSON(domain+dataSet+otQuery, function(data) {
  finalvars[0]= data[0].ontime; // Ontime
  $.getJSON(domain+dataSet+ltQuery, function(data) {
    finalvars[1]= data[0].late; // Late
    $.getJSON(domain+dataSet+pdQuery, function(data) {
      finalvars[2]= data[0].past; // Past
      $.getJSON(domain+dataSet1+rttQuery, function(data) {
        finalvars[3]= data.length; //Right Time Total
        $.getJSON(domain+dataSet1+rtcQuery, function(data) {
          finalvars[4]= data.length; //Right Time Count
          $.getJSON(domain+dataSet2+BudgetQuery, function(data) {
            finalvars[5]= data[0].current; // Current
            finalvars[6]= data[0].planned; // Planned
            $.getJSON(domain+dataSet3+pcoverQuery, function(data) {
              if(data === undefined || data.length == 0) {
                finalvars[7]=5;
              } else {
                finalvars[7]= data[0].percent; // Percent
              }
              $.getJSON(domain+dataSet3+ttlpinQuery, function(data) {
                if(data === undefined || data.length == 0) {
                  finalvars[8]=1;
                } else {
                  finalvars[8]= data[0].denominator; // Denominator
                }
                $.getJSON(domain+dataSet3+gfQuery, function(data) {
                  if(data === undefined || data.length == 0) {
                    finalvars[9]= 1;
                  } else {
                    finalvars[9]= data[0].numerator; //Numerator
                  }
                  //We should have ten data points here, all stored in finvalvars array
                  //Do arithmetic
                  // Schedule variable definitions
                  var OnTimeGoal = 85;
                  var OnTimeWt = 89;
                  var RightTimeGoal = 75;
                  var RightTimeWt = 11;
                  var AdvPerf;
                  var AdvPerfScore;
                  var AdvPerfProportion;
                  var AdvOTDS;
                  var AdvLateDS;
                  var AdvPastDueDS;
                  var RightTimePerf;
                  var RightTimeScore;
                  var RightTimeProportion;
                  var RightTimeTotalDS;
                  var RightTimeCountDS;
                  var ScheduleHealth;
                  // Budget variable definitions
                  var TheOblDS;
                  var BudgetScore;
                  // Scope variable definitions
                  var GoodFairGoal = 80;
                  var GoodFairWt = 33.17;
                  var PercentOverWt = 66.83;
                  var PercentOverScore;
                  var percentOverDS;
                  var totalPinDS;
                  var goodfairDS;
                  var GoodFairScore;
                  var ScopeHealth;
                  // Composite variables
                  var ScheduleCompWt = .736
                  var BudgetCompWt = .065
                  var ScopeCompWt = .199
                  var ProgramHealth;
                  // Schedule Health calculations
                  if ((Number(finalvars[0]) + Number(finalvars[1])+ Number(finalvars[2]))==0){
                    AdvPerf = 100;
                  }else {
                    AdvPerf = Math.round((Number(finalvars[0]) / (Number(finalvars[0]) + Number(finalvars[1]) + Number(finalvars[2]))) * 100);
                  }
                  if (finalvars[4]>0){
                    RightTimePerf = Math.round((finalvars[4] / finalvars[3]) * 100);
                  }else {
                    RightTimePerf = 100;
                  }

                  if (Number(AdvPerf) >= Number(OnTimeGoal)) {AdvPerfScore = 1;}
                  else {AdvPerfScore = Number(AdvPerf) / 100;}

                  if (Number(RightTimePerf) >= Number(RightTimeGoal)) {RightTimeScore = 1;}
                  else {RightTimeScore = Number(RightTimePerf) / 100;}

                  AdvPerfProportion = Math.round(Number(AdvPerfScore) * Number(OnTimeWt));
                  RightTimeProportion = Math.round(Number(RightTimeScore) * Number(RightTimeWt));

                  ScheduleHealth = AdvPerfProportion + RightTimeProportion
                  // Budget Health calculations
                  if (Math.round(((Number(finalvars[5]) / Number(finalvars[6])) * 100))<=100) {
                  BudgetScore = Math.round((Number(finalvars[5]) / Number(finalvars[6]) * 100));}
                  else {BudgetScore = 100;}

                  // Scope Health calculations
                  if (Math.round(Number(finalvars[7])) >= 4 && Math.round(Number(finalvars[7])) <= 6) {
                  PercentOverScore = 1;
                  } else if (Math.round(Number(finalvars[7])) == 3) {PercentOverScore = .90;}
                  else if (Math.round(Number(finalvars[7])) == 7) {PercentOverScore = .80;}
                  else if (Math.round(Number(finalvars[7])) == 2) {PercentOverScore = .80;}
                  else if (Math.round(Number(finalvars[7])) == 8) {PercentOverScore = .60;}
                  else if (Math.round(Number(finalvars[7])) == 1) {PercentOverScore = .70;}
                  else if (Math.round(Number(finalvars[7])) == 9) {PercentOverScore = .40;}
                  else if (Math.round(Number(finalvars[7])) == 0) {PercentOverScore = .60;}
                  else if (Math.round(Number(finalvars[7])) == 10) {PercentOverScore = .20;}
                  else {PercentOverScore = 0;}

                  if(((Number(finalvars[9]) / Number(finalvars[8])) * 100) == 100){
                    GoodFairScore = 1;
                  } else {
                    GoodFairScore = ((Number(finalvars[9]) / Number(finalvars[8])) * 100) / GoodFairGoal;
                  }

                  ScopeHealth = Math.round(PercentOverScore * PercentOverWt) + Math.round(GoodFairScore * GoodFairWt);

                  ProgramHealth = Math.round(ScheduleHealth * ScheduleCompWt) + Math.round(BudgetScore * BudgetCompWt) + Math.round(ScopeHealth * ScopeCompWt);

                  //document.getElementById("composite_health").innerHTML = "<h1>" + ProgramHealth + "% </h1>";
                  //document.getElementById("composite_health_label").innerHTML = "<h6>Program Health</h6>";
                  var cont = $('#canvas');

                  var gauge = new Gauge(cont.get(0));

                  var opts = {
                    angle: 0.0,
                    lineWidth: 0.08,
                    radiusScale: 1,
                    pointer: {
                      length: 0.45,
                      strokeWidth: 0.03,
                      color: '#ccc'
                    },
                    staticLabels:{
                      font:"10px segoe ui",
                      labels:[0, 25, 50, 75, 100],
                      fractionDigits:0
                    },
                    staticZones: [
                       {strokeStyle: "#f16522", min: 0, max: 25},
                       {strokeStyle: "#74BDE9", min: 25, max: 50},
                       {strokeStyle: "#314D5A", min: 50, max: 75},
                       {strokeStyle: "#8BC53F", min: 75, max: 100}
                    ]
                  };
                  gauge.setOptions(opts);
                  gauge.maxValue = 100;
                  gauge.animationSpeed = 32;
                  gauge.set(ProgramHealth);
                  document.getElementById("schedul_health").innerHTML = ProgramHealth + "%";

                });
              });
            });
          });
        });
      });
    });
  });
});
