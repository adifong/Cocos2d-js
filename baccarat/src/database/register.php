<?php

$con = mysqli_connect('localhost','root','','baccarat');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];


$errorFlag = 0;

mysqli_select_db($con,"ajax_demo");

//validate if duplicate username
$sql_check = "select * from player_login where username = '".$username."'";
$result = mysqli_query($con,$sql_check);


if(mysqli_num_rows($result) > 0){
	//duplicate 
	$errorFlag = 0;
}
else{
	$sql="insert into player_login ( username, password, status,create_date,balance) values('".$username."','".$password."','active',NOW(),1000)";
	$result = mysqli_query($con,$sql);

	//echo $sql;

	if($result == true){
		$errorFlag = 1;
	}
	else{
		$errorFlag = 2;
	}
}

	echo $errorFlag;


mysqli_close($con);
?>