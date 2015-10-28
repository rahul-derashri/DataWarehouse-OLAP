validationPart2 = function(){};

validationPart2.start = function(){
	$("#tab-7").addClass("selected");
	$("div.page").hide();
	
	$("button[data-type='query']").bind("click" , function(){
		
		$("#errorPart2 span").text("");
		
		var type = $(this).attr("data-rid");
		var data = "";
		var opt1 = "";
		var flag = true;
		$("div.result").text("");
		if( type == "Q7" ){
			opt1 = $("#optionSelectQ7").val();
			if( opt1 == "NA" ){
				flag = false;
				$("#errorPart2 span").text("Please select option other than default");
			}
			else{
				flag = true;
				$("#errorPart2 span").text("");
				data = type+":"+opt1;
			}
		}
		else if( type == "Q8" ){
			opt1 = $("#optionSelectQ8-1").val();
			if( opt1 == "NA" ){
				flag = false;
				$("#errorPart2 span").text("Please select option other than default");
			}
			else{
				flag = true;
				$("#errorPart2 span").text("");
				data = type+":"+opt1;
			}
		}
		
		if( flag )
			validationPart2.fetchResult(data , "result"+type);
	});
	
	
	$("#part2Content ul li").bind("click" , function(){
		$("#errorPart2 span").text("");
		var id = $(this).attr("id");
		$("div.result").text("");
		$("ul li").removeClass("selected");
		$("#"+id).addClass("selected");
		$("div.page").hide();
		var numId = id.split("-")[1];
		$("div#query"+numId).show();
		
		if( numId == 7 ){
			validationPart2.fetchData("Q7:DN" , 1);
		}
		else if( numId == 8 ){
			validationPart2.fetchData("Q8:DN" , 2);
			validationPart2.fetchData("Q8:PatientID" , 3);
		}
		
	});
	
	$("div#query7").show();
	$("li[id='tab-7']").click();
};



validationPart2.fetchData = function(data, queryNum){
	$.ajax({
		type:"post",
		url:'/DataWarehouse/fetchData',
		data: data,
		success: function(result){
			//alert("success Result (part2): "+result);
			
			if( queryNum == 1 ){
				$("#optionSelectQ7").text("");
				$("#optionSelectQ7").append(validationPart2.processDataForSelect(result));
			}
			else if( queryNum == 2 ){
				$("#optionSelectQ8-1").text("");
				$("#optionSelectQ8-1").append(validationPart2.processDataForSelect(result));
			}
			else if( queryNum == 3 ){
				$("#optionSelectQ8-2").text("");
				$("#optionSelectQ8-2").append(validationPart2.processDataForSelect(result));
			}
		},
		failure:function(data){
			//alert("Ajax failed");
		}
	});
};


validationPart2.processDataForSelect = function(data){
	var options = "<option selected value='NA'>Select</option>";
	$.each(data.split(":"), function( index, value ) {
		if( value != "" ){
		  options += "<option value='"+value+"'>"+value+"</option>";
		}
	});
	
	return options;
};


validationPart2.fetchResult = function(data, resultId){
	queryURL = "fetchResult";
	
	if( resultId == "resultQ7" ){
		queryURL = "fetchResultQ7";
	}
	else if( resultId == "resultQ8" ){
		queryURL = "fetchResultQ8";
	}
	
	$("#"+resultId).text("");
	$("#"+resultId).append("<img src='./resources/images/loader.gif'/ class='loadingImg'>");
	
	$.ajax({
		type:"post",
		url:'/DataWarehouse/'+queryURL,
		data: data,
		success: function(result){
			//alert("success Result: "+result);
			$("#"+resultId).text("");
			$("#"+resultId).append(result);
		},
		failure:function(data){
			//alert("Ajax failed");
		}
	});
};