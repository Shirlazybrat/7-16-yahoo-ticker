$(document).ready(function(){

//add a submit handeler for our form
$('.yahoo-form').submit(function(){
	event.preventDefault();
	//stop the form frim submitting when the user clicks or pushes
	//console.log("I'm listening for your submission!");
	var symbol = $('#symbol').val();
	
		//alert(symbol);
	var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + symbol + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';
	console.log(url);

	$.getJSON(url, function(theDataJsFound){
		//console.log(theDataJsFound);
	
	var stockInfo = theDataJsFound.query.results.quote;
	var stockCount = theDataJsFound.query.count;
	var newHTML = '';
	if (stockCount > 1){
		for(var i = 0; i<stockInfo.length; i++){
		newHTML += buildNewTable(stockInfo[i]);
	}
}
	else { 
		newHTML += buildNewTable(stockInfo);
	}
	$('.yahoo-body').html(newHTML);
    $('.table').DataTable();
	
		});

	});



function buildNewTable(stockInfo){

	if(stockInfo.Change[0] == '+'){
		var upDown = "success";
	}
	else if(stockInfo.Change[0] == '-'){
		var upDown = "danger";
	}

	var htmlString = '';
	//var stockInfo = theDataJsFound.query.results.quote;
	//console.log(stockInfo);
	htmlString = '<tr><td>'+stockInfo.Symbol+'</td>';
	htmlString += '<td>'+stockInfo.Name+'</td>';
	htmlString += '<td>'+stockInfo.Ask+'</td>';
	htmlString += '<td>'+stockInfo.Bid+'</td>';
	htmlString += '<td class="'+upDown+ '">'+stockInfo.Change+'</td></tr>';
	
	return htmlString;
}

function addMore(){
$('.addMore').click(function(){
	var newSymbol = $('#newSymbol').val();
	//event.preventDefault();
	if($('newSymbol').val() == ''){
		alert("Please enter any new stocks")
		return false;
	}
	buildNewTable();
	});
}



});
