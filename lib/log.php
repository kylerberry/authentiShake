<?php
require_once('config.php');

$name = $connection->real_escape_string($_POST['name']);
$email = $connection->real_escape_string($_POST['email']);
$comment = $connection->real_escape_string($_POST['comment']);


mysqli_query($connection, "INSERT INTO project3 (id, name, email, comment) VALUES (NULL, '$name', '$email', '$comment')");
	
mysqli_close($connection);

?>