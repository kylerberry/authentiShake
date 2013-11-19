// JavaScript Document

$(document).ready(function() {
	var flag = false;
	//check to see if acceleromter/gyro data is not null
	if(flag == false){
		showRecaptcha();
		$('#form1').attr('action', 'verify.php');
		
		flag == true;
	}
	function showRecaptcha(e) {
		Recaptcha.create("6Le6ieoSAAAAAD91UUIcUK-BWqHAqKtuQfcYRz7s", 'captchadiv', {
			tabindex: 1,
			theme: "red",
			callback: Recaptcha.focus_response_field
		});
	  }
	
	/* PSUEDO */
	//intercept submit input
	//check to make sure the honeypot wasn't tripped
	//have an array of different motions to send the user
	//display a 'motion' to mimic with matches an array of acceptable responses
		//there needs to be ranges, because user input will be dirty, not perfect
		//may need to first show a modal that tells them to calibrate their phone (their phone may need to be in a starting position)
	//capture user inputs, perhaps using snapshots at timed intervals
	//if inputs are acceptable
		//capture input fields
		//submit fields
		//send a message acknowledging the user's human-ness
	//otherwise they fail
		//sent a modal indicating that they didn't pass
		//try again or choose to use regular captcha

	function get_pattern(e) {
		/*this will see the submit request
		fetch a pattern of movement
		then call the display modal function*/
	}

	function choose_modal(message) {
		/* get the parameter that shows us which modal to show */
		//this just sets the default value of our parameter to null if it isn't set by the function calling it
		message = typeof message !== 'undefined' ? message : null;

		/*check for message an display appropriate modal to the user: 
		null, show pattern, movement captured(checking), movement not captured(try again), verified a person(Success), not a human(fail) 

		create a display function for each of these */
	}

});