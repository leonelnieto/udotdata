      function getdata() {

          // statewide  
          var fatalities_url = "https://dashboard.udot.utah.gov/resource/7m63-di6s.json?$query=SELECT%20year,actual,target%20WHERE%20category=%27Fatalities%27%20AND%20Region=%27Statewide%27%20AND%20YEAR%3E=2012%20ORDER%20BY%20YEAR";

          // region 1  
          //var fatalities_url = "https://dashboard.udot.utah.gov/resource/7m63-di6s.json?$query=SELECT%20year,actual,target%20WHERE%20category=%27Fatalities%27%20AND%20Region=%27Region%201%27%20AND%20YEAR%3E=2012%20ORDER%20BY%20YEAR";

          // region 2  
          //var fatalities_url = "https://dashboard.udot.utah.gov/resource/7m63-di6s.json?$query=SELECT%20year,actual,target%20WHERE%20category=%27Fatalities%27%20AND%20Region=%27Region%202%27%20AND%20YEAR%3E=2012%20ORDER%20BY%20YEAR";

          // region 3  
          //var fatalities_url = "https://dashboard.udot.utah.gov/resource/7m63-di6s.json?$query=SELECT%20year,actual,target%20WHERE%20category=%27Fatalities%27%20AND%20Region=%27Region%203%27%20AND%20YEAR%3E=2012%20ORDER%20BY%20YEAR";

          // region 4  
          //var fatalities_url = "https://dashboard.udot.utah.gov/resource/7m63-di6s.json?$query=SELECT%20year,actual,target%20WHERE%20category=%27Fatalities%27%20AND%20Region=%27Region%204%27%20AND%20YEAR%3E=2012%20ORDER%20BY%20YEAR";


        var i, max;
        var year;
        makeRequest(fatalities_url, function(results) {
          var Crashes = JSON.parse(results);


          var ActualFatalities2012;
          var ActualFatalities2013;
          var ActualFatalities2014;
          var ActualFatalities2015;
          var ActualFatalities2016;
          var ActualFatalities2017;
          var ActualFatalities2018;

          var ReductionTarget2012;
          var ReductionTarget2013;
          var ReductionTarget2014;
          var ReductionTarget2015;
          var ReductionTarget2016;
          var ReductionTarget2017;
          var ReductionTarget2018;

          max = Crashes.length

          for (i = 0; i < max; i++) {

            switch (Crashes[i].year) {
              case "2012":
                ActualFatalities2012 = Crashes[i].actual;
                ReductionTarget2012 = Crashes[i].target;
                break;
              case "2013":
                ActualFatalities2013 = Crashes[i].actual;
                ReductionTarget2013 = Crashes[i].target;
                break;
              case "2014":
                ActualFatalities2014 = Crashes[i].actual;
                ReductionTarget2014 = Crashes[i].target;
                break;
              case "2015":
                ActualFatalities2015 = Crashes[i].actual;
                ReductionTarget2015 = Crashes[i].target;
                break;
              case "2016":
                ActualFatalities2016 = Crashes[i].actual;
                ReductionTarget2016 = Crashes[i].target;
                break;
              case "2017":
                ActualFatalities2017 = Crashes[i].actual;
                ReductionTarget2017 = Crashes[i].target;
                break;
              case "2018":
                ActualFatalities2018 = Crashes[i].actual;
                ReductionTarget2018 = Crashes[i].target;
                break;
            }
          }
          document.getElementById("ActualFatalities2013").innerHTML = ActualFatalities2013;
          document.getElementById("ActualFatalities2014").innerHTML = ActualFatalities2014;
          document.getElementById("ActualFatalities2015").innerHTML = ActualFatalities2015;
          document.getElementById("ActualFatalities2016").innerHTML = ActualFatalities2016;
          document.getElementById("ActualFatalities2017").innerHTML = ActualFatalities2017;
          document.getElementById("ActualFatalities2018").innerHTML = ActualFatalities2018;

          document.getElementById("ReductionTarget2013").innerHTML = ReductionTarget2013;
          document.getElementById("ReductionTarget2014").innerHTML = ReductionTarget2014;
          document.getElementById("ReductionTarget2015").innerHTML = ReductionTarget2015;
          document.getElementById("ReductionTarget2016").innerHTML = ReductionTarget2016;
          document.getElementById("ReductionTarget2017").innerHTML = ReductionTarget2017;
          document.getElementById("ReductionTarget2018").innerHTML = ReductionTarget2018;
        });

        function makeRequest(url, callback) {
          // ajax call to get data
          if (url === '') {
            callback(50);
          } else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp.responseText);
              }
            };
            xhttp.open('Get', url, true);
            xhttp.setRequestHeader('X-App-Token', 'SD6rIpSDnv1u0DBGtVnIqKxT9');
            xhttp.send();
          }
        }

      };

      google.charts.load('current', {
        packages: ['corechart']
      });
      google.charts.setOnLoadCallback(function() {
        getdata();

        // interval to check socrata data for changes
   //     setInterval(function() {
   //       getdata();
   //     }, 10000);

      });