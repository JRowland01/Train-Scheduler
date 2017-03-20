var config = {
apiKey: "AIzaSyBgtzdxpHUzziuOsbHi2pwJ7WV_gkObsV8",
authDomain: "train-schedule-ad139.firebaseapp.com",
databaseURL: "https://train-schedule-ad139.firebaseio.com",
storageBucket: "train-schedule-ad139.appspot.com",
messagingSenderId: "37041579957"
};

firebase.initializeApp(config);

// A variable to reference the database
var database = firebase.database();

var trainsRef = database.ref("trains");

//Variables declared for database.
var trainName = "";
var fDestination = "";
var fFirstTrain = "";
var fFrequency = "";

var time = ""; 


$( "#trainDetails" ).click(function() {
  
                     trainName = $("#train-input").val();
                      fDestination = $("#destination-input").val();
                      fFirstTrain = $("#train-arrival").val().trim();
                      fFrequency = $("#frequency-input").val().trim();
                            
                     
                      if (trainName !== ""){
                        trainsRef.push().set({
                                              trainName: trainName,
                                              fDestination: fDestination,
                                              fFirstTrain: fFirstTrain,
                                              fFrequency:fFrequency
                                              });
                          }
        
                                 const now = new Date();
                                 const hours_now = now.getHours();
                                 const minutes_now = now.getMinutes();
                                 
                                 time = fFirstTrain.split(':'); 

                                   var hours_train = Number(time[0]);
                                   var minutes_train = Number(time[1]);
                                   var timeDiff = (hours_now-hours_train)*60+ 
                                  (minutes_now-minutes_train);
                              
                                   var minutes_away = 0;
                                      if(timeDiff<0){

                                        minutes_away = -1*timeDiff;
                                        
                                      }
                                      else{
                                         //The time in minutes that has passed since the arrival of the last train.
                                          var remainder = timeDiff % fFrequency;
                                        minutes_away = fFrequency - remainder;
                                          
                                      } 
                                      
    var table = document.getElementById("trainDetailsTable");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);


  //Calculates the next train's arrival.
    var nextArrival = moment(now).add(minutes_away, 'minutes');

    //Input formatted for HTML table.
    nextArrival = moment(nextArrival).format('hh:mm  A');
    
    row.insertCell(0).innerHTML= trainName;
    row.insertCell(1).innerHTML= fDestination;
    row.insertCell(2).innerHTML= fFrequency;
    row.insertCell(3).innerHTML= nextArrival;
    row.insertCell(4).innerHTML = minutes_away;

    $( "#trainDetailsTable" ).load( "index.html #trainDetailsTable" );     

                      });
                      
var cNames = ["trainName", "fDestination", "fFrequency"];
