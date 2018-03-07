var topics = ["ford mustang", "chevrolet camaro", "nissan gtr", "volkswagen beetle", "jeep wrangler", "ford bronco", "honda nsx",
"honda civic si", "porsche 911", "ferrari 458", "ford gt", "mclaren p1", "subaru impreza", "mitsubishi lancer evo", "ford raptor"
,"chevrolet corvette"];

$(document).ready(function(){

	createButtons(topics);

	function createButtons(topics){
			//create buttons dynamically
			$("#carButtons").empty();
		for(var i = 0; i < topics.length; i++){
			var button = $("<button id = carButton>");
			//append each button to the div
			button.text(topics[i]);
			button.attr("data-car", topics[i]);
			$("#carButtons").append(button);
		}

	};

	//using the submit button
	$("#addCar").on("click", function(){
		//get value from the form, check if blank
		var value = $("#car-input").val();
		$("#car-input").val('');
		console.log("value: " + value);

		topics.push(value);
		createButtons(topics);

		// //if(value != ""){
		// 	var newbutton = $("<button id = carButton>");
		// 	newbutton.text(value);
		// 	newbutton.attr("data-car", value);
		// 	$("#carButtons").append(newbutton);
		// //}

	});

	//access the giphy api everytime a button is clicked
	$("#carButtons").on("click", "#carButton", function(){
		console.log("name: " + $(this).attr("data-car"));

		//clear the div
		$("#carDiv").empty();

		//ajax method to get image of the car
		var apiKey = "&api_key=jGrCdIntTvmcWCtiqOQMvz8IBvbxXvfs";
		var q = $(this).attr("data-car");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + q +"&limit=10" + apiKey;

		console.log("URL: " + queryURL);

		$.ajax({
			url : queryURL,
			METHOD : "GET"
		}).then(function(data){
			console.log(data);

			var results = data.data;

			for(var i = 0; i < results.length; i++){
				var indDiv = $("<div id = indDiv>");
				var carImage = $("<img id = carImage>");
				var p = $("<p>");

				p.text("Rating: " + results[i].rating);
				carImage.attr("src", results[i].images.fixed_height_still.url);
				carImage.attr("data-still", results[i].images.fixed_height_still.url);
				carImage.attr("data-animate", results[i].images.fixed_height.url);
				carImage.attr("state", "still");
					
				//append the images in the car div
				indDiv.append(p).append(carImage);
				$("#carDiv").append(indDiv);
			}

		});	 
	});



	//change the animation on the image
	$("#carDiv").on("click","#carImage", function(){
		//check the state
		if($(this).attr("state") == "still"){
			//switch state
			$(this).attr("state", "animate");
			//switch to the animated URL
			$(this).attr("src", $(this).attr("data-animate"));
		}
		else{
			//switch state
			$(this).attr("state", "still");
			//switch to the animated URL
			$(this).attr("src", $(this).attr("data-still"));
		}

	});

	

	// //using the submit button
	// $("#addCar").on("click", function(event){
	// 	event.preventDefault();
	// 	//get value from the form, check if blank
	// 	var value = $("#car-input").val();
	// 	$("#car-input").val('');
	// 	console.log("value: " + value);

	// 	//if(value != ""){
	// 		var newbutton = $("<button id = carButton>");
	// 		newbutton.text(value);
	// 		newbutton.attr("data-car", value);
	// 		$("#carButtons").append(newbutton);
	// 	//}

	// });

});