 <?php
  require_once('recaptchalib.php');
  $privatekey = "6Le6ieoSAAAAALT7p8ZVyVanLKV45-tN0nTWB7dU";
  $resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);
	
  if (!$resp->is_valid) {
    // What happens when the CAPTCHA was entered incorrectly
    die ("fail");
  } else {
    echo "pass";
	// Your code here to handle a successful verification
  }
  ?>