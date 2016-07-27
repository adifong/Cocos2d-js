


var PlayLayer = cc.Layer.extend({
    playerSprite:null,
    playerPosX : 0,
    playerPosY : 0,
    _bullet:[],
    _enemy:[],
    _maxKoorX : 0,
    _maxKoorY : 0,
    _minKoorX : 0,
    _minKoorY : 0,
    _scoreEnemy : [],
    totalEnemyDie : 0,
    totalEnemy : 0,
    isPause : 0,
    ctor : function(){
        this._super();
        var that = this;
        var size = cc.winSize;
        var backgroundMenu = new cc.LayerColor( cc.color( 100, 150, 200) );
        this.addChild(backgroundMenu);
        //cc.log("play layer");

        //score label
        this.scoreLabel = new cc.LabelTTF( 'score : '+scorePlayer, 'Helvetica', 18 );
        this.scoreLabel.attr({
            x : 50,
            y : size.height - 15
        });
        this.addChild( this.scoreLabel, 5 );

        //level label
        this.levelLabel = new cc.LabelTTF( 'Level : '+levelPlayer, 'Helvetica', 18 );
        this.levelLabel.attr({
            x : size.width /2,
            y : size.height - 15
        });
        this.addChild( this.levelLabel, 5 );

        //life label
        this.lifeLabel = new cc.LabelTTF( 'Life : '+lifePlayer, 'Helvetica', 18 );
        this.lifeLabel.attr({
            x : size.width - 50,
            y : size.height - 15
        });
        this.addChild( this.lifeLabel, 5 );


        this.create_player();

        //add event listener keyboar press
        //press key up 38
        //press key down 40
        //right 37
        //left 39
        //esc 27
        if(cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event:cc.EventListener.KEYBOARD,

                onKeyPressed:function(key,event){
                    
                    cc.log("key press :"+key.toString());
                    that.playerGoTo(key);
                }

            },this);
        }

        //cc.log("level : "+levelPlayer);
        
        //create enemy-----
        this.createEnemy();
        


        var speedTmp = level.enemies[levelPlayer-1].speed;
        this.schedule( this.movingEnemy, speedTmp);
        this.scheduleUpdate(1);



        return true;
    },
    update : function(){
        //this.removeSushi();
        //this.addSushi();
        //this.addPlayer();
        //cc.log('shoot');
        for (var i = 0; i < this._bullet.length; i++) {
            var bullet_shoot = this._bullet[i];
            //cc.log('shoot');

            // validate if bullet if active
            //cc.log(bullet_shoot.visible);
            if(bullet_shoot.visible){
                for (var j = 0; j < this._enemy.length; j++) {
                    var monster = this._enemy[j];

                    if(monster.visible){
                        var bulletRect = bullet_shoot.getBoundingBox();
                        var monsterRect = monster.getBoundingBox();
                        if (cc.rectIntersectsRect(bulletRect, monsterRect)) {
                            cc.log("collision!");

                            monster.visible = false;
                            monster.active = false;
                            bullet_shoot.visible = false;  
                            bullet_shoot.active = false;
                            this.setLabelScore(this._scoreEnemy[j]);
                            this.totalEnemyDie++;
                            //cc.ArrayRemoveObject(this._bullet, bullet_shoot);
                            //bullet_shoot.removeFromParent();
                            //cc.ArrayRemoveObject(this._bullet, monster);
                            //monster.removeFromParent();

                            //this._monstersDestroyed++;
                            //if (this._monstersDestroyed >= 2) {
                            //    var scene = GameOver.scene(true);
                            //    cc.Director.getInstance().replaceScene(scene);
                            //}
                        }
                    }
                }
            }   

            
        }

        //game done
        if(this.totalEnemy == this.totalEnemyDie){
            //cc.log("total Enemy : "+this.totalEnemy+ ", enemy DIe : "+this.totalEnemyDie);
            levelPlayer++;
            this.unschedule( this.movingEnemy );
            this.unscheduleUpdate();
            cc.log("done");
            this.callMessageBoard(1);
        }
        
        


    },

    callMessageBoard:function(flag){
        var that = this;
        var gameover = new cc.LayerColor( cc.color( 255, 255, 255, 180 ) );
        var size = cc.winSize;

        var messageBoard = new cc.Sprite.create(res.message_board_png);
        messageBoard.setAnchorPoint(cc.p(0.5,0.5));
        messageBoard.setPosition(cc.p(size.width/2,size.height/2));
        gameover.addChild( messageBoard, 5);

        //var flag = 1;
        if(flag == 1){
            //flag = 1 go to next level

            var titleLabel = new cc.LabelTTF( 'NEXT LEVEL', 'Aral', 26 );
            titleLabel.attr({
                x : size.width / 2,
                y : size.height / 2 + 60
            });
            gameover.addChild( titleLabel, 5);

            var messageLabel = new cc.LabelTTF( 'Congratulations, You have killed all of the slimes!', 'Aral', 18 );
            messageLabel.attr({
                x : size.width / 2,
                y : size.height / 2 +10
            });
            messageLabel.setColor(cc.color(0,0,0));
            gameover.addChild( messageLabel, 5);        

            var menuPlay   = new cc.MenuItemImage(res.play_button_normal_png,res.play_button_active_png,this.nextLevel);
            var menuLayer = new cc.Menu(menuPlay);
            menuLayer.setPosition(cc.p(size.width / 2 ,size.height / 2 - 35));
            gameover.addChild( menuLayer, 5);    

        }
        else if(flag == 2){            
            //pause the game
            var titleLabel = new cc.LabelTTF( 'PAUSE GAME', 'Aral', 26 );
            titleLabel.attr({
                x : size.width / 2,
                y : size.height / 2 + 60
            });
            gameover.addChild( titleLabel, 5);

            var messageLabel = new cc.LabelTTF( 'Pause Game, press play to continue', 'Aral', 18 );
            messageLabel.attr({
                x : size.width / 2,
                y : size.height / 2 +10
            });
            messageLabel.setColor(cc.color(0,0,0));
            gameover.addChild( messageLabel, 5);        

            var menuPlay   = new cc.MenuItemImage(res.play_button_normal_png,res.play_button_active_png,function(){
                that.isPause = 0;
                that.removeChildByTag(782);
                cc.director.resume();
            });
            var menuLayer = new cc.Menu(menuPlay);
            menuLayer.setPosition(cc.p(size.width / 2 ,size.height / 2 - 35));
            
            gameover.addChild( menuLayer, 5);    
            //gameOver.setTag(782);
            cc.director.pause();
        }
        else if(flag == 3){
            //flag = 3 Player KILL

            var titleLabel = new cc.LabelTTF( 'PLAYER KILLED', 'Aral', 26 );
            titleLabel.attr({
                x : size.width / 2,
                y : size.height / 2 + 60
            });
            gameover.addChild( titleLabel, 5);

            var messageLabel = new cc.LabelTTF( 'You were killed by the slimes!', 'Aral', 18 );
            messageLabel.attr({
                x : size.width / 2,
                y : size.height / 2 +10
            });
            messageLabel.setColor(cc.color(0,0,0));
            gameover.addChild( messageLabel, 5);        

            var menuPlay   = new cc.MenuItemImage(res.play_button_normal_png,res.play_button_active_png,this.nextLevel);
            var menuLayer = new cc.Menu(menuPlay);
            menuLayer.setPosition(cc.p(size.width / 2 ,size.height / 2 - 35));
            gameover.addChild( menuLayer, 5);    

        }
        else if(flag == 4){
            //flag = 4 GAME OVER

            var titleLabel = new cc.LabelTTF( 'CONGRATULATIONS', 'Aral', 26 );
            titleLabel.attr({
                x : size.width / 2,
                y : size.height / 2 + 60
            });
            gameover.addChild( titleLabel, 5);

            var messageLabel = new cc.LabelTTF( 'You have scored '+scorePlayer+' points! You are awesome!', 'Aral', 18 );
            messageLabel.attr({
                x : size.width / 2,
                y : size.height / 2 +10
            });
            messageLabel.setColor(cc.color(0,0,0));
            gameover.addChild( messageLabel, 5);        

            var menuPlay   = new cc.MenuItemImage(res.play_button_normal_png,res.play_button_active_png,this.mainMenu);
            var menuLayer = new cc.Menu(menuPlay);
            menuLayer.setPosition(cc.p(size.width / 2 ,size.height / 2 - 35));
            gameover.addChild( menuLayer, 5);    

        }

        
        gameover.setTag(782);
        this.addChild( gameover );

        
    },
    mainMenu:function(){
        cc.director.runScene(new MenuScene());
    },
    nextLevel:function(){
        cc.log('next level');
        cc.director.runScene(new PlayScene());
    },
    setMaxKoorXY : function(){
        var koorX = [];
        var koorY = [];
        var x = 0;
        for(var i = 0;i<this._enemy.length;i++){
            //validate if enemy already destroy!!
            if(this._enemy[i].visible){
                koorX[x] = this._enemy[i].x;
                koorY[x] = this._enemy[i].y;
                x++;    
            }
            
        }

        this._maxKoorX = Math.max.apply(Math, koorX); 
        this._maxKoorY = Math.max.apply(Math, koorY);
        this._minKoorX = Math.min.apply(Math, koorX);
        this._minKoorY = Math.min.apply(Math, koorY);
    },
    movingEnemy:function(){

        cc.log('moving enemy');
        //this._enemy[0].setPosition(10, 100);
        this.setMaxKoorXY();
        //cc.log('Max koor Z :'+this._maxKoorX);
        var lastPostX = 0;
        var lastPostY = 0;

        var setMoveLine = 0 ;

        if(enemyMovingGoTo == -1 ){
            //go to right
            if(this._minKoorX < minWidth){
                enemyMovingGoTo = 1;
                setMoveLine = 1;
                //this._enemy[i].y = this._enemy[i].y - 20;
            }
        }
        else{
            //go to right
            if(this._maxKoorX > maxWidth){
                enemyMovingGoTo = -1;
                setMoveLine = 1;
                //this._enemy[i].y = this._enemy[i].y - 20;
            }
        }


        // validate lost life if enemy already hit the plane
        if(this._minKoorY < minHeight){


            if(lifePlayer > 1){
                cc.log("koor Y "+ this._minKoorY + ", min height : "+ minHeight);
                lifePlayer--;
                this.unschedule( this.movingEnemy );
                this.unscheduleUpdate();
                this.callMessageBoard(3);    
            }
            else{
                this.unschedule( this.movingEnemy );
                this.unscheduleUpdate();
                this.callMessageBoard(4); 
                
            }
            

        }

        

        
        for(var i = 0;i<this._enemy.length;i++){
            lastPostX = this._enemy[i].x + (10 * enemyMovingGoTo);
            lastPostY = this._enemy[i].y - (20 * setMoveLine);
            //cc.log("pos x:"+lastPostX+", pos y :"+lastPostY);
            this._enemy[i].setPosition(lastPostX , lastPostY);;
        }
        setMoveLine = 0;
        //cc.log("pos x:"+lastPostX+", pos y :"+lastPostY);


    },
    setLabelScore:function(score){
        
        scorePlayer = scorePlayer + score;

        this.scoreLabel.setString('score:' + scorePlayer);
    },
    createEnemy:function(){
        //create enemy by level
        //levelPlayer
        //enemyBlue : 10,
        //scoreEnemyBlue:10,
        //enemyRed : 0,
        //scoreEnemyRed:20,
        //enemyGreen : 0,
        //scoreEnemyGreen:30,
        //speed : 2
        this._enemy = [];
        this.totalEnemy = 0;
        var tmpLevel = levelPlayer;
        var tmpTotalEnemy1 = level.enemies[tmpLevel-1].enemyBlue;
        var tmpScoreEnemy1 = level.enemies[tmpLevel-1].scoreEnemyBlue;
        var tmpLineEnemy1  = level.enemies[tmpLevel-1].lineEnemyBlue;

        var tmpTotalEnemy2 = level.enemies[tmpLevel-1].enemyRed;
        var tmpScoreEnemy2 = level.enemies[tmpLevel-1].scoreEnemyRed;
        var tmpLineEnemy2  = level.enemies[tmpLevel-1].lineEnemyRed;

        var tmpTotalEnemy3 = level.enemies[tmpLevel-1].enemyGreen;
        var tmpScoreEnemy3 = level.enemies[tmpLevel-1].scoreEnemyGreen;
        var tmpLineEnemy3  = level.enemies[tmpLevel-1].lineEnemyGreen;
        //cc.log("total enemy : "+tmpTotalEnemy1);

        this._scoreEnemy = [];

        var enemyX = startEnemyX;
        var enemyY = startEnemyY;

        var xx = 0;
        for(var totLineEnemy1 = tmpLineEnemy1-1 ; totLineEnemy1 >= 0 ; totLineEnemy1 -- ){

                var enemyX = startEnemyX;
                var enemyY = startEnemyY - ( (totLineEnemy1 + tmpLineEnemy2 + tmpLineEnemy3)  * 35 );

            for(var totEnemy1 = 0 ; totEnemy1 < tmpTotalEnemy1 ; totEnemy1++){
                //cc.log("print enemy : "+totEnemy1);
                enemyX = startEnemyX + (totEnemy1 * 45);
                //cc.log("x : "+enemyX);
                this.createEnemyBlue(enemyX,enemyY);

                //set score for each enemy
                this._scoreEnemy[xx] = tmpScoreEnemy1;
                this.totalEnemy++;
                xx++;

            }    
        }
        
        for(var totLineEnemy2 = tmpLineEnemy2-1 ; totLineEnemy2 >= 0 ; totLineEnemy2 -- ){

                var enemyX = startEnemyX;
                var enemyY = startEnemyY - ( ( totLineEnemy2 + tmpLineEnemy3)  * 35 );

            for(var totEnemy2 = 0 ; totEnemy2 < tmpTotalEnemy2 ; totEnemy2++){
                //cc.log("print enemy : "+totEnemy2);
                enemyX = startEnemyX + (totEnemy2 * 45);
                //cc.log("x : "+enemyX);
                this.createEnemyRed(enemyX,enemyY);
                //set score for each enemy
                this._scoreEnemy[xx] = tmpScoreEnemy2;
                this.totalEnemy++;
                xx++;
            }    
        }
        
        for(var totLineEnemy3 = tmpLineEnemy3-1 ; totLineEnemy3 >= 0 ; totLineEnemy3 -- ){

                var enemyX = startEnemyX;
                var enemyY = startEnemyY - (  totLineEnemy3  * 35 );

            for(var totEnemy3 = 0 ; totEnemy3 < tmpTotalEnemy3 ; totEnemy3++){
                //cc.log("print enemy : "+totEnemy3);
                enemyX = startEnemyX + (totEnemy3 * 45);
                //cc.log("x : "+enemyX);
                this.createEnemyGreen(enemyX,enemyY);
                //set score for each enemy
                this._scoreEnemy[xx] = tmpScoreEnemy3;
                this.totalEnemy++;
                xx++;
            }    
        }

        // end create enemy
    },

    create_player:function(){
        var size = cc.winSize;

        this.playerSprite = new cc.Sprite.create(res.player_png);
        this.playerSprite.setAnchorPoint(cc.p(0.5,0.5));
        

        this.playerSprite.setPosition(cc.p(size.width/2, 25));
        //sprite.setPosition(cc.p(100,100));
        //sprite.setContentSize(cc.size(500,500));
        this.addChild(this.playerSprite);
    },
    playerGoTo:function(key){

        var playerX = this.playerSprite.getPosition().x;
        var playerY = this.playerSprite.getPosition().y;
        
        if(key.toString() == "37"){
            //gotoright
            //collision x =25
            if(playerX > 25){
                playerX = playerX - 13;
                this.playerSprite.setPosition(cc.p(playerX, playerY));
                //cc.log("goto  right : "+playerX);    
            }
            

        }
        else if(key.toString() == "39"){
            //gotoright

            //collision x = 675 
            if(playerX < 675){
                playerX = playerX + 13;
                this.playerSprite.setPosition(cc.p(playerX, playerY));
                //cc.log("goto  left : "+playerX);    
            }
        }
        else if(key.toString() == "32"){
            this.createBullet();
        }
        else if(key.toString() == "27"){
            //pause the game
            //this.unschedule( this.movingEnemy );
            //this.unscheduleUpdate();

            if(this.isPause == 0 ){
                // pause the game
                cc.log("pause the game!!");
                this.callMessageBoard(2);
                this.isPause = 1;
            }
            else{
                cc.log("un PAUSE the game!!");
                this.isPause = 0;
                this.removeChildByTag(782);
                cc.director.resume();
                // unpause the game

            }

            
        }
    },
    createBullet:function(){
        //cc.log("create bullet");

        // each time shoot -10 score
        this.setLabelScore(- 10);


        var playerX = this.playerSprite.getPosition().x;
        var playerY = this.playerSprite.getPosition().y;

        var size = cc.winSize;
        var bullet = cc.Sprite.create(res.bullet_png);
        bullet.setPosition(cc.p(playerX,playerY+20));
        this.addChild(bullet);
        
        //runaction moving from plane to top
        var shootToTop = cc.MoveTo.create(1.5, cc.p( playerX, size.height ) );
        bullet.runAction( cc.Sequence.create(shootToTop,
            cc.CallFunc.create(function(node) {
                //cc.ArrayRemoveObject(this._bullet, node);
                //node.removeFromParent();
                bullet.visible = false;
                cc.log('destroy');
            }, this
            )
         ));

        this._bullet.push(bullet);

        //cc.log(this._bullet.length);

    },
    createEnemyBlue:function(enemyX,enemyY){
        
        this._enemy
        // add player
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.enemyBlue_plist);
        var spriteSheet = new cc.SpriteBatchNode(res.enemyBlue_png);
        this.addChild(spriteSheet);


        // init runningAction
        var animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "blue" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));


        var enemySprite = new cc.Sprite("#blue1.png");
        enemySprite.attr({
            x:enemyX, 
            y:enemyY,
            visible : true
        });
        enemySprite.runAction(this.runningAction);

        this._enemy.push(enemySprite);
        spriteSheet.addChild(enemySprite);
    },
    createEnemyRed:function(enemyX,enemyY){
        
        this._enemy
        // add player
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.enemyRed_plist);
        var spriteSheet = new cc.SpriteBatchNode(res.enemyRed_png);
        this.addChild(spriteSheet);


        // init runningAction
        var animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "red" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));


        var enemySprite = new cc.Sprite("#red1.png");
        enemySprite.attr({
            x:enemyX, 
            y:enemyY,
            visible : true
        });
        enemySprite.runAction(this.runningAction);

        this._enemy.push(enemySprite);
        spriteSheet.addChild(enemySprite);



    },
    createEnemyGreen:function(enemyX,enemyY){
        
        this._enemy
        // add player
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.enemyGreen_plist);
        var spriteSheet = new cc.SpriteBatchNode(res.enemyGreen_png);
        this.addChild(spriteSheet);


        // init runningAction
        var animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "green" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));


        var enemySprite = new cc.Sprite("#green1.png");
        enemySprite.attr({
            x:enemyX, 
            y:enemyY,
            visible : true
        });
        enemySprite.runAction(this.runningAction);

        this._enemy.push(enemySprite);
        spriteSheet.addChild(enemySprite);



    }
});


