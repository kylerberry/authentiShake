<?php

define(DBHOST, 'localhost');
define(DBNAME, 'ericrook_er084908');
define(DBUSER, 'ericrook');
define(DBPASS, 'b8131990');
define(DBTABLE, 'project3');


DEFINE(ROOT_URL, '');

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME);

if (mysqli_connect_errno($connection)){
	echo "Database Connection Not Found";
}

?>