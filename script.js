var taskList = [];     //  list of task name
var sec=[];            // list of duration of each task
var taskState=[];  // 1: on     0: off      -1 : task complete
var count=0;          // number of tasks

function createTask(form){
    if(count==0)
    {
      var p = document.getElementsByTagName("body");
      p[0].style.background = "none";
      document.getElementById("myform").style.top = '262px';
      document.getElementById("input").style.borderBottom= '2px solid #D8D8D8';
      $('#input').css('color','#D9D9D9')
      $('input').removeClass('white-placeholder');    //changing color of the placeholder
      $('input').addClass('grey-placeholder');
      footer='<div id="info">This is a simple tool that track tasks that last for how long, be efficient</div>';
      $('#box').append(footer);
    }
    startTask(form);
}

function startTask(form){
  document.getElementById("startButton").disabled=true;
  var task = form.inputbox.value;
  form.inputbox.value = "";
  taskList.push(task);
  sec.push(0);
  taskState.push(1);
  var newTask='<div id="task'+count+'">'+
        '<span id="name'+count+'">'+taskList[taskList.length-1]+'</span>'+
          '<span class="time">00 secs</span>'+
          '<div id="buttons'+count+'">'+
            '<img  src="images/pause.png"  id="playPause"  onClick="playPause(this.parentNode.id)">'+
            '<img src="images/tick.png" id="finish" onClick="taskFinish(this.parentNode.id)">'+
          '</div>'+
        '</div>'
  newTask='<br>'+newTask;            //adding break between two tasks
  $('#box').append(newTask);   // appending new task div
  count++;
}

// function to disable the start button when textbox is empty
function keyUp(event){
  var i=document.getElementById("input");
  console.log(i.value);
  if(i.value=="")
      document.getElementById("startButton").disabled=true;
  else
      document.getElementById("startButton").disabled=false;
}

// changing play pause state and button image
function playPause(id){
  id=id.substring(7);
  if (taskState[id]==0)
  {
    $('#buttons'+id).children('#playPause').attr('src', 'images/pause.png');
    taskState[id]=1;
  }
  else if (taskState[id]==1){
    $('#buttons'+id).children('#playPause').attr('src', 'images/play.png');
    taskState[id]=0;
  }
}

function pad ( val ) {
  return val > 9 ? val : "0" + val;
}


function taskFinish(id){
  id=id.substring(7);
  console.log(id);
  taskState[id]=-1;
  $("#buttons"+id).hide();           // hiding the buttons when task finishes
  $("#task"+id).children(".time").css('right','18px');
  document.getElementById("name"+id).innerHTML = '<span class="tick">&#x2714;</span> '+taskList[id];  // adding tick to the name of the task
  $('#task'+id).css('background-color', '#E7E7E7');             // changing background color of task div
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
