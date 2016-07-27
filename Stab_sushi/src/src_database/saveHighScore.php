<?php

$con = mysqli_connect('localhost','root','','Project1');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

$score = $_REQUEST["score"];
$nama = $_REQUEST["nama"];


if($nama == ''){
	$nama = '-';
}


mysqli_select_db($con,"ajax_demo");
$sql="insert into tbl_score ( Name, score, mod_date) values('".$nama."',".$score.",NOW())";
//echo $sql;
$result = mysqli_query($con,$sql);


	$message = "failed";
	//$json = array();	
	if($result == true){
		$message = "success";
	}
	else{
		$message = "failed";
	}


// get all new highscore

	$json = array();
	if($message == true){
		$sql="SELECT * FROM tbl_score order by score desc limit 5";
		$result = mysqli_query($con,$sql);

		while($row = mysqli_fetch_array ($result))     
		{
		    $data = array(
		    	'message' => $message,
		        'id_score' => $row['id_score'],
		        'name' => $row['Name'],
		        'score' => $row['score'],
		        'mod_date' => $row['mod_date']
		    );
		    array_push($json, $data);
		}
	}
	else{
		$data = array(
		        'message' => $message
		);
		array_push($json, $data);
	}
	
	$jsonstring = json_encode($json);
	echo $jsonstring;


mysqli_close($con);
?>