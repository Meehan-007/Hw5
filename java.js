var tasks = []; 
var current = document.getElementsByClassName('hour');  
var bodytext = document.getElementsByClassName('list-group')
var div = document.getElementsByClassName('col-md-9')
var AMPM = "" 



//mystorage = window.localStorage; 


  for (time = 9; time <= 17; time++) { 
  var id = time - 9 
  var objdata = ""
  var displayhour = 0;  

  if (time === 12) {
    displayhour = 12;
    AMPM = "pm";
} else if (time > 12) { 
   displayhour = time - 12;
   AMPM = "pm";
} else if (time < 12) { 
   displayhour = time;
   AMPM = "am";
}
  
 displayhour = displayhour.toString()

  objdata = {
    id: id,
    time: time,
    AMPM: AMPM, 
    displayhour: displayhour, 
    objdata: objdata, 
  } 

 tasks.push(objdata) 
 
} 



// function for date 
var date = document.getElementById('currentDay'); 
var today = moment().format('LL'); 
date.innerHTML = today;



var loadTasks = function() {
  var dataLoaded = JSON.parse(localStorage.getItem("tasks"));
  
  if (dataLoaded) {
    tasks = dataLoaded;
}
 buildcali () 
};  

var saveTasks = function() { 
  console.log(tasks) 
  localStorage.setItem("tasks", JSON.stringify(tasks));
};  


function buildcali() { 
   tasks.forEach(function (blue){ 
    $("#" + blue.id ).val(blue.objdata) 
   })
  } 


    tasks.forEach(function (blue){ 
    var timeRow = $("<form>")
            .addClass("row");
    
        $(".container").append(timeRow);

         //creates field for time
         var timeField = $("<div>")
         .addClass("col-md-2 hour")
         .text(blue.displayhour + blue.AMPM); 
         

         var descriptiontext = $("<div>") 
         .addClass("col-md-9 description time-block") 

         var input = $("<textarea>") 
         .addClass("full") 
         input.attr("id", blue.id);

         descriptiontext.append(input);
         
         if (blue.time == moment().format("HH")) {
          descriptiontext.addClass("present")
      } else if (blue.time < moment().format("HH")) {
        descriptiontext.addClass("past")
      } else if (blue.time > moment().format("HH")) {
        descriptiontext.addClass("future") } 

          var savbutt = $("<button>") 
          .addClass("col-md-1 saveBtn") 
          var saveIcon = $("<i class='bi bi-save2-fill'></i>") 
          savbutt.append(saveIcon);

         timeRow.append(timeField, descriptiontext, savbutt);
   }) 
   



//function func() { 
//  var spliced = tasks.splice(9, 13); 
//}

$(".saveBtn").on("click", "i", function(event) {   
  event.preventDefault();
    var saveindex = $(this).parent().siblings(".description").children().attr("id"); 
    tasks[saveindex].objdata = $(this).parent().siblings(".description").children().val(); 
    console.log(saveindex)
    saveTasks(); 
    
});

loadTasks()