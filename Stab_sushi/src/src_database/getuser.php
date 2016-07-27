<?php

$con = mysqli_connect('localhost','root','','Project1');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"ajax_demo");
$sql="SELECT * FROM tbl_user";
$result = mysqli_query($con,$sql);

	$json = array();
	while($row = mysqli_fetch_array ($result))     
	{
	    $data = array(
	        'id_user' => $row['id_user'],
	        'nama_depan' => $row['nama_depan'],
	        'nama_belakang' => $row['nama_belakang'],
	        'email' => $row['email'],
	        'password' => $row['password'],
	        'mod_date' => $row['mod_date'],
	        'flag_active' => $row['flag_active']

	    );
	    array_push($json, $data);
	}

	$jsonstring = json_encode($json);
	echo $jsonstring;


mysqli_close($con);
?>