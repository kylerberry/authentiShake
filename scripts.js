// JavaScript Document

$(document).ready(function() {
	$('#button-blue').on('click',function(e) {
		e.preventDefault();
		$('#shake').toggle();
		window.setTimeout(function(){
			$('#shake').toggle();
			$('#submitGood').toggle();
			window.setTimeout(function(){
				$('#submitGood').toggle();
			}, 1500);
		}, 3000);
		
	});
});

function test(movement){
	if(movement > 2){
		var checkOne = true;
	}
	else if(movement  < -2){
		var checkTwo = true;	
	}
	
	
}
