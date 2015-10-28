validationPart1 = function(){};

validationPart1.start = function(){
	
	
	$("#tab-1").addClass("selected");
	$("div.page").hide();
	$("div#query1").show();
	
	$( "#part2" ).bind("click" , function(){
		
	});
	
	
	$("#part1Content ul li").bind("click" , function(){
		$("#errorPart1 span").text("");
		var id = $(this).attr("id");
		$("div.result").text("");
		$("ul li").removeClass("selected");
		$("#"+id).addClass("selected");
		$("div.page").hide();
		var numId = id.split("-")[1];
		$("div#query"+numId).show();
		
		if( numId == 2 ){
			validationPart1.fetchData("Q2:DD" , 2);
		}
		else if( numId == 3 ){
			var arr = ["DN" , "ClusterID"];
			for(var i = 0; i< 2;i++){
				validationPart1.fetchData("Q3:"+arr[i] , 3+i);
			}
		}
		else if( numId == 4 ){
			var arr = ["DN" , "GoID"];
			for(var i = 0; i< 2;i++){
				validationPart1.fetchData("Q4:"+arr[i] , 5+i);
			}
		}
		else if( numId == 5 ){
			validationPart1.fetchData("Q5:GoID" , 7);
		}
		else if( numId == 6 ){
			validationPart1.fetchData("Q6:GoID" , 8);
		}
		
	});

	$("#mainSelect").change(function(){
		$("#resultQ1").text("");
		//alert("select called");
		var val = $(this).val();
		$("#optionSelectQ1").attr("data-type",val);
		var data = $(this).attr("data-key")+":"+val;
		//alert("data:"+data);
		if( val == "NA" ){
			$("#errorPart1 span").text("Please select option other than default");
		}
		else{
			$("#errorPart1 span").text("");
			validationPart1.fetchData(data , 1);
		}
	});
	
	
	$("#q1Run").bind("click" , function(){
		var type = $(this).attr("data-rid");
		var val = $("#optionSelectQ1").val();
		var data = type+"-"+$("#optionSelectQ1").attr("data-type")+":"+val;
		//alert("val: "+data);
		if( val == "NA" ){
			$("#errorPart1 span").text("Please select option other than default");
		}
		else{
			$("#errorPart1 span").text("");
			validationPart1.fetchResult(data , "result"+type);
		}
	});
	
	$("button[data-type='query']").bind("click" , function(){
		
		$("#errorPart1 span").text("");
		
		var type = $(this).attr("data-rid");
		var data = "";
		var opt1 = "";
		var opt2 = "";
		var flag = true;
		$("div.result").text("");
		if( type == "Q2" ){
			opt1 = $("#optionSelectQ2").val();
			if( opt1 == "NA" ){
				flag = false;
				$("#errorPart1 span").text("Please select option other than default");
			}
			else{
				flag = true;
				$("#errorPart1 span").text("");
				data = type+":"+opt1;
			}
		}
		else if( type == "Q3" ){
			
			opt1 = $("#optionSelectQ3-1").val();
			opt2 = $("#optionSelectQ3-2").val();
			if( opt1 == "NA" || opt2 == "NA"){
				flag = false;
				$("#errorPart1 span").text("Please select option other than default");
			}
			else{
				flag = true;
				$("#errorPart1 span").text("");
				data = type+":"+opt1+","+opt2;
			}
			
		}
		else if( type == "Q4" ){
			opt1 = $("#optionSelectQ4-1").val();
			opt2 = $("#optionSelectQ4-2").val();
			if( opt1 == "NA" || opt2 == "NA"){
				flag = false;
				$("#errorPart1 span").text("Please select option other than default");
			}
			else{
				flag = true;
				$("#errorPart1 span").text("");
				data = type+":"+opt1+","+opt2;
			}
		}
		else if( type == "Q5" ){
			opt1 = $("#optionSelectQ5-2").val();
			if( opt1 == "NA" ){
				flag = false;
				$("#errorPart1 span").text("Please select option other than default");
			}
			else{
				flag = true;
				$("#errorPart1 span").text("");
				data = type+":"+opt1;
			}
			
		}
		else if( type == "Q6" ){
			opt1 = $("#optionSelectQ6-1").val();
			if( opt1 == "NA" ){
				flag = false;
				$("#errorPart1 span").text("Please select option other than default");
			}
			else{
				flag = true;
				$("#errorPart1 span").text("");
				data = type+":"+opt1;
			}
		}
		
		if( flag )
			validationPart1.fetchResult(data , "result"+type);
	});
};


