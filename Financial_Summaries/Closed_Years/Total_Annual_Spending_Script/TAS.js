		var date = Date.now();
		var BudgetDataDS;
		var Budget_Data="https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT fiscal_year,(sum(current_budget)-sum(estimated_revenue)) AS budget,sum(amount) AS expenditure,sum(revenue) AS revenue WHERE starts_with(appropriation,'X') AND (fund_id='2800' OR fund_id='2820') AND "+ date +" = "+ date + " GROUP BY fiscal_year ORDER BY fiscal_year DESC"	
	
		function getdata(){

			var xmlhttp1 = new XMLHttpRequest();

			//Budget Data
			xmlhttp1.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					BudgetDataDS = JSON.parse(this.responseText);
					//Call function to display values on table
					setBudgetData();
				}
			};
			
						
			//Execute data calls
			xmlhttp1.open("GET", Budget_Data, true);
			xmlhttp1.send();

		}
		
		
		  function setBudgetData() {
                //Budget and Execution data at FY level of aggregation - 2015 - 2017; if i is set to 0 FY 2018 is counted as well. 
                var tr;
                for (var i = 1; i < BudgetDataDS.length ; i++) {
                    tr = $('<tr/>');
                  tr.append("<td class=center>" + BudgetDataDS[i].fiscal_year + "</td>");
tr.append("<td class=right>" + "$" + numberWithCommas(CurrencyFormatted(BudgetDataDS[i].budget)) + "</td>");
tr.append("<td class=right>" + "$" + numberWithCommas(CurrencyFormatted(BudgetDataDS[i].revenue)) + "</td>");
tr.append("<td class=right>" + "$" + numberWithCommas(CurrencyFormatted(BudgetDataDS[i].expenditure)) + "</td>");


if (Number(BudgetDataDS[i].budget) + Number(BudgetDataDS[i].revenue) - Number(BudgetDataDS[i].expenditure) <= 0) { tr.append("<td class=negMoney>" + "$" + numberWithCommas(CurrencyFormatted(Number(BudgetDataDS[i].budget) + Number(BudgetDataDS[i].revenue) - Number(BudgetDataDS[i].expenditure))) + "</td>"); } 

else { tr.append("<td class=right>" + "$" + numberWithCommas(CurrencyFormatted(Number(BudgetDataDS[i].budget) + Number(BudgetDataDS[i].revenue) - Number(BudgetDataDS[i].expenditure))) + "</td>");}
                    $('table').append(tr);
                }


            }
			
		function CurrencyFormatted(amount) {
			var i = parseFloat(amount);
			if(isNaN(i)) { i = 0.00; }
			var minus = '';
			if(i < 0) { minus = '-'; }
			i = Math.abs(i);
			i = parseInt((i + .005) * 100);
			i = i / 100;
			s = new String(i);
			if(s.indexOf('.') < 0) { s += '.00'; }
			if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
			s = minus + s;
			return s;
		}

		function numberWithCommas(x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		//<!--JKL - JS exception occurring because browser didn't know what "google" was - needed to reference Google's API-->
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(function() {
		    getdata();

		    // interval to check socrata data for changes
		   // setInterval(function(){
		       // getdata();
		    //}, 10000);

		});