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
	return '<div id ="' + this.id + '" ' + this.extra + 'style ="' + this.style + '"></div>';
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
	//var swaggie = <? php echo $_GET["word"]; ?> ;
	var divOne = new Quarter(quarterEnum(2) + 2012);
	document.getElementById('schedule').innerHTML = divOne.html();
	$("#schedule").show();
  });
});