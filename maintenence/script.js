var date = Date.now();
		var ExpDataDS;
		var RegionBudgetDS;
		var MaintBudgetDS;
		var MaintExpDS;
		var Exp_Data="https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT region,sum(amount) AS expenditures WHERE region in ('Region 1','Region 2','Region 3','Region 4') AND starts_with(appropriation,'X') AND (fund_id='2800' OR fund_id='2820') AND activity in ('7M75','7S40','7D81','7D83','7M51','7M95','7S75','7S76','7S77','7S78','7S79','7S80','7D06','7D07','7D10','7D13','7D22','7M52','7S01','7S02','7S05','7D08','7D09','7D12','7M04','7M53','7D14','7D15','7D19','7M54','7D30','7M55','7S22','7S28','7M74','7S43','7M56','7M57','7S38','7S39','7S45','7M58','7S44','7M59','7S54','7D34','7M61','7D35','7M76','7S33','7M77','7S32','7M12','7S42','7D58','7S46','7S52','7S53','7S56','7D61','7M62','7S51','7M63','7S55','7S84','7M64','7D60','7D62','7M78','7S58','7D47','7S49','7D70','7D71','7D74','7M65','7D69','7D72','7M66','7D73','7D78','7M67','7S63','7S64','7S65','7S68','7D77','7M68','7S41','7S66','7S70','7S71','7S72','7S72','7D79','7M10','7D75','7D76','7D80','7D85','7M69','7M70','7S69','7M71','7S67','7M92','7D84','7FIX','7L01','7L03','7M01','7M02','7M03','7M05','7M06','7M07','7M08','7M09','7M11','7M15','7M30','7M60','7M72','7M73','7M80','7M87','7M88','7M89','7M90','7M91','7M93','7M99','8M02','7G99','7M86','7BAR','7BRU','7CUT','7GAR','7GBR','7GCR','7GFR','7GGR','7HAR','7IZR','7KBR','7MDR','7NBR','7NCR','7NZR','7PAI','7PMA','7PMB','7TCH','7TIR','7TRP','7TRS','7WAS','7WIP','7ZZZ','7P04','7P05','7P06','7P07') AND fiscal_year='2019' AND account_type in ('22') AND "+ date +" = "+ date + "GROUP BY region ORDER BY region ASC"
		var RegionBudget="https://dashboard.udot.utah.gov/resource/9rrk-gnrp.json?$query=SELECT region,sum(cost_planned) AS budget WHERE region in ('Region 1','Region 2','Region 3','Region 4') AND eff_fiscal_year = 2019 GROUP BY region ORDER BY region ASC"
		var MaintBudget ="https://dashboard.udot.utah.gov/resource/9rrk-gnrp.json?$query=SELECT sum(cost_planned) AS budget WHERE region in ('Region 1','Region 2','Region 3','Region 4') AND eff_fiscal_year = 2019"
		var MaintExp="https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT sum(amount) AS expenditures WHERE region in ('Region 1','Region 2','Region 3','Region 4') AND starts_with(appropriation,'X') AND (fund_id='2800' OR fund_id='2820') AND activity in ('7M75','7S40','7D81','7D83','7M51','7M95','7S75','7S76','7S77','7S78','7S79','7S80','7D06','7D07','7D10','7D13','7D22','7M52','7S01','7S02','7S05','7D08','7D09','7D12','7M04','7M53','7D14','7D15','7D19','7M54','7D30','7M55','7S22','7S28','7M74','7S43','7M56','7M57','7S38','7S39','7S45','7M58','7S44','7M59','7S54','7D34','7M61','7D35','7M76','7S33','7M77','7S32','7M12','7S42','7D58','7S46','7S52','7S53','7S56','7D61','7M62','7S51','7M63','7S55','7S84','7M64','7D60','7D62','7M78','7S58','7D47','7S49','7D70','7D71','7D74','7M65','7D69','7D72','7M66','7D73','7D78','7M67','7S63','7S64','7S65','7S68','7D77','7M68','7S41','7S66','7S70','7S71','7S72','7S72','7D79','7M10','7D75','7D76','7D80','7D85','7M69','7M70','7S69','7M71','7S67','7M92','7D84','7FIX','7L01','7L03','7M01','7M02','7M03','7M05','7M06','7M07','7M08','7M09','7M11','7M15','7M30','7M60','7M72','7M73','7M80','7M87','7M88','7M89','7M90','7M91','7M93','7M99','8M02','7G99','7M86','7BAR','7BRU','7CUT','7GAR','7GBR','7GCR','7GFR','7GGR','7HAR','7IZR','7KBR','7MDR','7NBR','7NCR','7NZR','7PAI','7PMA','7PMB','7TCH','7TIR','7TRP','7TRS','7WAS','7WIP','7ZZZ','7P04','7P05','7P06','7P07') AND fiscal_year='2019' AND account_type in ('22')"
	
		function getdata(){

			var xmlhttp1 = new XMLHttpRequest();
			var xmlhttp2 = new XMLHttpRequest();
			var xmlhttp3 = new XMLHttpRequest();
			var xmlhttp4 = new XMLHttpRequest();
			//Exp Data
			xmlhttp1.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					ExpDataDS = JSON.parse(this.responseText);
					//Call function to display values on table
					setMaintData();
				}
			};
			
			//Budget Data
			xmlhttp2.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					RegionBudgetDS = JSON.parse(this.responseText);
					//Call function to display values on table
				}
			};
			
			//Totals
			xmlhttp3.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					MaintBudgetDS = JSON.parse(this.responseText);
					//Call function to display values on table
				}
			};
			
			xmlhttp4.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					MaintExpDS = JSON.parse(this.responseText);
					//Call function to display values on table
				}
			};
						
			//Execute data calls
			xmlhttp1.open("GET", Exp_Data, true);
			xmlhttp1.send();
			xmlhttp2.open("GET", RegionBudget, true);
			xmlhttp2.send();
			xmlhttp3.open("GET", MaintBudget, true);
			xmlhttp3.send();
			xmlhttp4.open("GET", MaintExp, true);
			xmlhttp4.send();
		}
		
		//  % of year calculation
		let now = new Date();

		// Get current year, month, and day
		let currYear = now.getFullYear();
		let currMonth = now.getMonth();
		let currDay = now.getDate();

		// Construct beggining of FY using current calendar year, months are 0 based indexes
		let test = new Date(currYear, 6, 1)

		// Establish current FY start var
		let fyStart;

		if (now.getTime() > test.getTime()) {
		  // Current date is AFTER 7/1 of current calendar year
		  fyStart = test;
		} else {
		  // Current date is BEFORE 7/1 of current calendar year
		  fyStart = new Date(currYear - 1, 6, 1)
		}

		// Calculate milliseconds from start of FY year to current date rounded to 12am midnight;
		let millsecGoneBy = new Date(currYear, currMonth, currDay) - fyStart;
		// Convert milliseconds to days
		let daysGoneBy = millsecGoneBy/1000/60/60/24

		// Calculate ratio of FY elapsed:
		let ratio = Math.round(daysGoneBy/365*100);
		
		function setMaintData(){
			//Budget and Execution data at FY level of aggregation
			document.getElementById("Region1").innerHTML = ExpDataDS[0].region;
			document.getElementById("Budget1").innerHTML = numberWithCommas(CurrencyFormatted(RegionBudgetDS[0].budget));
			document.getElementById("Spent1").innerHTML = numberWithCommas(CurrencyFormatted(ExpDataDS[0].expenditures));
			document.getElementById("Difference1").innerHTML = numberWithCommas(CurrencyFormatted(RegionBudgetDS[0].budget - ExpDataDS[0].expenditures));
			document.getElementById("PctExp1").innerHTML = Math.round((Number(ExpDataDS[0].expenditures) / Number(RegionBudgetDS[0].budget))*100) + "%";
			document.getElementById("PctYear1").innerHTML = ratio + "%";
			document.getElementById("Region2").innerHTML = ExpDataDS[1].region;
			document.getElementById("Budget2").innerHTML = numberWithCommas(CurrencyFormatted(RegionBudgetDS[1].budget));
			document.getElementById("Spent2").innerHTML = numberWithCommas(CurrencyFormatted(ExpDataDS[1].expenditures));
			document.getElementById("Difference2").innerHTML = numberWithCommas(CurrencyFormatted(RegionBudgetDS[1].budget - ExpDataDS[1].expenditures));
			document.getElementById("PctExp2").innerHTML = Math.round((Number(ExpDataDS[1].expenditures) / Number(RegionBudgetDS[1].budget))*100) + "%";
			document.getElementById("PctYear2").innerHTML = ratio + "%";
			document.getElementById("Region3").innerHTML = ExpDataDS[2].region;
			document.getElementById("Budget3").innerHTML = numberWithCommas(CurrencyFormatted(RegionBudgetDS[2].budget));
			document.getElementById("Spent3").innerHTML = numberWithCommas(CurrencyFormatted(ExpDataDS[2].expenditures));
			document.getElementById("Difference3").innerHTML = numberWithCommas(CurrencyFormatted(RegionBudgetDS[2].budget - ExpDataDS[2].expenditures));
			document.getElementById("PctExp3").innerHTML = Math.round((Number(ExpDataDS[2].expenditures) / Number(RegionBudgetDS[2].budget))*100) + "%";
			document.getElementById("PctYear3").innerHTML = ratio + "%";
			document.getElementById("Region4").innerHTML = ExpDataDS[3].region;
			document.getElementById("Budget4").innerHTML = numberWithCommas(CurrencyFormatted(RegionBudgetDS[3].budget));
			document.getElementById("Spent4").innerHTML = numberWithCommas(CurrencyFormatted(ExpDataDS[3].expenditures));
			document.getElementById("Difference4").innerHTML = numberWithCommas(CurrencyFormatted(RegionBudgetDS[3].budget - ExpDataDS[3].expenditures));
			document.getElementById("PctExp4").innerHTML = Math.round((Number(ExpDataDS[3].expenditures) / Number(RegionBudgetDS[3].budget))*100) + "%";
			document.getElementById("PctYear4").innerHTML = ratio + "%";
			document.getElementById("Budget5").innerHTML = numberWithCommas(CurrencyFormatted(MaintBudgetDS[0].budget));
			document.getElementById("Spent5").innerHTML = numberWithCommas(CurrencyFormatted(MaintExpDS[0].expenditures));
			document.getElementById("Difference5").innerHTML = numberWithCommas(CurrencyFormatted(MaintBudgetDS[0].budget - MaintExpDS[0].expenditures));
			document.getElementById("PctExp5").innerHTML = Math.round((Number(MaintExpDS[0].expenditures) / Number(MaintBudgetDS[0].budget))*100) + "%";
			document.getElementById("PctYear5").innerHTML = ratio + "%";
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

		<!--JKL - JS exception occurring because browser didn't know what "google" was - needed to reference Google's API-->
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(function() {
		    getdata();

		    // interval to check socrata data for changes
		    setInterval(function(){
		        getdata();
		    }, 10000);

		});
		
