/* -------- Thought Process -------- */

/* intercept submit input
	check to make sure the honeypot wasn't tripped
	have an array of different motions to send the user
	display a 'motion' to mimic with matches an array of acceptable responses
		there needs to be ranges, because user input will be dirty, not perfect
		may need to first show a modal that tells them to calibrate their phone (their phone may need to be in a starting position)
	capture user inputs, perhaps using snapshots at timed intervals
	if inputs are acceptable
		capture input fields
		submit fields
		send a message acknowledging the user's human-ness
	otherwise they fail
		sent a modal indicating that they didn't pass
		try again or choose to use regular captcha */



/* -------- CAPTURE PATTERNS, DATA OBSERVATIONS -------- */

//Mark suggests running checks at a 100ms instead of 500ms

//create a visual that represents each raw data iteration, output it to the page
// - could even make a cool data chart for different device readings at the different positions a person might hold a phone

//If a user is looking at their phone. BETA Orientation should ALWAYS be negative. (need to check if thats true on orientation change)

//might need to include deviceMovement just to determine moving UP and DOWN in 3d space (if you want to shake the phone)

//could reduce it to movements, pattern is 4 'step', coach them through every step. 'snapshot' at the end of each prompt. SHOULD guarantee values, but slower process

//register a shake to calibrate (pattern to test against). Shake again in the same fashion.
// * Eric mentioned that we could just do one shake for a longer amount of time, sample at the beginning and compare at the end. However, this may lead too much opportunity for botching the shake

// **** check the value, don't record it until the value changes direction, compare our 'snapshots' for positive vs. negative pattern.
// **** can also be done with x,y,z values!!

//try flashing the decorations on screen


$(document).ready(function() {
	//determine if user has opted for captcha
	var flag = false;

	//click handler
	jQuery('form').on( 'click', '#submit', function(event) { on_submit(event); } );

	//if a person prefers captcha
	jQuery('form').on( 'click', '#opt-out', function(event) {
		flag = true;
		showRecaptcha(event);
	} );








	//function called when submit is clicked
	//sets is_human to true if the trap was not tripped
	//if submission is not a bot then proceed
	function on_submit(event) {

		var is_human = trap_tripped();
		var is_captcha = (flag === true) ? true : false ;
		console.log("flag: " + flag);

		if(is_human)
		{
			console.log('You\'re Human');
			if(is_captcha)
			{
				console.log('Verify Captcha');
				$('#form').attr('action', 'lib/verify.php');
			} else {
				event.preventDefault();
				var verified = begin_verification(event);
			}
		}
		else console.log('You\'re a bot. DIE.');
	}






	//this retrieves our pattern to display to the user and to test against
	function begin_verification(event) {

		//show modal giving the user initial directions
		display_modal();

		//listens for a shake event
		window.addEventListener('shake', shakeEventDidOccur, false);
	}






	
	function shakeEventDidOccur() {
		//play success noise
		var sound = new Audio('./assets/success.mp3');
		sound.play();

		//do something with the form data

		//show a success message to the user
		jQuery('#loading').remove();
		jQuery('.modal').addClass('success');
		display_modal('You are human! <br/> Your message has been sent.');
		myShakeEvent.stop();
	}






	//check honeypot
	//returns true or false
	function trap_tripped() {
		var honey = jQuery('#honeypot').val();
		return ( honey === '' ) ? true : false;
	}






	/* get the parameter that shows us which modal to show */
	function display_modal(message) {
		//this just sets the default value of our parameter to null if it isn't set by the function calling it
		message = typeof message !== 'undefined' ? message : null;

		var $messageWrap = jQuery('.message');
		var $modal = $messageWrap.parent();

		//if the modal is hidden and the message is null
		if(!$modal.is(':visible') && message === null) {
			$modal.toggle();
		}
		//if the modal is hidden and there's a message
		if(!$modal.is(':visible') && message !== null) {
			$messageWrap.html(message);
			$modal.toggle();
		}
		//if the modal is visible but the message has changed
		if($modal.is(':visible') && message !== null) {
			$messageWrap.html(message);
		}

		/*check for message an display appropriate modal to the user: 
		null, show pattern, movement captured(checking), movement not captured(try again), verified a person(Success), not a human(fail) */
	}







	//this function displays our captcha as a backup if authentiShake fails
	function showRecaptcha(event) {
		event.preventDefault();
		Recaptcha.create("6Le6ieoSAAAAAD91UUIcUK-BWqHAqKtuQfcYRz7s", 'captchadiv', {
			tabindex: 1,
			theme: "red",
			callback: Recaptcha.focus_response_field
		});
	}








/*	function display_sensor_data() {
		var $output = jQuery('#gyro-output');
		var $gyro_message = '';
		var $accel_message = '';
		var temp = '';
		var time = 0;

		//o.x, o.y, o.z for accelerometers
		//o.alpha, o.beta, o.gamma for gyro
		gyro.startTracking(function(o) {

			if( kill === true ) gyro.stopTracking();

			time += 0.5;

			//console.log( 'x motion: ' + o.x + '\n' + 'y motion: ' + o.y + '\n'+ 'z motion: ' + o.z );
			$accel_message = '<span>x: </span>' + o.x + '<br/>' + '<span>y: </span>' + o.y + '<br/>' + '<span>z: </span>' + o.z + '<br/><br/>';
			$gyro_message = $accel_message + '<span>alpha: </span>' + o.alpha + '<br/>' + '<span>beta: </span>' + o.beta + '<br/>' + '<span>gamma: </span>' + o.gamma + '<br/>' + '<span>time: </span>' + time + 's<hr/>';
			
			//logs my outputs to the page so i can debug easier on phone
			$output.prepend($gyro_message);

		});
	}*/

});