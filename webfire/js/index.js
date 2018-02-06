var updateId;
function UIupdate(acc) {
	updateId = setInterval(function (){
		for (var i = 0 ; i < gameObjs.length ; i++){
			gameObjs[i].update();
		}
	},acc);
}

$(function () {
	UIupdate(100);
});