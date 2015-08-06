/*Meteor.startup(function(){


	mqttClient = mqtt.connect('mqtt://54.173.145.41:1883');

	mqttClient.on('connect', function(){
		console.log("Connected");
		mqttClient.subscribe("test/topic");
	});

	mqttClient.on('message', function(param, p2){
		console.log("Server message", param, p2);
	});

	mqttClient.on('error', function(param){
		console.log("Error");
	});

});
*/