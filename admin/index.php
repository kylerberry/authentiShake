<?php
require_once('../lib/config.php'); 
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width">
<title>Shake Test Admin</title>

<style type="text/css">
	table{
		border-collapse:collapse;
	}
	table, th, td {
		border: 1px solid black;
	}
	th, td{
		padding:5px;	
	}
</style>

</head>

<body>
<?
$query = "SELECT * FROM project3";
if ($result = $connection->query($query)) {
	?>
     <table>
     	<thead>
        	<th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
        </thead>
    <?php
	
    while ($row = $result->fetch_assoc()) { ?>
        <tr>
        	<td><?php echo $row['id']; ?></td>
            <td><?php echo $row['name']; ?></td>
            <td><?php echo $row['email']; ?></td>
            <td><?php echo $row['comment']; ?></td>
        </tr>
        <?php
	}
    $result->free();
}
?>

</table>
</body>
</html>