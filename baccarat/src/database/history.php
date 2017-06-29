<?php

	$con = mysqli_connect('localhost','root','','baccarat');
	if (!$con) {
	    die('Could not connect: ' . mysqli_error($con));
	}


	session_start();
	$id = session_id();
	$errorFlag = 0;
	$history_login_id = "";

	$flag = $_REQUEST["flag"];

	//flag = 1 insert and get the header id
	if($flag == 1){
		echo "masuk1234";
		$sql_check = "select history_login_id from history_log where session_id = '$id' and action = 'LOGIN' ";
		$result = mysqli_query($con,$sql_check);

		if(mysqli_num_rows($result) > 0){
			while($row = mysqli_fetch_array ($result))     
			{
				$history_login_id = $row['history_login_id'];
			}

			$sql_insert_history_game = "insert into hdr_history_game(history_login_id, total_win_lose,winner,flag_delete,mod_date,flag_finish_game) values ($history_login_id , 0,'',0,NOW(),0)";
			$insertVal = mysqli_query($con,$sql_insert_history_game);
			echo "masuk1234";
			if($insertVal){
				//$sql_get_history_id = "select * from "
				echo "masuk12345456	";
				$errorFlag = 1;

				$sql_get_id = 'SELECT b.hdr_history_game_id FROM 
								history_log a , hdr_history_game b 
								WHERE a.session_id = '".$id."' 
								and a.action = ''LOGIN'' 
								and a.history_login_id = b.history_login_id 
								and b.flag_finish_game = 0';
							}
			else{
				//failed to insert
				$errorFlag = 3;	
			}

		}
		else{

			//session not store in database
			$errorFlag = 2;

		}


	}

	echo $errorFlag;
	mysqli_close($con);
?>