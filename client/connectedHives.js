Messages = new Mongo.Collection("messages");

Meteor.subscribe("mqttMessages");

Template.body.helpers({
 messages: function (){
	return Messages.find({topic: '10010010910'});
 },

 temperatures: function (){

 	var tempCursor = Messages.find({topic: '10010010910'}, {sort: {'createdAt': -1}, limit: 1});
 	var tempCursor2 = Messages.find({topic: '10010010910'}, {sort: {'createdAt': -1}, skip:1, limit: 1});
 	
 	var temp = tempCursor.map( function(u){ return u.payload;});
 	var previousTemp = tempCursor2.map( function(u){ return u.payload;});
	
	if(temp > 0 & previousTemp >0){
		updateProgress(document.getElementById('div1'), previousTemp, temp, 100, "TEMPERATURE");
	} else if (temp > 0){
		updateProgress(document.getElementById('div1'), 0, temp, 100, "TEMPERATURE");
	} else {
		updateProgress(document.getElementById('div1'), 0, 0, 100, "TEMPERATURE");
	}
 	return tempCursor;
 },

  humidities: function (){
 	 humidityCursor = Messages.find({topic: '1001001099'}, {sort: {'createdAt': -1}, limit: 1});
 	 humidityCursor2 = Messages.find({topic: '1001001099'}, {sort: {'createdAt': -1}, skip:1, limit: 1});

 	var humidity = humidityCursor.map( function(u){ return u.payload;});
 	var previousHumidity = humidityCursor2.map( function(u){ return u.payload;});
	

	if(humidity > 0 & previousHumidity > 0){
		updateProgress(document.getElementById('div2'), previousHumidity, humidity, 100, "HUMIDITY");
	} else if (humidity > 0){
		updateProgress(document.getElementById('div2'), 0, humidity, 1000, "HUMIDITY");
	} else {
		updateProgress(document.getElementById('div2'), 0, 0, 1000, "HUMIDITY");
	}

 	 return humidityCursor;
 },

  batteries: function (){
 	//return Messages.find({topic: '1001001128'}, {sort: {'createdAt': -1}, limit: 1});
 	batteryCursor = Messages.find({topic: '1001001090'}, {sort: {'createdAt': -1}, limit: 1});
 	batteryCursor2 = Messages.find({topic: '1001001090'}, {sort: {'createdAt': -1}, skip:1, limit: 1});

 	var battery = batteryCursor.map( function(u){ return u.payload;});
 	var previousBattery = batteryCursor2.map( function(u){ return u.payload;});
	
	if(battery > 0 & previousBattery > 0){
		updateProgress(document.getElementById('div3'), previousBattery, battery, 6, "BATTERY");
	} else if (battery > 0){
		updateProgress(document.getElementById('div3'), 0, battery, 6, "BATTERY");
	} else {
		updateProgress(document.getElementById('div3'), 0, 0, 6, "BATTERY");
	}

 	 return batteryCursor;
 }
});


function updateProgress(parent, currentValue, newValue, maxValue, label){
      radialProgress(parent,currentValue, maxValue, label).diameter(150).maxValue(maxValue).value(newValue).render();

    }


Template.meters.rendered = function() {
  
    var div1=d3.select(document.getElementById('div1'));
    var div2=d3.select(document.getElementById('div2'));
    var div3=d3.select(document.getElementById('div3'));
    

    start();

    

    function onClick1() {
        deselect();
        div1.attr("class","selectedRadial");
       // updateProgress(document.getElementById('div1'), 50, 80);

    }

    function onClick2() {
        deselect();
        div2.attr("class","selectedRadial");
    }

    function onClick3() {
        deselect();
        div3.attr("class","selectedRadial");
    }

    function labelFunction(val,min,max) {

    }

    function deselect() {
        div1.attr("class","radial");
        div2.attr("class","radial");
        div3.attr("class","radial");
    }

    function start() {
    	
        var rp1 = radialProgress(document.getElementById('div1'),0)
                .label("TEMPERATURE")
                .onClick(onClick1)
                .diameter(150)
                .value(0)
                .render();

        var rp2 = radialProgress(document.getElementById('div2'),0)
                .label("LIGHT")
                .onClick(onClick2)
                .diameter(150)
                .value(0)
                .render();

        var rp3 = radialProgress(document.getElementById('div3'),0)
                .label("PRESSURE")
                .onClick(onClick3)
                .diameter(150)
                .minValue(0)
                .maxValue(1024)
                .value(0)
                .render();



    }
};








   