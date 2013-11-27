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
	var try_again = false;
	var time;

	var success_messages = [
		'You\'re a wiggly, jiggly human!',
		'You shook it like a salt-shaker!',
		'Stay away from babies!',
		'You\'re awfully good at that motion...',
		'If this was a milkshake, all the boys would be in your yard!',
		'Your martini is ready, Mr. Bond.'
	];








	//function called when submit is clicked
	//sets is_human to true if the trap was not tripped
	//if submission is not a bot then proceed
	function on_submit(event) {

		try_again = true;
		var is_human = trap_tripped();
		var is_captcha = (flag === true) ? true : false ;
		console.log(flag);
		if(is_human)
		{
			if(is_captcha)
			{
				$('#form').attr('action', 'lib/verify.php');
			} else {
				event.preventDefault();
				var verified = begin_verification(event);
			}
		}
		else console.log('You\'re a bot. DIE.');
	}






	//this shows the initial modal, starts the timer and begins listening for a shake event.
	function begin_verification(event) {

		//show modal giving the user initial directions
		display_modal();

		//listens for a shake event
		window.addEventListener('shake', shakeEventDidOccur, false);

		shake_timer();
		
	}





	//this begins the timer to determine timeout on shaking
	function shake_timer() {
		time = setTimeout(function() {
				window.removeEventListener('shake', shakeEventDidOccur, false);
				if(try_again) {
					display_modal('tryagain');
				}
			}, 8000);
	}




	//this plays our success sound (only seems to work on firefox mobile)
	//chrome mobile needs a touch event for sounds
	function playSound() {
		var sound = new Audio('./assets/success.mp3');
		sound.play();
	}





	//if a shake event occurs, remove our shake listener
	//play the success sound
	//display the new modal
	//stop the shake event

	/*
	This may be the place to send the form data
	*/
	function shakeEventDidOccur() {
		//set times up false so the try again modal doesn't reappear
		window.removeEventListener('shake', shakeEventDidOccur, false);
		
		try_again = false;

		playSound();

		//show a success message to the user
		display_modal('success');

		myShakeEvent.stop();
	}






	//check honeypot
	//returns true or false
	function trap_tripped() {
		var honey = jQuery('#honeypot').val();
		return ( honey === '' ) ? true : false;
	}






	/* get the parameter that shows us which modal and messages to show */
	function display_modal(action) {
		//this just sets the default value of our parameter to null if it isn't set by the function calling it
		action = typeof action !== 'undefined' ? action : null;

		var $messageWrap = jQuery('.message');
		var $modal = $messageWrap.parent();
		var $loading = '<div id="loading"><div id="blockG_1" class="loading_blockG"></div><div id="blockG_2" class="loading_blockG"></div><div id="blockG_3" class="loading_blockG"></div></div>';
		var $try_again_btn = '<a class="button" href="#" id="try-again" title="" >Try Again</a>';
		var $close_btn = '<a href="#" id="opt-out" title="" >I prefer Captcha...</a>';
		var message = '';

		//this is the initial modal
		if(action === null) {
			message = 'Prove you\'re human <br/>by shaking your device<br/><br/>' + $loading;

			if($modal.hasClass('try-again')) $modal.removeClass('try-again');
			if($modal.hasClass('success')) $modal.removeClass('success');
			if(!$modal.is(':visible')) $modal.toggle();

			$messageWrap.html(message);
		}

		//this is the screen shown if you timeout
		if(action === 'tryagain') {
			$modal.addClass('try-again');
			message = 'Time\'s up.<br/> Try again?' + '<br/>' + $try_again_btn + '<br/>' + $close_btn;
			$messageWrap.html(message);
		}

		if(action === 'success') {
			$modal.addClass('success');
			var item = success_messages[Math.floor(Math.random()*(success_messages.length))];
			message = item + '<br/><br/> Your message has been sent.';
			$messageWrap.html(message);
		}

		//this closes the modal
		if(action === 'optout') {
			$modal.toggle();
			showRecaptcha();
			//open captcha
		}

		//close-all button
		if(action === 'close') {
			$modal.toggle();
			//open captcha
		}
	}







	//this function displays our captcha as a backup if authentiShake fails
	function showRecaptcha(event) {
		event = typeof event !== 'undefined' ? event : null;
		if(event !== null) event.preventDefault();
		Recaptcha.create("6Le6ieoSAAAAAD91UUIcUK-BWqHAqKtuQfcYRz7s", 'captchadiv', {
			tabindex: 1,
			theme: "red",
			callback: Recaptcha.focus_response_field
		});
	}







	//click handler
	jQuery('form').on( 'click', '#submit', function(event) { on_submit(event); } );

	//skip authentishake and use captcha
	jQuery('form').on( 'click', '#choose-captcha', function(event) {
		flag = true;
		showRecaptcha(event);
	} );

	//restart
	jQuery('.modal').on( 'click', '#try-again', function(event) { on_submit(event); } );

	//Close modal
	jQuery('.modal').on( 'click', '#close-all', function(event) {
		try_again = false;
		window.clearTimeout(time);
		display_modal('close');
	} );

	//f a person prefers captcha
	jQuery('.modal').on( 'click', '#opt-out', function(event) {
		flag = true;
		window.clearTimeout(time);
		shake_timer();
		display_modal('optout');
	});


});