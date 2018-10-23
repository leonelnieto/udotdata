		var date = Date.now();
		var BudgetDataDS;
		var DataTotalsDS;
		var Budget_Data="https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT%20group_id,groups,sum(current_budget)%20AS%20budget,sum(amount)%20AS%20expenditure,sum(revenue)%20AS%20revenue,%20sum(expense_budget_difference)%20AS%20difference%20WHERE%20fiscal_year=2017%20AND%20group_id%20in%20(%278301%27,%20%278307%27,%20%278302%27,%20%278418%27,%20%278308%27,%20%278335%27,%20%278370%27,%20%278380%27,%20%278135%27,%20%278702%27,%20%278703%27,%20%278940%27)%20AND%20starts_with(appropriation,%27X%27)%20AND%20(fund_id=%272800%27%20OR%20fund_id=%272820%27)%20AND%20account_type%20in%20(%2722%27,%20%2731%27,%20%2742%27) AND "+ date +" = "+ date + "%20GROUP%20BY%20group_id,groups%20ORDER%20BY%20group_id"
		
		var Data_Totals="https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT%20sum(current_budget)%20AS%20budget,sum(amount)%20AS%20expenditure,sum(revenue)%20AS%20revenue,%20sum(expense_budget_difference)%20AS%20difference%20WHERE%20fiscal_year=2017%20AND%20group_id%20in%20(%278301%27,%20%278307%27,%20%278302%27,%20%278418%27,%20%278308%27,%20%278335%27,%20%278370%27,%20%278380%27,%20%278135%27,%20%278702%27,%20%278703%27,%20%278940%27)%20AND%20starts_with(appropriation,%27X%27)%20AND%20(fund_id=%272800%27%20OR%20fund_id=%272820%27)%20AND%20account_type%20in%20(%2722%27,%20%2731%27,%20%2742%27) AND "+ date +" = "+ date + ""	
	
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
			document.getElementById("Group3").innerHTML = BudgetDataDS[2].groups;
			document.getElementById("GroupID3").innerHTML = BudgetDataDS[2].group_id;
			document.getElementById("Budget3").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[2].budget));
			document.getElementById("Revenue3").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[2].revenue));
			document.getElementById("Spent3").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[2].expenditure));
			document.getElementById("Difference3").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[2].difference));
			document.getElementById("Group4").innerHTML = BudgetDataDS[3].groups;
			document.getElementById("GroupID4").innerHTML = BudgetDataDS[3].group_id;
			document.getElementById("Budget4").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[3].budget));
			document.getElementById("Revenue4").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[3].revenue));
			document.getElementById("Spent4").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[3].expenditure));
			document.getElementById("Difference4").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[3].difference));
			document.getElementById("Group5").innerHTML = BudgetDataDS[4].groups;
			document.getElementById("GroupID5").innerHTML = BudgetDataDS[4].group_id;
			document.getElementById("Budget5").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[4].budget));
			document.getElementById("Revenue5").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[4].revenue));
			document.getElementById("Spent5").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[4].expenditure));
			document.getElementById("Difference5").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[4].difference));
			document.getElementById("Group6").innerHTML = BudgetDataDS[5].groups;
			document.getElementById("GroupID6").innerHTML = BudgetDataDS[5].group_id;
			document.getElementById("Budget6").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[5].budget));
			document.getElementById("Revenue6").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[5].revenue));
			document.getElementById("Spent6").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[5].expenditure));
			document.getElementById("Difference6").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[5].difference));
			document.getElementById("Group7").innerHTML = BudgetDataDS[6].groups;
			document.getElementById("GroupID7").innerHTML = BudgetDataDS[6].group_id;
			document.getElementById("Budget7").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[6].budget));
			document.getElementById("Revenue7").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[6].revenue));
			document.getElementById("Spent7").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[6].expenditure));
			document.getElementById("Difference7").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[6].difference));
			document.getElementById("Group8").innerHTML = BudgetDataDS[7].groups;
			document.getElementById("GroupID8").innerHTML = BudgetDataDS[7].group_id;
			document.getElementById("Budget8").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[7].budget));
			document.getElementById("Revenue8").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[7].revenue));
			document.getElementById("Spent8").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[7].expenditure));
			document.getElementById("Difference8").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[7].difference));
			document.getElementById("Group9").innerHTML = BudgetDataDS[8].groups;
			document.getElementById("GroupID9").innerHTML = BudgetDataDS[8].group_id;
			document.getElementById("Budget9").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[8].budget));
			document.getElementById("Revenue9").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[8].revenue));
			document.getElementById("Spent9").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[8].expenditure));
			document.getElementById("Difference9").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[8].difference));
			document.getElementById("Group10").innerHTML = BudgetDataDS[9].groups;
			document.getElementById("GroupID10").innerHTML = BudgetDataDS[9].group_id;
			document.getElementById("Budget10").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[9].budget));
			document.getElementById("Revenue10").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[9].revenue));
			document.getElementById("Spent10").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[9].expenditure));
			document.getElementById("Difference10").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[9].difference));
			document.getElementById("Group11").innerHTML = BudgetDataDS[10].groups;
			document.getElementById("GroupID11").innerHTML = BudgetDataDS[10].group_id;
			document.getElementById("Budget11").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[10].budget));
			document.getElementById("Revenue11").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[10].revenue));
			document.getElementById("Spent11").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[10].expenditure));
			document.getElementById("Difference11").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[10].difference));
			document.getElementById("Group12").innerHTML = BudgetDataDS[11].groups;
			document.getElementById("GroupID12").innerHTML = BudgetDataDS[11].group_id;
			document.getElementById("Budget12").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[11].budget));
			document.getElementById("Revenue12").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[11].revenue));
			document.getElementById("Spent12").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[11].expenditure));
			document.getElementById("Difference12").innerHTML = numberWithCommas(CurrencyFormatted(BudgetDataDS[11].difference));
			
		}
		
		function setDataTotals(){
			//Data Totals
			document.getElementById("Budget13").innerHTML = numberWithCommas(CurrencyFormatted(DataTotalsDS[0].budget));
			document.getElementById("Revenue13").innerHTML = numberWithCommas(CurrencyFormatted(DataTotalsDS[0].revenue));
			document.getElementById("Spent13").innerHTML = numberWithCommas(CurrencyFormatted(DataTotalsDS[0].expenditure));
			document.getElementById("Difference13").innerHTML = numberWithCommas(CurrencyFormatted(DataTotalsDS[0].difference));
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
		
		// <!--JKL - JS exception occurring because browser didn't know what "google" was - needed to reference Google's API-->
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(function() {
		    getdata();

		    // interval to check socrata data for changes
	//	    setInterval(function(){
	//	        getdata();
	//	    }, 10000);

		});