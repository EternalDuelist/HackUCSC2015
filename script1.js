/*This script is for drag and drop
function schedule(){
	
}
*/
function Quarter(id){
	this.id = id;
	this.html = myhtml;
	this.extra = 'ondrop="drop(event)" ondragover="allowDrop(event)"';
	this.style = 'width:400px;\
		height:400px;\
		padding:10px;\
		border:1px solid #aaaaaa;\
		overflow-y: auto;\
		display:inline-block;\
		border-radius: 20px 0px 0px 20px;'
	;
}

function myhtml(){
	return '<div id ="' + this.id + '" ' + this.extra + 'style ="' + this.style + '"></div>';
}/*
function quarterEnum(){
	ver temp == new Object();
	temp['0'] = 'FALL';
	temp['1'] = 'WINTER';
	temp['2'] = 'SPRING';
	temp['3'] = 'SUMMER';
	return temp;
}*/
$(document).ready(function(){
  $("#update").click(function(){
	var divOne = new Quarter('lol');
	document.getElementById('schedule').innerHTML = divOne.html();
	$("#schedule").show();
  });
});