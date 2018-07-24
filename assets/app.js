var config = {
    apiKey: "AIzaSyCGkkLnJAUoSP4N8rEZDL26TqT-nFJKaaA",
    authDomain: "test-d0174.firebaseapp.com",
    databaseURL: "https://test-d0174.firebaseio.com",
    projectId: "test-d0174",
    storageBucket: "test-d0174.appspot.com",
    messagingSenderId: "809274767958"
  };
  firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var arrival = "";
    var interval ="";
    $("#submitInfo").on("click", function(event){
        event.preventDefault();
        name = $("#name").val().trim();
        role = $("#destination").val().trim();
        start = $("#arrival").val().trim();
        rate = $("#interval").val().trim();
        console.log({name, destination, arrival, interval })
        database.ref().push({
            name: name,
            destination: destination,
            arrival: arrival,
            interval: interval
        });
        $("#name").val("")
        $("#destination").val("")
        $("#arrival").val("")
        $("#interval").val("")
    });

    database.ref().on("child_added", function(childSnapshot) {
      

        $("#list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
          " </span><span class='member-email'> " + childSnapshot.val().destination +
            " </span><span class='member-age'> " + childSnapshot.val().arrival +
              " </span><span class='member-comment'> " + childSnapshot.val().interval + " </span></div>");
              

      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
          
      database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

        $("#name").text(snapshot.val().name);
        $("#destination").text(snapshot.val().destination);
        $("#arrival").text(snapshot.val().arrival);
        $("#interval").text(snapshot.val().rate);
      });



var tInterval = 5;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tInterval;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tInterval - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));