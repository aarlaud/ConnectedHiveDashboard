  Messages = new Mongo.Collection("messages");

  Meteor.startup(function () {
    // code to run on server at startup

      var mqtt = Meteor.npmRequire('mqtt');
      client = mqtt.createClient(1883,'54.173.145.41');

      //client.subscribe('presence');
      client.subscribe('1001001090');
      client.subscribe('1001001099');
      client.subscribe('10010010910');
      //client.publish('presence', 'Hello World ! This is Meteor Server side speaking !');

      client.on('message', function(topic, message) {
      console.log(message);
      addMsgToCollection(topic,  message);
      });
  });



 var addMsgToCollection = Meteor.bindEnvironment(function(msgTopic, message) {
  Messages.insert({topic: msgTopic, payload: message, createdAt: new Date() });
  console.log("Payload inserted");
 });

  Meteor.publish("mqttMessages", function() {
    return Messages.find({},{sort: {'createdAt': -1}, limit: 20});
  });

// client.end();



