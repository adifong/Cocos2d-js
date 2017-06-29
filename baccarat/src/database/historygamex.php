<?php

	$con = mysqli_connect('localhost','root','','baccarat');
	if (!$con) {
	    die('Could not connect: ' . mysqli_error($con));
	}


	session_start();
	$id = session_id();

	$flag = $_REQUEST["flag"];

	//flag = 1 insert and get the header id
	//flag = 2 insert chips 
	if($flag == 1){

		$errorFlag = 0;
		$history_login_id = "";
		$hdr_history_game_id = "";
		
		$sql_check = "select history_login_id from history_log where session_id = '$id' and action = 'LOGIN' ";
		$result = mysqli_query($con,$sql_check);

		if(mysqli_num_rows($result) > 0){
			while($row = mysqli_fetch_array ($result))     
			{
				$history_login_id = $row['history_login_id'];
			}

			$sql_insert_history_game = "insert into hdr_history_game(history_login_id, total_win_lose,winner,flag_delete,mod_date,flag_finish_game) values ($history_login_id , 0,'',0,NOW(),0)";
			
			$insertVal = mysqli_query($con,$sql_insert_history_game);
			
			if($insertVal){
				
				$errorFlag = 1;

				$sql_get_id = "SELECT b.hdr_history_game_id FROM 
								history_log a , hdr_history_game b 
								WHERE a.session_id = '$id'
								and a.action = 'LOGIN' 
								and a.history_login_id = b.history_login_id 
								and b.flag_finish_game = 0";
				$result_data = mysqli_query($con,$sql_get_id);
				
				if(mysqli_num_rows($result_data) > 0){
					
					while($row = mysqli_fetch_array ($result_data))     
					{

						$hdr_history_game_id = $row['hdr_history_game_id'];
					}
				}

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


		$json = array();

		$data = array(
			'idGame' => $hdr_history_game_id,
			'errorFlag' => $errorFlag
		);
		array_push($json, $data);

		$jsonstring = json_encode($json);
		echo $jsonstring;


	}
	else if($flag == 2){
		$idGame = $_REQUEST["idGame"];
		$betTo = $_REQUEST["betTo"];
		$value = $_REQUEST["value"];
		

		$sql_insert_chips = "insert into dtl_history_game_chips(hdr_history_game_id, betTo,value,flag_delete) values($idGame,'$betTo',$value,0)";
		echo $sql_insert_chips;
		$insertVal = mysqli_query($con,$sql_insert_chips);


	}
	else if($flag == 3)
	{

		
		//start validate session id and get history game id
		$errorFlag = 0;
		$history_login_id = "";
		$hdr_history_game_id = "";
		
		$sql_check = "select history_login_id from history_log where session_id = '$id' and action = 'LOGIN' ";
		$result = mysqli_query($con,$sql_check);

		if(mysqli_num_rows($result) > 0){
			while($row = mysqli_fetch_array ($result))     
			{
				$history_login_id = $row['history_login_id'];
			}

			$sql_insert_history_game = "insert into hdr_history_game(history_login_id, total_win_lose,winner,flag_delete,mod_date,flag_finish_game) values ($history_login_id , 0,'',0,NOW(),0)";
			
			$insertVal = mysqli_query($con,$sql_insert_history_game);
			
			if($insertVal){
				
				$errorFlag = 1;

				$sql_get_id = "SELECT b.hdr_history_game_id FROM 
								history_log a , hdr_history_game b 
								WHERE a.session_id = '$id'
								and a.action = 'LOGIN' 
								and a.history_login_id = b.history_login_id 
								and b.flag_finish_game = 0";
				$result_data = mysqli_query($con,$sql_get_id);
				
				if(mysqli_num_rows($result_data) > 0){
					
					while($row = mysqli_fetch_array ($result_data))     
					{

						$hdr_history_game_id = $row['hdr_history_game_id'];
					}
				}

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


		//end validate session id and get history game id

		

	    //$result = json_decode(json_encode($_POST['json_name']), true);
	    $result1 = json_decode($_POST['json_name'], true);

	    var_dump($result1) ;

	    //echo "ID game : ".$hdr_history_game_id;

	    $winner = $result1['winner'];
	    $ballance = $result1['balance'];
	    $totalCard = count($result1['card']);
	    $totalChips = count($result1['dataBet']);

	    //insert to database  cards
	    $cardP1 = 0;
	    $cardP2 = 0;
	    $cardP3 = 0;
	    $cardB1 = 0;
	    $cardB2 = 0;
	    $cardB3 = 0;

	    $someArray = $result1['card'];
	    $player_x = 0;
	    
	    foreach ($someArray as $key => $value) {
	    	if($player_x == 0 ) $cardP1 = $value["cardId"];
	    	else if($player_x == 1 ) $cardB1 = $value["cardId"];
	    	else if($player_x == 2 ) $cardP2 = $value["cardId"];
	    	else if($player_x == 3 ) $cardB2 = $value["cardId"];
	    	else{
	    		if($value["cardTo"] == "banker"){
	    			$cardB3 = $value["cardId"];
	    		}
	    		else{
	    			$cardP3 = $value["cardId"];
	    		}


	    	}

		    //echo $value["cardTo"] . ", " . $value["cardId"] . "<br>";
		    $player_x++;
		  }


		$sql_insert_cards = "insert into dtl_history_game_card(hdr_history_game_id , 
		  							player_cardId1,
		  							player_cardId2,
		  							player_cardId3,
		  							banker_cardId1,
		  							banker_cardId2,
		  							banker_cardId3,
		  							flag_delete
		  							)values (
		  								".$hdr_history_game_id.",
		  								".$cardP1.",
		  								".$cardP2.",
		  								".$cardP3.",
		  								".$cardB1.",
		  								".$cardB2.",
		  								".$cardB3.",
		  								0
		  							)";

		$insertCards = mysqli_query($con,$sql_insert_cards);


		//insert to chips
		$someArray1 = $result1['dataBet'];
	    $player_x = 0;

	    $betToPlayer = 0;
	    $betToTie = 0;
	    $betToBanker = 0;
	    
	    foreach ($someArray1 as $key => $value) {
	    	if($value["betTo"] =='player' )
	    		$betToPlayer = $betToPlayer + $value["value"];
	    	else if($value["betTo"] =='banker' )
	    		$betToBanker = $betToBanker + $value["value"];
	    	else if($value["betTo"] =='tie' )
	    		$betToTie = $betToTie + $value["value"];

		    //echo $value["cardTo"] . ", " . $value["cardId"] . "<br>";
		    $player_x++;
		}

		$sql_insert_chips = "insert into dtl_history_game_chips(hdr_history_game_id, betTo,value,flag_delete) 
							values($hdr_history_game_id,'player',$betToPlayer,0)";
		$insertVal = mysqli_query($con,$sql_insert_chips);

		$sql_insert_chips = "insert into dtl_history_game_chips(hdr_history_game_id, betTo,value,flag_delete) 
							values($hdr_history_game_id,'banker',$betToBanker,0)";
		$insertVal = mysqli_query($con,$sql_insert_chips);

		$sql_insert_chips = "insert into dtl_history_game_chips(hdr_history_game_id, betTo,value,flag_delete) 
							values($hdr_history_game_id,'tie',$betToTie,0)";
		$insertVal = mysqli_query($con,$sql_insert_chips);

		//update data 

		//winner $winner
		$totalChipsWin = 0 ;
		if($winner == 'player')
			$totalChipsWin = ($betToPlayer ) - $betToTie - $betToBanker;
		else if($winner == 'banker')
			$totalChipsWin = round(($betToBanker* 0.95),2) - $betToPlayer  - $betToTie ;
		else if($winner == 'tie')
			$totalChipsWin = ($betToTie * 8) ;

		$sql_update = "update hdr_history_game set 
						total_win_lose = $totalChipsWin , 
						winner = '$winner' ,flag_finish_game = 1
						where hdr_history_game_id = $hdr_history_game_id";

		$updateVal = mysqli_query($con,$sql_update);


		$sql_updateData = "update player_login set balance = round(balance + $totalChipsWin,2) where login_id = ".$_SESSION["login_id"];

		$updateVal = mysqli_query($con,$sql_updateData);
		//$hdr_history_game_id


	}

		


	mysqli_close($con);
?>