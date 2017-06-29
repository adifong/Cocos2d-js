var PlayLayer = cc.Layer.extend({
    cardDeckSprite:[],
    _playerPoint : 0,
    _bankerPoint : 0,
    _playerDeck : [],
    _bankerDeck : [],
    _allDeck : [],
    _totalDeck : 0,
    _totalDeckPlayer : 0,
    _totalDeckBanker : 0,
    _flagCount : 0,
    _gameEnd :0,
    _flagGameStart:0,
    _winPlayerOrBanker : null,
    playerScoreLabel:null,
    bankerScoreLabel:null,
    flagNextBankerCard : 0,
    flagEndTurn : 0,
    flagEndFirst4Card : 0,
    flagThirdCard : 0,
    _chips_sprite:[],
    _chips_value:[],
    _chips_active : 0,
    _point_polygon_player : [],
    _point_polygon_banker : [],
    _point_polygon_tie : [],
    _point_polygon_PlayerPair : [],
    _point_polygon_PerfectPair : [],
    _point_polygon_Big : [],
    _point_polygon_Small : [],
    _point_polygon_EitherPair : [],
    _point_polygon_BankerPair : [],
    _point_polygon_ShowTable : [],
    _chips_player_sprite : [],
    _chips_banker_sprite : [],
    _chips_tie_sprite : [],
    _chips_bets_sprite:[],
    _buttonLeft : null,
    _buttonRight : null,
    _flagButtonLeft : 0,
    _flagButtonRight : 0,
    _flagImageButtonLeft : 'clear',
    _flagImageButtonRight : 'deal',
    labelWin : null ,
    backgroundWin : null,
    flagSaveHdr : 0,
    labelYouWin : null,
    backgroundYouWin : null,
    flagLabelYouWin:0,
    BetToPLabel:null,
    BetToBLabel:null,
    BetToTLabel:null,
    BetToPFLabel:null,
    BetToPYLabel:null,
    BetToEPLabel:null,
    BetToBPLabel:null,
    BetToBGLabel:null,
    BetToSMLabel:null,
    BetToP:0.00,
    BetToB:0.00,
    BetToT:0.00,
    BetToPF:0.00,
    BetToPY:0.00,
    BetToEP:0.00,
    BetToBP:0.00,
    BetToBG:0.00,
    BetToSM:0.00,
    bgWinner : [],
    totalWinLabel : null,
    totalLoseLabel : null,
    nameLabel : null,
    localStoreData : null,
    bgLabelStatus : null,
    labelStatus : null,
    flagShowPayTable : 0,
    showPayTableBackground : null,
    labelGameID : null,
    drawPolyP :[],
    drawPolyB :[],
    drawPolyT :[],
    drawRoundP :[],
    drawRoundB :[],
    drawRoundT :[],
    pointRoundPx:[],
    pointRoundPy:[],
    pointRoundBx:[],
    pointRoundBy:[],
    pointRoundTx:[],
    pointRoundTy:[],
    LabelBetToP:[],
    LabelBetToB:[],
    LabelBetToT:[],
    flagState :0 ,
    flagStatePlayer : 0,
    flagState3rdCard : 0,
    playCard: [],
    totalCardUse : 0,
    bgScorePlayer : null,
    bgScoreBanker : null,
    labelScorePlayer : null,
    labelScoreBanker: null,
    labelAllPlayer : null,
    labelAllPlayer :null,
    _playerScore:0,
    _bankerScore:0,
    _flagPlayerTurnEnd:0,
    _flagFinishGame:0,
    _scoreCardWinner:null,
    _scoreCardLabelWinner:null,
    _totalWin : 0,
    ctor : function(){
        this._super();

        //this.createHdrHistoryGameId();
        var that = this;

        var winsize = cc.director.getWinSize();
        
        var centerpos = cc.p(winsize.width/2 , winsize.height/2);

        this.localStoreData = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("dataLogin")));


        var spritebg = new cc.Sprite(res.bg_play_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);


        //label total Bet
        this.nameLabel = new cc.LabelTTF( 'Hi '+this.localStoreData[0].username+"!", 'Helvetica', 12,cc.size(100,32), cc.TEXT_ALIGNMENT_LEFT);
        this.nameLabel.attr({
            x : 55,
            y : 90
        });
        this.nameLabel.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild( this.nameLabel, 5 );

        // label game id
        
        this.labelGameID = new cc.LabelTTF( 'Game ID : ', 'Helvetica', 12,cc.size(100,32), cc.TEXT_ALIGNMENT_LEFT);
        this.labelGameID.attr({
            x : 57,
            y : winsize.height- 22
        });
        this.labelGameID.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild( this.labelGameID, 9123 );



        //label total Bet
        var labelMinStake = new cc.LabelTTF( 'MIN. STAKE: 1', 'Helvetica', 9,cc.size(100,32), cc.TEXT_ALIGNMENT_CENTER);
        labelMinStake.attr({
            x : 353,
            y : 66
        });
        labelMinStake.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild( labelMinStake, 5 );

        var labelMaxStake = new cc.LabelTTF( 'MAX. STAKE: 900', 'Helvetica', 9,cc.size(100,32), cc.TEXT_ALIGNMENT_CENTER);
        labelMaxStake.attr({
            x : 470,
            y : 66
        });
        labelMaxStake.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild( labelMaxStake, 5 );

        //label total Bet
        this.totalBetLabel = new cc.LabelTTF( 'Total Bet : 0.00', 'Helvetica', 18,cc.size(240,32), cc.TEXT_ALIGNMENT_CENTER);
        this.totalBetLabel.attr({
            x : 410,
            y : 90
        });
        this.totalBetLabel.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild( this.totalBetLabel, 5 );

        //label total win
        this.totalWinLabel = new cc.LabelTTF( 'Total Win       : 0.00', 'Helvetica', 12,cc.size(250,32), cc.TEXT_ALIGNMENT_LEFT);
        this.totalWinLabel.attr({
            x : 130,
            y : 31
        });
        this.totalWinLabel.setVisible(false);
        this.totalWinLabel.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild( this.totalWinLabel, 5 );

        //label total win
        this.totalLoseLabel = new cc.LabelTTF( 'Total Lose     : 0.00', 'Helvetica', 12,cc.size(250,32), cc.TEXT_ALIGNMENT_LEFT);
        this.totalLoseLabel.attr({
            x : 130,
            y : 18
        });
        this.totalLoseLabel.setVisible(false);
        this.totalLoseLabel.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild( this.totalLoseLabel, 5 );
        //label Balance
        this.balanceLabel = new cc.LabelTTF( 'Balance         : '+parseFloat(playerBalance).toFixed(2), 'Helvetica', 12,cc.size(250,32), cc.TEXT_ALIGNMENT_LEFT );
        this.balanceLabel.attr({
            x : 130 ,
            y : 78
        });
        this.balanceLabel.setAnchorPoint(cc.p(0.5,0.5));
        this.addChild( this.balanceLabel, 5 );


        //button logout
        /*
            var buttonLogout = new ccui.Button();
            buttonLogout.loadTextures(res.button_logout_png,res.button_logout_a_png);
            buttonLogout.x = 148;
            buttonLogout.y = 97;
            buttonLogout.addTouchEventListener(this.touchLogout,this);
            this.addChild(buttonLogout);
        

        var menuLogout   = new cc.MenuItemImage(res.button_logout_png,res.button_logout_a_png,this.SetlogOut);
        var menu = new cc.Menu(menuLogout);
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu);
    */

        //button back
        /*
            var buttonBack = new ccui.Button();
            buttonBack.loadTextures(res.button_back_s_png,res.button_back_s_a_png);
            buttonBack.x = 148;
            buttonBack.y = 77;
            buttonBack.addTouchEventListener(this.TouchbackToMenu,this);
            this.addChild(buttonBack);
        */

        cc.spriteFrameCache.addSpriteFrames(res.sprites_plist, res.sprites_png); 
        cc.spriteFrameCache.addSpriteFrames(res.chips_normal_plist, res.chips_normal_png); 
        cc.spriteFrameCache.addSpriteFrames(res.chips_plist, res.chips_png); 
        cc.spriteFrameCache.addSpriteFrames(res.chips1_plist, res.chips1_png); 
        cc.spriteFrameCache.addSpriteFrames(res.button_plist, res.button_png); 
        cc.spriteFrameCache.addSpriteFrames(res.menu_button_new_plist, res.menu_button_new_png); 
        cc.spriteFrameCache.addSpriteFrames(res.score_card_plist, res.score_card_png); 

        
        //delete this//
        /*
        // add label bets for all 
        //score label player
        var backgroundlabelPlayer = new cc.LayerColor( cc.color( 84, 90, 92),90,20 );
        backgroundlabelPlayer.attr({
            x : 155,
            y : winsize.height-169
        });
        backgroundlabelPlayer.opacity = 200;
        this.addChild(backgroundlabelPlayer);


        this.playerScoreLabel = new cc.LabelTTF( 'Player : '+this._playerPoint, 'Helvetica', 18 );
        this.playerScoreLabel.attr({
            x : 200,
            y : winsize.height-159
        });
        //this.playerScoreLabel.setAnchorPoint(cc.p(0.,0.5));
        //this.playerScoreLabel.setColor(cc.color(0,0,0));
        this.addChild( this.playerScoreLabel, 5 );

        var backgroundlabelBanker = new cc.LayerColor( cc.color( 84, 90, 92),90,20 );
        backgroundlabelBanker.attr({
            x : 543,
            y : winsize.height-169
        });
        backgroundlabelBanker.opacity = 200;
        this.addChild(backgroundlabelBanker);

        //score label banker
        this.bankerScoreLabel = new cc.LabelTTF( 'Banker : '+this._bankerPoint, 'Helvetica', 18 );
        this.bankerScoreLabel.attr({
            x : 588,
            y : winsize.height-159
        });
        this.addChild( this.bankerScoreLabel, 5 );
        */
        //delete this//


        //score winner 
        this._scoreCardWinner = new cc.Sprite("#score_board.png");
        this._scoreCardWinner.attr({
                x: 412,
                y: 465
            });
        this._scoreCardWinner.setVisible(false);
        this.addChild(this._scoreCardWinner,11923);

        this._scoreCardLabelWinner = new cc.LabelTTF( '0', 'Helvetica', 30 , cc.size(250,50), cc.TEXT_ALIGNMENT_CENTER );
        this._scoreCardLabelWinner.attr({
            x : 410,
            y : 435
        });
        this._scoreCardLabelWinner.setFontFillColor(cc.color(153,1,1));
        this._scoreCardLabelWinner.setVisible(false);
        this.addChild( this._scoreCardLabelWinner, 112345 );

        //score winner

        //score bg//
        //bgScorePlayer : null,
        //bgScoreBanker : null,
        this.bgScorePlayer = new cc.Sprite("#blank_win.png");
        this.bgScorePlayer.attr({
                x: 630 ,
                y: 230
            });
        this.bgScorePlayer.setVisible(false);
        this.addChild(this.bgScorePlayer,123456); 

        this.labelAllPlayer = new cc.LabelTTF( 'Player', 'Helvetica', 13 );
        this.labelAllPlayer.attr({
            x : 630,
            y : 241
        });
        this.labelAllPlayer.setVisible(false);
        this.addChild( this.labelAllPlayer, 2356762 );

        this.labelScorePlayer = new cc.LabelTTF( '0', 'Helvetica', 20 );
        this.labelScorePlayer.attr({
            x : 630,
            y : 221
        });
        this.labelScorePlayer.setVisible(false);
        this.addChild( this.labelScorePlayer, 45678922 );


        this.bgScoreBanker = new cc.Sprite("#blank_win.png");
        this.bgScoreBanker.attr({
                x: 750,
                y: 230
            });
        this.bgScoreBanker.setVisible(false);
        this.addChild(this.bgScoreBanker,33211);

        this.labelAllBanker = new cc.LabelTTF( 'Banker', 'Helvetica', 13 );
        this.labelAllBanker.attr({
            x : 750,
            y : 241
        });
        this.labelAllBanker.setVisible(false);
        this.addChild( this.labelAllBanker, 35555 );

        this.labelScoreBanker = new cc.LabelTTF( '0', 'Helvetica', 20 );
        this.labelScoreBanker.attr({
            x : 750,
            y : 221
        });
        this.labelScoreBanker.setVisible(false);
        this.addChild( this.labelScoreBanker, 385955 ); 



        //

        //score bg//


        this.addChips();

        // add button deal , clear 
        this._buttonLeft = new cc.Sprite("#clear_disable.png");
        this._buttonLeft.attr({
                x: 350 ,
                y: 43
            });
        this.addChild(this._buttonLeft); 

        
        // add button deal , clear 
        this._buttonRight = new cc.Sprite("#deal_disable.png");
        this._buttonRight.attr({
                x: 470,
                y: 43
            });
        this.addChild(this._buttonRight); 

        this.addTouchEventListener();
    

        //cc.log("status baru : "+playerHistory[0].status);
        this.setPointHitChips();
        this.setPolygonPoint();
        this.setChipsBetsSprite();
        this.resetWinnerGame();

        this.setStatusMessage(1);

        // call get game id
        this.setNewGameID();

        return true;
    },
    getLastPlayer:function(){
        var i = 0;
        var lastPlayer = 0;
        for(i=0;i<5;i++){
            if(this.playCard[i].cardDeckSprite.length > 0){
                lastPlayer = i;
            }
        }   
        
        return lastPlayer;
    },
    setWinnerPlayerTurn:function(player ){
        //this._scoreCardLabelWinner.setVisible(true);
        //this._scoreCardWinner.setVisible(true);


        //get last player 
        //this.playCard[this.flagStatePlayer].cardDeckSprite.length
        var totalWinX = 0;
        var totalLoseX = 0;
        var flagLastPlayer = 0;
        var frameScoreBoard =null;
        if(this.getLastPlayer() == player){
            flagLastPlayer = 1;
            frameScoreBoard = cc.spriteFrameCache.getSpriteFrame("score_board_win.png");
        }
        else{
            frameScoreBoard = cc.spriteFrameCache.getSpriteFrame("score_board.png");
        }

        this._scoreCardWinner.setSpriteFrame(frameScoreBoard);

        var dataPlayer = this.playCard[player];



        if(this._bankerScore > this._playerScore){
            frame = cc.spriteFrameCache.getSpriteFrame("banker_win.png");
            this.bgScoreBanker.setSpriteFrame(frame);
            this.labelScoreBanker.setVisible(false);
            this.labelAllBanker.setVisible(false);
            
            if(betToBtotal[player] > 0 ){
                this._scoreCardLabelWinner.setVisible(true);
                this._scoreCardWinner.setVisible(true);

                this._scoreCardLabelWinner.setString((betToBtotal[player] * 0.95) + betToBtotal[player]);
                this._totalWin = this._totalWin + (betToBtotal[player] * 0.95) + betToBtotal[player];    
                totalWinX =  (betToBtotal[player] * 0.95) + betToBtotal[player];    
            }
            playerHistory[totalGame].cardShow[player].winner = 'banker';
            
        }
        else if(this._bankerScore < this._playerScore){
            frame = cc.spriteFrameCache.getSpriteFrame("player_win.png");
            this.bgScorePlayer.setSpriteFrame(frame);
            this.labelScorePlayer.setVisible(false);
            this.labelAllPlayer.setVisible(false);
            if(betToPtotal[player] > 0 ){
                this._scoreCardLabelWinner.setVisible(true);
                this._scoreCardWinner.setVisible(true);
                this._scoreCardLabelWinner.setString(betToPtotal[player] * 2);
                this._totalWin = this._totalWin + (betToPtotal[player] * 2) ;
                totalWinX =  (betToPtotal[player] * 2) ;
            }
            playerHistory[totalGame].cardShow[player].winner = 'player';

            
        }
        else{
            this.labelScorePlayer.setString("TIE");
            this.labelScoreBanker.setString("TIE");
            if(betToTtotal[player]  > 0 ){
                this._scoreCardLabelWinner.setVisible(true);
                this._scoreCardWinner.setVisible(true);
                this._scoreCardLabelWinner.setString((betToTtotal[player] * 8 )+ betToTtotal[player] );
                this._totalWin = this._totalWin + (betToTtotal[player] * 8) + betToTtotal[player];  
                totalWinX =   (betToTtotal[player] * 8) + betToTtotal[player] ;  
            }
            totalWinX = totalWinX + betToPtotal[player] + betToBtotal[player];
            playerHistory[totalGame].cardShow[player].winner = 'tie';
            
        }

        
        if(this._totalWin > 0  && this.getLastPlayer() == player){
            this._scoreCardLabelWinner.setVisible(true);
                this._scoreCardWinner.setVisible(true);
            this._scoreCardLabelWinner.setString(this._totalWin);
        }

        playerBalance = Math.round((playerBalance + totalWinX) * 100) / 100;
        this.setLabelBet();



    },
    setScoreLabel:function(flag,flag1, val, visible , x , y ){
        

        if(flag == 'player'){
            if(flag1 == 0){

                frame = cc.spriteFrameCache.getSpriteFrame("blank_win.png");
                this.bgScorePlayer.setSpriteFrame(frame);
                this.labelScorePlayer.setString("0");

                this._playerScore = 0;
                this.bgScorePlayer.setVisible(visible);
                this.labelScorePlayer.setVisible(visible);
                this.labelAllPlayer.setVisible(visible);

                 this.bgScorePlayer.setPosition(cc.p(x,y));
                 this.labelScorePlayer.setPosition(cc.p(x,y-9));
                 this.labelAllPlayer.setPosition(cc.p(x,y+11));
            }
            else if(flag1 == 1)
            {

                this._playerScore = this._playerScore + val;

                if(this._playerScore >= 10){
                    this._playerScore = this._playerScore - 10;
                }
                //flag1 = 1 change value
                this.labelScorePlayer.setString(this._playerScore);
            }
            else if(flag1 == 2)
            {
                // change posisition
                
            }
        }
        else if(flag == 'banker'){
            
            if(flag1 == 0){
                frame = cc.spriteFrameCache.getSpriteFrame("blank_win.png");
                this.bgScoreBanker.setSpriteFrame(frame);
                this.labelScoreBanker.setString("0");


                this._bankerScore = 0;
                this.bgScoreBanker.setVisible(visible);
                this.labelScoreBanker.setVisible(visible);
                this.labelAllBanker.setVisible(visible);

                 this.bgScoreBanker.setPosition(cc.p(x,y));
                 this.labelScoreBanker.setPosition(cc.p(x,y-9));
                 this.labelAllBanker.setPosition(cc.p(x,y+11));
            }
            else if(flag1 == 1)
            {
                this._bankerScore += val;

                if(this._bankerScore >= 10){
                    this._bankerScore = this._bankerScore - 10;
                }
                //flag1 = 1 change value
                this.labelScoreBanker.setString(this._bankerScore);
            }
            else if(flag1 == 2)
            {
                // change posisition
                
            }
            

            
        }
    },
    setStatusMessage:function(flag){

        

        if(this.bgLabelStatus != null){
            this.removeChild(this.bgLabelStatus);
        }
        
        if(this.labelStatus != null){
            this.removeChild(this.labelStatus);
        }

        var message = "";
        var widhtBg = 0;
        var HeightBg = 0;
        var xLabel = 0;
        var yLabel = 0;
        if(flag == 1){
            message = "Place your bet, please.";
            widhtBg = 250;
            HeightBg = 20;
            xLabel = 130;
            yLabel = 118;
        }
        else if(flag == 2){
            message = "Please wait while the card are dealt";
            widhtBg = 250;
            HeightBg = 20;
            xLabel = 130;
            yLabel = 118;
        }
        else if(flag == 3){
            message = "Placing Bets. Click Deal to begin";
            widhtBg = 250;
            HeightBg = 20;
            xLabel = 130;
            yLabel = 118;
        }
        else if(flag == 4){
            message = "Select action from menu.";
            widhtBg = 250;
            HeightBg = 20;
            xLabel = 130;
            yLabel = 118;
        }
        else if(flag == 5){
            message = "You have reached the Maximum Bet Limit.";
            widhtBg = 280;
            HeightBg = 20;
            xLabel = 148;
            yLabel = 118;
        }
        else if(flag == 6){
            message = "Balance is too low to place this bet.";
            widhtBg = 280;
            HeightBg = 20;
            xLabel = 148;
            yLabel = 118;
        }
        


        //score label player
        this.bgLabelStatus = new cc.LayerColor( cc.color( 84, 90, 92),widhtBg,HeightBg );
        this.bgLabelStatus.attr({
            x : 3,
            y : 111
        });
        this.bgLabelStatus.opacity = 200;
        this.addChild(this.bgLabelStatus);


        this.labelStatus = new cc.LabelTTF( message, 'Arial', 14 , cc.size(widhtBg,HeightBg) );
        this.labelStatus.attr({
            x : xLabel,
            y : yLabel
        });
        this.addChild( this.labelStatus );
    },
    TouchbackToMenu:function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                 cc.log("back to menu");
                cc.director.runScene(new MenuScene());
                break;
        }

    },
    SetlogOut:function(){

        /*
        this.cardDeckSprite = [];
        this._playerPoint = 0;
        this._bankerPoint = 0;
        this._playerDeck = [];
        this._bankerDeck = [];
        this._allDeck = [];
        this._totalDeck = 0;
        this._totalDeckPlayer = 0;
        this._totalDeckBanker = 0;
        this._flagCount = 0;
        this._gameEnd = 0;

        this._chips_sprite = [];
        this._chips_value = [];
        this._chips_active = 0;
    */

        //var scope = this;

        cc.log("logout!!!11");
        cc.log("panjang sprite : "+this._chips_sprite.length);
        
        cc.log("test : "+this.localStoreData);

        var login_id = this.localStoreData[0].login_id;
        var balance = this.localStoreData[0].balance;

        cc.log("logout!!");

        
        var returnVal = 0;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //store value database
                //dataPlayer = xmlhttp.responseText;

                var data = xmlhttp.responseText;
                cc.log(xmlhttp.responseText);   
                var dataPlayer = JSON.parse(xmlhttp.responseText);

                cc.log(dataPlayer[0].errorFlag);
                var returnVal = dataPlayer[0].errorFlag;

                if(returnVal == 1){
                    //this.flagError = 1;  
                    isLogin = 0;
                    
                    //this.removeAllChildren(true);
                    cc.director.runScene(new MenuScene());
                    //cc.director.runScene(new cc.TransitionFade(1.2,scene));



                }
            }
        };
        xmlhttp.open("GET","src/database/logout.php?login_id="+login_id+"&balance="+balance,true);
        xmlhttp.send();

        //return returnVal;



    },
    touchLogout : function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                
                cc.log("touch logout");
                this.logOut();
                //this.saveHighScore(textField.string,this.score);
                break;
        }
    },
    resetWinnerGame:function(){
        winnerGame = {
            'player':0,
            'banker':0,
            'tie':0,
            'playerPair':0,
            'PerfectPair':0,
            'bankerPair':0,
            'eitherPair':0,
            'small':0,
            'big':0
        };
    },
    setChipsBetsSprite:function(){
        //p1
        this._chips_bets_sprite[0] = [];
        //p2
        this._chips_bets_sprite[1] = [];
        //p3
        this._chips_bets_sprite[2] = [];
        //p4
        this._chips_bets_sprite[3] = [];
        //p5
        this._chips_bets_sprite[4] = [];
        //b1
        this._chips_bets_sprite[5] = [];
        //b2
        this._chips_bets_sprite[6] = [];
        //b3
        this._chips_bets_sprite[7] = [];
        //b4
        this._chips_bets_sprite[8] = [];
        //b5
        this._chips_bets_sprite[9] = [];
        //t1
        this._chips_bets_sprite[10] = [];
        //t2
        this._chips_bets_sprite[11] = [];
        //t3
        this._chips_bets_sprite[12] = [];
        //t4
        this._chips_bets_sprite[13] = [];
        //t5
        this._chips_bets_sprite[14] = [];

    },
    setLabelBetTo : function(){

        //bet TO player
        this.BetToPLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToPLabel.attr({
            x : 230,
            y : 81
        });
        this.addChild( this.BetToPLabel, 5 );

        //bet TO banker
        this.BetToBLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToBLabel.attr({
            x : 230,
            y : 44
        });
        this.addChild( this.BetToBLabel, 5 );

        //bet TO tie
        this.BetToTLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToTLabel.attr({
            x : 230,
            y : 8
        });
        this.addChild( this.BetToTLabel, 5 );



        //bet TO Player pair
        this.BetToPYLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToPYLabel.attr({
            x : 350,
            y : 81
        });
        this.addChild( this.BetToPYLabel, 5 );

        //bet TO perfect pair
        this.BetToBPLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToBPLabel.attr({
            x : 350,
            y : 44
        });
        this.addChild( this.BetToBPLabel, 5 );


        //bet TO SM
        this.BetToSMLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToSMLabel.attr({
            x : 350,
            y : 8
        });
        this.addChild( this.BetToSMLabel, 5 );


        //bet TO Player pair
        this.BetToPFLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToPFLabel.attr({
            x : 468,
            y : 81
        });
        this.addChild( this.BetToPFLabel, 5 );



        //bet TO perfect pair
        this.BetToEPLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToEPLabel.attr({
            x : 468,
            y : 44
        });
        this.addChild( this.BetToEPLabel, 5 );

        //bet TO SM
        this.BetToBFLabel = new cc.LabelTTF( "0.00", 'Arial', 12,cc.size(120,20),cc.TEXT_ALIGNMENT_RIGHT );
        this.BetToBFLabel.attr({
            x : 468,
            y : 8
        });
        this.addChild( this.BetToBFLabel, 5 );

    },
    setLabelWinner : function(message,flagLoop){
        //hide label for player winner or Banker win!
        /*
        this.backgroundWin = new cc.LayerColor( cc.color( 84, 90, 92),150,40 );
        this.backgroundWin.attr({
            x : 335,
            y : 520
        });
        this.backgroundWin.opacity = 200;
        this.addChild(this.backgroundWin);
        */

        //score label banker
        this.labelWin = new cc.LabelTTF( message, 'Helvetica', 24 );
        this.labelWin.attr({
            x : 398,
            y : 535
        });
        
        var action = null;


        if(flagLoop == 1)
            action = cc.Blink.create(10, 10).repeatForever();
        else
            action = cc.Blink.create(10, 10);



        //var action = cc.Blink(0.5,10);
        this.labelWin.runAction(action);  

        this.addChild( this.labelWin, 5 );
        /*
        var backwardsFade = cc.speed(cc.sequence(
            cc.delayTime(2),
            cc.Blink.create(1, 255),
            cc.delayTime(2)), 1);

        this.labelWin.runAction(cc.repeat(cc.sequence(cc.blink(2, 3), cc.delayTime(2)), 3));
        */
    },
    setLabelBet:function(){


        //playerWin = 0;
        //playerLose = 0;


        //this.totalBetLabel.setString('Total Bet        : '+playerBet.toFixed(2));
        //this.totalWinLabel.setString('Total Win       : '+playerWin.toFixed(2));
        //this.totalLoseLabel.setString('Total Lose     : '+playerLose.toFixed(2));
        this.balanceLabel.setString('Balance         : '+playerBalance.toFixed(2));

        var i =0;
        var totalAll = 0;
        for(i=0;i<5;i++){
            
            this.LabelBetToP[i].setString(betToPtotal[i]);
            this.LabelBetToB[i].setString(betToBtotal[i]);
            this.LabelBetToT[i].setString(betToTtotal[i]);
            totalAll = totalAll + betToPtotal[i]+betToBtotal[i]+betToTtotal[i];
        }


        this.totalBetLabel.setString('Total Bet : '+totalAll+'.00');


    },
    setChipsBetting:function(flag,value){

        //var betToPlayer = 0;
        //var betToBanker = 0;
        //var betToTie = 0;
        //var betToSmall = 0;
        //var betToBig = 0;
        //var betToPlayerPair = 0;
        //var betToPerfectPair = 0;
        //var betToBankerPair = 0;
        //var betToEitherPair = 0;


        if(flag == 'player'){
            flagChips = 0;
            betToPlayer = betToPlayer + value;
        }
        else if(flag== 'banker'){
            flagChips = 1;
            betToBanker = betToBanker + value;
        }
        else if(flag == 'tie'){
            flagChips = 2;
            betToTie = betToTie + value;
        }
        else if(flag == 'small'){
            flagChips = 3;
            betToSmall = betToSmall + value;
        }
        else if(flag == 'big'){
            flagChips = 4;
            betToBig = betToBig + value;
        }
        else if(flag == 'playerPair'){
            flagChips = 5;
            betToPlayerPair = betToPlayerPair + value;
            
        }
        else if(flag == 'perfectPair'){
            flagChips = 6;
            betToPerfectPair = betToPerfectPair + value;
        }
        else if(flag == 'bankerPair'){
            flagChips = 7;
            betToBankerPair = betToBankerPair + value;
        }
        else if(flag == 'eitherPair'){
            flagChips = 8;
            betToEitherPair = betToEitherPair + value;
        }

        playerBet = playerBet + value;
        //playerBalance = playerBalance - value;
        playerBalance = Math.round((playerBalance - value) * 100) / 100;

        this.setLabelBet();

    },
    addSmartChips:function(flag,flagplayer, totalVal , flagChipsData){
        
        
        var chipsUse = [100,50,25,10,1];

        var totalTemp = totalVal;

        var chipsAll = [];
        var x = 0;
        var totalX = 0;
        for(x = 0; x<5; x++){

            if(totalTemp == 0 ) break;
            while(totalTemp >= chipsUse[x] ){
                if(totalTemp - chipsUse[x] >=0){
                    totalTemp = totalTemp - chipsUse[x];    
                    chipsAll[totalX] = chipsUse[x];
                    totalX++;
                }
                else{
                    break;
                }
            }
        }

        /////////////////////start add chips to game ////////////////////
        var totalChips = 0;
        var goToX = 0;
        var goToY = 5;
        var posX , posY ;

        var flagAdd = 0;
        if(flag == 'p'){
            posX = [595,560,450,272,232];
            posY = [304,267,243,268,321];
            var flagAdd = 0;
        }
        else if(flag == 'b'){
            posX = [552,515,390,312,277];
            posY = [318,289,272,287,330];
            var flagAdd = 5;
        }
        else if(flag == 't'){
            posX = [502,468,420,353,320];
            posY = [334,312,302,305,335];
            var flagAdd = 10;
        }


        for(var j =0;j<this._chips_bets_sprite[flagChipsData].length;j++){

            this.removeChild(this._chips_bets_sprite[flagChipsData][j]);        
        }
        this._chips_bets_sprite[flagChipsData] = [];


        var chipsNew = null;
        for(x=0;x<chipsAll.length;x++){

            totalChips = x;

            chipsNew = new cc.Sprite("#chips"+chipsAll[x]+".png");
            chipsNew.attr({
                    x: posX[flagplayer] ,
                    y: posY[flagplayer] + (goToY * totalChips)
                });
            this._chips_bets_sprite[flagChipsData].push(chipsNew);
            this.addChild(chipsNew); 
        }

        var addY = 4;
        var getRoundX = 0;
        var getRoundY = 0;
        var total = 0;

        if(flag == 'p'){
            //show label 
            total = totalChips * addY;
            this.drawRoundP[flagplayer].setPositionY(total);
            this.drawRoundP[flagplayer].setVisible(true);
            this.LabelBetToP[flagplayer].setPositionY(this.pointRoundPy[flagplayer] + total - 3 );
            this.LabelBetToP[flagplayer].setVisible(true);
            //betToPtotal[flagplayer] += value;

            //addSmartChips('p',flagChips,betToPtotal[flagChips]);
        }
        else if(flag == 'b'){
            //show label 
            total = totalChips * addY;
            this.drawRoundB[flagplayer].setPositionY(total);
            this.drawRoundB[flagplayer].setVisible(true);
            this.LabelBetToB[flagplayer].setPositionY(this.pointRoundBy[flagplayer] + total - 3);
            this.LabelBetToB[flagplayer].setVisible(true);
            //betToBtotal[flagChips] += value;
            //addSmartChips('b',flagChips,betToBtotal[flagChips]);
        }
        else if(flag == 't'){
            //show label 
            total = totalChips * addY;
            this.drawRoundT[flagplayer].setPositionY(total);
            this.drawRoundT[flagplayer].setVisible(true);
            this.LabelBetToT[flagplayer].setPositionY(this.pointRoundTy[flagplayer] + total - 3);
            this.LabelBetToT[flagplayer].setVisible(true);
            
            //betToTtotal[flagChips] += value;
            //addSmartChips('t',flagChips,betToTtotal[flagChips]);
        }

        //for(x=0;x<chipsAll.length;x++){
        //    cc.log("Chips dibagi-"+x+" : "+chipsAll[x]);
       // }
        //return chipsAll;
    },
    addChipsInBettingTable1:function(flag,value){

        
        //validate show button to display
        if(this._flagButtonLeft == 0)
            this.setChangeButton('left',1,this._flagImageButtonLeft);


        if(this._flagImageButtonRight == 'repeat'){
            cc.log('insert ke sini ga?!!!');
            this.clearChips();
            //delete data chips
            playerHistory[totalGame].dataBet = []; 
            this.clearCard();
            this._flagImageButtonRight = 'deal';  

        }
        else{
            this.setStatusMessage(3);
        }


        cc.log("masuk ke sini validasi dulu : "+this._flagButtonRight);
        
        if(this._flagButtonRight == 0)
            this.setChangeButton('right',1,this._flagImageButtonRight);
        else if(this._flagButtonRight == 3){
            cc.log('insert ke sini ga?!!!2222');
            cc.log('insert!!!');
            this.clearChips();
            //delete data chips
            playerHistory[totalGame].dataBet = []; 
            this.clearCard();
            this._flagImageButtonRight = 'deal';  

            this.setChangeButton('right',1,this._flagImageButtonRight);
        }



        
        //end display button
        
        cc.log("that");
        var totalChips = 0;
        var goToX = 0;
        var goToY = 5;
        var posX , posY ;

        var flagAdd = 0;
        if(flag.substring(0, 1) == 'p'){
            posX = [595,560,450,272,232];
            posY = [304,267,243,268,321];
            var flagAdd = 0;
        }
        else if(flag.substring(0, 1) == 'b'){
            posX = [552,515,390,312,277];
            posY = [318,289,272,287,330];
            var flagAdd = 5;
        }
        else if(flag.substring(0, 1) == 't'){
            posX = [502,468,420,353,320];
            posY = [334,312,302,305,335];
            var flagAdd = 10;
        }

        var flagChipsData = (parseInt(flag.substr(flag.length-1)) - 1) + flagAdd;
        var flagChips = (parseInt(flag.substr(flag.length-1)) - 1) ;
        var chipsSprite = null;

        /*
        chipsSprite = this._chips_bets_sprite[flagChipsData];
        //set chips koordinat
        totalChips = chipsSprite.length;
        if(totalChips % 2 == 0 ){
             goToX = -3;
        }
        else{
           goToX = 3;
        }


        var chipsNew = new cc.Sprite("#chips"+value+".png");
        chipsNew.attr({
                x: posX[flagChips] ,
                y: posY[flagChips] + (goToY * totalChips)
            });
        this._chips_bets_sprite[flagChipsData].push(chipsNew);
        this.addChild(chipsNew); 


        var addY = 4;
        var getRoundX = 0;
        var getRoundY = 0;
        var total = 0;
        //this.pointRoundPx = [580,542,435,255,215];
        //this.pointRoundPy = [315,276,254,281,332];
        //this.pointRoundBx = [538,499,372,298,261];
        //this.pointRoundBy = [330,300,284,300,342];
        //this.pointRoundTx = [489,451,407,340,305];
        //this.pointRoundTy = [345,321,312,318,348];
    */
        if(flag.substring(0, 1) == 'p'){
            //show label 
           // total = totalChips * addY;
           // this.drawRoundP[flagChips].setPositionY(total);
           // this.drawRoundP[flagChips].setVisible(true);
          //  this.LabelBetToP[flagChips].setPositionY(this.pointRoundPy[flagChips] + total - 3 );
          //  this.LabelBetToP[flagChips].setVisible(true);
            betToPtotal[flagChips] += value;

            this.addSmartChips('p',flagChips,betToPtotal[flagChips],flagChipsData);
        }
        else if(flag.substring(0, 1) == 'b'){
            //show label 
            //total = totalChips * addY;
           // this.drawRoundB[flagChips].setPositionY(total);
           // this.drawRoundB[flagChips].setVisible(true);
           // this.LabelBetToB[flagChips].setPositionY(this.pointRoundBy[flagChips] + total - 3);
           // this.LabelBetToB[flagChips].setVisible(true);
            betToBtotal[flagChips] += value;
            this.addSmartChips('b',flagChips,betToBtotal[flagChips],flagChipsData);
        }
        else if(flag.substring(0, 1) == 't'){
            //show label 
            //total = totalChips * addY;
            //this.drawRoundT[flagChips].setPositionY(total);
            //this.drawRoundT[flagChips].setVisible(true);
            //this.LabelBetToT[flagChips].setPositionY(this.pointRoundTy[flagChips] + total - 3);
            //this.LabelBetToT[flagChips].setVisible(true);
            
            betToTtotal[flagChips] += value;
            this.addSmartChips('t',flagChips,betToTtotal[flagChips],flagChipsData);
        }



        //insert chips to database
        //this.setChips('insert',flag,value);
        this.setChips1('insert',flag,value,flagChips);
        playerBet += value;
        playerBalance = Math.round((playerBalance - value) * 100) / 100;

        this.setLabelBet();


    },
    addChipsInBettingTable:function(flag,value){

        //cc.log("Total : "+this._chips_player_sprite.length % 2);
        if(this._flagButtonLeft == 0)
            this.setChangeButton('left',1,this._flagImageButtonLeft);


        if(this._flagImageButtonRight == 'repeat'){
            cc.log('insert ke sini ga?!!!');
            this.clearChips();
            //delete data chips
            playerHistory[totalGame].dataBet = []; 
            this.clearCard();
            this._flagImageButtonRight = 'deal';  

        }
        else{
            this.setStatusMessage(3);
        }


        cc.log("masuk ke sini validasi dulu : "+this._flagButtonRight);
        
        if(this._flagButtonRight == 0)
            this.setChangeButton('right',1,this._flagImageButtonRight);
        else if(this._flagButtonRight == 3){
            cc.log('insert ke sini ga?!!!2222');
            cc.log('insert!!!');
            this.clearChips();
            //delete data chips
            playerHistory[totalGame].dataBet = []; 
            this.clearCard();
            this._flagImageButtonRight = 'deal';  

            this.setChangeButton('right',1,this._flagImageButtonRight);
        }
            
        //start add chips

        var goToX = 0;
        var goToY = 3;
        var totalChips = 0;
        var chipsSprite = null;
        var posX = 0;
        var posY = 0;
        var flagChips = 0;

        if(flag == 'player'){
            flagChips = 0;
            posX = 509;
            posY = 190;
        }
        else if(flag== 'banker'){
            flagChips = 1;
            posX = 404;
            posY = 284;
        }
        else if(flag == 'tie'){
            flagChips = 2;
            posX = 377;
            posY = 355;
        }
        else if(flag == 'small'){
            flagChips = 3;
            posX = 429;
            posY = 210;
        }
        else if(flag == 'big'){
            flagChips = 4;
            posX = 358;
            posY = 215;
        }
        else if(flag == 'playerPair'){
            flagChips = 5;
            posX = 258;
            posY = 348;
        }
        else if(flag == 'perfectPair'){
            flagChips = 6;
            posX = 288;
            posY = 276;
        }
        else if(flag == 'bankerPair'){
            flagChips = 7;
            posX = 535;
            posY = 348;
        }
        else if(flag == 'eitherPair'){
            flagChips = 8;
            posX = 520;
            posY = 276;
        }

        chipsSprite = this._chips_bets_sprite[flagChips];
        //set chips koordinat
        totalChips = chipsSprite.length;
        if(totalChips % 2 == 0 ){
             goToX = -3;
        }
        else{
           goToX = 3;
        }
        var chipsNew = new cc.Sprite("#chips"+value+".png");
        chipsNew.attr({
                x: posX + goToX,
                y: posY + (goToY * totalChips)
            });
        this._chips_bets_sprite[flagChips].push(chipsNew);
        this.addChild(chipsNew); 

        //insert chips to database
        this.setChips('insert',flag,value);

        //cc.log(playerHistory[totalGame].dataBet[0]);


    },
    setClearPointPoly:function(){
        point_poly.player5 = [];
        point_poly.player4 = [];
        point_poly.player3 = [];
        point_poly.player2 = [];
        point_poly.player1 = [];
        point_poly.banker1 = [];
        point_poly.banker2 = [];
        point_poly.banker3 = [];
        point_poly.banker4 = [];
        point_poly.banker5 = [];
        point_poly.tie1 = [];
        point_poly.tie2 = [];
        point_poly.tie3 = [];
        point_poly.tie4 = [];
        point_poly.tie5 = [];

        //create object 

        this.drawPolyP[0] = new cc.DrawNode();
        this.drawPolyP[1] = new cc.DrawNode();
        this.drawPolyP[2] = new cc.DrawNode();
        this.drawPolyP[3] = new cc.DrawNode();
        this.drawPolyP[4] = new cc.DrawNode();

        this.drawPolyB[0] = new cc.DrawNode();
        this.drawPolyB[1] = new cc.DrawNode();
        this.drawPolyB[2] = new cc.DrawNode();
        this.drawPolyB[3] = new cc.DrawNode();
        this.drawPolyB[4] = new cc.DrawNode();

        this.drawPolyT[0] = new cc.DrawNode();
        this.drawPolyT[1] = new cc.DrawNode();
        this.drawPolyT[2] = new cc.DrawNode();
        this.drawPolyT[3] = new cc.DrawNode();
        this.drawPolyT[4] = new cc.DrawNode();


        //set round label bet
        this.pointRoundPx = [580,542,435,255,215];
        this.pointRoundPy = [315,276,254,281,332];
        this.pointRoundBx = [538,499,372,298,261];
        this.pointRoundBy = [330,300,284,300,342];
        this.pointRoundTx = [489,451,407,340,305];
        this.pointRoundTy = [345,321,312,318,348];

        var i =0;

        for(i=0;i<this.pointRoundPx.length;i++){
            //reset all to 0 - set for the first time
            betToPtotal[i] = 0;

            this.drawRoundP[i] = new cc.DrawNode();
            this.drawRoundP[i].drawDot(cc.p(this.pointRoundPx[i], this.pointRoundPy[i]), 13, cc.color(0,0,0, 160));
            this.drawRoundP[i].setVisible(false) ;
            this.addChild(this.drawRoundP[i]);

            //label total bet
            this.LabelBetToP[i] = new cc.LabelTTF( "0", 'Arial', 9,cc.size(40,20),cc.TEXT_ALIGNMENT_RIGHT );
            this.LabelBetToP[i].attr({
                x : this.pointRoundPx[i] - 11,
                y : this.pointRoundPy[i] - 3
            });
            this.LabelBetToP[i].setVisible(false) ;
            this.addChild( this.LabelBetToP[i], 123 );
      
            //reset all to 0 - set for the first time
            betToBtotal[i] = 0;

            this.drawRoundB[i] = new cc.DrawNode();
            this.drawRoundB[i].drawDot(cc.p(this.pointRoundBx[i], this.pointRoundBy[i]), 13, cc.color(0,0,0, 160));
            this.drawRoundB[i].setVisible(false) ;
            this.addChild(this.drawRoundB[i]);

            //label total bet
            this.LabelBetToB[i] = new cc.LabelTTF( "0", 'Arial', 9,cc.size(40,20),cc.TEXT_ALIGNMENT_RIGHT );
            this.LabelBetToB[i].attr({
                x : this.pointRoundBx[i] - 11,
                y : this.pointRoundBy[i] - 3
            });
            this.LabelBetToB[i].setVisible(false) ;
            this.addChild( this.LabelBetToB[i], 123 );
        
            //reset all to 0 - set for the first time
            betToTtotal[i] = 0;

            this.drawRoundT[i] = new cc.DrawNode();
            this.drawRoundT[i].drawDot(cc.p(this.pointRoundTx[i], this.pointRoundTy[i]), 13, cc.color(0,0,0, 160));
            this.drawRoundT[i].setVisible(false) ;
            this.addChild(this.drawRoundT[i]);

            //label total bet
            this.LabelBetToT[i] = new cc.LabelTTF( "0", 'Arial', 9,cc.size(40,20),cc.TEXT_ALIGNMENT_RIGHT );
            this.LabelBetToT[i].attr({
                x : this.pointRoundTx[i] - 11,
                y : this.pointRoundTy[i] - 3
            });
            this.LabelBetToT[i].setVisible(false) ;
            this.addChild( this.LabelBetToT[i], 123 );
        }

    },
    setPointHitChips:function(){
        this.setClearPointPoly();
        point_poly.player5.push(cc.p(213,328));
        point_poly.player5.push(cc.p(210,316));
        point_poly.player5.push(cc.p(207,302));
        point_poly.player5.push(cc.p(209,291));
        point_poly.player5.push(cc.p(216,279));
        point_poly.player5.push(cc.p(227,271));
        point_poly.player5.push(cc.p(272,289));
        point_poly.player5.push(cc.p(260,299));
        point_poly.player5.push(cc.p(249,310));
        point_poly.player5.push(cc.p(250,322));
        point_poly.player5.push(cc.p(253,338));
        
        
        point_poly.player4.push(cc.p(230,268));
        point_poly.player4.push(cc.p(246,260));
        point_poly.player4.push(cc.p(277,249));
        point_poly.player4.push(cc.p(304,241));
        point_poly.player4.push(cc.p(344,237));
        point_poly.player4.push(cc.p(358,262));
        point_poly.player4.push(cc.p(324,268));
        point_poly.player4.push(cc.p(293,278));
        point_poly.player4.push(cc.p(273,287));


        point_poly.player3.push(cc.p(348,237));
        point_poly.player3.push(cc.p(376,233));
        point_poly.player3.push(cc.p(406,231));
        point_poly.player3.push(cc.p(443,233));
        point_poly.player3.push(cc.p(473,238));
        point_poly.player3.push(cc.p(461,262));
        point_poly.player3.push(cc.p(435,259));
        point_poly.player3.push(cc.p(399,259));
        point_poly.player3.push(cc.p(379,260));
        point_poly.player3.push(cc.p(360,262));

        point_poly.player2.push(cc.p(478,237));
        point_poly.player2.push(cc.p(505,241));
        point_poly.player2.push(cc.p(539,250));
        point_poly.player2.push(cc.p(566,258));
        point_poly.player2.push(cc.p(588,268));
        point_poly.player2.push(cc.p(546,287));
        point_poly.player2.push(cc.p(529,277));
        point_poly.player2.push(cc.p(500,270));
        point_poly.player2.push(cc.p(487,265));
        point_poly.player2.push(cc.p(465,261));

        point_poly.player1.push(cc.p(591,271));
        point_poly.player1.push(cc.p(603,283));
        point_poly.player1.push(cc.p(608,291));
        point_poly.player1.push(cc.p(609,301));
        point_poly.player1.push(cc.p(602,327));
        point_poly.player1.push(cc.p(568,336));
        point_poly.player1.push(cc.p(569,320));
        point_poly.player1.push(cc.p(566,306));
        point_poly.player1.push(cc.p(559,296));
        point_poly.player1.push(cc.p(549,289));


        point_poly.banker5.push(cc.p(256,336));
        point_poly.banker5.push(cc.p(252,318));
        point_poly.banker5.push(cc.p(251,309));
        point_poly.banker5.push(cc.p(258,302));
        point_poly.banker5.push(cc.p(262,299));
        point_poly.banker5.push(cc.p(274,290));
        point_poly.banker5.push(cc.p(309,307));
        point_poly.banker5.push(cc.p(296,317));
        point_poly.banker5.push(cc.p(292,324));
        point_poly.banker5.push(cc.p(291,331));
        point_poly.banker5.push(cc.p(294,339));
        
        point_poly.banker4.push(cc.p(277,288));
        point_poly.banker4.push(cc.p(302,277));
        point_poly.banker4.push(cc.p(315,274));
        point_poly.banker4.push(cc.p(342,267));
        point_poly.banker4.push(cc.p(358,266));
        point_poly.banker4.push(cc.p(368,288));
        point_poly.banker4.push(cc.p(349,291));
        point_poly.banker4.push(cc.p(332,296));
        point_poly.banker4.push(cc.p(315,304));

        point_poly.banker3.push(cc.p(362,265));
        point_poly.banker3.push(cc.p(386,263));
        point_poly.banker3.push(cc.p(411,261));
        point_poly.banker3.push(cc.p(439,263));
        point_poly.banker3.push(cc.p(460,265));
        point_poly.banker3.push(cc.p(448,288));
        point_poly.banker3.push(cc.p(428,285));
        point_poly.banker3.push(cc.p(409,285));
        point_poly.banker3.push(cc.p(387,287));
        point_poly.banker3.push(cc.p(372,288));

        point_poly.banker2.push(cc.p(464,266));
        point_poly.banker2.push(cc.p(482,267));
        point_poly.banker2.push(cc.p(513,277));
        point_poly.banker2.push(cc.p(528,283));
        point_poly.banker2.push(cc.p(541,288));
        point_poly.banker2.push(cc.p(505,305));
        point_poly.banker2.push(cc.p(493,299));
        point_poly.banker2.push(cc.p(483,296));
        point_poly.banker2.push(cc.p(469,291));
        point_poly.banker2.push(cc.p(451,288));

        point_poly.banker1.push(cc.p(545,291));
        point_poly.banker1.push(cc.p(553,296));
        point_poly.banker1.push(cc.p(563,306));
        point_poly.banker1.push(cc.p(567,318));
        point_poly.banker1.push(cc.p(563,336));
        point_poly.banker1.push(cc.p(525,340));
        point_poly.banker1.push(cc.p(526,330));
        point_poly.banker1.push(cc.p(524,321));
        point_poly.banker1.push(cc.p(517,313));
        point_poly.banker1.push(cc.p(508,307));

        point_poly.tie5.push(cc.p(296,340));
        point_poly.tie5.push(cc.p(294,327));
        point_poly.tie5.push(cc.p(297,320));
        point_poly.tie5.push(cc.p(301,316));
        point_poly.tie5.push(cc.p(304,313));
        point_poly.tie5.push(cc.p(314,307));
        point_poly.tie5.push(cc.p(341,320));
        point_poly.tie5.push(cc.p(332,328));
        point_poly.tie5.push(cc.p(331,332));
        point_poly.tie5.push(cc.p(331,340));

        point_poly.tie4.push(cc.p(318,306));
        point_poly.tie4.push(cc.p(328,300));
        point_poly.tie4.push(cc.p(340,296));
        point_poly.tie4.push(cc.p(358,291));
        point_poly.tie4.push(cc.p(369,289));
        point_poly.tie4.push(cc.p(378,307));
        point_poly.tie4.push(cc.p(364,310));
        point_poly.tie4.push(cc.p(352,315));
        point_poly.tie4.push(cc.p(344,318));

        point_poly.tie3.push(cc.p(374,290));
        point_poly.tie3.push(cc.p(395,288));
        point_poly.tie3.push(cc.p(418,287));
        point_poly.tie3.push(cc.p(433,288));
        point_poly.tie3.push(cc.p(446,290));
        point_poly.tie3.push(cc.p(437,307));
        point_poly.tie3.push(cc.p(423,305));
        point_poly.tie3.push(cc.p(408,304));
        point_poly.tie3.push(cc.p(392,306));
        point_poly.tie3.push(cc.p(381,307));

        point_poly.tie2.push(cc.p(450,290));
        point_poly.tie2.push(cc.p(464,293));
        point_poly.tie2.push(cc.p(480,297));
        point_poly.tie2.push(cc.p(496,302));
        point_poly.tie2.push(cc.p(500,305));
        point_poly.tie2.push(cc.p(475,318));
        point_poly.tie2.push(cc.p(465,313));
        point_poly.tie2.push(cc.p(456,311));
        point_poly.tie2.push(cc.p(441,308));

        point_poly.tie1.push(cc.p(504,307));
        point_poly.tie1.push(cc.p(516,315));
        point_poly.tie1.push(cc.p(522,322));
        point_poly.tie1.push(cc.p(524,329));
        point_poly.tie1.push(cc.p(521,341));
        point_poly.tie1.push(cc.p(488,341));
        point_poly.tie1.push(cc.p(486,328));
        point_poly.tie1.push(cc.p(478,319));

        this.setDrawPolygon('p1',point_poly.player1);
        this.setDrawPolygon('p2',point_poly.player2);
        this.setDrawPolygon('p3',point_poly.player3);
        this.setDrawPolygon('p4',point_poly.player4);
        this.setDrawPolygon('p5',point_poly.player5);

        this.setDrawPolygon('b1',point_poly.banker1);
        this.setDrawPolygon('b2',point_poly.banker2);
        this.setDrawPolygon('b3',point_poly.banker3);
        this.setDrawPolygon('b4',point_poly.banker4);
        this.setDrawPolygon('b5',point_poly.banker5);

        this.setDrawPolygon('t1',point_poly.tie1);
        this.setDrawPolygon('t2',point_poly.tie2);
        this.setDrawPolygon('t3',point_poly.tie3);
        this.setDrawPolygon('t4',point_poly.tie4);
        this.setDrawPolygon('t5',point_poly.tie5);

    },

    setDrawPolygon:function(flag,point){
        if(flag == 'p1') {
            this.drawPolyP[0].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyP[0].setVisible(false) ;
            this.addChild(this.drawPolyP[0]);
        }
        else if(flag == 'p2'){
            this.drawPolyP[1].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyP[1].setVisible(false) ;
            this.addChild(this.drawPolyP[1]);
        } 
        else if(flag == 'p3'){
            this.drawPolyP[2].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyP[2].setVisible(false) ;
            this.addChild(this.drawPolyP[2]);
        }
        else if(flag == 'p4'){
            this.drawPolyP[3].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyP[3].setVisible(false) ;
            this.addChild(this.drawPolyP[3]);
        }
        else if(flag == 'p5'){
            this.drawPolyP[4].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyP[4].setVisible(false) ;
            this.addChild(this.drawPolyP[4]);
        }
        else if(flag == 'b1'){
            this.drawPolyB[0].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyB[0].setVisible(false) ;
            this.addChild(this.drawPolyB[0]);
        }
        else if(flag == 'b2'){
            this.drawPolyB[1].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyB[1].setVisible(false) ;
            this.addChild(this.drawPolyB[1]);
        }
        else if(flag == 'b3'){
            this.drawPolyB[2].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyB[2].setVisible(false) ;
            this.addChild(this.drawPolyB[2]);
        }
        else if(flag == 'b4'){
            this.drawPolyB[3].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyB[3].setVisible(false) ;
            this.addChild(this.drawPolyB[3]);
        }
        else if(flag == 'b5'){
            this.drawPolyB[4].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyB[4].setVisible(false) ;
            this.addChild(this.drawPolyB[4]);
        }
        else if(flag == 't1'){
            this.drawPolyT[0].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyT[0].setVisible(false) ;
            this.addChild(this.drawPolyT[0]);
        }
        else if(flag == 't2'){
            this.drawPolyT[1].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyT[1].setVisible(false) ;
            this.addChild(this.drawPolyT[1]);
        }
        else if(flag == 't3'){
            this.drawPolyT[2].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyT[2].setVisible(false) ;
            this.addChild(this.drawPolyT[2]);
        }
        else if(flag == 't4'){
            this.drawPolyT[3].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyT[3].setVisible(false) ;
            this.addChild(this.drawPolyT[3]);
        }
        else if(flag == 't5'){
            this.drawPolyT[4].drawPoly(point, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
            this.drawPolyT[4].setVisible(false) ;
            this.addChild(this.drawPolyT[4]);
        }
    },
    setDrawVisible:function(flag,vis){

        if(flag == 'p1') this.drawPolyP[0].setVisible(vis) ;
        else if(flag == 'p2') this.drawPolyP[1].setVisible(vis) ;
        else if(flag == 'p3') this.drawPolyP[2].setVisible(vis) ;
        else if(flag == 'p4') this.drawPolyP[3].setVisible(vis) ;
        else if(flag == 'p5') this.drawPolyP[4].setVisible(vis) ;
        else if(flag == 'b1') this.drawPolyB[0].setVisible(vis) ;
        else if(flag == 'b2') this.drawPolyB[1].setVisible(vis) ;
        else if(flag == 'b3') this.drawPolyB[2].setVisible(vis) ;
        else if(flag == 'b4') this.drawPolyB[3].setVisible(vis) ;
        else if(flag == 'b5') this.drawPolyB[4].setVisible(vis) ;
        else if(flag == 't1') this.drawPolyT[0].setVisible(vis) ;
        else if(flag == 't2') this.drawPolyT[1].setVisible(vis) ;
        else if(flag == 't3') this.drawPolyT[2].setVisible(vis) ;
        else if(flag == 't4') this.drawPolyT[3].setVisible(vis) ;
        else if(flag == 't5') this.drawPolyT[4].setVisible(vis) ;


    },
    setHitActive:function(x,y){
        //var draw = new cc.DrawNode();
        //this.addChild(draw, 10);
        //draw.drawPoly(point_poly.tie1, cc.color(255,0,0,128), 0, cc.color(0,128,128,255) );
        var flag = ['p1','p2','p3','p4','p5','b1','b2','b3','b4','b5','t1','t2','t3','t4','t5'];


        var pointPolygon = [];
        var z=0;
        var dataPoly , flagPoly;
        var flagOk = false;
        for(z=0;z<flag.length;z++){
            if(flag[z] == 'p1') pointPolygon = point_poly.player1;
            else if(flag[z] == 'p2') pointPolygon = point_poly.player2;
            else if(flag[z] == 'p3') pointPolygon = point_poly.player3;
            else if(flag[z] == 'p4') pointPolygon = point_poly.player4;
            else if(flag[z] == 'p5') pointPolygon = point_poly.player5;
            else if(flag[z] == 'b1') pointPolygon = point_poly.banker1;
            else if(flag[z] == 'b2') pointPolygon = point_poly.banker2;
            else if(flag[z] == 'b3') pointPolygon = point_poly.banker3;
            else if(flag[z] == 'b4') pointPolygon = point_poly.banker4;
            else if(flag[z] == 'b5') pointPolygon = point_poly.banker5;
            else if(flag[z] == 't1') pointPolygon = point_poly.tie1;
            else if(flag[z] == 't2') pointPolygon = point_poly.tie2;
            else if(flag[z] == 't3') pointPolygon = point_poly.tie3;
            else if(flag[z] == 't4') pointPolygon = point_poly.tie4;
            else if(flag[z] == 't5') pointPolygon = point_poly.tie5;

            var i, j=pointPolygon.length-1 ;
            var flagPoint = false;

            for (i=0; i<pointPolygon.length; i++) 
            {
                if ((pointPolygon[i].y< y && pointPolygon[j].y>=y ||   pointPolygon[j].y< y && pointPolygon[i].y>=y) &&  (pointPolygon[i].x<=x || pointPolygon[j].x<=x)) 
                {
                    if (pointPolygon[i].x+(y-pointPolygon[i].y)/(pointPolygon[j].y-pointPolygon[i].y)*(pointPolygon[j].x-pointPolygon[i].x)<x) 
                    {
                        flagPoint=!flagPoint; 
                    }
                }
                j=i; 
            }

            if(flagPoint){
                this.setDrawVisible(flag[z],true);
                
                dataPoly = pointPolygon;
                flagPoly = flag[z];
                flagOk = true;
                
            } 
            else{
                this.setDrawVisible(flag[z],false);
            }
        }
        return flagOk;
    },
    setPolygonPoint:function(){

        this._point_polygon_tie[0] = cc.p(356,404);
        this._point_polygon_tie[1] = cc.p(356,345);
        this._point_polygon_tie[2] = cc.p(360,328);

        this._point_polygon_tie[3] = cc.p(373,315);

        this._point_polygon_tie[4] = cc.p(401,306);
        this._point_polygon_tie[5] = cc.p(441,317);
        this._point_polygon_tie[6] = cc.p(454,345);
        this._point_polygon_tie[7] = cc.p(454,404);

        var pointsTie = [
                        this._point_polygon_tie[0],
                        this._point_polygon_tie[1],
                        this._point_polygon_tie[2],
                        this._point_polygon_tie[3],
                        this._point_polygon_tie[4],
                        this._point_polygon_tie[5],
                        this._point_polygon_tie[6],
                        this._point_polygon_tie[7]
                    ];


        //banker
        this._point_polygon_banker[0] = cc.p(317,386);
        this._point_polygon_banker[1] = cc.p(317,345);
        this._point_polygon_banker[2] = cc.p(330,311);
        this._point_polygon_banker[3] = cc.p(357,287);
        this._point_polygon_banker[4] = cc.p(404,273);
        this._point_polygon_banker[5] = cc.p(442,282);
        this._point_polygon_banker[6] = cc.p(470,301);
        this._point_polygon_banker[7] = cc.p(483,317);

        this._point_polygon_banker[8] = cc.p(492,341);
        this._point_polygon_banker[9] = cc.p(492,385);


        this._point_polygon_banker[10] = cc.p(458,385);
        this._point_polygon_banker[11] = cc.p(458,341);

        this._point_polygon_banker[12] = cc.p(452,327);
        this._point_polygon_banker[13] = cc.p(434,309);


        this._point_polygon_banker[14] = cc.p(425,304);
        this._point_polygon_banker[15] = cc.p(404,301);
        this._point_polygon_banker[16] = cc.p(368,314);

        this._point_polygon_banker[17] = cc.p(348,345);
        this._point_polygon_banker[18] = cc.p(348,386);



        var pointsBanker = [
                        this._point_polygon_banker[0],
                        this._point_polygon_banker[1],
                        this._point_polygon_banker[2],
                        this._point_polygon_banker[3],
                        this._point_polygon_banker[4],
                        this._point_polygon_banker[5],
                        this._point_polygon_banker[6],
                        this._point_polygon_banker[7],
                        this._point_polygon_banker[8],
                        this._point_polygon_banker[9],
                        this._point_polygon_banker[10],
                        this._point_polygon_banker[11],
                        this._point_polygon_banker[12],
                        this._point_polygon_banker[13],
                        this._point_polygon_banker[14],
                        this._point_polygon_banker[15],
                        this._point_polygon_banker[16],
                        this._point_polygon_banker[17],
                        this._point_polygon_banker[18]
                    ];

        

        //player
        this._point_polygon_player[0] = cc.p(191,386);
        this._point_polygon_player[1] = cc.p(189,307);
        this._point_polygon_player[2] = cc.p(196,277);
        this._point_polygon_player[3] = cc.p(216,241);
        this._point_polygon_player[4] = cc.p(265,189);

        this._point_polygon_player[5] = cc.p(330,157);
        this._point_polygon_player[6] = cc.p(405,147);
        this._point_polygon_player[7] = cc.p(479,157);

        this._point_polygon_player[8] = cc.p(540,187);
        this._point_polygon_player[9] = cc.p(592,240);

        this._point_polygon_player[10] = cc.p(618,302);

        this._point_polygon_player[11] = cc.p(622,340);

        this._point_polygon_player[12] = cc.p(618,385);


        this._point_polygon_player[13] = cc.p(578,385);
        this._point_polygon_player[14] = cc.p(583,350);
        this._point_polygon_player[15] = cc.p(579,312);

        this._point_polygon_player[16] = cc.p(570,284);

        this._point_polygon_player[17] = cc.p(530,230);
        this._point_polygon_player[18] = cc.p(482,202);

        this._point_polygon_player[19] = cc.p(421,187);
        this._point_polygon_player[20] = cc.p(361,189);


        this._point_polygon_player[21] = cc.p(302,213);
        this._point_polygon_player[22] = cc.p(255,256);
        this._point_polygon_player[23] = cc.p(226,325);
        this._point_polygon_player[24] = cc.p(226,385);
        
        
        var pointsPlayer = [
                        this._point_polygon_player[0],
                        this._point_polygon_player[1],
                        this._point_polygon_player[2],
                        this._point_polygon_player[3],
                        this._point_polygon_player[4],
                        this._point_polygon_player[5],
                        this._point_polygon_player[6],
                        this._point_polygon_player[7],
                        this._point_polygon_player[8],
                        this._point_polygon_player[9],
                        this._point_polygon_player[10],
                        this._point_polygon_player[11],
                        this._point_polygon_player[12],
                        this._point_polygon_player[13],
                        this._point_polygon_player[14],
                        this._point_polygon_player[15],
                        this._point_polygon_player[16],
                        this._point_polygon_player[17],
                        this._point_polygon_player[18],
                        this._point_polygon_player[19],
                        this._point_polygon_player[20],
                        this._point_polygon_player[21],
                        this._point_polygon_player[22],
                        this._point_polygon_player[23],
                        this._point_polygon_player[24]
                    ];

        //player pair
        this._point_polygon_PlayerPair[0] = cc.p(237,386);
        this._point_polygon_PlayerPair[1] = cc.p(310,386);
        this._point_polygon_PlayerPair[2] = cc.p(310,336);
        this._point_polygon_PlayerPair[3] = cc.p(237,325);


        var pointsPlayerPair = [
                        this._point_polygon_PlayerPair[0],
                        this._point_polygon_PlayerPair[1],
                        this._point_polygon_PlayerPair[2],
                        this._point_polygon_PlayerPair[3]
                    ];


        //perfect pair
        this._point_polygon_PerfectPair[0] = cc.p(237,317);
        this._point_polygon_PerfectPair[1] = cc.p(309,329);
        this._point_polygon_PerfectPair[2] = cc.p(336,286);
        this._point_polygon_PerfectPair[3] = cc.p(285,238);
        this._point_polygon_PerfectPair[4] = cc.p(252,276);

        var pointsPerfectPair = [
                        this._point_polygon_PerfectPair[0],
                        this._point_polygon_PerfectPair[1],
                        this._point_polygon_PerfectPair[2],
                        this._point_polygon_PerfectPair[3],
                        this._point_polygon_PerfectPair[4]
                    ];

        //BIG 
        this._point_polygon_Big[0] = cc.p(342,283);
        this._point_polygon_Big[1] = cc.p(399,263);
        this._point_polygon_Big[2] = cc.p(401,195);
        this._point_polygon_Big[3] = cc.p(359,200);
        this._point_polygon_Big[4] = cc.p(310,221);
        this._point_polygon_Big[5] = cc.p(290,232);

        var pointsBig = [
                        this._point_polygon_Big[0],
                        this._point_polygon_Big[1],
                        this._point_polygon_Big[2],
                        this._point_polygon_Big[3],
                        this._point_polygon_Big[4],
                        this._point_polygon_Big[5]
                    ];


        //SMALL
        this._point_polygon_Small[0] = cc.p(406,259);
        this._point_polygon_Small[1] = cc.p(466,280);
        this._point_polygon_Small[2] = cc.p(518,233);
        this._point_polygon_Small[3] = cc.p(465,204);
        this._point_polygon_Small[4] = cc.p(406,194);

        var pointsSmall = [
                        this._point_polygon_Small[0],
                        this._point_polygon_Small[1],
                        this._point_polygon_Small[2],
                        this._point_polygon_Small[3],
                        this._point_polygon_Small[4]
                    ];


        //either pair

        this._point_polygon_EitherPair[0] = cc.p(474,285);
        this._point_polygon_EitherPair[1] = cc.p(500,328);
        this._point_polygon_EitherPair[2] = cc.p(571,317);
        this._point_polygon_EitherPair[3] = cc.p(565,297);
        this._point_polygon_EitherPair[4] = cc.p(554,276);
        this._point_polygon_EitherPair[5] = cc.p(540,254);
        this._point_polygon_EitherPair[6] = cc.p(524,238);

        var pointsEitherPair = [
                        this._point_polygon_EitherPair[0],
                        this._point_polygon_EitherPair[1],
                        this._point_polygon_EitherPair[2],
                        this._point_polygon_EitherPair[3],
                        this._point_polygon_EitherPair[4],
                        this._point_polygon_EitherPair[5],
                        this._point_polygon_EitherPair[6]
                    ];

        //banker pair

        this._point_polygon_BankerPair[0] = cc.p(500,336);
        this._point_polygon_BankerPair[1] = cc.p(572,324);
        this._point_polygon_BankerPair[2] = cc.p(569,384);
        this._point_polygon_BankerPair[3] = cc.p(500,386);

        var pointsBankerPair = [
                        this._point_polygon_BankerPair[0],
                        this._point_polygon_BankerPair[1],
                        this._point_polygon_BankerPair[2],
                        this._point_polygon_BankerPair[3]
                    ];



        

        this._point_polygon_ShowTable[0] = cc.p(279,508);
        this._point_polygon_ShowTable[1] = cc.p(521,508);
        this._point_polygon_ShowTable[2] = cc.p(521,488);
        this._point_polygon_ShowTable[2] = cc.p(279,488);


        var pointShowTable = [
                        this._point_polygon_ShowTable[0],
                        this._point_polygon_ShowTable[1],
                        this._point_polygon_ShowTable[2],
                        this._point_polygon_ShowTable[3]
                    ];      

        
        
        //var rect = cc.rect(279, 508, 519, 488);
        //draw.drawRect(rect);
        //this.addChild(rect);
        //draw.drawRect(cc.p(279,508), cc.p(519,488), cc.color(255,0,0,255), 0, cc.color(0,255,0,255));

    },
    checkPointInAll:function(x,y,flag){
        var pointPolygon = [];
        if(flag == 'p1') pointPolygon = point_poly.player1;
        else if(flag == 'p2') pointPolygon = point_poly.player2;
        else if(flag == 'p3') pointPolygon = point_poly.player3;
        else if(flag == 'p4') pointPolygon = point_poly.player4;
        else if(flag == 'p5') pointPolygon = point_poly.player5;
        else if(flag == 'b1') pointPolygon = point_poly.banker1;
        else if(flag == 'b2') pointPolygon = point_poly.banker2;
        else if(flag == 'b3') pointPolygon = point_poly.banker3;
        else if(flag == 'b4') pointPolygon = point_poly.banker4;
        else if(flag == 'b5') pointPolygon = point_poly.banker5;
        else if(flag == 't1') pointPolygon = point_poly.tie1;
        else if(flag == 't2') pointPolygon = point_poly.tie2;
        else if(flag == 't3') pointPolygon = point_poly.tie3;
        else if(flag == 't4') pointPolygon = point_poly.tie4;
        else if(flag == 't5') pointPolygon = point_poly.tie5;

        var i, j=pointPolygon.length-1 ;
        var flagPoint = false;

        for (i=0; i<pointPolygon.length; i++) 
        {
            if ((pointPolygon[i].y< y && pointPolygon[j].y>=y ||   pointPolygon[j].y< y && pointPolygon[i].y>=y) &&  (pointPolygon[i].x<=x || pointPolygon[j].x<=x)) 
            {
                if (pointPolygon[i].x+(y-pointPolygon[i].y)/(pointPolygon[j].y-pointPolygon[i].y)*(pointPolygon[j].x-pointPolygon[i].x)<x) 
                {
                    flagPoint=!flagPoint; 
                }
            }
            j=i; 
        }

        return flagPoint;
        
        
    },
    checkPointInPlayer:function(x,y,flag){


        var pointPolygon = [];
        if(flag == 'player'){
            pointPolygon = this._point_polygon_player;
        }
        else if(flag== 'banker'){
            pointPolygon = this._point_polygon_banker;
        }
        else if(flag == 'tie'){
            pointPolygon = this._point_polygon_tie;
        }
        else if(flag == 'small'){
            pointPolygon = this._point_polygon_Small;
        }
        else if(flag == 'big'){
            pointPolygon = this._point_polygon_Big;
        }
        else if(flag == 'perfectPair'){
            pointPolygon = this._point_polygon_PerfectPair;
        }
        else if(flag == 'playerPair'){
            pointPolygon = this._point_polygon_PlayerPair;
        }
        else if(flag == 'eitherPair'){
            pointPolygon = this._point_polygon_EitherPair;
        }
        else if(flag == 'bankerPair'){
            pointPolygon = this._point_polygon_BankerPair;
        }


        var i, j=pointPolygon.length-1 ;
        var flagPoint = false;

        for (i=0; i<pointPolygon.length; i++) 
        {
            if ((pointPolygon[i].y< y && pointPolygon[j].y>=y ||   pointPolygon[j].y< y && pointPolygon[i].y>=y) &&  (pointPolygon[i].x<=x || pointPolygon[j].x<=x)) 
            {
                if (pointPolygon[i].x+(y-pointPolygon[i].y)/(pointPolygon[j].y-pointPolygon[i].y)*(pointPolygon[j].x-pointPolygon[i].x)<x) 
                {
                    flagPoint=!flagPoint; 
                }
            }
            j=i; 
        }


        
        return flagPoint;


    },

    checkValidateMaxBet:function(flag , value){

        var returnVal = false;
        if(flag == 'player' && (betToPlayer + value) > MaxbetToPlayer){
            returnVal = true;
        }
        else if(flag == 'banker' && (betToBanker + value) > MaxbetToBanker){
            returnVal = true;
        }
        else if(flag == 'tie' && (betToTie + value) > MaxbetToTie){
            returnVal = true;
        }
        else if(flag == 'small' && (betToSmall + value) > MaxbetToSmall){
            returnVal = true;
        }
        else if(flag == 'big' && (betToBig + value) > MaxbetToBig){
            returnVal = true;
        }
        else if(flag == 'playerPair' && (betToPlayerPair + value) > MaxbetToPlayerPair){
            returnVal = true;
        }
        else if(flag == 'perfectPair' && (betToPerfectPair + value) > MaxbetToPerfectPair){
            returnVal = true;
        }
        else if(flag == 'bankerPair' && (betToBankerPair + value) > MaxbetToBankerPair){
            returnVal = true;
        }
        else if(flag == 'eitherPair' && (betToEitherPair + value) > MaxbetToEitherPair){
            returnVal = true;
        }

        return returnVal;

    },
    addTouchEventListener : function(){
        var scope = this;

        var rectShowPayTable = cc.rect(279,490, 244,20);

        scope.touchListener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches : true,
            onTouchBegan : function( touch, event ){


                var i =0;
                var totalAll = 0;
                for(i=0;i<5;i++){
                    totalAll = totalAll + betToPtotal[i]+betToBtotal[i]+betToTtotal[i];
                }

                var pos = touch.getLocation();
                var target = event.getCurrentTarget();

                var balanceTemp = Math.round((playerBalance - scope._chips_value[scope._chips_active]) * 100) / 100;

                var countNextTotalBet = totalAll+scope._chips_value[scope._chips_active];
                var flagAddChips = 1;

                //validate for balance first


                if(scope._flagGameStart == 0){
                    if(balanceTemp < 0 ){
                        flagAddChips =  6 ;
                    }
                    var maxBetNew = 900;
                    var minBetNew = 1;
                    if( countNextTotalBet > maxBetNew ){
                        cc.log(balanceTemp);
                        cc.log("masuk ke sini!!!!");
                        flagAddChips =  5 ;   
                    }
                    else if( scope._chips_value[scope._chips_active] < minBetNew ){
                        cc.log("chips terlalu kecil!!!!");
                        flagAddChips =  5 ;   
                    }
                    
                    cc.log("flag ppay table "+scope.flagShowPayTable);
                    if(scope.flagShowPayTable == 0){

                        //cc.log(rect);
                        if( cc.rectContainsPoint( rectShowPayTable, pos ) ){
                            cc.log("masuk tekan show table111");
                            //scope.SetlogOut();
                            scope.flagShowPayTable =1;
                            scope.setShowPayTable(1);
                        }
                        else if( cc.rectContainsPoint( scope._chips_sprite[0].getBoundingBox(), pos ) ){
                            cc.log("masuk 0");
                            scope.setChipsEnableDisable(0);
                        }
                        else if( cc.rectContainsPoint( scope._chips_sprite[1].getBoundingBox(), pos ) ){
                            cc.log("masuk 1");
                            scope.setChipsEnableDisable(1);
                        }
                        else if( cc.rectContainsPoint( scope._chips_sprite[2].getBoundingBox(), pos ) ){
                            cc.log("masuk 2");
                            scope.setChipsEnableDisable(2);
                        }
                        else if( cc.rectContainsPoint( scope._chips_sprite[3].getBoundingBox(), pos ) ){
                            cc.log("masuk 3");
                            scope.setChipsEnableDisable(3);
                        }
                        else if( cc.rectContainsPoint( scope._chips_sprite[4].getBoundingBox(), pos ) ){
                            cc.log("masuk 4");
                            scope.setChipsEnableDisable(4);
                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'p1')){
                            //(betToPlayer + value) > MaxbetToPlayer
                            //if(scope._chips_value[scope._chips_active] <= 300  )
                            //{
                            //    scope.setStatusMessage(5);
                            //}

                            if(flagAddChips == 1){
                                if((betToPtotal[0] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('p1',scope._chips_value[scope._chips_active]);    
                                }
                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }

                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'p2')){
                            if(flagAddChips == 1){

                                if((betToPtotal[1] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('p2',scope._chips_value[scope._chips_active]);
                                }

                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }
                            
                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'p3')){
                            if(flagAddChips == 1){
                                if((betToPtotal[2] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('p3',scope._chips_value[scope._chips_active]);
                                }

                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }
                            
                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'p4')){
                            if(flagAddChips == 1){
                                if((betToPtotal[3] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('p4',scope._chips_value[scope._chips_active]);
                                }
                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }
                            
                        }   
                        else if(scope.checkPointInAll(pos.x,pos.y,'p5')){
                            if(flagAddChips == 1){
                                if((betToPtotal[4] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('p5',scope._chips_value[scope._chips_active]);
                                }
                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }
                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'b1')){
                            if(flagAddChips == 1){
                                if((betToBtotal[0] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('b1',scope._chips_value[scope._chips_active]);
                                }
                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }
                            
                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'b2')){
                            if(flagAddChips == 1){
                                if((betToBtotal[1] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('b2',scope._chips_value[scope._chips_active]);
                                }
                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }
                            
                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'b3')){
                            if(flagAddChips == 1){
                                if((betToBtotal[2] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('b3',scope._chips_value[scope._chips_active]);
                                }
                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }
                            
                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'b4')){
                            if(flagAddChips == 1){
                                if((betToBtotal[3] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                                else{
                                    scope.addChipsInBettingTable1('b4',scope._chips_value[scope._chips_active]);
                                }
                                
                            }
                            else{
                                scope.setStatusMessage(flagAddChips);
                            }
                            
                        }
                        else if(scope.checkPointInAll(pos.x,pos.y,'b5')){
                            if(flagAddChips == 1){
                                if((betToBtotal[4] + scope._chips_value[scope._chips_active]) > 300){
                                    scope.setStatusMessage(5);
                                }
                            else{
                                scope.addChipsInBettingTable1('b5',scope._chips_value[scope._chips_active]);
                            }
                            
                        }
                        else{
                            scope.setStatusMessage(flagAddChips);
                        }
                        
                    }   
                    else if(scope.checkPointInAll(pos.x,pos.y,'t1')){
                        if(flagAddChips == 1){
                            if((betToTtotal[0] + scope._chips_value[scope._chips_active]) > 300){
                                scope.setStatusMessage(5);
                            }
                            else{
                                scope.addChipsInBettingTable1('t1',scope._chips_value[scope._chips_active]);
                            }
                            
                        }
                        else{
                            scope.setStatusMessage(flagAddChips);
                        }
                        
                    }
                    else if(scope.checkPointInAll(pos.x,pos.y,'t2')){
                        if(flagAddChips == 1){
                            if((betToTtotal[1] + scope._chips_value[scope._chips_active]) > 300){
                                scope.setStatusMessage(5);
                            }
                            else{
                                scope.addChipsInBettingTable1('t2',scope._chips_value[scope._chips_active]);
                            }
                            
                        }
                        else{
                            scope.setStatusMessage(flagAddChips);
                        }
                        
                    }
                    else if(scope.checkPointInAll(pos.x,pos.y,'t3')){
                        if(flagAddChips == 1){
                            if((betToTtotal[2] + scope._chips_value[scope._chips_active]) > 300){
                                scope.setStatusMessage(5);
                            }
                            else{
                                scope.addChipsInBettingTable1('t3',scope._chips_value[scope._chips_active]);
                            }
                            
                        }
                        else{
                            scope.setStatusMessage(flagAddChips);
                        }
                        
                    }
                    else if(scope.checkPointInAll(pos.x,pos.y,'t4')){
                        if(flagAddChips == 1){
                            if((betToTtotal[3] + scope._chips_value[scope._chips_active]) > 300){
                                scope.setStatusMessage(5);
                            }
                            else{
                                scope.addChipsInBettingTable1('t4',scope._chips_value[scope._chips_active]);
                            }
                            
                        }
                        else{
                            scope.setStatusMessage(flagAddChips);
                        }
                        
                    }   
                    else if(scope.checkPointInAll(pos.x,pos.y,'t5')){
                        if(flagAddChips == 1){
                            if((betToTtotal[4] + scope._chips_value[scope._chips_active]) > 300){
                                scope.setStatusMessage(5);
                            }
                            else{
                                scope.addChipsInBettingTable1('t5',scope._chips_value[scope._chips_active]);
                            }
                            
                        }
                        else{
                            scope.setStatusMessage(flagAddChips);
                        }
                        
                    }
                    else if(cc.rectContainsPoint( scope._buttonLeft.getBoundingBox(), pos) && scope._flagButtonLeft == 1 ){
                        cc.log("button left click");
                        scope.clearChips();
                         //delete data chips
                        playerHistory[totalGame].dataBet = [];
                        scope.clearCard();
                        scope.clearBgWinner();
                       
                    }
                    else if(cc.rectContainsPoint( scope._buttonRight.getBoundingBox(), pos) && scope._flagButtonRight == 1 ){
                        

                        if(scope._flagImageButtonRight == 'repeat'){
                            //playerHistory[totalGame].dataBet = [];
                            
                            scope.clearChips();
                            scope.addChipsRepeats1();
                        }
                        else{
                            scope.startPlay();    
                        }
                    }

                }
                }
                
                    
                    cc.log(pos);
                    return false;
            }

        });

        cc.eventManager.addListener( scope.touchListener, scope );

        cc.eventManager.addListener({
        event: cc.EventListener.MOUSE,
        onMouseMove: function(event){
            var target = event.getCurrentTarget();
            var pos = event.getLocation();
            var locationInNode = target.convertToNodeSpace(event.getLocation());

            //cc.log(scope.chechPointInPlayer(pos.x,pos.y,'player'));
            //cc.log(scope.chechPointInPlayer(pos.x,pos.y,'banker'));
            var s = target.getContentSize();
            //var rect = cc.rect(0, 0, s.width, s.height);
            //Check the click area


            //validate if show paytable
            if(scope.flagShowPayTable == 0 && scope._flagGameStart == 0){
                if (
                    cc.rectContainsPoint( rectShowPayTable, pos ) || 
                    cc.rectContainsPoint(scope._chips_sprite[0].getBoundingBox(), locationInNode) ||
                    cc.rectContainsPoint(scope._chips_sprite[1].getBoundingBox(), locationInNode) ||
                    cc.rectContainsPoint(scope._chips_sprite[2].getBoundingBox(), locationInNode) ||
                    cc.rectContainsPoint(scope._chips_sprite[3].getBoundingBox(), locationInNode) ||
                    cc.rectContainsPoint(scope._chips_sprite[4].getBoundingBox(), locationInNode) ||
                    scope.setHitActive(pos.x,pos.y) )

                {       
                    // MOUSE OVER
                    //cc.log('test1');
                    //change cursor pointer
                    
                    cc.$("#gameCanvas").style.cursor = "pointer";

                } 
                else if(cc.rectContainsPoint( scope._buttonLeft.getBoundingBox(), locationInNode) && scope._flagButtonLeft == 1){
                    // button hover
                    if(scope._flagButtonRight == 1)
                        scope.setChangeButton('right',1,scope._flagImageButtonRight);

                    

                    cc.$("#gameCanvas").style.cursor = "pointer";
                    scope.setChangeButton('left',2,scope._flagImageButtonLeft);
                }
                else if(cc.rectContainsPoint( scope._buttonRight.getBoundingBox(), locationInNode) && scope._flagButtonRight == 1){
                    // button hover
                    if(scope._flagButtonLeft == 1)
                        scope.setChangeButton('left',1,scope._flagImageButtonLeft);

                    cc.$("#gameCanvas").style.cursor = "pointer";
                    scope.setChangeButton('right',2,scope._flagImageButtonRight);
                }
                else {

                    if(scope._flagButtonLeft == 1)
                        scope.setChangeButton('left',1,scope._flagImageButtonLeft);
                    if(scope._flagButtonRight == 1)
                        scope.setChangeButton('right',1,scope._flagImageButtonRight);


                    // MOUSE NOT OVER
                    //cc.log('test2');
                    //change cursor pointer
                    cc.$("#gameCanvas").style.cursor = "default";
                }
            } // end validate for show pay table
            else{
                cc.$("#gameCanvas").style.cursor = "default";
            }
        }
        },scope);


        
    },
    setChipsEnableDisable:function(valueActive){

        cc.log("chips lenght : "+this._chips_sprite.length);
        var frame = "";
        var x = 0;
        while(x <5){
            if(x == valueActive)
            {
                var frame = cc.spriteFrameCache.getSpriteFrame("chips_stand_"+this._chips_value[x]+".png");
                this._chips_sprite[x].setSpriteFrame (frame);
            }
            else{
                var frame = cc.spriteFrameCache.getSpriteFrame("chips_stand_"+this._chips_value[x]+"_dis.png");
                this._chips_sprite[x].setSpriteFrame (frame);
            }
            x++;
        }
        this._chips_active = valueActive;

    },
    setChangeButton:function(button , flagActive , image ){

        var imageName = "";
        if(flagActive == 0){
            // disable
            if(image == 'deal')
                imageName = "deal_disable.png";
            else if(image == 'clear')
                imageName = "clear_disable.png";
        }
        else if(flagActive == 1){
            if(image == 'deal')
                imageName = "deal_enable.png";
            else if(image == 'clear')
                imageName = "clear_enable.png";
            else if(image == 'repeat')
                imageName = "repeat_enable.png";
        }
        else if(flagActive == 2){
            // on  hover
            if(image == 'deal')
                imageName = "deal_hover.png";
            else if(image == 'clear')
                imageName = "clear_hover.png";
            else if(image == 'repeat')
                imageName = "repeat_hover.png";
        }

        if(button == 'left' ){
            var frame = cc.spriteFrameCache.getSpriteFrame(imageName);
            this._buttonLeft.setSpriteFrame (frame);

            if(flagActive != 2)
                this._flagButtonLeft = flagActive;
            
        }
        else if(button == 'right'){
            var frame = cc.spriteFrameCache.getSpriteFrame(imageName);
            this._buttonRight.setSpriteFrame (frame);

            if(flagActive != 2)
                this._flagButtonRight = flagActive;
            
        }
    },
    addChips:function(){


        cc.log("banyak chips: "+this._chips_sprite.length);

        // add chips
        var koin = new cc.Sprite("#chips_stand_1.png");
        koin.attr({
                x: (cc.winSize.width -240) ,
                y: 65
            });
        this._chips_sprite.push(koin);
        this._chips_value.push(1);
        this.addChild(koin); 


        var koin = new cc.Sprite("#chips_stand_10_dis.png");
        koin.attr({
                x: (cc.winSize.width -200 ) ,
                y: 65
            });
        this._chips_sprite.push(koin);
        this._chips_value.push(10);
        this.addChild(koin); 


        var koin = new cc.Sprite("#chips_stand_25_dis.png");
        koin.attr({
                x: (cc.winSize.width -160 ) ,
                y: 65
            });
        this._chips_sprite.push(koin);
        this._chips_value.push(25);
        this.addChild(koin); 


         var koin = new cc.Sprite("#chips_stand_50_dis.png");
        koin.attr({
                x: (cc.winSize.width -218 ) ,
                y: 25
            });
        this._chips_sprite.push(koin);
        this._chips_value.push(50);
        this.addChild(koin); 

        var koin = new cc.Sprite("#chips_stand_100_dis.png");
        koin.attr({
                x: (cc.winSize.width -178 ) ,
                y: 25
            });
        this._chips_sprite.push(koin);
        this._chips_value.push(100);
        this.addChild(koin); 


        cc.log("banyak chips: "+this._chips_sprite.length);

    },
    randomDeck:function(){
        var flagOk = 0;
        var flagDuplicate = 0;
        var randomDeck = 0;
        while(flagOk == 0 ){
                flagDuplicate = 0;
                //validate if deck already choose
                randomDeck = ((Math.floor(Math.random() * (51- 0 + 1) + 0)));    
                
                for(var i =0; i< this._flagCount ; i++){
                    if(this._allDeck[i] == randomDeck){
                        flagDuplicate = 1;
                    }
                }

                if(flagDuplicate == 1)
                    flagOk = 0;
                else
                    flagOk = 1;

                cc.log(flagDuplicate);
                cc.log(randomDeck);
            }

        return randomDeck;
    },
   
    clearCard:function(){
        //cc.log("clear card");
        
        for(var i =0;i<this.cardDeckSprite.length;i++){
            this.removeChild(this.cardDeckSprite[i]);        
        }  
        this.removeChild(this.backgroundWin);  
        this.removeChild(this.labelWin);  

        
        this.cardDeckSprite = [];
        this._playerPoint = 0;
        this._bankerPoint = 0;
        this._playerDeck = [];
        this._bankerDeck = [];
        this._allDeck = [];
        this._totalDeck = 0;
        this._totalDeckPlayer = 0;
        this._totalDeckBanker = 0;
        this._flagCount = 0;
        //this._gameEnd = 0;
        //this._winPlayerOrBanker =  null;
        this.flagNextBankerCard = 0;
        this.flagEndTurn = 0;
        this.flagEndFirst4Card = 0;
        this.flagThirdCard = 0;

        //this.setLabelScorePlayer();
        //this.setLabelScoreBanker();
        //cc.log("clear card");
    },
    clearChips:function(){
        playerHistory[totalGame].chipsBet[0].dataBet = [];
        playerHistory[totalGame].chipsBet[1].dataBet = [];
        playerHistory[totalGame].chipsBet[2].dataBet = [];
        playerHistory[totalGame].chipsBet[3].dataBet = [];
        playerHistory[totalGame].chipsBet[4].dataBet = [];
        //clear labelYouwin
        //this.clearLabelYouWin();
        cc.log("clear chips");
        for(var i=0 ; i<=14; i++){
            for(var j =0;j<this._chips_bets_sprite[i].length;j++){
                this.removeChild(this._chips_bets_sprite[i][j]);        
            }
            this._chips_bets_sprite[i] = [];

            if(i<=4){
                this.LabelBetToP[i].setVisible(false);
                this.LabelBetToB[i].setVisible(false);
                this.LabelBetToT[i].setVisible(false);    

                this.drawRoundP[i].setVisible(false);
                this.drawRoundB[i].setVisible(false);
                this.drawRoundT[i].setVisible(false);    
            }

            betToTtotal[i] = 0;
            betToBtotal[i] = 0;
            betToPtotal[i] = 0;
        }

        playerBalance = playerBalance +playerBet;
        playerBet = 0;

        this.setLabelBet();
        this._flagButtonLeft = 0;
        //this._flagButtonRight = 0;

        this.setChangeButton('left',0,this._flagImageButtonLeft);

        if(totalGame > 0 ){

            this._flagImageButtonRight = 'repeat';
            this._flagButtonRight = 1;
            this.setChangeButton('right',1,this._flagImageButtonRight);
        }
        //this.setChangeButton('right',0,this._flagImageButtonRight);
        cc.log("clear chips1xxxxxx");


    },
    hideChips:function(player){
                
        var chipsPlayer = this._chips_bets_sprite[player];
        var chipsBanker = this._chips_bets_sprite[player+5];
        var chipsTie = this._chips_bets_sprite[player+10];
        var j = 0;

        for(j =0;j<chipsPlayer.length;j++){
            cc.log("call this!!!");
            this.removeChild(this._chips_bets_sprite[player][j]);     
            //this._chips_bets_sprite[player][j].setVisible(false);
        }

        for(j =0;j<chipsBanker.length;j++){
            this.removeChild(this._chips_bets_sprite[player+5][j]);     
            //this._chips_bets_sprite[player+5][j].setVisible(false);
        }

        for(j =0;j<chipsTie.length;j++){
            this.removeChild(this._chips_bets_sprite[player+10][j]);     
            //this._chips_bets_sprite[player+10][j].setVisible(false);
        }
        this.LabelBetToP[player].setVisible(false);
        this.LabelBetToB[player].setVisible(false);
        this.LabelBetToT[player].setVisible(false);    

        this.drawRoundP[player].setVisible(false);
        this.drawRoundB[player].setVisible(false);
        this.drawRoundT[player].setVisible(false);   

        betToTtotal[player] = 0;
        betToBtotal[player] = 0;
        betToPtotal[player] = 0; 

        

    },
    stackShuffle:function(){

        var cards = cardNew.card;
        var i, j, k,x;
        var temp;
        

      // Shuffle the stack 'n' times.
        
        for (i = 0; i < 100; i++)
            for (j = 0; j < cards.length; j++) {
                k = Math.floor(Math.random() * cards.length);
                temp = cards[j];
                cards[j] = cards[k];
                cards[k] = temp;
            }

        cardNew.card = cards;
        for(i=0;i<cardNew.card.length;i++){
            cc.log("card ke - "+i+": "+cardNew.card[i].cardNameID);
        }
        

    },
    setCardPlay:function(){
        //this.totalCardUse;
    },
    checkStandOrHitPlayer1:function(valPlayer, valBanker){
        // return 0 = stand
        // return 1 = hit
        var returnVal = 0;
        //jika banker 8 atau 9 maka player stand
        if(valBanker >= 8 ){
            returnVal = 0;
        }
        else{
            if(valPlayer >= 6 )
                returnVal = 0;
            else
                returnVal = 1;    
        }
        return returnVal;
    },
    checkStandOrHitBanker1:function(valPlayer, valBanker){
        // return 0 = stand
        // return 1 = hit
        var returnVal = 0;
        //jika player 8 atau 9 maka player stand
        
    	if(valBanker == 0 || valBanker == 1 || valBanker == 2){
            // always hit 
            returnVal = 1;
        }
        else if(valBanker == 3){
            if(valPlayer == 8 ){
                returnVal = 0;
            }
            else{
                returnVal = 1;
            }
        }
        else if(valBanker == 4){
            if(valPlayer == 0 || valPlayer == 1 || valPlayer == 8 || valPlayer == 9 ){
                returnVal = 0;
            }
            else{
                returnVal = 1;
            }
        }
        else if(valBanker == 5){
            if(valPlayer == 4 || valPlayer == 5 || valPlayer == 6 || valPlayer == 7 ){
                returnVal = 1;
            }
            else{
                returnVal = 0;
            }
        }
        else if(valBanker == 6){
            if(valPlayer == 6 || valPlayer == 7  ){
                returnVal = 1;
            }
            else{
                returnVal = 0;
            }
        }
        else if(valBanker >= 7 ){
                returnVal = 0;
        }
        


        return returnVal;
    },
    startPlay:function(){
        this.setChangeButton('left',0,this._flagImageButtonLeft);
        this.setChangeButton('right',0,this._flagImageButtonRight);

        this.stackShuffle();
        this.playCard = [];
        var detail ;
        var i = 0, x = 0;
        var chipsPlayer, totalPlayer,chipsBanker,totalBanker,chipsTie,totalTie;
        var cardPlayer = [], cardBanker = [] , cardPlayerId = [] , cardBankerId = [];
        var lastCard = 0;
        var valPlayer = 0;
        var valBanker = 0;
        var flagBankerStand= 0;
        this.totalCardUse = 0;
        var card1P = "" , card2P = "" , card3P = "";
        var card1B = "" , card2B = "" , card3B = "";
        var totalBet = 0 , totalBetAll = 0,totalWin = 0,totalWinAll = 0 , totalLose = 0 , totalLoseAll = 0;
        totalBetAll = 0;
        totalWinAll = 0;
        totalLoseAll = 0;

        for(i=0;i<5;i++){
            cardPlayer = [];
            cardBanker = [];
            cardPlayerId = [] , cardBankerId = [];
            valPlayer = 0;
            valBanker = 0;
            //lastCard = this.totalCardUse;
            chipsPlayer = this._chips_bets_sprite[i];
            totalPlayer = chipsPlayer.length;

            chipsBanker = this._chips_bets_sprite[i + 5];
            totalBanker = chipsBanker.length;

            chipsTie = this._chips_bets_sprite[i + 10];
            totalTie = chipsTie.length;

            card1P = "" , card2P = "" , card3P = "";
            card1B = "" , card2B = "" , card3B = "";
            totalBet = 0;
            totalWin = 0;
            totalLose = 0 ;
            if(totalPlayer>0 || totalBanker>0 || totalTie >0)
            {   
                for(x = 0 ;x<2;x++){
                   // cc.log("Player i = "+ i+ ", Score P1 : "+cardNew.card[this.totalCardUse + x].point);
                    cardPlayer[x] = this.totalCardUse ;
                    cardPlayerId[x] = cardNew.card[this.totalCardUse].cardNameID;
                    if(x == 0 ) card1P = cardNew.card[this.totalCardUse].cardNameID;
                    else if (x == 1) card2P = cardNew.card[this.totalCardUse].cardNameID;
                    valPlayer += cardNew.card[this.totalCardUse ].point;
                    this.totalCardUse++;

                    //cc.log("banker i = "+ i+ ", Score P1 : "+cardNew.card[this.totalCardUse + x].point);
                    cardBanker[x] = this.totalCardUse ;
                    cardBankerId[x] = cardNew.card[this.totalCardUse].cardNameID;
                    if(x == 0 ) card1B = cardNew.card[this.totalCardUse].cardNameID;
                    else if (x == 1) card2B = cardNew.card[this.totalCardUse].cardNameID;
                    valBanker += cardNew.card[this.totalCardUse ].point;
                    this.totalCardUse++;
                }

                if(valPlayer >= 10 )
                    valPlayer = valPlayer - 10;
                if(valBanker >= 10 )
                    valBanker = valBanker - 10;

                if(valPlayer>= 8){
                	flagBankerStand = 1;
                }

                cc.log("total PLayer : "+ valPlayer + ", total banker : "+valBanker);
                if(this.checkStandOrHitPlayer1(valPlayer,valBanker) == 1){
                    cc.log("player i = "+ i+ ", Score P1 : "+cardNew.card[this.totalCardUse].point);
                    cardPlayer[2] = this.totalCardUse ;
                    cardPlayerId[x] = cardNew.card[this.totalCardUse].cardNameID;
                    card3P = cardNew.card[this.totalCardUse].cardNameID;
                    valPlayer += cardNew.card[this.totalCardUse ].point;
                    this.totalCardUse++;
                }

                if(flagBankerStand == 0){
                	if(this.checkStandOrHitBanker1(valPlayer,valBanker) == 1){
	                    cc.log("banker i = "+ i+ ", Score P1 : "+cardNew.card[this.totalCardUse ].point);
	                    cardBanker[2] = this.totalCardUse ;
                        cardBankerId[x] = cardNew.card[this.totalCardUse].cardNameID;
                        card3B = cardNew.card[this.totalCardUse].cardNameID;
	                    valBanker += cardNew.card[this.totalCardUse ].point;
	                    this.totalCardUse++;
	                }	
                }

                if(valPlayer >= 10 )
                    valPlayer = valPlayer - 10;
                if(valBanker >= 10 )
                    valBanker = valBanker - 10;

                var flagWin = "P:0,B:0,T:0";
                
                totalBet = betToBtotal[i] + betToPtotal[i] + betToTtotal[i];
                totalWin = 0;
                totalLose = 0 ;
                if(valBanker > valPlayer ){
                    flagWin = "P:0,B:1,T:0";
                    totalWin = (betToBtotal[i] * 0.95) + betToBtotal[i];
                    totalLose = betToPtotal[i] + betToTtotal[i];

                }
                else if (valBanker < valPlayer ){
                    flagWin = "P:1,B:0,T:0";
                    totalWin = betToPtotal[i] * 2;
                    totalLose = betToBtotal[i] + betToTtotal[i];
                }
                else {
                    flagWin = "P:0,B:0,T:1";
                    totalWin = (betToTtotal[i] * 9 ) + (betToBtotal[i] + betToPtotal[i]);
                    totalLose = 0;
                }

                
                
                var cWin = 0 ; 
                var cLose = 0;

                if(totalBet - totalWin > 0 ){
                    cWin = 0;
                    cLose = totalBet - totalWin;
                }
                else if(totalBet - totalWin < 0){
                    cWin = totalWin - totalBet;
                    cLose = 0;
                }
                else{
                    cWin = 0;
                    cLose = 0;
                }



	        
                detail = {
                        player : i+1,
                        status : 1,
                        cardDeckSprite : [],
                        cardDeckData : [],
                        cardDeckPlayer : cardPlayer,
                        cardDeckBanker : cardBanker,
                        cardDeckPlayerID : cardPlayerId,
                        cardDeckBankerID : cardBankerId,
                        totalPlayer : totalPlayer,
                        totalBanker : totalBanker,
                        totalTie : totalTie,
                        betP : betToBtotal[i],
                        betB : betToPtotal[i],
                        betT : betToTtotal[i],
                        cWin : cWin,
                        cLose : cLose,
                        cBets : totalBet,
                        flagWinner : flagWin,
                        dataCard : "P1:"+card1P+",P2:"+card2P+",P3:"+card3P+",B1:"+card1B+",B2:"+card2B+",B3:"+card1P,
                        gameId : playerHistory[totalGame].hdr_history_game_id


                    };
                var jj=0;
                for( jj = 0; jj< cardPlayer.length; jj++){
                    this.setCards1('insert','player',cardNew.card[cardPlayer[jj]].id,cardNew.card[cardPlayer[jj]].cardNameID,i);
                }

                for( jj = 0; jj< cardBanker.length; jj++){
                    this.setCards1('insert','banker',cardNew.card[cardBanker[jj]].id,cardNew.card[cardBanker[jj]].cardNameID,i);
                }
                    
            }
            else{
                detail = {
                        player : i+1,
                        status : 0,
                        cardDeckSprite : [],
                        cardDeckData : [],
                        cardDeckPlayer : [],
                        cardDeckBanker : [],
                        cardDeckPlayerID : [],
                        cardDeckBankerID : [],
                        totalPlayer : totalPlayer,
                        totalBanker : totalBanker,
                        totalTie : totalTie,
                        betP : 0,
                        betB : 0,
                        betT : 0,
                        flagWin : "",
                        dataCard : "",
                        gameId : 0,
                        cWin : 0,
                        cLose : 0,
                        cBets : 0
                    };
            }
            this.playCard.push(detail);


        }

        
        this.saveDatabaseAllHand(this.playCard);
        //this.setCards('insert',flagPlay,cardNew.card[DeckCard].id,cardNew.card[DeckCard].cardNameID);
        this.flagState = 1;
        this.flagStatePlayer = 0;
        playerBet = 0;
        this._flagGameStart = 1;
        this.schedule( this.updateDeckPlayer, 0.5);

    },
    updateDeckPlayer:function(){
        var flagStop = 0;

        //cc.log("loop : "+ this.flagState);
        //cc.log("loopx : "+ this.flagStatePlayer);
        if( (this.flagState == 1 || this.flagState == 2) && this.flagStatePlayer >=5){
            cc.log("xxxxx");
            this.flagStatePlayer = 0;
            this.flagState = 3;
        }

        //-----------------------------//   
        //start distribute player card //
        //-----------------------------//
        //state 1 ditribute player card
        if(this.flagState == 1 && this.flagStatePlayer < 5){
            this._flagFinishGame = 0;
            this.flagState = 0;
            if(this.playCard[this.flagStatePlayer].status == 1)
                this.distributeCardPlayer(this.flagStatePlayer,1);
            else{
                this.flagState = 1; 
                while(flagStop == 0){
                    if(this.flagStatePlayer >= 4){
                        flagStop = 1;
                    }
                    if(this.playCard[this.flagStatePlayer].status == 1){
                        flagStop = 1;
                    }
                    else{
                        this.flagStatePlayer++;
                    }
                }
            }
        }
        //state 2 distribute player 2nd card
        else if(this.flagState == 2 && this.flagStatePlayer < 5){
            this.flagState = 0;
            this.distributeCardPlayer(this.flagStatePlayer,2);
        }
        //state 3 open card player 
        else if(this.flagState == 3 && this.flagStatePlayer < 5){

            this.flagState = 0;
            if(this.playCard[this.flagStatePlayer].status == 1)
                this.distributeCardPlayer(this.flagStatePlayer,3);
            else{
                this.flagState = 3; 
                while(flagStop == 0){
                    if(this.flagStatePlayer >= 4){
                        flagStop = 1;
                        cc.log("Masauk ke sini 1");
                    }
                    if(this.playCard[this.flagStatePlayer].status == 1){
                        flagStop = 1;
                        cc.log("Masauk ke sini 2");
                    }
                    else{
                        cc.log("Masauk ke sini 3");
                        this.flagStatePlayer++;
                    }
                }
            }
        }
        //state 4 open card player 
        else if(this.flagState == 4 && this.flagStatePlayer < 5){
            this.flagState = 0;
            if(this.playCard[this.flagStatePlayer].status == 1)
                this.distributeCardPlayer(this.flagStatePlayer,4);
        }

        //-----------------------------//   
        //start distribute banker card //
        //-----------------------------//

        //state 5 distribute banker card
        else if(this.flagState == 5 && this.flagStatePlayer < 5){
            this.flagState = 0;
            if(this.playCard[this.flagStatePlayer].status == 1)
                this.distributeCardBanker(this.flagStatePlayer,1);
        }
        //state 6 distribute banker 2nd card
        else if(this.flagState == 6 && this.flagStatePlayer < 5){
            this.flagState = 0;
            this.distributeCardBanker(this.flagStatePlayer,2);
        }
        //state 7 open banker card 1st
        else if(this.flagState == 7 && this.flagStatePlayer < 5){
            this.flagState = 0;
            this.distributeCardBanker(this.flagStatePlayer,3);
        }
        //state 8 open banker card 1st
        else if(this.flagState == 8 && this.flagStatePlayer < 5){
            this.flagState = 0;
            this.distributeCardBanker(this.flagStatePlayer,4);
        }

        //-----------------------------------//
        // draw 3rd for player               //
        //-----------------------------------//
        else if(this.flagState == 9 && this.flagStatePlayer < 5){
            var totalPlayer = this.playCard[this.flagStatePlayer].cardDeckPlayer;
            var totalBanker = this.playCard[this.flagStatePlayer].cardDeckBanker;
            this.flagState = 0;
            //cc.log("Total Kartu : "+totalPlayer.length);
            this.flagState3rdCard = 0;
            if(totalPlayer.length == 3){
            	this.flagState3rdCard = 1;
            	//cc.log("yyyyy");
                this.distributeCardPlayer(this.flagStatePlayer,5);
            }
            else
            {
            	this.flagState = 10;
            }
        }


        else if(this.flagState == 10 && this.flagStatePlayer < 5){
            var totalPlayer = this.playCard[this.flagStatePlayer].cardDeckPlayer;
            var totalBanker = this.playCard[this.flagStatePlayer].cardDeckBanker;
            this.flagState = 0;
            //cc.log("Total Kartu : "+totalBanker.length);
            if(totalBanker.length == 3){
            	//cc.log("yyyyy");
                this.distributeCardBanker(this.flagStatePlayer,5);
            }
            else
            {
            	//this.flagState = 3;
            	//this.flagStatePlayer++;
                this._flagPlayerTurnEnd = 1;

            }
        }

        else if(this.flagState == 11 && this.flagStatePlayer < 5){
        	this.flagState = 0;
        	this.distributeCardPlayer(this.flagStatePlayer,6);
        }
        else if(this.flagState == 12 && this.flagStatePlayer < 5){
        	this.flagState = 0;
        	this.distributeCardBanker(this.flagStatePlayer,6);
        }


        if(this._flagPlayerTurnEnd == 1 && this.flagStatePlayer < 5){
            //set winner
            this._flagPlayerTurnEnd = 0;

            this._scoreCardLabelWinner.setVisible(false);
            this._scoreCardWinner.setVisible(false);
            this._scoreCardLabelWinner.setString("0");
            
            this.bgScoreBanker.runAction(cc.Sequence.create(
                cc.DelayTime.create(0.5),
                cc.CallFunc.create(function(node) {

                    this.setWinnerPlayerTurn(this.flagStatePlayer);
                    
                    var totalImage = this.playCard[this.flagStatePlayer].cardDeckSprite.length;

                    //cc.log("totalImage : totalImage"+totalImage);
                    var i =0;
                    var fadeOutVar = "";
                    var AllCard = "";
                    var newAction = "";
                    var posX = 0;
                    var posY = 0;
                    var lastPos = "";
                    var tempi = 0;
                    var delayTemp = "";
                    for(i = 0; i<totalImage;i++){
                        fadeOutVar = cc.FadeOut.create(0.2);
                        AllCard = this.playCard[this.flagStatePlayer].cardDeckSprite[i];
                        posX = AllCard.getPositionX();
                        posY = AllCard.getPositionY();
                        lastPos = cc.p(posX , posY + 30);
                        tempi = i;
                        delayTemp = cc.DelayTime.create(0.7);
                        if(tempi == totalImage - 1){

                            newAction = cc.sequence(delayTemp,cc.moveTo(0.1, lastPos), 
                                                    fadeOutVar,
                                                    cc.CallFunc.create(function(node) {
                                                        //cc.log("Player ke xxxx: "+ this.flagStatePlayer);
                                                        //cc.log("Masuk  ke sini 1 : "+i);
                                                        //cc.log("Masuk  ke sini 1x : "+(totalImage - 1));
                                                            this.hideChips(this.flagStatePlayer);
                                                            this.setScoreLabel('player',0, 1, false , 0 ,0 );
                                                            this.setScoreLabel('banker',0, 1, false , 0 ,0 );
                                                            this.flagState = 3;
                                                            this.flagStatePlayer++;
                                                            
                                                        
                                            }, this));
                        }
                        else{
                            newAction = cc.sequence(delayTemp,cc.moveTo(0.1, lastPos), 
                                                fadeOutVar,
                                                cc.CallFunc.create(function(node) {
                                                    
                                        }, this));
                        }

                        AllCard.runAction(newAction);  
                    }


                }, this)
            ));
        }

        //validate if game already finish 
        if(this.flagState == 3 && this.flagStatePlayer == 5){
            this._flagGameStart = 0;
            cc.log(playerHistory[totalGame]);
            this._totalWin = 0;
            this.flagState = 0;
            this.flagStatePlayer =100;
            this.unschedule( this.updateDeckPlayer );
                var setnew = {   
                        'balance': 1000,
                        'status' : 1,
                        'winner' : 'player',
                        'dataBet': [],
                        'chipsBet' : [  {'dataBet' :[]},
                                        {'dataBet' :[]},
                                        {'dataBet' :[]},
                                        {'dataBet' :[]},
                                        {'dataBet' :[]}
                                    ],
                        'card' :[],
                        'cardShow' : [  {'card' :[],
                                         'winner': ''
                                        },
                                        {'card' :[],
                                         'winner': ''
                                        },
                                        {'card' :[],
                                         'winner': ''
                                        },
                                        {'card' :[],
                                         'winner': ''
                                        },
                                        {'card' :[],
                                         'winner': ''
                                        }
                                    ],
                        'sessionID' : "",
                        'dateTime' : "",
                        'IpAdd' : "",
                        'hdr_history_game_id' : 0,
                        'winnerAll' : {}
                    };

                playerHistory.push(setnew);
                this.setNewGameID();

                totalGame++;

                this._scoreCardLabelWinner.setVisible(false);
                this._scoreCardWinner.setVisible(false);
                this._scoreCardLabelWinner.setString("0");

                //set new game
                this._scoreCardWinner.runAction(cc.Sequence.create(
                cc.DelayTime.create(0.8),
                cc.CallFunc.create(function(node) {
                    this.totalBetLabel.setString('Total Bet : 0.00');
                    this._scoreCardLabelWinner.setVisible(false);
                    this._scoreCardWinner.setVisible(false);
                    this._scoreCardLabelWinner.setString("0");

                    this._flagImageButtonRight = 'repeat';
                    this._flagButtonRight = 0;
                    this._flagButtonLeft = 1;
                    this.setChangeButton('left',0,this._flagImageButtonLeft);
                    this.setChangeButton('right',1,this._flagImageButtonRight);
                }, this)
                ));

                //this.clearChips();

        }

        // end game -- 
        if(this._flagFinishGame == 1){
            this._flagGameStart = 0;
            this.unschedule( this.updateDeckPlayer );
        }

    },
    distributeCardBanker:function(banker,flag){
        var startX = [650,535,405,289,218];
        var startY = [326,278,255,274,320];

        var bankerFinishX = [710,580,450,320,230];
        var bankerFinishY = [264,218,200,230,288]; 

        var closeCard = "";
        var posMid2 = "";
        var cardShow = "";
        var cardName = "";
        var frame = "";
        var closedFlip = "";
        var closedFlip1 = "";
        var closedCardOpenAction = "";

        //distribute first 2 card banker
        if(flag == 1){
            //var cardName =  cardBack;
            var cardDeck1 = new cc.Sprite(res.bg_card_png);
            
            cardDeck1.attr({
                    x: startX[banker] ,
                    y: startY[banker]
                });
            this.playCard[banker].cardDeckSprite.push(cardDeck1);
            this.addChild(cardDeck1); 
            var posMid1 = cc.p(bankerFinishX[banker],bankerFinishY[banker]); 
            var action = cc.sequence(cc.moveTo(0.3, posMid1), 
                                        cc.CallFunc.create(function(node) {
                                        this.flagState = 6;
                                       cc.log("xxxx");
                                }, this));
            cardDeck1.runAction(action);  
        }
        //distribute 2nd card player
        else if(flag == 2){
            //var cardName =  cardBack;
            var cardDeck2 = new cc.Sprite(res.bg_card_png);
            cardDeck2.attr({
                    x: startX[banker] ,
                    y: startY[banker]
                });
            this.playCard[banker].cardDeckSprite.push(cardDeck2);
            this.addChild(cardDeck2); 
            var posMid2 = cc.p(bankerFinishX[banker] + 8,bankerFinishY[banker] - 8); 
            var action = cc.sequence(cc.moveTo(0.3, posMid2), 
                                        cc.CallFunc.create(function(node) {
                                        this.flagState = 7;
                                        //this.flagStatePlayer++;
                                }, this));
            cardDeck2.runAction(action);  
        }
        else if(flag == 3){

            closeCard = this.playCard[banker].cardDeckSprite[2];
            posMid2 = cc.p(bankerFinishX[banker] +40,bankerFinishY[banker] +20); 

            cardShow = this.playCard[banker].cardDeckBanker[0];
            cardName =  cardNew.card[cardShow].cardName;
            cc.log("Kartu nma : "+cardName);
            frame = cc.spriteFrameCache.getSpriteFrame(cardName);

            closedFlip = cc.RotateBy.create(0.3, 0, -90);
            closedFlip1 = cc.RotateBy.create(0.3, 0, 90);
            closedCardOpenAction = cc.CallFunc.create( function() {
                closeCard.setSpriteFrame (frame);
                closeCard.runAction(closedFlip1);
            });
            closeCard.runAction(
                                cc.Sequence.create(
                                    cc.moveTo(0.3, posMid2), 
                                    closedFlip,
                                    closedCardOpenAction,
                                    cc.CallFunc.create(function(node) {
                                           this.setScoreLabel('banker',1, cardNew.card[cardShow].point, true , 0 ,0 );
                                           this.flagState = 8;
                                           
                                        }, this)
                                    )
                                );
        }
        else if(flag == 4){
        	cc.log("masuk ke sini banker ke 4");
            closeCard = this.playCard[banker].cardDeckSprite[3];
            posMid2 = cc.p(bankerFinishX[banker] +50,bankerFinishY[banker] +20); 

            cardShow = this.playCard[banker].cardDeckBanker[1];
            cardName =  cardNew.card[cardShow].cardName;
            cc.log("Kartu nma : "+cardName);
            frame = cc.spriteFrameCache.getSpriteFrame(cardName);

            closedFlip = cc.RotateBy.create(0.3, 0, -90);
            closedFlip1 = cc.RotateBy.create(0.3, 0, 90);
            closedCardOpenAction = cc.CallFunc.create( function() {
                closeCard.setSpriteFrame (frame);
                closeCard.runAction(closedFlip1);
                
            });
            closeCard.runAction(
                                cc.Sequence.create(
                                    cc.moveTo(0.3, posMid2), 
                                    closedFlip,
                                    closedCardOpenAction,
                                    cc.CallFunc.create(function(node) {
                                           this.setScoreLabel('banker',1, cardNew.card[cardShow].point, true , 0 ,0 );
                                           this.flagState = 9;
                                           //this.flagStatePlayer++;
                                           
                                        }, this)
                                    )
                                );
        }
        else if(flag == 5){
        	var cardDeck1 = new cc.Sprite(res.bg_card_png);
            
            cardDeck1.attr({
                    x: startX[banker] ,
                    y: startY[banker]
                });
            this.playCard[banker].cardDeckSprite.push(cardDeck1);
            this.addChild(cardDeck1); 
            var posMid1 = cc.p(bankerFinishX[banker],bankerFinishY[banker]); 
            var action = cc.sequence(cc.moveTo(0.3, posMid1), 
                                        cc.CallFunc.create(function(node) {
                                        	this.flagState = 12;
                                        //this.show3rdCardBanker(banker , bankerFinishX[banker] +60, bankerFinishY[banker] +20 );
                                }, this));
            cardDeck1.runAction(action);  
        }
        else if(flag ==6){
        	closeCard = this.playCard[banker].cardDeckSprite[4 + this.flagState3rdCard];
            posMid2 = cc.p(bankerFinishX[banker] +60,bankerFinishY[banker] +20); 

            cardShow = this.playCard[banker].cardDeckBanker[2];
            cardName =  cardNew.card[cardShow].cardName;
            frame = cc.spriteFrameCache.getSpriteFrame(cardName);

            closedFlip = cc.RotateBy.create(0.3, 0, -90);
            closedFlip1 = cc.RotateBy.create(0.3, 0, 90);
            closedCardOpenAction = cc.CallFunc.create( function() {
                closeCard.setSpriteFrame (frame);
                closeCard.runAction(closedFlip1);
                
            });
            closeCard.runAction(
                        cc.Sequence.create(
                            cc.moveTo(0.3, posMid2), 
                            closedFlip,
                            closedCardOpenAction,
                            cc.CallFunc.create(function(node) {
                                   this.setScoreLabel('banker',1, cardNew.card[cardShow].point, true , 0 ,0 );
                                   //this.flagState = 3;
                                   //this.flagStatePlayer++;
                                   this._flagPlayerTurnEnd = 1;


                                }, this)
                            )
                        );
        }
    },
    distributeCardPlayer:function(player, flag){
        var startX = [650,535,405,289,218];
        var startY = [326,278,255,274,320];

        var playerFinishX = [660,530,400,270,180];
        var playerFinishY = [264,218,200,230,288]; 

        var labelPlayerX = [630,500,370,240,150];
        var labelPlayerY = [230,184,166,196,254];

        var labelBankerX = [750,620,490,360,270];
        var labelBankerY = [230,184,166,196,254];

        
        
        var closeCard = "";
        var posMid2 = "";
        var cardShow = "";
        var cardName = "";
        var frame = "";
        var closedFlip = "";
        var closedFlip1 = "";
        var closedCardOpenAction = "";

        //distribute first 2 card player
        if(flag == 1){
            //var cardName =  cardBack;
            var cardDeck1 = new cc.Sprite(res.bg_card_png);
            
            cardDeck1.attr({
                    x: startX[player] ,
                    y: startY[player]
                });
            this.playCard[player].cardDeckSprite.push(cardDeck1);
            this.addChild(cardDeck1); 
            var posMid1 = cc.p(playerFinishX[player],playerFinishY[player]); 
            var action = cc.sequence(cc.moveTo(0.3, posMid1), 
                                        cc.CallFunc.create(function(node) {
                                        this.flagState = 2;
                                       cc.log("xxxx");
                                }, this));
            cardDeck1.runAction(action);  
        }
        //distribute 2nd card player
        else if(flag == 2){
            //var cardName =  cardBack;
            var cardDeck2 = new cc.Sprite(res.bg_card_png);
            cardDeck2.attr({
                    x: startX[player] ,
                    y: startY[player]
                });
            this.playCard[player].cardDeckSprite.push(cardDeck2);
            this.addChild(cardDeck2); 
            var posMid2 = cc.p(playerFinishX[player] - 8,playerFinishY[player] - 8); 
            var action = cc.sequence(cc.moveTo(0.3, posMid2), 
                                        cc.CallFunc.create(function(node) {
                                        this.flagState = 1;
                                        this.flagStatePlayer++;
                                }, this));
            cardDeck2.runAction(action);  
        }
        else if(flag == 3){

            this.setScoreLabel('player',0, 1, true , labelPlayerX[player] ,labelPlayerY[player] );
            this.setScoreLabel('banker',0, 1, true , labelBankerX[player] ,labelBankerY[player] );

            closeCard = this.playCard[player].cardDeckSprite[0];
            posMid2 = cc.p(playerFinishX[player] -40,playerFinishY[player] +20); 

            cardShow = this.playCard[player].cardDeckPlayer[0];

            cardName =  cardNew.card[cardShow].cardName;
            cc.log("Kartu nma : "+cardName);
            frame = cc.spriteFrameCache.getSpriteFrame(cardName);

            closedFlip = cc.RotateBy.create(0.3, 0, -90);
            closedFlip1 = cc.RotateBy.create(0.3, 0, 90);
            closedCardOpenAction = cc.CallFunc.create( function() {
                closeCard.setSpriteFrame (frame);
                closeCard.runAction(closedFlip1);
                
            });
            closeCard.runAction(
                                cc.Sequence.create(
                                    cc.moveTo(0.3, posMid2), 
                                    closedFlip,
                                    closedCardOpenAction,
                                    cc.CallFunc.create(function(node) {
                                            this.setScoreLabel('player',1, cardNew.card[cardShow].point, true , 0 ,0 );
                                            
                                           this.flagState = 4;
                                        }, this)
                                    )
                                );
        }
        else if(flag == 4){

            closeCard = this.playCard[player].cardDeckSprite[1];
            posMid2 = cc.p(playerFinishX[player] -30,playerFinishY[player] +20); 

            cardShow = this.playCard[player].cardDeckPlayer[1];
            cardName =  cardNew.card[cardShow].cardName;
            cc.log("Kartu nma : "+cardName);
            frame = cc.spriteFrameCache.getSpriteFrame(cardName);

            closedFlip = cc.RotateBy.create(0.3, 0, -90);
            closedFlip1 = cc.RotateBy.create(0.3, 0, 90);
            closedCardOpenAction = cc.CallFunc.create( function() {
                closeCard.setSpriteFrame (frame);
                closeCard.runAction(closedFlip1);
                
            });
            closeCard.runAction(
                                cc.Sequence.create(
                                    cc.moveTo(0.3, posMid2), 
                                    closedFlip,
                                    closedCardOpenAction,
                                    cc.CallFunc.create(function(node) {
                                            this.setScoreLabel('player',1, cardNew.card[cardShow].point, true , 0 ,0 );
                                           this.flagState = 5;
                                           //this.flagStatePlayer++;
                                        }, this)
                                    )
                                );
        }

        else if(flag == 5){
        	cc.log("cetak di sini!!");
        	var cardDeck1 = new cc.Sprite(res.bg_card_png);
            
            cardDeck1.attr({
                    x: startX[player] ,
                    y: startY[player]
                });
            this.playCard[player].cardDeckSprite.push(cardDeck1);
            this.addChild(cardDeck1); 
            var posMid1 = cc.p(playerFinishX[player],playerFinishY[player]); 
            var action = cc.sequence(cc.moveTo(0.3, posMid1), 
                                        cc.CallFunc.create(function(node) {
                                       	this.flagState = 11;
                                }, this));
            cardDeck1.runAction(action);
            cc.log("cetak di sini!!");

        	
        }

        else if(flag == 6){
        	cc.log("errror  di sini!!!");
    		closeCard = this.playCard[player].cardDeckSprite[4];
            posMid2 = cc.p(playerFinishX[player] -20,playerFinishY[player] +20); 

            cardShow = this.playCard[player].cardDeckPlayer[2];
            cardName =  cardNew.card[cardShow].cardName;
            frame = cc.spriteFrameCache.getSpriteFrame(cardName);

            closedFlip = cc.RotateBy.create(0.3, 0, -90);
            closedFlip1 = cc.RotateBy.create(0.3, 0, 90);
            closedCardOpenAction = cc.CallFunc.create( function() {
                closeCard.setSpriteFrame (frame);
                closeCard.runAction(closedFlip1);
                
            });
            closeCard.runAction(
                        cc.Sequence.create(
                            cc.moveTo(0.3, posMid2), 
                            closedFlip,
                            closedCardOpenAction,
                            cc.CallFunc.create(function(node) {
                                    this.setScoreLabel('player',1, cardNew.card[cardShow].point, true , 0 ,0 );
                                   this.flagState = 10;
                                   //this.flagStatePlayer++;
                                }, this)
                            )
                        );
        }

    },  
    show3rdCardBanker:function(banker , x , y){
    	cc.log("errror  di sini!!!");
    	closeCard = this.playCard[banker].cardDeckSprite[4 + this.flagState3rdCard];
            posMid2 = cc.p(x,y); 

            cardShow = this.playCard[banker].cardDeckBanker[2];
            cardName =  cardNew.card[cardShow].cardName;
            frame = cc.spriteFrameCache.getSpriteFrame(cardName);

            closedFlip = cc.RotateBy.create(0.3, 0, -90);
            closedFlip1 = cc.RotateBy.create(0.3, 0, 90);
            closedCardOpenAction = cc.CallFunc.create( function() {
                closeCard.setSpriteFrame (frame);
                closeCard.runAction(closedFlip1);
                
            });
            closeCard.runAction(
                        cc.Sequence.create(
                            cc.moveTo(0.3, posMid2), 
                            closedFlip,
                            closedCardOpenAction,
                            cc.CallFunc.create(function(node) {
                                   this.flagState = 3;
                                   this.flagStatePlayer++;
                                }, this)
                            )
                        );
    },
    show3rdCardPlayer:function(player , x , y){
    	cc.log("errror  di sini!!!");
    	closeCard = this.playCard[player].cardDeckSprite[4];
            posMid2 = cc.p(x,y); 

            cardShow = this.playCard[player].cardDeckPlayer[2];
            cardName =  cardNew.card[cardShow].cardName;
            frame = cc.spriteFrameCache.getSpriteFrame(cardName);

            closedFlip = cc.RotateBy.create(0.3, 0, -90);
            closedFlip1 = cc.RotateBy.create(0.3, 0, 90);
            closedCardOpenAction = cc.CallFunc.create( function() {
                closeCard.setSpriteFrame (frame);
                closeCard.runAction(closedFlip1);
                
            });
            closeCard.runAction(
                        cc.Sequence.create(
                            cc.moveTo(0.3, posMid2), 
                            closedFlip,
                            closedCardOpenAction,
                            cc.CallFunc.create(function(node) {
                                   this.flagState = 10;
                                   //this.flagStatePlayer++;
                                }, this)
                            )
                        );
    },
    updatePlayer:function(){
        
        var randomDeck = 0;
        var message = "";
        var winner = '';
        
        if(this._flagCount == this._totalDeck && this._flagCount < 4){

             randomDeck = this.randomDeck();
            this._allDeck[this._flagCount] = randomDeck;

            if(this._flagCount == 0 || this._flagCount == 2  ){
                //call deck player
                this._playerDeck[this._totalDeckPlayer] = randomDeck;
                this.callCard('player',this._totalDeckPlayer,randomDeck);
                this._totalDeckPlayer++;
            }
            else{
                //call deck banker
                this._bankerDeck[this._totalDeckBanker] = randomDeck;
                this.callCard('banker',this._totalDeckBanker,randomDeck);
                this._totalDeckBanker++;
            }   
            this._flagCount++;
        }


        // validate if player or banker not natural win

        if(this.flagEndFirst4Card == 1){

            //cc.log("natural win : "+this.checkForNaturalWin());
            //cc.log("end turn: "+this.flagEndTurn);
            //cc.log("total deck : "+this._totalDeck);

            if( this.flagThirdCard == 0 && this._totalDeck == 4 && this.checkForNaturalWin() == 1 && this.flagEndTurn == 1  )
            {
                    //cc.log("masuk");
                    //validate for end turn all
                    this.setWinnerGame();
                    this.setBgWinner();
                    this.setLabelBet();
                    this.setStatusMessage(4);
                    

                    
                    if(this._playerPoint < this._bankerPoint){
                        cc.log("xx Banker Win");
                        message = "Banker Win!";
                        winner = 'banker';
                    }
                    else if(this._playerPoint > this._bankerPoint){
                        cc.log("xx Player Win");
                        message = "Player Win!";
                        winner = 'player';
                    }
                    else if(this._playerPoint == this._bankerPoint){
                        cc.log("xx TIE");
                        message = "TIE!";
                        winner = 'tie';
                    }
                    


                    //validate if balance is too low then cannot repeat 
                    if(playerBet > playerBalance)
                    {
                        this._flagImageButtonRight = 'deal';
                        
                        
                        this.setChangeButton('left',1,this._flagImageButtonLeft);
                        this.setChangeButton('right',0,this._flagImageButtonRight);
                        this._flagButtonRight = 3;
                        this._flagButtonLeft = 1;
                    }   
                    else{
                        this._flagImageButtonRight = 'repeat';
                        this._flagButtonRight = 1;
                        this._flagButtonLeft = 1;
                        this.setChangeButton('left',1,this._flagImageButtonLeft);
                        this.setChangeButton('right',1,this._flagImageButtonRight);
                    } 
                    
                    
                    this.setLabelWinner(message,1);
                    

                        
                    //this.setChipsWin(totalGame,winner);

                    this.saveDataBasePerGame(winner);
                    this.unschedule( this.updatePlayer );



                    playerBet = 0;
                    playerWin = 0;
                    playerLose = 0;


            }
            else{
                // validate for start 3rd card not posible for natural win
                this.flagThirdCard = 1;
                cc.log('total : '+this.flagEndTurn);
                // validate stand or hit deck for player
                if(this._flagCount == this._totalDeck && this._totalDeck == 4){

                    //check hit or stand player and banker
                    var flagPlayer = this.checkStandOrHitPlayer();
                    if(flagPlayer == 1){

                        randomDeck = this.randomDeck();
                        this._allDeck[this._flagCount] = randomDeck;
                        this._playerDeck[this._totalDeckPlayer] = randomDeck;
                        this.callCard('player',this._totalDeckPlayer,randomDeck);
                        this._totalDeckPlayer++;
                        this._flagCount++;

                        cc.log('masuk sini dlu...');
                    }
                    else{
                        this.flagNextBankerCard = 1;
                    }
                }
                //end validate for player


                // validate stand or hit deck for banker
                //cc.log("flag call banker: "+this.flagNextBankerCard);
                if(this.flagNextBankerCard == 1 && this._totalDeckBanker == 2){

                    //check hit or stand player and banker
                    var flagBanker = this.checkStandOrHitBanker();

                    cc.log("flag banker : "+flagBanker);

                    if(flagBanker == 1){
                        randomDeck = this.randomDeck();
                        this._allDeck[this._flagCount] = randomDeck;
                        this._bankerDeck[this._totalDeckBanker] = randomDeck;
                        this.callCard('Banker',this._totalDeckBanker,randomDeck);
                        this._totalDeckBanker++;
                        this._flagCount++;
                        cc.log('masuk sini dlu... xxx');
                    }
                    else{

                        cc.log('masuk sini ga boleh!!');
                        this.flagEndTurn = 1;
                    }

                }
                //end validate for player


                if(this.flagEndTurn == 1){
                    this.setWinnerGame();
                    this.setBgWinner();
                    this.setLabelBet();
                    this.setStatusMessage(4);
                    

                    if(this._playerPoint < this._bankerPoint){
                        cc.log("Banker Win");
                        message = "Banker Win!";
                        var winner = 'banker';
                    }
                    else if(this._playerPoint > this._bankerPoint){
                        cc.log("Player Win");
                        message = "Player Win!";
                        var winner = 'player';
                    }
                    else if(this._playerPoint == this._bankerPoint){
                        cc.log("TIE");
                        message = "TIE!";
                        var winner = 'tie';
                    }

                    //validate if balance is too low then cannot repeat 
                    if(playerBet > playerBalance)
                    {
                        this._flagImageButtonRight = 'deal';
                        
                        this.setChangeButton('left',1,this._flagImageButtonLeft);
                        this.setChangeButton('right',0,this._flagImageButtonRight);
                        this._flagButtonRight = 3;
                        this._flagButtonLeft = 1;
                    }   
                    else{
                        this._flagImageButtonRight = 'repeat';
                        this._flagButtonRight = 1;
                        this._flagButtonLeft = 1;
                        this.setChangeButton('left',1,this._flagImageButtonLeft);
                        this.setChangeButton('right',1,this._flagImageButtonRight);
                    } 
                    
                    this.setLabelWinner(message,1);

                    //this.setChipsWin(totalGame,winner);
                    this.saveDataBasePerGame(winner);
                    this.unschedule( this.updatePlayer );

                    playerBet = 0;
                    playerWin = 0;
                    playerLose = 0;
                }
            }
        }
    },

    clearBgWinner:function(){

        for(var i =0;i<this.bgWinner.length;i++){
            this.removeChild(this.bgWinner[i]);        
        }  
        this.bgWinner = [];
    },
    setBgWinner:function(){

        this.bgWinner = [];
        var colorNew = null;
        var bgWinnerTemp = null;

        var setX = 0; 
        var setY = 0;
        for (var key in winnerGame) {
          if (winnerGame.hasOwnProperty(key)) {
                //cc.log(key + " -> " + winnerGame[key]);
                setX = 0; 
                setY = 0;
                //validate x , y 

                if(key == 'player'){
                    setX = 181; 
                    setY = 74;
                }
                else if(key == 'banker'){
                    setX = 181;
                    setY = 38;
                }
                else if(key == 'tie'){
                    setX = 181; 
                    setY = 2;
                }
                else if(key == 'playerPair'){
                    setX = 299; 
                    setY = 74;
                }
                else if(key == 'bankerPair'){
                    setX = 299; 
                    setY = 38;
                }
                else if(key == 'small'){
                    setX = 299; 
                    setY = 2;
                }
                else if(key == 'PerfectPair'){
                    setX = 417; 
                    setY = 74;
                }
                else if(key == 'eitherPair'){
                    setX = 417; 
                    setY = 38;
                }
                else if(key == 'big'){
                    setX = 417;
                    setY = 2;
                }

                if(winnerGame[key] == 1) {
                    colorNew = cc.color( 0, 255, 0);
                }
                else colorNew = cc.color( 255, 0 , 0);

                if(winnerGame[key] == 1 && key == 'tie'){
                    this.bgWinner[0].visible = false;
                    this.bgWinner[1].visible = false;
                    
                }
                    

                bgWinnerTemp = new cc.LayerColor( colorNew,115,34 );
                bgWinnerTemp.attr({
                    x : setX,
                    y : setY
                });
                bgWinnerTemp.opacity = 80;
                this.bgWinner.push(bgWinnerTemp);
                this.addChild(bgWinnerTemp);


          }
        }



/*
        //bg player win
        if(winnerGame.player == 1) colorNew = cc.color( 0, 255, 0);
        else colorNew = cc.color( 255, 0 , 0);

        bgWinnerTemp = new cc.LayerColor( colorNew,115,34 );
        bgWinnerTemp.attr({
            x : 181,
            y : 74
        });
        bgWinnerTemp.opacity = 80;
        bgWinner.push(bgWinnerTemp);
        this.addChild(bgWinnerTemp);

*/




    },
    setWinnerGame:function(){

        playerWin = 0;
        playerLose = 0;
        var totalBet = 0;
        winnerGame = {
            'player':0,
            'banker':0,
            'tie':0,
            'playerPair':0,
            'PerfectPair':0,
            'bankerPair':0,
            'eitherPair':0,
            'small':0,
            'big':0
        };

        //validate the winner game
        if(this._playerPoint < this._bankerPoint){
            winnerGame.banker =1;
            betToBanker = betToBanker + (betToBanker * 0.95);
            playerWin = playerWin + betToBanker;

        }
        else if(this._playerPoint > this._bankerPoint){
            winnerGame.player = 1;
            betToPlayer = betToPlayer * 2;
            playerWin = playerWin + betToPlayer;
        }
        else if(this._playerPoint == this._bankerPoint){
            winnerGame.tie = 1;
            betToTie = betToTie * 2;
            playerWin = playerWin + betToTie + betToPlayer + betToBanker;
        }


        //validate big or small
        var totalCard = playerHistory[totalGame].card.length;

        if(totalCard == 4){
            winnerGame.small =1;
            betToSmall = betToSmall + (betToSmall * 1.5);
            playerWin = playerWin + betToSmall;
        }
        else{
            winnerGame.big =1;
            betToBig = betToBig + (betToBig * 0.54);
            playerWin = playerWin + betToBig;
        }

        cc.log(winnerGame);
        // validate pair
        
        
        var playerCard1 = "";
        var playerCard2 = "";
        var bankerCard1 = "";
        var bankerCard2 = "";
        //player card 1
        //cc.log("total game : "+totalGame);

        //cc.log(playerHistory[totalGame]);

        playerCard1 = playerHistory[totalGame].card[0].cardNameId; 
        playerCard2 = playerHistory[totalGame].card[2].cardNameId; 
        bankerCard1 = playerHistory[totalGame].card[1].cardNameId; 
        bankerCard2 = playerHistory[totalGame].card[3].cardNameId; 


        //cc.log('card 1:'+playerCard1.length);
        //cc.log('card 2:'+playerCard2.length);
        //cc.log('card 1:'+bankerCard1.length);
        //cc.log('card 2:'+bankerCard2.length);

        var pCard1 = "";
        var pCard2 = "";
        var bCard1 = "";
        var bCard2 = "";


        pCard1 = playerCard1.substring(2, playerCard1.length);
        pCard2 = playerCard2.substring(2, playerCard2.length);
        bCard1 = bankerCard1.substring(2, bankerCard1.length);
        bCard2 = bankerCard2.substring(2, bankerCard2.length);

        //cc.log('hasil akhir : '+pCard1);
       // cc.log('hasil akhir : '+pCard2);
        //cc.log('hasil akhir : '+bCard1);
        //cc.log('hasil akhir : '+bCard2);

        if(pCard1 == pCard2){
            winnerGame.playerPair =1;
            betToPlayerPair = betToPlayerPair *12;
            playerWin = playerWin + betToPlayerPair;
        }
        if(bCard1 == bCard2){
            winnerGame.bankerPair =1;
            betToBankerPair = betToBankerPair * 12;
            playerWin = playerWin + betToBankerPair;
        }

        if(bCard1 == bCard2 && pCard1 == pCard2){
            winnerGame.PerfectPair =1;           
             betToPerfectPair = betToPerfectPair * 26;
             playerWin = playerWin + betToPerfectPair;
        }

        if(bCard1 == bCard2 || pCard1 == pCard2){
            winnerGame.eitherPair =1; 
            betToEitherPair = betToEitherPair *6;
            playerWin = playerWin + betToEitherPair;
        }

        playerHistory[totalGame].winnerAll = winnerGame;


        //playerBet = 0;
        cc.log("player bet : "+playerBet);
        cc.log("player win : "+playerWin);

        var totalBalance = 0;
        

        totalBalance = (playerBet - playerWin) * -1;

        if(playerBet - playerWin > 0 ){
            //$cWin = 0;
            //$cLose = $totalBets - $totalChipsWin;
            playerLose = playerBet - playerWin;
            playerWin = 0;
            
            cc.log('masuk ke sini 1');
        }
        else if(playerBet - playerWin < 0){
            //$cWin = $totalChipsWin - $totalBets;
            //$cLose = 0;
            playerWin = playerWin - playerBet;
            playerLose = 0;
            cc.log('masuk ke sini 2');
        }
        else{
            playerWin = 0;
            playerLose = 0;

        }
        cc.log('masuk ke sini 1 : '+playerLose);


        playerBalance = Math.round((playerBalance + playerBet + totalBalance) * 100) / 100;





    },
    callCard:function(flagPlay , flagDeck, DeckCard){

        //call function setcards
        //to get ID card
        //cc.log("kartu sakti : "+ cardNew.card[DeckCard].point);

        this.setCards('insert',flagPlay,cardNew.card[DeckCard].id,cardNew.card[DeckCard].cardNameID);

        var size = cc.winSize;
        var position = 0;
        if(flagPlay == 'player'){
            position = 180 +(flagDeck * 25);
            cc.log('card player xx : '+ DeckCard);
            this._playerPoint = this._playerPoint + cardNew.card[DeckCard].point;
    
        }
        else{
            position = 570+(flagDeck * 25);

            cc.log('card xx : '+ DeckCard);
            this._bankerPoint = this._bankerPoint + cardNew.card[DeckCard].point;
        }

        //var cardName =  cardBack;
        var cardName =  cardNew.card[DeckCard].cardName;
        var cardDeckS = new cc.Sprite("#"+cardName);
         
        cardDeckS.attr({
                x: (cc.winSize.width/2) ,
                y: (cc.winSize.height  )
            });
        this.cardDeckSprite.push(cardDeckS);
        this.addChild(cardDeckS); 


        //var skewAction = cc.SkewTo.create(0.1,0,0);
        //var repeat_action = cc.Repeat.create(sprite_action,56);
        //sprite.runAction(repeat_action);

        var posMid = cc.p(position,size.height-100); 
        var action = cc.sequence(
                    cc.moveTo(0.6, posMid),
                    cc.CallFunc.create(function(node) {
                        this._totalDeck++;

                        if(this._playerPoint >= 10 )
                            this._playerPoint = this._playerPoint - 10;
                        if(this._bankerPoint >= 10 )
                            this._bankerPoint = this._bankerPoint - 10;

                        cc.log("finish : "+this._totalDeck);
                        cc.log("player point : "+this._playerPoint);
                        cc.log("banker point : "+this._bankerPoint);
                        this.setLabelScorePlayer();
                        this.setLabelScoreBanker();

                        //validate first end 4card
                        if(this._totalDeck == 4)
                            this.flagEndFirst4Card = 1;

                        if(this.flagEndFirst4Card == 1){
                            //validate to call third card for banker
                            if(this._totalDeck == 5)
                                this.flagNextBankerCard = 1;

                            // validate to end all turn
                            if(this._totalDeckBanker == 3){
                                this.flagEndTurn = 1;
                                cc.log("end last banker card");
                            }
                        }
                        
                            
                    }, this));
        cardDeckS.runAction(action);  
    },
    checkStandOrHitPlayer:function(){
        // return 0 = stand
        // return 1 = hit

        var returnVal = 0;

        //jika banker 8 atau 9 maka player stand
        if(this._bankerPoint >= 8 ){
            returnVal = 0;
        }
        else{
            if(this._playerPoint >= 6 )
                returnVal = 0;
            else
                returnVal = 1;    
        }

        return returnVal;
    },
    checkStandOrHitBanker:function(){
        // return 0 = stand
        // return 1 = hit
        var returnVal = 0;

        if(this._bankerPoint == 0 || this._bankerPoint == 1 || this._bankerPoint == 2){
            // always hit 
            returnVal = 1;
        }
        else if(this._bankerPoint == 3){
            if(this._playerPoint == 8 ){
                returnVal = 0;
            }
            else{
                returnVal = 1;
            }
        }
        else if(this._bankerPoint == 4){
            if(this._playerPoint == 0 || this._playerPoint == 1 || this._playerPoint == 8 || this._playerPoint == 9 ){
                returnVal = 0;
            }
            else{
                returnVal = 1;
            }
        }
        else if(this._bankerPoint == 5){
            if(this._playerPoint == 4 || this._playerPoint == 5 || this._playerPoint == 6 || this._playerPoint == 7 ){
                returnVal = 1;
            }
            else{
                returnVal = 0;
            }
        }
        else if(this._bankerPoint == 6){
            if(this._playerPoint == 6 || this._playerPoint == 7  ){
                returnVal = 1;
            }
            else{
                returnVal = 0;
            }
        }
        else if(this._bankerPoint >= 7 ){
                returnVal = 0;
        }

        return returnVal;
    },
    setLabelScorePlayer:function(){
        //this.playerScoreLabel.setString('Player : ' + this._playerPoint);
    },
    setLabelScoreBanker:function(){
        //this.bankerScoreLabel.setString('Banker : ' + this._bankerPoint);
    },
    checkForNaturalWin:function(){
        //0 = not natural win
        // 1 = natural win
        var returnVal = 0;
        if(this._playerPoint == 8 || this._playerPoint == 9 || this._bankerPoint == 8 || this._bankerPoint == 9){
            this.flagEndTurn = 1;
            returnVal = 1;

        }
        else{
            returnVal = 0;
        }
        return returnVal;
    },
    setChips:function(flag , flagBetTo,value){
        //insert to database
        if(flag == 'insert'){
            var dataBet = {
                    'betTo' : flagBetTo,
                    'value' : value
                    };

            playerHistory[totalGame].dataBet.push(dataBet);
            //this.insertChips_DB(flagBetTo, this._chips_value[this._chips_active]);
        }
    },
    setChips1:function(flag , flagBetTo,value, index){
        //insert to database
        if(flag == 'insert'){
            var dataBet = {
                    'betTo' : flagBetTo,
                    'value' : value
                    };
            playerHistory[totalGame].chipsBet[index].dataBet.push(dataBet);
            //this.insertChips_DB(flagBetTo, this._chips_value[this._chips_active]);
        }
    },
    setCards:function(flag,cardTo, id,name_id){
        cc.log("id kartu :::: "+id);
        if(flag == 'insert'){
            var cardPB = {
                    'cardTo' : cardTo,
                    'cardId' : id,
                    'cardNameId' : name_id
                    };
            playerHistory[totalGame].card.push(cardPB);
        }

        cc.log("kartu keluar : "+playerHistory[totalGame].card[0].cardNameId);
    },
    setCards1:function(flag,cardTo, id,name_id,index){
        cc.log("id kartu :::: "+id);
        if(flag == 'insert'){
            var cardPB = {
                    'cardTo' : cardTo,
                    'cardId' : id,
                    'cardNameId' : name_id
                    };
            playerHistory[totalGame].cardShow[index].card.push(cardPB);
        }

        //cc.log("kartu keluar : "+playerHistory[totalGame].card[0].cardNameId);
    },
    insertChips_DB:function(betTo, value){

        idGame = playerHistory[totalGame].hdr_history_game_id;
        cc.log('call insert chips data base');
        var scope = this;
        var returnVal = 0;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                var data = xmlhttp.responseText;
                cc.log(xmlhttp.responseText);   
                //var dataID = JSON.parse(xmlhttp.responseText);

                var returnVal = ""
                //cc.log(dataID[0].errorFlag);
                //var returnVal = dataID[0].errorFlag;
                //var idGame = dataID[0].idGame;

                //cc.log("data error : "+ returnVal);
                //cc.log("data id game : "+ idGame);

                if(returnVal == 1){
                    // success to create game id
                    //playerHistory[totalGame].hdr_history_game_id = idGame;
                }
                else{
                    //playerHistory[totalGame].hdr_history_game_id = 0;   
                }
            }
        };
        xmlhttp.open("GET","src/database/historygame.php?flag=2&betTo="+betTo+"&value="+value+"&idGame="+idGame,true);
        xmlhttp.send();

    },
    createHdrHistoryGameId:function(){
        var id = 0;
        //validate hdr_history_game_id  get the id
        if(playerHistory[totalGame].hdr_history_game_id == 0){
            this.hdrHistoryGameId_DB();
        }
    },
    hdrHistoryGameId_DB : function(){
        cc.log('call thus');
        var scope = this;
        var returnVal = 0;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                var data = xmlhttp.responseText;
                cc.log(xmlhttp.responseText);   
                var dataID = JSON.parse(xmlhttp.responseText);

                cc.log(dataID[0].errorFlag);
                var returnVal = dataID[0].errorFlag;
                var idGame = dataID[0].idGame;

                //cc.log("data error : "+ returnVal);
                //cc.log("data id game : "+ idGame);


                if(returnVal == 1){
                    // success to create game id
                    playerHistory[totalGame].hdr_history_game_id = idGame;
                }
                else{
                    playerHistory[totalGame].hdr_history_game_id = 0;   
                }
            }
        };
        xmlhttp.open("GET","src/database/historygame.php?flag=1",true);
        xmlhttp.send();

        //return returnVal;
    },
    saveDatabaseAllHand:function(data){
        cc.log(data);

        var scope = this;
        var returnVal = 0;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            
        };
        var json_upload = "json_name=" + JSON.stringify(data);
        xmlhttp.open("POST", "src/database/historygame.php?flag=7");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(json_upload);

    },
    saveDataBasePerGame:function(flag_win_lose){
        
        playerHistory[totalGame].winner = flag_win_lose;
        playerHistory[totalGame].balance = playerBalance;


        var scope = this;
        var returnVal = 0;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var setnew = {   
                    'balance': 1000,
                    'status' : 1,
                    'winner' : 'player',
                    'dataBet': [],
                    'card' :[],
                    'sessionID' : "",
                    'dateTime' : "",
                    'IpAdd' : "",
                    'hdr_history_game_id' : 0,
                    'winnerAll' : {}
                    };

                playerHistory.push(setnew);

                totalGame++;

                scope.setNewGameID();
                
            }
        };
        var json_upload = "json_name=" + JSON.stringify(playerHistory[totalGame]);
        xmlhttp.open("POST", "src/database/historygame.php?flag=4");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(json_upload);

    },
    addChipsRepeats:function(){
        var totalChips = playerHistory[totalGame-1].dataBet.length;
        var betTo = "";
        var value = 0;
        for(var i =0; i<totalChips ; i++){

            betTo = playerHistory[totalGame-1].dataBet[i].betTo;
            value = playerHistory[totalGame-1].dataBet[i].value;

            this.addChipsInBettingTable(betTo,value);
            this.setChipsBetting(betTo,value);
        }

        //cc.log("total chipsssssss :::: "+playerHistory[totalGame-1].dataBet.length);
        //scope.addChipsInBettingTable('player');
        //scope.setChipsBetting();

    },
    addChipsRepeats1:function(){
        var player = playerHistory[totalGame-1].chipsBet;
        var betTo = "";
        var value = 0;


        var totalPlayer = player.length;
        var totalChips = "";
        var i =0 , x=0;
        for(x =0;x<totalPlayer;x++){
            totalChips = player[x].dataBet.length;

            for(i =0; i<totalChips ; i++){

                betTo = player[x].dataBet[i].betTo;
                value = player[x].dataBet[i].value;

                this.addChipsInBettingTable1(betTo,value);
                //this.setChipsBetting(betTo,value);
            }
        }

         
        

    },
    setChipsWin:function(tGame,winner){
        cc.log("game ke winner end : "+tGame);
        cc.log("winner game : "+ winner);
        var totalChips = playerHistory[tGame].dataBet.length;
        var betTo = "";
        var value = 0;

        var totalValue = 0;
        var totalLose = 0;
        for(var i =0; i<totalChips ; i++){

            betTo = playerHistory[tGame].dataBet[i].betTo;
            value = playerHistory[tGame].dataBet[i].value;
            if(winner == betTo){
                //this.addChipsInBettingTable(betTo,value);    
                cc.log("print chips");
                totalValue = totalValue + value;
            }
            else{
                totalLose = totalLose + value;
            }
            //this.setChipsBetting(value);
        }
        
        //this.clearChipsLoser(winner);

        if(winner == 'player'){
            totalValue = totalValue * 2;
        }
        else if(winner == 'banker'){
            totalValue = totalValue + Math.round((totalValue * 0.95) * 100) / 100;
        }
        else if(winner == 'tie'){
            totalValue = (totalValue * 9) ;
        }

        
        if(totalValue >0 ){
            this.flagLabelYouWin = 1;
            //this.setLabelYouWin(winner,totalValue);    
        }

        if(winner == 'tie'){
            totalValue = totalValue + totalLose;
        }

        playerBet = 0;
        playerBalance = Math.round((playerBalance + totalValue) * 100) / 100;
        this.setLabelBet();


        
    },
    clearChipsLoser:function(winner){
        cc.log("clear chips loser");

        if(winner == 'banker'){
            for(var i =0;i<this._chips_player_sprite.length;i++){
                this.removeChild(this._chips_player_sprite[i]);        
            }    
            this._chips_player_sprite = [];
        }

        if(winner == 'player'){
            for(var i =0;i<this._chips_banker_sprite.length;i++){
                this.removeChild(this._chips_banker_sprite[i]);        
            }
            this._chips_banker_sprite = [];
        }
        
        if(winner != 'tie'){
            for(var i =0;i<this._chips_tie_sprite.length;i++){
                this.removeChild(this._chips_tie_sprite[i]);        
            }    
            this._chips_tie_sprite = [];   
        }
        
        /*
        playerBalance = playerBalance +playerBet;
        playerBet = 0;
        this.setLabelBet();

        this._flagButtonLeft = 0;
        //this._flagButtonRight = 0;

        this.setChangeButton('left',0,this._flagImageButtonLeft);
        //this.setChangeButton('right',0,this._flagImageButtonRight);
        cc.log("clear chips1");
        */
    },
    setLabelYouWin:function(winner, totalWin){

        var setX = 0;
        var setY = 0;
        var setLabelX = 0;
        var setLabelY = 0;

        if(winner == 'player'){
            setX = 300;
            setY = 202;
            setLabelX = 350;
            setLabelY = 210;
            //totalWin = totalWin * 2;
        }
        else if(winner == 'banker'){
            setX = 350;
            setY = 220;
            setLabelX = 400;
            setLabelY = 227;
            //totalWin = totalWin + Math.round((totalWin * 0.95) * 100) / 100;
        }
        else if(winner == 'tie'){
            setX = 390;
            setY = 280;
            setLabelX = 437;
            setLabelY = 285;
            //totalWin = totalWin * 9;
        }

        this.backgroundYouWin = new cc.LayerColor( cc.color( 84, 90, 92),90,20 );
        this.backgroundYouWin.attr({
            x : setX,
            y : setY
        });
        this.backgroundYouWin.opacity = 200;
        this.addChild(this.backgroundYouWin);

        this.labelYouWin = new cc.LabelTTF( 'You Win : '+totalWin, 'Helvetica', 12,cc.size(90,20) );
        this.labelYouWin.attr({
            x : setLabelX,
            y : setLabelY
        });
        this.addChild( this.labelYouWin, 5 );
    },
    clearLabelYouWin:function(){
        if(this.flagLabelYouWin == 1){
            this.removeChild(this.backgroundYouWin);  
            this.removeChild(this.labelYouWin);  

            this.flagLabelYouWin = 0;
        }
    },
    onExitTransitionDidStart :function(){

        cc.log("exit transisiton");
        //this.removeAllChildren();
        cc.log("exit transisiton");
    },
    setShowPayTable : function(flag){

        var that = this;
        if(flag == 0){
            //remove child
            var x = 1;
            cc.log("close show paytable");
        }
        else{

            //table bet Min
            //table bet max
            //bets to 
            // pays
            // max bet

            that.showPayTableBackground = new cc.LayerColor( cc.color( 255, 255, 255, 180 ) );
            var size = cc.winSize;
            that.showPayTableBackground.opacity = 50;

            var messageBoard = new cc.Sprite.create(res.paytable_png);
            messageBoard.setAnchorPoint(cc.p(0.5,0.5));
            messageBoard.setPosition(cc.p(size.width/2,size.height/2));
            that.showPayTableBackground.addChild( messageBoard, 5);


            var menuClose   = new cc.MenuItemImage(res.paytable_close_png,res.paytable_close_a_png,function(){
                that.flagShowPayTable = 0;
                that.removeChildByTag(1234);
                //cc.director.resume();
            });
            var menuLayer = new cc.Menu(menuClose);
            menuLayer.setPosition(cc.p(size.width/2+163,size.height-115));
            that.showPayTableBackground.addChild( menuLayer, 6); 


            //label for paytable value max min
            var labelminBet = new cc.LabelTTF( minBet, 'Arial', 18,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelminBet.attr({
                x : size.width/2 + 126,
                y : size.height/2 + 127
            });
            that.showPayTableBackground.addChild( labelminBet,7 );

            var labelmaxBet = new cc.LabelTTF( maxBet, 'Arial', 18,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxBet.attr({
                x : size.width/2 + 126,
                y : size.height/2 + 102
            });
            that.showPayTableBackground.addChild( labelmaxBet,8);

            var labelmaxbetP = new cc.LabelTTF( parseFloat(MaxbetToPlayer).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetP.attr({
                x : size.width/2 + 126,
                y : size.height/2 + 21
            });
            that.showPayTableBackground.addChild( labelmaxbetP,9 );

            var labelmaxbetB = new cc.LabelTTF( parseFloat(MaxbetToBanker).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetB.attr({
                x : size.width/2 + 126,
                y : size.height/2 -2
            });
            that.showPayTableBackground.addChild( labelmaxbetB,10 );

            var labelmaxbetT = new cc.LabelTTF( parseFloat(MaxbetToTie).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetT.attr({
                x : size.width/2 + 126,
                y : size.height/2 -23
            });
            that.showPayTableBackground.addChild( labelmaxbetT,10 );

            var labelmaxbetS = new cc.LabelTTF( parseFloat(MaxbetToSmall).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetS.attr({
                x : size.width/2 + 126,
                y : size.height/2 -45
            });
            that.showPayTableBackground.addChild( labelmaxbetS,10 );

            var labelmaxbetBg = new cc.LabelTTF( parseFloat(MaxbetToBig).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetBg.attr({
                x : size.width/2 + 126,
                y : size.height/2 -67
            });
            that.showPayTableBackground.addChild( labelmaxbetBg,10 );

            var labelmaxbetPy = new cc.LabelTTF( parseFloat(MaxbetToPlayerPair).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetPy.attr({
                x : size.width/2 + 126,
                y : size.height/2 -89
            });
            that.showPayTableBackground.addChild( labelmaxbetPy,10 );

            var labelmaxbetBp = new cc.LabelTTF( parseFloat(MaxbetToBankerPair).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetBp.attr({
                x : size.width/2 + 126,
                y : size.height/2 -111  
            });
            that.showPayTableBackground.addChild( labelmaxbetBp,10 );

            var labelmaxbetPF = new cc.LabelTTF( parseFloat(MaxbetToPerfectPair).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetPF.attr({
                x : size.width/2 + 126,
                y : size.height/2 -133
            });
            that.showPayTableBackground.addChild( labelmaxbetPF,10 );

            var labelmaxbetEp = new cc.LabelTTF( parseFloat(MaxbetToEitherPair).toFixed(2), 'Arial', 14,cc.size(70,25),cc.TEXT_ALIGNMENT_RIGHT );
            labelmaxbetEp.attr({
                x : size.width/2 + 126,
                y : size.height/2 -153
            });
            that.showPayTableBackground.addChild( labelmaxbetEp,10 );


            /*
                var minBet = 1;
                var maxBet = 100;
                var MaxbetToPlayer = 100;
                var MaxbetToBanker = 100;
                var MaxbetToTie = 49;
                var MaxbetToSmall = 100;
                var MaxbetToBig = 100;
                var MaxbetToPlayerPair = 49;
                var MaxbetToPerfectPair = 49;
                var MaxbetToBankerPair = 49;
                var MaxbetToEitherPair = 49;
            */

            that.showPayTableBackground.setTag(1234);
            that.addChild(that.showPayTableBackground,1234);

        }
    },
    setNewGameID:function(){

        var scope = this;
        //get new gameID
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = xmlhttp.responseText;
                cc.log(xmlhttp.responseText);   
                var dataID = JSON.parse(xmlhttp.responseText);

                cc.log(dataID[0].errorFlag);
                var returnVal = dataID[0].errorFlag;
                var game_id = dataID[0].game_id;

                //cc.log("data error : "+ returnVal);
                //cc.log("data id game : "+ idGame);

                if(returnVal == 1){
                    // success to create game id
                    playerHistory[totalGame].hdr_history_game_id = game_id;
                    
                }
                else{
                    playerHistory[totalGame].hdr_history_game_id = 0;   
                }

                scope.labelGameID.setString('Game ID : '+game_id);


            }
        };

        xmlhttp.open("POST", "src/database/historygame.php?flag=6");
        xmlhttp.send();
    
    }
        

                    


});

