/*Java script file pulls data from socrata table
and build and populates an html table */

//Currency Magic
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
//Define Variables

var today = new Date();
var year = today.getFullYear();
var fiscalyear,fisStartDate,fisEndDate;
if ((today.getMonth() + 1)  <= 6) {
    //Its before July, print current year as fiscal year
	fiscalyear = year;
	//console.log("Fiscal Year:"+fiscalyear);
	//Set fiscal start date to last year july 1st
	fisStartDate = new Date(year - 1, 6,1);
	//console.log("Start Date:"+fisStartDate);
	//Set fiscal end date to next year June 30th
	fisEndDate = new Date(year, 5,30);
	//console.log("End Date:"+fisEndDate);
  } else {
	//Its after July, print current year + 1 as fiscal year
    fiscalyear = today.getFullYear() + 1;
	//console.log("Fiscal Year:"+fiscalyear);
	//Set fiscal start date to July st
	fisStartDate = new Date(year,6,1);
	//console.log("Start Date:"+fisStartDate);
	//Set Fiscal End Date to current year july 1st.
	fisEndDate = new Date(fiscalyear,5,30);
	//console.log("End Date:"+fisEndDate);
  }
var yearBurned = (((today - fisEndDate)/1000/60/60/24)/(((fisEndDate - fisStartDate)/1000/60/60/24)) + 1)*100;
var totalBudgetSnow = 0;
var totalSpentSnow = 0;
var trend;
var difference;
var burned;
var domain = 'https://dashboard.udot.utah.gov/resource/';
var dataset0 = 'c9s4-gvqp.json';
var dataset1 = '9rrk-gnrp.json';
var query0 = "?$query=SELECT region,sum(amount) AS expenditures WHERE region in ('Region 1','Region 2','Region 3','Region 4') AND starts_with(appropriation,'X') AND (fund_id='2800' OR fund_id='2820') AND activity in ('7D81','7D83','7M51','7S75','7S76','7S77','7S78','7S79','7S80','7M95') AND fiscal_year="+fiscalyear+" AND account_type in ('22', '42') GROUP BY region ORDER BY region ASC";
var query1 = "?$query=SELECT region,sum(cost_planned) AS budget WHERE region in ('Region 1','Region 2','Region 3','Region 4') AND eff_fiscal_year="+fiscalyear+" AND activity in ('7D81','7D83','7M51','7S75','7S76','7S77','7S78','7S79','7S80','7M95') GROUP BY region ORDER BY region ASC";

var ExpendutiresDataSnow = domain+dataset0+query0;
var BudgetDataSnow = domain+dataset1+query1;

fetch(ExpendutiresDataSnow).then(function(response){
	return response.json();
	}).then(function(Expenditures) {
		fetch(BudgetDataSnow).then(function(response){
			return response.json();
			}).then(function(Budget) {
				console.log(Expenditures);
				console.log(Budget);
				var content = "<table class='flat-table'><tbody>";
				content += "<tr><th>Region</th><th>Budget</th><th>Spent</th><th>Difference</th></tr>";
				for(var i=0; i< Expenditures.length;i++) {
					difference = Number(Budget[i]["budget"]) - Number(Expenditures[i]["expenditures"]);
					// burned = Math.round((Number(Expenditures[i]["expenditures"])/ Number(Budget[i]["budget"]))*100);
					content += '<tr><td>'+Expenditures[i]["region"]+'</td><td>'+formatter.format(Budget[i]["budget"])+'</td>';
					content += '<td>'+formatter.format(Expenditures[i]["expenditures"])+'</td><td>'+formatter.format(difference)+'</td>';
					//content += '<td>'+burned+'%</td>';
					//content += '<td>'+yearBurned.toFixed(0)+'%</td>';
					//if(burned === yearBurned) {
						//trend = '<i class="fas fa-angle-double-right" style="color:yellow"></i>';
					//} else if(burned < yearBurned) {
						//trend = '<i class="fas fa-angle-double-down" style="color:green"></i>';
					//} else {
						//trend = '<i class="fas fa-angle-double-up" style="color:red"></i>';
					//}
					//content += '<td>'+trend+'</td>
					content +='</tr>';
					totalBudgetSnow += Number(Budget[i]["budget"]);
					totalSpentSnow += Number(Expenditures[i]["expenditures"]);
				}
				content += '<tfoot><tr><td>Total Snow Maintenance</td><td>'+formatter.format(totalBudgetSnow)+'</td>'
				content += '<td>'+formatter.format(totalSpentSnow)+'</td><td>'+formatter.format(totalBudgetSnow-totalSpentSnow)+'</td>';
				//content += '<td>'+Math.round((totalSpentSnow/totalBudgetSnow)*100)+'%</td><td>'+yearBurned.toFixed(0)+'%</td>';
				//if(Math.round((totalSpentSnow/totalBudgetSnow)*100) === yearBurned) {
				//		trend = '<i class="fas fa-angle-double-right" style="color:yellow"></i>';
				//	} else if(Math.round((totalSpentSnow/totalBudgetSnow)*100) < yearBurned) {
				//		trend = '<i class="fas fa-angle-double-down" style="color:green"></i>';
				//	} else {
				//		trend = '<i class="fas fa-angle-double-up" style="color:red"></i>';
				//	}
				content += '</tr></tfoot></tbody></table>';
				$('#here_table').append(content);

			}).catch(function(err){
				console.log(err);
			});
	}).catch(function(err){
	console.log(err);
});
