var date = Date.now();
var ProjectDataDS;
var ProjectTotalsDS;

//Project_Data = "https://dashboard.udot.utah.gov/resource/7xgd-ekuq.json?$query=SELECT%20region,project_manager,pin,pin_description,projcet_value,cost_estimate,committed_advertise_date,actual_advertise_date,project_delivery_method,%20CASE(date_extract_m(committed_advertise_date)%20between%201%20and%206,date_extract_y(committed_advertise_date),date_extract_m(committed_advertise_date)%20between%207%20and%2012,%20date_extract_y(committed_advertise_date)%2b1)%20AS%20committed_fy,CASE(date_extract_m(actual_advertise_date)%20between%201%20and%206,date_extract_y(actual_advertise_date),date_extract_m(actual_advertise_date)%20between%207%20and%2012,date_extract_y(actual_advertise_date)%2B1)%20AS%20actual_fy%20WHERE%20actual_advertise_date%20between%20commission_rprt_start_date%20and%20as_of_dtg AND "+ date +" = "+ date + "%20ORDER%20BY%20region,%20pin"

Project_Data = "https://dashboard.udot.utah.gov/resource/ijf2-cskg.json?$query=%20SELECT%20region,%20count(proj_xref_no)%20WHERE%20acquisition_status%20=%20%27Parcel%20is%20in%20acquisition%20process%27%20OR%20acquisition_status%20=%20%27Parcel%20is%20now%20in%20condemnation%27%20GROUP%20BY%20region%20ORDER%20BY%20region"

Project_Totals = "https://dashboard.udot.utah.gov/resource/7xgd-ekuq.json?$query=%20SELECT%20sum(projcet_value),%20sum(cost_estimate)%20WHERE%20actual_advertise_date%20between%20commission_rprt_start_date%20and%20as_of_dtg AND " + date + " = " + date + ""

function getdata() {

    var xmlhttp1 = new XMLHttpRequest();
    var xmlhttp2 = new XMLHttpRequest();

    //TIF Data
    xmlhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            ProjectDataDS = JSON.parse(this.responseText);
            //Call function to display values on table
            setTableData();
        }
    };

    //Totals
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            ProjectTotalsDS = JSON.parse(this.responseText);
            //Call function to display totals on table
            setTableTotals();
        }
    };


    //Execute data calls
    xmlhttp1.open("GET", Project_Data, true);
    xmlhttp1.send();
    xmlhttp2.open("GET", Project_Totals, true);
    xmlhttp2.send();

}

// Populate table
function setTableData() {
    for (var i = 0; i < ProjectDataDS.length; i++) {
        var obj = ProjectDataDS[i];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
                obj[prop] = +obj[prop];
            }
        }
    }
    var tr;
    for (var i = 0; i < (ProjectDataDS.length); i++) {
        tr = $('<tr>');
        tr.append("<td id=goodfairmetricstd2>" + ProjectDataDS[i].region.capitalize() + "</td>");
        tr.append("<td id=goodfairmetricstd2>" + ProjectDataDS[i].count_proj_xref_no + "</td>");
        $('table').append(tr);
    }

}


String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/\b\w/g, function (m) {
        return m.toUpperCase();
    });
};


// Populate table totals
//function setTableTotals() {
//    var tot;

//    for (var j = 0; j < (ProjectTotalsDS.length); j++) {
//        tot = $('<tr>');
//        tot.append("<td id=goodfairmetricstdright>" + "<b>Total</b>" + "</td>");
//        tot.append("<td id=goodfairmetricstdcenter>" + "<b>----</b>" + "</td>");
//        tot.append("<td id=goodfairmetricstdcenter>" + "<b>----</b>" + "</td>");
//        tot.append("<td id=goodfairmetricstdcentertot> No. of Projects: " + ProjectDataDS.length + "</td>");
//        tot.append("<td id=goodfairmetricstdrighttot> $" + numberWithCommas(CurrencyFormatted(ProjectTotalsDS[j].sum_projcet_value)) + "</td>");
//        tot.append("<td id=goodfairmetricstdrighttot> $" + numberWithCommas(CurrencyFormatted(ProjectTotalsDS[j].sum_cost_estimate)) + "</td>");
//        tot.append("<td id=goodfairmetricstdcenter>" + "<b>----</b>" + "</td>");
//        tot.append("<td id=goodfairmetricstdcenter>" + "<b>----</b>" + "</td>");
//        tot.append("<td id=goodfairmetricstdcenter>" + "<b>----</b>" + "</td>");
//        $('table').append(tot);

//    }
//}

function CurrencyFormatted(amount) {
    var i = parseFloat(amount);
    if (isNaN(i)) {
        i = 0.00;
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) {
        s += '.00';
    }
    if (s.indexOf('.') == (s.length - 2)) {
        s += '0';
    }
    s = minus + s;
    return s;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function TrimDate(y) {
    return y.substr(0, 10)
}


//<!-- JKL - JS exception occurring because browser didn't know what "google" was - needed to reference Google's API -->
google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(function () {
    getdata();

    // interval to check socrata data for changes
    // setInterval(function(){
    //    getdata();
    // }, 10000);
    //
});
