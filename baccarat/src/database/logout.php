<?php


session_start();
$id = session_id();

$con = mysqli_connect('localhost','root','','baccarat');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

$login_id = $_REQUEST["login_id"];
$balance = $_REQUEST["balance"];



	function get_client_ip() {
	    $ipaddress = '';
	    if (getenv('HTTP_CLIENT_IP'))
	        $ipaddress = getenv('HTTP_CLIENT_IP');
	    else if(getenv('HTTP_X_FORWARDED_FOR'))
	        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
	    else if(getenv('HTTP_X_FORWARDED'))
	        $ipaddress = getenv('HTTP_X_FORWARDED');
	    else if(getenv('HTTP_FORWARDED_FOR'))
	        $ipaddress = getenv('HTTP_FORWARDED_FOR');
	    else if(getenv('HTTP_FORWARDED'))
	       $ipaddress = getenv('HTTP_FORWARDED');
	    else if(getenv('REMOTE_ADDR'))
	        $ipaddress = getenv('REMOTE_ADDR');
	    else
	        $ipaddress = 'UNKNOWN';
	    return $ipaddress;
	}

	$ip = get_client_ip() ;
	$json = array();

	//mysqli_select_db($con,"ajax_demo");

	$errorFlag = 1;

	$data = array(
		'errorFlag' => $errorFlag
	);
	array_push($json, $data);


	$sql_history_login = "insert into history_log(login_id, session_id,ip_address, mod_date,balance,flag_delete,action) 
			values ('".$login_id."','".$id."','".$ip."',NOW(), ".$balance.",0,'LOGOUT')";

	//echo $sql_history_login;

	//echo $sql_history_login;
	$insertVal = mysqli_query($con,$sql_history_login);

	$jsonstring = json_encode($json);
	echo $jsonstring;
	mysqli_close($con);
	session_destroy();

?>