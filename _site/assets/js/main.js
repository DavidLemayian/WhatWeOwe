/*
 *	Main.js file
 *
 */

var data_json;

window.onload = function(){
	
	data_json = (function() {
						var json = null;
						$.ajax({
							'async': false,
							'global': false,
							'url': "/data/debt.json",
							'dataType': "json",
							'success': function (data) {
								json = data;
							}
						});
						return json;
					})();
	
	//var debt_data = $.parseJSON(data_json);
	
	var debt_amount = data_json.data[0].national[0].grand_total * 1000000;
	var debt_change = data_json.data[0].national[0].grand_total - data_json.data[0].national[1].grand_total
	var debt_change_rate = Math.round((debt_change * 1000000) / (365 * 24 * 3600 * 10))
	
	var today = new Date();
	var last_date = new Date("01/06/2012");
	var timeDiff = Math.abs(today.getTime() - last_date.getTime());
	var diffSecs = Math.ceil(timeDiff / 100);
	
	debt_amount += debt_change_rate * diffSecs;
	
	var myDebtCounter = setInterval(function(){debtCounter()},100);
	
	function debtCounter()
	{
		debt_amount += debt_change_rate;
		var debtString = numberWithCommas(debt_amount.toString());
		var debtHtml = "";
		for (var i = 0; i < debtString.length; i++) {
			if (debtString.charAt(i)==",") {
				debtHtml += '<span style="line-height: 50%; vertical-align: bottom; margin-left: -5px;">,</span>\n';
			} else {
				debtHtml += '<span class="label label-danger" style="margin-left: -5px;">' + debtString.charAt(i) + '</span>\n';
			}
		}
		$('#debtamount').html(debtHtml);
	}
	
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}


