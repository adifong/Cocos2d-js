<?php

session_start();
session_regenerate_id(true);
$id = session_id();


$con = mysqli_connect('localhost','root','','baccarat');
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];



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



$errorFlag = 0;

mysqli_select_db($con,"ajax_demo");

//validate if duplicate username
$sql_check = "select * from player_login pl, master_betting mb 
						where pl.balance between mb.balance_min and mb.balance_max 
						and mb.flag_delete = 0 
						and username = '".$username."' 
						and password = '".$password."'";

$result = mysqli_query($con,$sql_check);
//echo $sql_check;
$json = array();
$jsonCard = array();

if(mysqli_num_rows($result) > 0){
	//data avail 
	$errorFlag = 1;


	//get card deck

	$sqlCardDeck = "select * from deck_card where flag_delete = 0 ";
	$result_card = mysqli_query($con,$sqlCardDeck);
	if(mysqli_num_rows($result_card) > 0){
		while($row = mysqli_fetch_array ($result_card))     
		{
			$data_card = array(
							'deck_card_id' => $row['deck_card_id'],
							'card_name_id' => $row['card_name_id'],
							'card_name' => $row['card_name'],
							'card_png' => $row['card_png'],
							'card_point' => $row['card_point']
						);

			array_push($jsonCard, $data_card);
		}
	}



	while($row = mysqli_fetch_array ($result))     
	{
		$data = array(
			'errorFlag' => $errorFlag,
			'login_id' => $row['login_id'],
			'username' => $row['username'],
			'balance' => $row['balance'],
			'status' => $row['status'],
			'session_id' => $id,
			'data_card'=>$jsonCard,
			'betting_id' => $row['betting_id'],
			'balance_min' => $row['balance_min'],
			'balance_max' => $row['balance_max'],
			'betting_min' => $row['betting_min'],
			'betting_max' => $row['betting_max'],
			'player_max' => $row['player_max'],
			'banker_max' => $row['banker_max'],
			'tie_max' => $row['tie_max'],
			'small_max' => $row['small_max'],
			'big_max' => $row['big_max'],
			'player_pair_max' => $row['player_pair_max'],
			'perfect_pair_max' => $row['perfect_pair_max'],
			'either_pair_max' => $row['either_pair_max'],
			'banker_pair_max' => $row['banker_pair_max']
		);
		array_push($json, $data);

		// insert to table history login
		$sql_history_login = "insert into history_log(login_id, session_id,ip_address, mod_date,balance,flag_delete,action) 
			values ('".$row['login_id']."','".$id."','".$ip."',NOW(), ".$row['balance'].",0,'LOGIN')";

		//echo $sql_history_login;
		$insertVal = mysqli_query($con,$sql_history_login);

		$_SESSION["login_id"] = $row['login_id'];
		$_SESSION["login_username"] = $row['username'];
		$_SESSION["balance"] = $row['balance'];

	}

}
else{
	//user name or password wrong!!!
	$errorFlag = 0;
	$data = array(
		'errorFlag' => $errorFlag
	);
	array_push($json, $data);
}


	$jsonstring = json_encode($json);
	echo $jsonstring;

	mysqli_close($con);
?>