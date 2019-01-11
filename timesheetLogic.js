$(document).ready(function() {



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

  // Capture Button Click
  $("#add-Trian-btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
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


    var startTimeConverted = moment(newTrain, "hh:mm").subtract(newFreq, "minutes")


    var currentTime = moment();

    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    // console.log(diffTime);

    var tRemainder = diffTime % newFreq;

    var tMinutesTillTrain = newFreq - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    var catchTrain = moment(nextTrain).format("HH:mm");

    if(moment(newFirstTrain, "HH:mm").isBefore(moment(currentTime, "HH:mm"))){
      var nextTraintime = 
    }

    var newRow =  $("<tr>").append(
      $("<td>").text(newTrain),
      $("<td>").text(newLocation),
      $("<td>").text(newFreq),
      $("<td>") .text(catchTrain),
      $("<td>").text(diffTime),
    );

      $("#Train-table > tbody").append(newRow);
    });

    $("#trainName, #destination, #firstTrain, #interval").val("");
    return false;
  });
   
