<?php

$con = mysqli_connect('localhost','root','','Project1');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");
$sql="SELECT * FROM tbl_score order by score desc limit 5";
$result = mysqli_query($con,$sql);

	$json = array();
	while($row = mysqli_fetch_array ($result))     
	{
	    $data = array(
	        'id_score' => $row['id_score'],
	        'name' => $row['Name'],
	        'score' => $row['score'],
	        'mod_date' => $row['mod_date']
	    );
	    array_push($json, $data);
	}

	$jsonstring = json_encode($json);
	echo $jsonstring;


mysqli_close($con);
?>