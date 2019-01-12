$(document).ready(function () {



  var config = {
    apiKey: "AIzaSyA-r7zW53PNjvtl4CuYfAbIEDm-n7NFrNw",
    authDomain: "my-project-845d4.firebaseapp.com",
    databaseURL: "https://my-project-845d4.firebaseio.com",
    projectId: "my-project-845d4",
    storageBucket: "my-project-845d4.appspot.com",
    messagingSenderId: "946394667639"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#add-Trian-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#distenation-input").val().trim();
    var firstTrain = $("#start-input").val().trim();
    var freq = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: freq
    });
  });


  database.ref().on("child_added", function (childSnapshot) {

    var newTrain = childSnapshot.val().trainName;
    var newLocation = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newFreq = childSnapshot.val().frequency;




    var startTimeConverted = moment(newTrain, "hh:mm").add(newFreq, "hh:mm")

    var diffTime = moment().add(moment.unix( newFirstTrain), "minutes");

    var currentTime = moment();
    
    var tRemainder = moment().add(moment.unix( currentTime), "minutes") % newFreq ;
    
		var minutes = newFreq  - tRemainder;

    var tArrival = moment().add(minutes, "m").format("hh:mm A"); 

    var nextTrain = moment().add(tRemainder, "minutes");



    var newRow = $("<tr>").append(
      $("<td>").text(newTrain),
      $("<td>").text(newLocation),
      $("<td>").text(newFreq),
      $("<td>").text(tArrival),
      $("<td>").text(tRemainder),
    );

    $("#Train-table > tbody").append(newRow);
  });

  $("#trainName, #destination, #firstTrain, #interval").val("");
  return false;
});





