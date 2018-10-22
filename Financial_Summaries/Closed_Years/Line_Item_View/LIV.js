		var date = Date.now();
		var BudgetDataDS;
		var DataTotalsDS;
		var Budget_Data="https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT%20line_item,(sum(current_budget)-sum(estimated_revenue))%20AS%20budget,sum(amount)%20AS%20expenditure,sum(revenue)%20AS%20revenue%20WHERE%20fiscal_year=2017%20AND%20%20starts_with(appropriation,%27X%27)%20AND%20(fund_id=%272800%27%20OR%20fund_id=%272820%27) AND "+ date +" = "+ date + "%20GROUP%20BY%20line_item%20ORDER%20BY%20line_item"
var Data_Totals = "https://dashboard.udot.utah.gov/resource/c9s4-gvqp.json?$query=SELECT%20(sum(current_budget)-sum(estimated_revenue))%20AS%20budget,sum(amount)%20AS%20expenditure,sum(revenue)%20AS%20revenue%20WHERE%20fiscal_year=2017%20AND%20starts_with(appropriation,%27X%27)%20AND%20(fund_id=%272800%27%20OR%20fund_id=%272820%27)%20AND%20line_item%20in%20(%27Aeronautics%20Line%20Item%27,%20%27Construction%20Management%20Line%20Item%27,%20%27Engineering%20Services%20Line%20Item%27,%27Equipment%20Management%20Line%20Item%27,%20%20%27Operations%20Line%20Item%27,%20%27Region%20Management%20Line%20Item%27,%20%27Support%20Services%20Line%20Item%27,%20%27Miscellaneous%20Units%27) AND "+ date +" = "+ date + ""
	
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
			xmlhttp1.open("GET", Budget_Data, false);
			xmlhttp1.send();
			xmlhttp2.open("GET", Data_Totals, false);
			xmlhttp2.send();
			
		}
		
		function setBudgetData(){
			// Undefined values at the end of BudgetDataDS.length, subtract one. 
            
                 var tr;
                for (var i = 0; i < BudgetDataDS.length - 1; i++) {
                    tr = $('<tr/>');
                    tr.append("<td>" + BudgetDataDS[i].line_item + "</td>");
                    tr.append("<td class = right>" + "$" + numberWithCommas(CurrencyFormatted(BudgetDataDS[i].budget)) + "</td>");
                    tr.append("<td class = right>" + "$" + numberWithCommas(CurrencyFormatted(BudgetDataDS[i].revenue)) + "</td class = right>");
                    tr.append("<td class = right>" +  "$" + numberWithCommas(CurrencyFormatted(BudgetDataDS[i].expenditure)) + "</td>");
                  
           if (Number(BudgetDataDS[i].budget) + Number(BudgetDataDS[i].revenue) - Number(BudgetDataDS[i].expenditure) <= 0) { tr.append("<td class=negMoney>" + "$" + numberWithCommas(CurrencyFormatted(Number(BudgetDataDS[i].budget) + Number(BudgetDataDS[i].revenue) - Number(BudgetDataDS[i].expenditure))) + "</td>"); } 

else { tr.append("<td class=right>" + "$" + numberWithCommas(CurrencyFormatted(Number(BudgetDataDS[i].budget) + Number(BudgetDataDS[i].revenue) - Number(BudgetDataDS[i].expenditure))) + "</td>");}
                    $('table').append(tr);
                }


            }
    
		
		function setDataTotals(){
			//Data Totals
             var tot;
              for (var j = 0; j < DataTotalsDS.length; j++) {
                    tot = $('<tr>');
                    tot.append("<td class = right>" + "<b>Total</b>" + "</td>");
                    
                    tot.append("<td class = right>" + "$" + numberWithCommas(CurrencyFormatted(DataTotalsDS[j].budget)) + "</td>");
                    tot.append("<td class = right>" + "$" + numberWithCommas(CurrencyFormatted(DataTotalsDS[j].revenue)) + "</td>");
                     tot.append("<td class = right>" + "$" +numberWithCommas(CurrencyFormatted(DataTotalsDS[j].expenditure)) + "</td>");
                    tot.append("<td class = right>" +  "$" + numberWithCommas(CurrencyFormatted(Number(DataTotalsDS[j].budget) + 			Number(DataTotalsDS[j].revenue) - Number(DataTotalsDS[j].expenditure))) + "</td>" + "</tr>");
                    $('table').append(tot);

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
		
		<!--JKL - JS exception occurring because browser didn't know what "google" was - needed to reference Google's API-->
		google.charts.load('current', {'packages':['corechart']});
		google.charts.setOnLoadCallback(function() {
		    getdata();

		    // interval to check socrata data for changes
		    //setInterval(function(){
		      //  getdata();
		    //}, 10000);

		});