var taskList = [];
var sec=[];

var taskState=[];
var count=0;
// 1: on 0: off -1 : complete




function nextPage(form){
  //document.location.href = "index.html";
  var p = document.getElementsByTagName("body");
  p[0].style.background = "none";
  document.getElementById("myform").style.top = '25%';
  createTask(form);
}


function keyUp(event){
  var i=document.getElementsByClassName("input")[0];
  console.log(i.value);
  if(i.value=="")
      document.getElementById("playButton").disabled=true;
  else
      document.getElementById("playButton").disabled=false;


}


function createTask(form){
    document.getElementById("playButton").disabled=true;
    var task = form.inputbox.value;
    form.inputbox.value = "";
    taskList.push(task);
    sec.push(0);
    taskState.push(1);
    console.log(count);
    var h='<div id="task"><div class="alignleft" id="name'+count+'">'+taskList[taskList.length-1]+'</div><div class="alignright" ><span class="time">00 secs</span><span id="'+count+'"><input id="pause" type="image" alt="Play" onClick="pause(this.parentNode.id)" src="puse.png"><button onClick="taskFinish(this.parentNode.id)">done</button></span></div></div>'
    h='<br>'+h;
    $('#box').append(h);
  //  var buttons = document.getElementById("pause");
  // buttons.innerHTML = '<img src="pause.png">';
    count++;
}

function pause(id){
  console.log(id);
  if (taskState[id]==0)
  {
    taskState[id]=1;
  }
  else if (taskState[id]==1){
      taskState[id]=0;
  }
}
function pad ( val ) { return val > 9 ? val : "0" + val; }


function taskFinish(id){
  taskState[id]=-1;
  $("#"+id).hide();
  var elem = document.createElement("img");
  elem.src = 'done.png';
  elem.setAttribute("height", "15");
  elem.setAttribute("width", "15");
  document.getElementById("name"+id).appendChild(elem);
}


function setTime()
{
    for(i=0; i<taskList.length; i++)
    {
      if (taskState[i]==1)
      {
        document.getElementsByClassName("time")[i].innerHTML=( sec[i] > 58)? parseInt(++sec[i]/60,10)+ " mins "+pad(sec[i]%60)+" secs": pad(++sec[i]%60)+" secs";
      }
    }
}
var timer = setInterval(setTime, 1000);
