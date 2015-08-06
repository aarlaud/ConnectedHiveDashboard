Template.gauges.rendered = function(){
	createGauge("gauge1");
	createGauge("gauge2");
	createGauge("gauge3");
	createGauge("gauge4");



}


	Meteor.startup(function(){
console.log('test');	

	

	mqttClient = mqtt.connect('ws://54.173.145.41:3000');

	mqttClient.on('connect', function(){
		console.log("Connected");
		mqttClient.subscribe("test/topic");
	});

	mqttClient.on('message', function(param, p2){
		console.log("Server message", param, p2.toString());
	});

	mqttClient.on('error', function(param){
		console.log("Error");
	});

});
