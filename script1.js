/*This script is for drag and drop
function schedule(){
	
}
*/
/*
reference code

$(document).ready(function(){
  $("#update").click(function(){
    $("#schedule").hide();
	document.getElementById('schedule').innerHTML = "lol";
	$("#schedule").show();
  });
});

function update(){
	document.getElementById('schedule').innerHTML = "swerve";
	$("#schedule").show();
}

*/
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var dataT = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(dataT));
}
function Quarter(id){
	this.id = id;
	this.html = myhtml;
	this.nestedTags  = "";
	this.extra = 'ondrop="drop(event)" ondragover="allowDrop(event)"';
	this.class = 'drgbox';
}

function myhtml(){
	return  '<div id ="' + this.id + '" ' + this.extra +
			'class ="' + this.class + '">'+this.id+'<hr><br>' + this.nestedTags + '</div>';
}

function quarterEnum(num){
	switch(num){
		case 0: return 'FALL';
			break;
		case 1: return 'WINTER';
			break;
		case 2: return 'SPRING';
			break;
		case 3: return 'SUMMER';
			break;
	}
}

$(document).ready(function(){
	$("#update").click(function(){
		document.getElementById('schedule').innerHTML = '';
		var hQuarts = new Object();
		
		var units     = parseInt(document.getElementById('unts').value);
		var startYear = parseInt(document.getElementById('syear').value);
		var numYear   = parseInt(document.getElementById('nyear').value);
		var summer    = parseInt(document.getElementById('sumer').value);
		
		var clss = 1;
		for (i = 0; i < numYear; i++){
			for(j = 0; j < (3+summer); j++){
				var year = startYear + i + ((j ==0)? 0 : 1);
				var key = quarterEnum(j)+year;
				hQuarts[key] = new Quarter(key);
				hQuarts[key].nestedTags =  '<div class="drgable" id="clss'+ clss +'" draggable="true" ondragstart="drag(event)">\
											<p style="margin:16px;">'+ clss +' <p></div>';
				clss++;
				document.getElementById('schedule').innerHTML += hQuarts[key].html();
			}
			document.getElementById('schedule').innerHTML += '<hr><br>';
		}		
		$("#schedule").show();
  });
});