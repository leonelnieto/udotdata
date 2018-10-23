		var date = Date.now();
		var BudgetDataDS;
		var DataTotalsDS;
		var Budget_Data="https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT%20group_id,groups,sum(current_budget)%20AS%20budget,sum(amount)%20AS%20expenditure,sum(revenue)%20AS%20revenue,sum(expense_budget_difference)%20AS%20difference%20WHERE%20fiscal_year=2017%20AND%20group_id%20in%20(%278207%27,%278214%27)%20AND%20starts_with(appropriation,%27X%27)%20AND%20(fund_id=%272800%27%20OR%20fund_id=%272820%27)%20AND%20account_type%20in%20(%2722%27,%20%2731%27,%20%2742%27) AND "+ date +" = "+ date + "%20GROUP%20BY%20group_id,groups%20ORDER%20BY%20group_id"
		
var Data_Totals ="https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT%20sum(current_budget)%20AS%20budget,sum(amount)%20AS%20expenditure,sum(revenue)%20AS%20revenue,sum(expense_budget_difference)%20AS%20difference%20WHERE%20fiscal_year=2017%20AND%20group_id%20in%20(%278207%27,%278214%27)%20AND%20starts_with(appropriation,%27X%27)%20AND%20(fund_id=%272800%27%20OR%20fund_id=%272820%27)%20AND%20account_type%20in%20(%2722%27,%20%2731%27,%20%2742%27) AND "+ date +" = "+ date + ""
	
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
			
			var xmlhttp2 = new XMLHttpRequest();

			//Data Totals
			xmlhttp2.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					DataTotalsDS = JSON.parse(this.responseText);
					//Call function to display values on table
					setDataTotals();
				}
			};
						
			//Execute data calls
			xmlhttp1.open("GET", Budget_Data, true);
			xmlhttp1.send();
			xmlhttp2.open("GET", Data_Totals, true);
			xmlhttp2.send();
			
		}
		
		function setBudgetData(){
			//Budget and Execution data at FY level of aggregation
			document.getElementById("Group1").innerHTML = BudgetDataDS[0].groups;
			document.getElementById("GroupID1").innerHTML = BudgetDataDS[0].group_id;
			document.getElementById("Budget1").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[0].budget));
			document.getElementById("Revenue1").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[0].revenue));
			document.getElementById("Spent1").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[0].expenditure));
			document.getElementById("Difference1").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[0].difference));
			document.getElementById("Group2").innerHTML = BudgetDataDS[1].groups;
			document.getElementById("GroupID2").innerHTML = BudgetDataDS[1].group_id;
			document.getElementById("Budget2").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[1].budget));
			document.getElementById("Revenue2").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[1].revenue));
			document.getElementById("Spent2").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[1].expenditure));
			document.getElementById("Difference2").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[1].difference));

		}
		
		function setDataTotals(){
			//Data Totals
			document.getElementById("Budget3").innerHTML = numberWithCommas(CurrencyFormatted(DataTotalsDS[0].budget));
			document.getElementById("Revenue3").innerHTML = numberWithCommas(CurrencyFormatted(DataTotalsDS[0].revenue));
			document.getElementById("Spent3").innerHTML = numberWithCommas(CurrencyFormatted(DataTotalsDS[0].expenditure));
			document.getElementById("Difference3").innerHTML = numberWithCommas(CurrencyFormatted(DataTotalsDS[0].difference));
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
		
	//	<!--JKL - JS exception occurring because browser didn't know what "google" was - needed to reference Google's API-->
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(function() {
		    getdata();

		    // interval to check socrata data for changes
	//	    setInterval(function(){
	//	        getdata();
	//	    }, 10000);

		});