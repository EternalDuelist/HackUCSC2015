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

function Quarter(id){
	this.id = id;
	this.html = myhtml;
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
			'style ="' + this.style + '">'+this.id+'<hr><br></div>';
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
		var units = 3;
		var startYear = 2012;
		var numYear = 4;
		var summer = 1;
		for (i = 0; i < numYear; i++){
			for(j = 0; j < (3+summer); j++){
				var year = startYear + i + ((j ==0)? 0 : 1);
				var key = quarterEnum(j)+year;
				hQuarts[key] = new Quarter(key);
				document.getElementById('schedule').innerHTML += hQuarts[key].html();
			}
			document.getElementById('schedule').innerHTML += '<hr><br>';
		}
		$("#schedule").show();
  });
});