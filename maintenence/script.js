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
//var ExpDataDS;
//var RegionBudgetDS;
//var MaintBudgetDS;
//var MaintExpDS;
var totalBudget = 0;
var totalSpent = 0;
var trend;
var difference;
var burned;
var domain = 'https://dashboard.udot.utah.gov/resource/';
var dataset0 = 'c9s4-gvqp.json';
var dataset1 = '9rrk-gnrp.json';
var query0 = "?$query=SELECT region,sum(amount) AS expenditures WHERE region in ('Region 1','Region 2','Region 3','Region 4') AND starts_with(appropriation,'X') AND (fund_id='2800' OR fund_id='2820') AND activity in ('7M75','7S40','7D81','7D83','7M51','7M95','7S75','7S76','7S77','7S78','7S79','7S80','7D06','7D07','7D10','7D13','7D22','7M52','7S01','7S02','7S05','7D08','7D09','7D12','7M04','7M53','7D14','7D15','7D19','7M54','7D30','7M55','7S22','7S28','7M74','7S43','7M56','7M57','7S38','7S39','7S45','7M58','7S44','7M59','7S54','7D34','7M61','7D35','7M76','7S33','7M77','7S32','7M12','7S42','7D58','7S46','7S52','7S53','7S56','7D61','7M62','7S51','7M63','7S55','7S84','7M64','7D60','7D62','7M78','7S58','7D47','7S49','7D70','7D71','7D74','7M65','7D69','7D72','7M66','7D73','7D78','7M67','7S63','7S64','7S65','7S68','7D77','7M68','7S41','7S66','7S70','7S71','7S72','7S72','7D79','7M10','7D75','7D76','7D80','7D85','7M69','7M70','7S69','7M71','7S67','7M92','7D84','7FIX','7L01','7L03','7M01','7M02','7M03','7M05','7M06','7M07','7M08','7M09','7M11','7M15','7M30','7M60','7M72','7M73','7M80','7M87','7M88','7M89','7M90','7M91','7M93','7M99','8M02','7G99','7M86','7BAR','7BRU','7CUT','7GAR','7GBR','7GCR','7GFR','7GGR','7HAR','7IZR','7KBR','7MDR','7NBR','7NCR','7NZR','7PAI','7PMA','7PMB','7TCH','7TIR','7TRP','7TRS','7WAS','7WIP','7ZZZ','7P04','7P05','7P06','7P07') AND fiscal_year="+fiscalyear+" AND account_type in ('22') GROUP BY region ORDER BY region ASC";
var query1 = "?$query=SELECT region,sum(cost_planned) AS budget WHERE region in ('Region 1','Region 2','Region 3','Region 4') AND eff_fiscal_year="+fiscalyear+"GROUP BY region ORDER BY region ASC";

var ExpendutiresData = domain+dataset0+query0;
var BudgetData = domain+dataset1+query1;

fetch(ExpendutiresData).then(function(response){
	return response.json();
	}).then(function(Expenditures) {
		fetch(BudgetData).then(function(response){
			return response.json();
			}).then(function(Budget) {
				console.log(Expenditures);
				console.log(Budget);
				var content = "<table class='flat-table'><tbody>";
				content += "<tr><th>Region</th><th>Budget</th><th>Spent</th><th>Difference</th><th>% $ Expended</th><th>% Year Elapsed</th></tr>";
				for(var i=0; i< Expenditures.length;i++) {
					difference = Number(Budget[i]["budget"]) - Number(Expenditures[i]["expenditures"]);
					burned = Math.round((Number(Expenditures[i]["expenditures"])/ Number(Budget[i]["budget"]))*100);
					content += '<tr><td>'+Expenditures[i]["region"]+'</td><td>'+formatter.format(Budget[i]["budget"])+'</td>';
					content += '<td>'+formatter.format(Expenditures[i]["expenditures"])+'</td><td>'+formatter.format(difference)+'</td>';
					content += '<td>'+burned+'%</td>';
					content += '<td>'+yearBurned.toFixed(0)+'%</td>';
					//if(burned === yearBurned) {
						//trend = '<i class="fas fa-angle-double-right" style="color:yellow"></i>';
					//} else if(burned < yearBurned) {
						//trend = '<i class="fas fa-angle-double-down" style="color:green"></i>';
					//} else {
						//trend = '<i class="fas fa-angle-double-up" style="color:red"></i>';
					//}
					//content += '<td>'+trend+'</td>
					content +='</tr>';
					totalBudget += Number(Budget[i]["budget"]);
					totalSpent += Number(Expenditures[i]["expenditures"]);
				}
				content += '<tfoot><tr><td>Total Maintenance</td><td>'+formatter.format(totalBudget)+'</td>'
				content += '<td>'+formatter.format(totalSpent)+'</td><td>'+formatter.format(totalBudget-totalSpent)+'</td>';
				content += '<td>'+Math.round((totalSpent/totalBudget)*100)+'%</td><td>'+yearBurned.toFixed(1)+'%</td>';
				//if(Math.round((totalSpent/totalBudget)*100) === yearBurned) {
				//		trend = '<i class="fas fa-angle-double-right" style="color:yellow"></i>';
				//	} else if(Math.round((totalSpent/totalBudget)*100) < yearBurned) {
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
