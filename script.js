var taskList = [];     //  list of task name
var sec=[];            // list of duration of each task
var taskState=[];  // 1: on     0: off      -1 : task complete
var count=0;          // number of tasks

function createTask(form){
    var p = document.getElementsByTagName("body");
    p[0].style.background = "none";
    document.getElementById("myform").style.top = '25%';
    startTask(form);
}


function startTask(form){
  document.getElementById("startButton").disabled=true;
  var task = form.inputbox.value;
  form.inputbox.value = "";
  taskList.push(task);
  sec.push(0);
  taskState.push(1);
  var h='<div id="task'+count+'"><div class="alignleft" id="name'+count+'">'+taskList[taskList.length-1]+'</div><div class="alignright" ><span class="time">00 secs</span><span id="'+count+'"><img  src="images/pause.png"  id="playPause"  onClick="playPause(this.parentNode.id)"><img src="images/tick.png" id="finish" onClick="taskFinish(this.parentNode.id)"></span></div></div>'
  h='<br>'+h;            //adding break between two tasks
  $('#box').append(h);   // appending new task div
  count++;
}

// function to disable the start button when textbox is empty
function keyUp(event){
  var i=document.getElementsByClassName("input")[0];
  console.log(i.value);
  if(i.value=="")
      document.getElementById("startButton").disabled=true;
  else
      document.getElementById("startButton").disabled=false;
}

// changing play pause state and button image
function playPause(id){
  if (taskState[id]==0)
  {
    $('#'+id).children('#playPause').attr('src', 'images/pause.png');
    taskState[id]=1;
  }
  else if (taskState[id]==1){
    $('#'+id).children('#playPause').attr('src', 'images/play.png');
    taskState[id]=0;
  }
}

function pad ( val ) {
  return val > 9 ? val : "0" + val;
}


function taskFinish(id){
  taskState[id]=-1;
  $("#"+id).hide();           // hiding the buttons when task finishes
  var elem = document.createElement("img");
  elem.src = 'images/done.png';
  elem.setAttribute("height", "15");
  elem.setAttribute("width", "15");
  document.getElementById("name"+id).appendChild(elem);
  $('#task'+id).css('background-color', '#C0B4B4');             // changing background color of task div
}

function setTime()
{
    for(i=0; i<taskList.length; i++)
    {
      // if task state is active then we increase the time and display it
      if (taskState[i]==1)
      {
        document.getElementsByClassName("time")[i].innerHTML=( sec[i] > 58)? parseInt(++sec[i]/60,10)+ " mins "+pad(sec[i]%60)+" secs": pad(++sec[i]%60)+" secs";
      }
    }
}
var timer = setInterval(setTime, 1000);
