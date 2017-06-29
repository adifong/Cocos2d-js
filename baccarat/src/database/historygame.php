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

	// flag = 4 save all game
	// flag = 5 get game id
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
	else if($flag == 4)
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

		}
		else{

			//session not store in database
			$errorFlag = 2;

		}


		//end validate session id and get history game id
	    $result1 = json_decode($_POST['json_name'], true);

	    var_dump($result1) ;

	    //echo "ID game : ".$hdr_history_game_id;

	    $winner = $result1['winner'];
	    $ballance = $result1['balance'];
	    $totalCard = count($result1['card']);
	    $totalChips = count($result1['dataBet']);
	    $hdr_history_game_id = $result1['hdr_history_game_id'];

	    //insert to database  cards
	    $cardP1 = "";
	    $cardP2 = "";
	    $cardP3 = "";
	    $cardB1 = "";
	    $cardB2 = "";
	    $cardB3 = "";




	    $someArray = $result1['card'];
	    $player_x = 0;
	    
	    foreach ($someArray as $key => $value) {
	    	if($player_x == 0 ) $cardP1 = $value["cardNameId"];
	    	else if($player_x == 1 ) $cardB1 = $value["cardNameId"];
	    	else if($player_x == 2 ) $cardP2 = $value["cardNameId"];
	    	else if($player_x == 3 ) $cardB2 = $value["cardNameId"];
	    	else if($player_x == 4 ){
	    		//echo "kartu ke pada 4: ".$value["cardTo"] ;
	    		
	    		if($value["cardTo"] == "player"){
	    			$cardP3 = $value["cardNameId"];
	    			
	    		}
	    		else{
	    			$cardB3 = $value["cardNameId"];
	    		}
				
				//$cardP3 = $value["cardTo"];

	    	}
	    	else if($player_x == 5 ){
	    		//echo "kartu ke pada 5: ".$value["cardTo"] ;
	    		//if($value["cardTo"] == "banker"){
	    			$cardB3 = $value["cardNameId"];
	    		//}
	    		//else{
	    	//		$cardP3 = $value["cardNameId"];
	    	//	}
	    	}

		    //echo $value["cardTo"] . ", " . $value["cardId"] . "<br>";
		    $player_x++;
		  }

		$cardResult = "P1:$cardP1,P2:$cardP2,P3:$cardP3,B1:$cardB1,B2:$cardB2,B3:$cardB3";


		//insert to chips
		$someArray1 = $result1['dataBet'];
	    $player_x = 0;

	    $betToPlayer = 0;
	    $betToTie = 0;
	    $betToBanker = 0;
	    $betToSmall = 0;
	    $betToBig = 0;
	    $betToPlayerPair = 0;
	    $betToBankerPair = 0;
	    $betToPerfectPair = 0;
	    $betToEitherPair = 0;
	    
	    $totalBets = 0;
	    $totalWin = 0;
	    $totalLose = 0;
	    foreach ($someArray1 as $key => $value) {
	    	if($value["betTo"] =='player' )
	    		$betToPlayer = $betToPlayer + $value["value"];
	    	else if($value["betTo"] =='banker' )
	    		$betToBanker = $betToBanker + $value["value"];
	    	else if($value["betTo"] =='tie' )
	    		$betToTie = $betToTie + $value["value"];
	    	else if($value["betTo"] =='small' )
	    		$betToSmall = $betToSmall + $value["value"];
	    	else if($value["betTo"] =='big' )
	    		$betToBig = $betToBig + $value["value"];
	    	else if($value["betTo"] =='perfectPair' )
	    		$betToPerfectPair = $betToPerfectPair + $value["value"];
	    	else if($value["betTo"] =='playerPair' )
	    		$betToPlayerPair = $betToPlayerPair + $value["value"];
	    	else if($value["betTo"] =='bankerPair' )
	    		$betToBankerPair = $betToBankerPair + $value["value"];
	    	else if($value["betTo"] =='eitherPair' )
	    		$betToEitherPair = $betToEitherPair + $value["value"];



		    //echo $value["cardTo"] . ", " . $value["cardId"] . "<br>";

		    $totalBets = $totalBets + $value["value"];
		    $player_x++;
		}

		$betsResult = "P:$betToPlayer,B:$betToBanker,T:$betToTie,SM:$betToSmall,BG:$betToBig,PY:$betToPlayerPair,BP:$betToBankerPair,PF:$betToPerfectPair,EP:$betToEitherPair";


		//update data 

		//winner $winner



		$P = $result1['winnerAll']['player'];
		$B = $result1['winnerAll']['banker'];
		$T = $result1['winnerAll']['tie'];
		$SM = $result1['winnerAll']['small'];
		$BG = $result1['winnerAll']['big'];
		$PY = $result1['winnerAll']['playerPair'];
		$BP = $result1['winnerAll']['bankerPair'];
		$PF = $result1['winnerAll']['PerfectPair'];
		$EP = $result1['winnerAll']['eitherPair'];


		$winnerResult = "P:$P,B:$B,T:$T,SM:$SM,BG:$BG,PY:$PY,BP:$BP,PF:$PF,EP:$EP";


		$totalChipsWin = 0;
		$totalChipsLose = 0;

		if($P == 1 )
    		$totalChipsWin = $totalChipsWin + ($betToPlayer * 2);
    	else if($T != 1)
    		$totalChipsLose = $totalChipsLose + $betToPlayer;

    	if($B == 1 )
    		$totalChipsWin = $totalChipsWin + $betToBanker + ($betToBanker * 0.95);
    	else if($T != 1)
    		$totalChipsLose = $totalChipsLose + $betToBanker;

    	if($T == 1 ){
    		//$totalChipsWin = $totalChipsWin + ($betToTie * 9) + ($betToBanker + $betToPlayer) ;
    		$totalChipsWin = $totalChipsWin + ($betToTie * 9) + ($betToBanker + $betToPlayer);
    	}
    	else{
    		$totalChipsLose = $totalChipsLose + $betToTie ;
    		
    	}

    	if($SM == 1 )
    		$totalChipsWin = $totalChipsWin + $betToSmall + ($betToSmall* 1.5);
    	else
    		$totalChipsLose = $totalChipsLose + $betToSmall;

    	if($BG == 1 )
    		$totalChipsWin = $totalChipsWin + $betToBig + ($betToBig * 0.54);
    	else
    		$totalChipsLose = $totalChipsLose + $betToBig;

    	if($PF == 1 )
    		$totalChipsWin = $totalChipsWin + ($betToPerfectPair *26);
    	else
    		$totalChipsLose = $totalChipsLose + $betToPerfectPair;
    	if($PY == 1 )
    		$totalChipsWin = $totalChipsWin + ($betToPlayerPair*12);
    	else
    		$totalChipsLose = $totalChipsLose + $betToPlayerPair;
    	if($BP == 1 )
    		$totalChipsWin = $totalChipsWin + ($betToBankerPair*12);
    	else
    		$totalChipsLose = $totalChipsLose + $betToBankerPair;
    	if($EP == 1 )
    		$totalChipsWin = $totalChipsWin + ($betToEitherPair*6);
    	else
    		$totalChipsLose = $totalChipsLose + $betToEitherPair;




    	//$totalBets

    	$cWin = 0;
    	$cLose = 0;
    	echo "c win :".$totalChipsWin;
    	echo "c lose :".$totalChipsLose;

    	$totalWinLose = 0;
    	if($totalBets - $totalChipsWin > 0 ){
    		$cWin = 0;
    		$cLose = $totalBets - $totalChipsWin;
    		$totalWinLose = ($totalBets - $totalChipsWin) * -1; 
    	}
    	else if($totalBets - $totalChipsWin < 0){
    		$cWin = $totalChipsWin - $totalBets;
    		$cLose = 0;
    		$totalWinLose = ($totalBets - $totalChipsWin) * -1; 
    	}
    	else{
    		$cWin = 0;
    		$cLose = 0;
    	}
    	
    	/*
    	if($totalChipsWin - $totalChipsLose > 0 ){
    		$cWin = $totalChipsWin - $totalChipsLose;
    	}
    	else if($totalChipsWin - $totalChipsLose < 0 ){
			$cLose = $totalChipsLose - $totalChipsWin;
    	}
		*/


		$sql_updateData = "update player_login set balance = round(balance + $totalWinLose ,2) where login_id = ".$_SESSION["login_id"];

		$updateVal = mysqli_query($con,$sql_updateData);
		//$hdr_history_game_id

		/*
		$insertValueNew = "insert into history_game(player_id, 
												history_log_id,
												detailcard,
												detailbets,
												total_bets,
												total_win,
												total_lose,
												winner,
												log_date,
												status) 
												values (
													'".$_SESSION["login_id"]."',
													$history_login_id,
													'$cardResult',
													'$betsResult',
													$totalBets,
													$cWin,
													$cLose,
													'$winnerResult',
													NOW(),
													1)";
		*/

		$updateValueNew = "update history_game set detailcard = '$cardResult', 
													detailbets = '$betsResult',
													total_bets = $totalBets,
													total_win = $cWin,
													total_lose = $cLose,
													winner = '$winnerResult',
													status = 1
													where game_id = $hdr_history_game_id
							";
		//echo $insertValueNew;
		$updateVal = mysqli_query($con,$updateValueNew);



	}
	else if($flag == 5){
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

			$sql_insert_history_game = "insert into history_game(player_id,
																history_log_id,
																detailcard,
																detailbets,
																total_bets,
																total_win,
																total_lose,
																winner,
																log_date,
																status
																) values (
																'".$_SESSION["login_id"]."',
																$history_login_id , 
																'','',0,0,0,'',NOW(),0)";
			
			$insertVal = mysqli_query($con,$sql_insert_history_game);
			
			if($insertVal){
				
				$errorFlag = 1;

				$sql_get_id = "SELECT max(b.game_id) game_id FROM 
								history_log a , history_game b 
								WHERE a.session_id = '$id'
								and a.action = 'LOGIN' 
								and a.history_login_id = b.history_log_id 
								and b.status = 0";
				$result_data = mysqli_query($con,$sql_get_id);
				
				if(mysqli_num_rows($result_data) > 0){
					
					while($row = mysqli_fetch_array ($result_data))     
					{

						$hdr_history_game_id = $row['game_id'];
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
			'game_id' => $hdr_history_game_id,
			'errorFlag' => $errorFlag
		);
		array_push($json, $data);

		$jsonstring = json_encode($json);
		echo $jsonstring;
	}
	else if($flag == 6){
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

			$sql_insert_history_game = "insert into history_game(player_id,
																history_log_id,
																detailcard,
																detailbets,
																total_bets,
																total_win,
																total_lose,
																winner,
																log_date,
																status
																) values (
																'".$_SESSION["login_id"]."',
																$history_login_id , 
																'','',0,0,0,'',NOW(),0)";

			$sql_insert_history_game = "insert into hdr_game_multihand(player_id,game_date,total_bets, total_win ,total_lose,status_game, history_login_id) 
							values('".$_SESSION["login_id"]."',
									NOW(),
									0,0,0,0,$history_login_id)";
			
			$insertVal = mysqli_query($con,$sql_insert_history_game);
			
			if($insertVal){
				
				$errorFlag = 1;

				$sql_get_id = "SELECT max(b.game_id) game_id FROM 
								history_log a , hdr_game_multihand b 
								WHERE a.session_id = '$id'
								and a.action = 'LOGIN' 
								and a.history_login_id = b.history_login_id 
								and b.status_game = 0";


				$result_data = mysqli_query($con,$sql_get_id);
				
				if(mysqli_num_rows($result_data) > 0){
					
					while($row = mysqli_fetch_array ($result_data))     
					{

						$hdr_history_game_id = $row['game_id'];
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
			'game_id' => $hdr_history_game_id,
			'errorFlag' => $errorFlag
		);
		array_push($json, $data);

		$jsonstring = json_encode($json);
		echo $jsonstring;
	}


	else if($flag == 7){

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

		}
		else{

			//session not store in database
			$errorFlag = 2;

		}

		//end validate session id and get history game id
	    $result1 = json_decode($_POST['json_name'], true);

	    //var_dump($result1) ;

	    $totalBets = 0; 
	    $totalWin = 0;
	    $totalLose = 0;
		$gameID = 0;
	    for($i = 0; $i<count($result1) ; $i++){
	    	if(count($result1[$i]['cardDeckBanker']) > 0){
	    		echo "123";

	    		$cardResult = $result1[$i]['dataCard'];
				$winnerResult= $result1[$i]['flagWinner'];
				$gameID = $result1[$i]['gameId'];
				echo "123";				

				$betB = $result1[$i]['betB'];
				$betP = $result1[$i]['betP'];
				$betT = $result1[$i]['betT'];
				$betsResult = "P:$betB,B:$betP,T:$betT";

				$cWin = $result1[$i]['cWin'];
                $cLose = $result1[$i]['cLose'];
                $cBets = $result1[$i]['cBets'];

                $totalBets = $totalBets + $cBets;
                $totalWin = $totalWin + $cWin;
                $totalLose = $totalLose + $cLose;

				$sql = "insert into dtl_game_multihand(hdr_game_id, hand_no , detailcard, detailbets, total_bets, total_win , total_lose, winner)
					values($gameID , $i, '$cardResult','$betsResult',$cBets,$cWin,$cLose,'$winnerResult');
				";

				echo $sql;

				$insertVal = mysqli_query($con,$sql);
	    	}
	    }

	    // update finish game id...
	    $totalWin1 = 0 ;
	    $totalLose1 = 0 ;
	    if($totalWin - $totalLose > 0 ){
	    	$totalWin1 = $totalWin - $totalLose;
	    }
	    else if($totalWin - $totalLose < 0){
	    	$totalLose1 = $totalLose - $totalWin;
	    }
	    else{
	    	$totalWin1 = 0 ;
	    	$totalLose1 = 0 ;
	    }

	    $sql = "update hdr_game_multihand set status_game = 1 , total_bets = $totalBets , total_win =$totalWin1 , total_lose = $totalLose1  where game_id = $gameID";

	    $insertVal = mysqli_query($con,$sql);


	    $sql_updateData = "update player_login set balance = round(balance + $totalWin1 - $totalLose1 ,2) where login_id = ".$_SESSION["login_id"];

		$updateVal = mysqli_query($con,$sql_updateData);

	}

	mysqli_close($con);
	
?>