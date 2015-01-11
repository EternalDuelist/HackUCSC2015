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
	this.style = 'width:250px;\
		height:175px;\
		padding:10px;\
		border:1px solid #aaaaaa;\
		overflow-y: auto;\
		background-color: white;\
		display:inline-block;\
		border-radius: 20px 0px 0px 20px;'
	;
}

function myhtml(){
	return  '<div id ="' + this.id + '" ' + this.extra +
			'style ="' + this.style + '">'+this.id+'<hr><br>' + this.nestedTags + '</div>';
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

function inputTest(element){
	if(element.length > 0){
		return true;
	}
	return false;
}

$(document).ready(function(){
	$("#update").click(function(){
		document.getElementById('schedule').innerHTML = '';
		var hQuarts = new Object();
		
		var units     = ((inputTest(document.getElementById('unts'))) ? parseInt(document.getElementById('unts').value)  : 3);
		var startYear = ((inputTest(document.getElementById('syear')))? parseInt(document.getElementById('syear').value) : 2015);
		var numYear   = ((inputTest(document.getElementById('nyear')))? parseInt(document.getElementById('nyear').value) : 4);
		var summer    = ((inputTest(document.getElementById('sumer')))? parseInt(document.getElementById('sumer').value) : 0);
		
		var clss = 1;
		for (i = 0; i < numYear; i++){
			for(j = 0; j < (3+summer); j++){
				var year = startYear + i + ((j ==0)? 0 : 1);
				var key = quarterEnum(j)+year;
				hQuarts[key] = new Quarter(key);
				clss++;
				hQuarts[key].nestedTags = '<img id="gClass'+ clss +'" src="images/genClass.bmp" draggable="true" ondragstart="drag(event)" width="200" height="50">';
				document.getElementById('schedule').innerHTML += hQuarts[key].html();
			}
			document.getElementById('schedule').innerHTML += '<hr><br>';
		}
		$("#schedule").show();
  });
});