validationPart1.fetchData = function(data, queryNum){
	$.ajax({
		type:"post",
		url:'/DataWarehouse/fetchData',
		data: data,
		success: function(result){
			//alert("success Result: "+result);
			
			if( queryNum == 1 ){
				$("#optionSelectQ1").text("");
				$("#optionSelectQ1").append(validationPart1.processDataForSelect(result));
			}
			else if( queryNum == 2 ){
				$("#optionSelectQ2").text("");
				$("#optionSelectQ2").append(validationPart1.processDataForSelect(result));
			}
			else if( queryNum == 3 ){
				$("#optionSelectQ3-1").text("");
				$("#optionSelectQ3-1").append(validationPart1.processDataForSelect(result));
			}
			else if( queryNum == 4 ){
				$("#optionSelectQ3-2").text("");
				$("#optionSelectQ3-2").append(validationPart1.processDataForSelect(result));
			}
			else if( queryNum == 5 ){
				$("#optionSelectQ4-1").text("");
				$("#optionSelectQ4-1").append(validationPart1.processDataForSelect(result));
			}
			else if( queryNum == 6 ){
				$("#optionSelectQ4-2").text("");
				$("#optionSelectQ4-2").append(validationPart1.processDataForSelect(result));
			}
			else if( queryNum == 7 ){
				$("#optionSelectQ5-2").text("");
				$("#optionSelectQ5-2").append(validationPart1.processDataForSelect(result));
			}
			else if( queryNum == 8 ){
				$("#optionSelectQ6-1").text("");
				$("#optionSelectQ6-1").append(validationPart1.processDataForSelect(result));
			}
		},
		failure:function(data){
			//alert("Ajax failed");
		}
	});
};


validationPart1.processDataForSelect = function(data){
	var options = "<option selected value='NA'>Select</option>";
	$.each(data.split(":"), function( index, value ) {
		if( value != "" ){
		  options += "<option value='"+value+"'>"+value+"</option>";
		}
	});
	
	return options;
};


validationPart1.fetchResult = function(data, resultId){
	queryURL = "fetchResult";
	
	if( resultId == "resultQ4" ){
		queryURL = "fetchResultQ4";
	}
	else if( resultId == "resultQ5" ){
		queryURL = "fetchResultQ5";
	}
	else if( resultId == "resultQ6" ){
		queryURL = "fetchResultQ6";
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
			//$("#"+resultId).append("Query Result: "+result);
			$("#"+resultId).append(result);
		},
		failure:function(data){
			//alert("Ajax failed");
		}
	});
};


validationPart1.updateQuery = function(queryNum , paramsStr){
	var query = "";
	var params = paramsStr.split(",");
	
	switch (queryNum) {
		case "Q2":
			query = "Query 2: List the types of drugs which have been applied to patients with '"+params[0]+"'.";
			break;
		case "Q3":
			query = "Query 3: For each sample of patients with '"+params[0]+"' list the mRNA values (expression)"
					+" of probes in cluster id '"+params[0]+"' for each experiment with measure unit id = '001'.";
			break;
		case "Q4":
			query = "Query 4: For probes belonging to GO with id = '"+params[0]+"', calculate the t-statistics of"+
				+" the expression values between patients with '"+params[0]+"' and patients without 'ALL'.";
			break;
		case "Q5":
			query = "Query 5: For probes belonging to GO with id='"+params[0]+"', calculate the F-statistics of the expression"
					+" values among patients with 'ALL', 'AML', 'colon tumor' and 'breast tumor'.";
			break;
		case "Q6":
			query = "Query 6: For probes belonging to GO with id='"+params[0]+"', calculate the average correlation of the"
				+" expression values between two patients with 'ALL', and calculate the average correlation of the expression"
				+" values between one 'ALL' patient and one 'AML' patient.";
			break;
		default:
			break;
	}
};


