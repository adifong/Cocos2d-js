



var AnimatedSprite = cc.Sprite.extend({
    animationSequence: null,
    ctor: function(spriteFilePath, frameRects, speed) {
        this._super();

        var texture = cc.TextureCache.getInstance().addImage(spriteFilePath);
        var frames = [];

        frameRects.forEach(function(frameRect) {
            var frame = cc.SpriteFrame.createWithTexture(texture, frameRect);
            frames.push(frame);
        });

        this.initWithSpriteFrame(frames[0]);

        var anim = cc.Animation.create(frames, speed);
        var action = cc.Animate.create(anim);

        this.animationSequence = cc.Sequence.create(action, cc.CallFunc.create());
    },
    playAnimation: function() {
        this.runAction(cc.RepeatForever.create(this.animationSequence));
    }
});


var playerSprite = cc.Sprite.extend({

    disappearAction : null,
    onTouchCallback : null,
    onEnter : function(){
        this._super();

        this.disappearAction = this.createDisapearAction();
        this.disappearAction.retain();// one additional reference
    },
    createDisapearAction: function(){
     // init runningAction
        var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "runner" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.2);
        var action = new cc.Animate( animation );
        //this.runningAction = new cc.RepeatForever(new cc.Animate(animation));

        return action;
    }


});

var SushiSprite = cc.Sprite.extend({
    disappearAction : null,
    onTouchCallback : null,
    setTouchCallback : function(cb){
        this.onTouchCallback = cb;
    },
    onEnter : function(){
        this._super();

        this.disappearAction = this.createDisapearAction();
        this.disappearAction.retain();//增加一次引用
    },
    createDisapearAction: function(){
        var frames = [];
        for( var i = 0; i < 11; i ++ ){
            var str = 'sushi_1n_' + i + '.png';
            var frame = cc.spriteFrameCache.getSpriteFrame( str );
            frames.push( frame );
        }

        var animation = new cc.Animation( frames, 0.02 );
        var action = new cc.Animate( animation );

        return action;
    }
});
/*
var SushiSprite = cc.Sprite.extend({
    disappearAction : null,
    onTouchCallback : null,
    setTouchCallback : function(cb){
        this.onTouchCallback = cb;
    },
    onEnter : function(){
        //cc.log('onEnter');
        this._super();

        this.addTouchEventListener();

        this.disappearAction = this.createDisapearAction();
        this.disappearAction.retain();//增加一次引用
    },

    onExit : function(){
        //cc.log('onExit');
        this.disappearAction.release();//解除引用
        this._super();
    },

    addTouchEventListener : function(){
        var scope = this;
        this.touchListener = cc.EventListener.create({
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches : true,
            onTouchBegan : function( touch, event ){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if( cc.rectContainsPoint( target.getBoundingBox(), pos ) ){

                    target.removeEventListener();
                    target.stopAllActions();

                    var ac = target.disappearAction;

                    var seqAc = new cc.Sequence( ac, new cc.CallFunc(function () {
                        target.removeFromParent();
                    }, target ) );

                    target.runAction( seqAc );

                    //在SushiSprite被点中后，`removeTouchEventListenser()`移除注册的touch事件避免被再次点击。`stopAllActions()`停止SUshiSprite正在播放的动作。`cc.Sequence`是按序列播放动作。`cc.CallFunc`是Cocos2d-JS中提供的动画播放结束的处理回调。上面的代码通过cc.Sequence创建了Sushi消失的动作序列，并在动作结束后从层上移除SushiSprite.

                    //分数
                    !! scope.onTouchCallback ? scope.onTouchCallback() : false;

                    return true;
                }
                return false;
            }

        });

        cc.eventManager.addListener( this.touchListener, this );
    },

    createDisapearAction : function(){
        var frames = [];
        for( var i = 0; i < 11; i ++ ){
            var str = 'sushi_1n_' + i + '.png';
            var frame = cc.spriteFrameCache.getSpriteFrame( str );
            frames.push( frame );
        }

        var animation = new cc.Animation( frames, 0.02 );
        var action = new cc.Animate( animation );

        return action;
    }

});

*/



var g_sharedGameLayer;

var PlayLayer = cc.Layer.extend({
    spriteSheet:null,
    bgSprite : null,
    sushiSprites : null,
    sushiSpritesAttr : [],
    totalSushi:0,
    playerRunningSprites : null,
    playerAttackSprites : null,
    scoreLabel : null,
    timeoutLabel : null,
    timeout : 60,
    score : 0,
    playerPosX : 0,
    playerPosY : 0,
    playerRunningVisible : true,
    playerAttackVisible : false,
    explosionAnimation:[],
    _explosions:null,
    ctor : function(){
        this._super();
        this.sushiSprites = [];
        this.playerPosX = 80;
        this.playerPosY = 270;

        var that = this;
        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.background_png);
        this.bgSprite.attr({
            x : size.width/2,
            y : size.height/2
        });
        this.addChild(this.bgSprite);


        this.create_player();
        this.create_attack_player();


        var updateRate = 3;

        // add sushi
        this.schedule( this.update, updateRate, 16*1024, 1 );
        
        try{
            cc.spriteFrameCache.addSpriteFrames( res.sushi_plist );
        }catch ( e ){
            console.log( e );
        }
        
        //score label
        this.scoreLabel = new cc.LabelTTF( 'score : 0', 'Arial', 30 );
        this.scoreLabel.attr({
            x : size.width - 120,
            y : size.height - 15
        });
        this.addChild( this.scoreLabel, 5 );

        //timeout label
        this.timeoutLabel = new cc.LabelTTF( 'Time : ' + this.timeout, 'Arial', 30 );
        this.timeoutLabel.attr({
            x : 70,
            y : size.height - 15
        });
        this.addChild( this.timeoutLabel, 5 );


        //add sprite blood
        MW.CONTAINER.EXPLOSIONS = [];
        cc.spriteFrameCache.addSpriteFrames(res.blood_plist);
        this._explosions = new cc.SpriteBatchNode(res.blood_png);
        this._explosions.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        this.addChild(this._explosions);
        Explosion.sharedExplosion();
        g_sharedGameLayer = this;
        Explosion.preSet();

        //end blood 


        //add event listener keyboar press
        //press key up 38
        //press key down 40
        if(cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event:cc.EventListener.KEYBOARD,

                onKeyPressed:function(key,event){
                    

                    that.playerGoTo(key);
                    cc.log("key press :"+key.toString());
                    
                }

            },this);
        }


        cc.audioEngine.setMusicVolume(0.25);
        cc.audioEngine.playMusic(res.background_sound,true);

        this.schedule( this.timer, 1, this.timeout, 1 );





        return true;



    },
    update : function(){
        //this.removeSushi();
        this.addSushi();
        //this.addPlayer();
    },
    addPlayer : function(){
        //var scopePlayer = this;
        //var newPlayer  = new playerSprite(res.runner_png);




        //this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
        //this.playerSprite.push( newPlayer );
        //newPlayer.attr({x:80, y:85});
        //this.addChild(newPlayer);
        //create runner through physic engine
        //this.sprite = new cc.PhysicsSprite("#runner0.png");
        //var contentSize = this.sprite.getContentSize();

        //this.sprite = new cc.Sprite("#runner0.png");
        //this.sprite.attr({x:80, y:85});
        //this.sprite.runAction(this.runningAction);
        //this.spriteSheet.addChild(this.sprite);
    },
    create_player :function(){
        // add player
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.runner_png);
        this.addChild(this.spriteSheet);


        // init runningAction
        var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "Runner" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));


        this.playerRunningSprites = new cc.Sprite("#Runner0.png");
        this.playerRunningSprites.attr({
            x:this.playerPosX, 
            y:this.playerPosY,
            visible : this.playerRunningVisible
        });
        this.playerRunningSprites.runAction(this.runningAction);
      //  playerRunningVisible : true,
    //playerAttackVisible : false,
        this.spriteSheet.addChild(this.playerRunningSprites);

    },
    create_attack_player:function(){
        
        // add player
        // create sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.attack_plist);
        this.spriteSheet = new cc.SpriteBatchNode(res.attack_png);
        this.addChild(this.spriteSheet);


        // init runningAction
        var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "Attack" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        this.runningAction = new cc.RepeatForever(new cc.Animate(animation));


        this.playerAttackSprites = new cc.Sprite("#Attack0.png");
        this.playerAttackSprites.attr({
            x:this.playerPosX, 
            y:this.playerPosY,
            visible:this.playerAttackVisible
        });
        this.playerAttackSprites.runAction(this.runningAction);
        this.spriteSheet.addChild(this.playerAttackSprites);
        
    },
    playerGoTo : function(key){

        this.playerPosX = 80;
        if(key.toString() == "38"){
            //key up
            if(this.playerPosY == 570){
                this.playerPosY = 570;        
            }
            else{
                this.playerPosY = this.playerPosY + 100;    
                var sprite_action = cc.JumpTo.create(0.2,cc.p(this.playerPosX,this.playerPosY),50,1);
                this.playerRunningSprites.runAction(sprite_action);
                this.playerAttackSprites.setPosition(cc.p(this.playerPosX,this.playerPosY));
                
                //this.playerAttackSprites.runAction(sprite_action);
                //this.playerSprites.runAction(cc.sequence(cc.delayTime(0.2), sprite_action));
            }
            
            
        }
        else if(key.toString() == "40"){
            //key down

            if(this.playerPosY == 70){
                this.playerPosY = 70;        
            }
            else{
                this.playerPosY = this.playerPosY - 100;    
                var sprite_action = cc.JumpTo.create(0.2,cc.p(this.playerPosX,this.playerPosY),50,1);
                this.playerRunningSprites.runAction(sprite_action);
                this.playerAttackSprites.setPosition(cc.p(this.playerPosX,this.playerPosY));
                //this.playerAttackSprites.runAction(sprite_action);
                //this.playerSprites.runAction(cc.sequence(cc.delayTime(0.2), sprite_action));
            } 
        }
        else if(key.toString() == "32")
        {

            var tempPlayerRunningVisible = this.playerRunningVisible;
            var tempPlayerAttackVisible = this.playerAttackVisible;
            if(this.playerRunningVisible == true){
                this.playerRunningVisible = false;
                this.playerAttackVisible = true;
            }
            else{
                this.playerRunningVisible = true;   
                this.playerAttackVisible = false;
            }
            //key space
            //this.spriteSheet.removeChild(this.playerSprites);
            this.playerRunningSprites.visible = this.playerRunningVisible;
            this.playerAttackSprites.visible = this.playerAttackVisible;

            var makeVisible = cc.callFunc(function (t) {
                this.playerAttackVisible = false;
                this.playerAttackSprites.visible = false;
                cc.log("call this");
            }.bind(this));

            var makeVisible1 = cc.callFunc(function (t) {
                this.playerRunningVisible = true;
                this.playerRunningSprites.visible = true;
                cc.log("call this2");
            }.bind(this));

            this.playerAttackSprites.runAction(cc.sequence(cc.delayTime(0.8), makeVisible));
            this.playerRunningSprites.runAction(cc.sequence(cc.delayTime(0.8), makeVisible1));
            //this.create_attack_player();
            //this.spriteSheet.removeChild(this.playerSprites);
            //this.create_player();
            this.getHitSushi(this.playerPosY);
            
            // play effect sound
            cc.audioEngine.playEffect(res.slash_sword_sound);

        }
        
    },
    addSushi : function(){

        var scope = this;
        var sushi = new SushiSprite( res.sushi_1n_png );
        sushi.setTouchCallback(function(){
            scope.addScore();
        });
        var size = cc.winSize;
        //set from right to left
        // set random from 0 - 5
        // set movement 1 box = 100 + (70)
        var y = ((Math.floor(Math.random() * (5- 0 + 1) + 0))* 100)+50;
        sushi.attr({
            x : size.width - 50,
            y : y
        });
        var dropAction = cc.MoveTo.create(10, cc.p( -size.width-100, y ) );
        sushi.runAction( dropAction );
        this.sushiSprites.push( sushi );
        this.addChild( sushi,5 );


        this.sushiSpritesAttr[this.totalSushi] = {
            active:1,
            score : 0,
            x : 0,
            y : 0 ,
            isHit : 0

        };
        
        this.totalSushi++;

    },

    addScore : function(){
        this.score += 1;
        this.scoreLabel.setString('score: ' + this.score);
    },

    removeSushi : function(){
        for( var i = 0; i < this.sushiSprites.length; i ++ ){
            if( 0 >= this.sushiSprites[i].x ){
                this.sushiSprites[ i].removeFromParent();
                this.sushiSprites[ i ] = undefined;
                this.sushiSprites.splice( i, 1 );
                i = i -1;
            }
        }
    },

    getHitSushi : function(playerPosY){


        if(playerPosY > 70)
            var PlayerLineY = (playerPosY - 70)/100;
        else
            var PlayerLineY = 0; 

        var SushiLineY = 1;
        var total = this.sushiSprites.length;

        var blinks = cc.blink(0.5, 2);

        var sushiX = 0;
        for(var i= total-1 ; i>= 0 ; i--){

            

            if(this.sushiSprites[i].y > 50)
                SushiLineY = (this.sushiSprites[i].y - 50)/ 100;
            else
                SushiLineY = 0;


            if(this.sushiSpritesAttr[i].active == 1 && PlayerLineY == SushiLineY &&  this.sushiSprites[i].x <=300 ){
                this.sushiSpritesAttr[i].active = 0;

                this.sushiSpritesAttr[i] = {
                    active: 0,
                    score : 1,
                    x : this.sushiSprites[i].x,
                    y : SushiLineY ,
                    isHit : 1

                };

                var a = Explosion.getOrCreateExplosion();
               // a.attr({
                //   x : 300,
                //    y : 300
                //});
                a.attr({
                   x : this.sushiSprites[i].x-20,
                    y : (SushiLineY*100)+70
                });

                cc.log(this.sushiSprites[i].x+" , "+SushiLineY);
                this.addScore(); 


                var makeVisiblesushi = cc.callFunc(function (t) {
                    this.sushiSprites[i].visible = false;
                }.bind(this));


                //this.runAction(cc.sequence(cc.delayTime(0.5), blinks, makeBeAttack));
                this.sushiSprites[i].runAction(cc.sequence(cc.delayTime(0.1),blinks, makeVisiblesushi));
                cc.log("x : "+this.sushiSpritesAttr[i].x+", y :" + this.sushiSpritesAttr[i].y +", active : "+this.sushiSpritesAttr[i].active);
            }
            //cc.log("x : "+this.sushiSprites[i].x+" , y : "+SushiLineY+" , i : "+i+" status : "+this.sushiSpritesAttr[i].active+" , line Y :"+PlayerLineY);
            if(this.sushiSpritesAttr[i].active == 0)
                break;

        }

        /*
        for( var i = 0; i < this.sushiSprites.length; i ++ ){

            if(this.sushiSprites[i].y > 50)
                SushiLineY = (this.sushiSprites[i].y - 50)/ 100;
            else
                SushiLineY = 1;
            if(this.sushiSpritesAttr[i].active == 1 ){

                //this.sushiSpritesAttr[i].active = 0;
            }
            else{

            }   
            cc.log("x : "+this.sushiSprites[i].x+" , y : "+SushiLineY+" , i : "+i+" status : "+this.sushiSpritesAttr[i].active+" , line Y :"+PlayerLineY);


        }
        */
    },

    timer : function(){

        var flagNewHighscore = 1;

        if( this.timeout == 0 ){

            this.playerRunningSprites.visible = false;

            //stop music
            cc.audioEngine.stopMusic();


            if(flagNewHighscore == 0){
                var gameover = new cc.LayerColor( cc.color( 255, 255, 255, 100 ) );
                var size = cc.winSize;
                var titleLabel = new cc.LabelTTF( 'Game Over', 'Aral', 38 );
                titleLabel.attr({
                    x : size.width / 2,
                    y : size.height - 100
                });
                gameover.addChild( titleLabel, 5);

                var titleTotalScore  = new cc.LabelTTF( 'Your Score : '+this.score, 'Aral', 24 );
                titleTotalScore.attr({
                    x : size.width / 2 ,
                    y : size.height - 150
                });
                gameover.addChild( titleTotalScore, 5);
            }
            else{
                var gameover = new cc.LayerColor( cc.color( 255, 255, 255, 100 ) );
                var size = cc.winSize;
                var titleLabel = new cc.LabelTTF( 'CONGRATULATIONS !', 'Aral', 38 );
                titleLabel.attr({
                    x : size.width / 2,
                    y : size.height - 100
                });
                gameover.addChild( titleLabel, 5);

                var titleTotalScore  = new cc.LabelTTF( 'New HighScore : '+this.score, 'Aral', 24 );
                titleTotalScore.attr({
                    x : size.width / 2 ,
                    y : size.height - 150
                });
                gameover.addChild( titleTotalScore, 5);
            }

             // textbox
                textField = new ccui.TextField();
                textField.setTouchEnabled(true);
                textField.fontName = "Marker Felt";

                textField.placeHolder = "Write Your Name";
                textField.setPlaceHolderColor (cc.color(0,0,153));
                textField.setTextColor(cc.color(255,0,0));
                textField.fontSize = 30;
                textField.x = size.width/2;
                textField.y = size.height-200;
                textField.addEventListener(this.textFieldEvent,this);

                //textField.setMaxLengthEnabled(true);
                //textField.setMaxLength(12);
                gameover.addChild( textField );
            //end textbox

            //button save

                var buttonSave = new ccui.Button();
                buttonSave.loadTextures(res.save_normal_png,res.save_active_png);
                buttonSave.x = size.width/2;
                buttonSave.y = size.height-270;
                buttonSave.addTouchEventListener(this.touchEvent,this);
                gameover.addChild(buttonSave);
                

            // end button save



            var tryAgainItem = new cc.MenuItemFont(
                'Try Again',
                function(){
                    var transition = new cc.TransitionFade( 1, new PlayScene(), cc.color( 255, 255, 255, 255 ) );
                    cc.director.runScene( transition );
                },
                this
            );

            tryAgainItem.attr({
                x : size.width -100,
                y : 150,
                anchorX : 0.5,
                anchorY : 0.5,
                fontSize : 25
            });

            var mainMenuItem = new cc.MenuItemFont(
                'Main Menu',
                function(){
                    var transition = new cc.TransitionFade( 1, new MenuScene(), cc.color( 255, 255, 255, 255 ) );
                    cc.director.runScene( transition );
                },
                this
            );

            mainMenuItem.attr({
                x : size.width -100,
                y : 115,
                anchorX : 0.5,
                anchorY : 0.5,
                fontSize : 25,

            });

            var menu = new cc.Menu( tryAgainItem,mainMenuItem );
            menu.x = 0;
            menu.y = 0;
            menu.setColor(cc.color(0,0,0));
            gameover.addChild( menu, 1 );



           

            this.getParent().addChild( gameover );
            
            this.unschedule( this.update );
            this.unschedule( this.timer );

            return;
        }

        this.timeout --;
        this.timeoutLabel.setString( 'Time : ' + this.timeout );

    },
    textFieldEvent:function(sender,type){
        switch(type){
            case ccui.TextField.EVENT_ATTACH_WITH_INE:
                cc.log("active");
                break;
            case ccui.TextField.EVENT_DETACH_WITH_INE:
                cc.log("de active");
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                cc.log("insert character");
                cc.log(textField.string);
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                cc.log("delete character");
                cc.log(textField.string);
                break;
        }
    },
    touchEvent : function(sender,type){

        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Touch Down");
                this.saveHighScore(textField.string,this.score);
                break;
        }

        /*
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("Touch Down");
                break;

            case ccui.Widget.TOUCH_MOVED:
                cc.log("Touch moved");
                break;

            case ccui.Widget.TOUCH_ENDED:
                cc.log("Touch ended");
                break;

            case ccui.Widget.TOUCH_CANCEL:
                cc.log("Touch cancel");
                break;
        }
        */
        //alert(1);

    },
    saveHighScore : function(highScoreName,score){

        cc.log(highScoreName+" :"+score);

        
        var dataHighScore ;
        // get data from database

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
                dataHighScore = xmlhttp.responseText;
                //cc.log(xmlhttp.responseText);   
                var dataHighScore2 = JSON.parse(xmlhttp.responseText);
                //cc.sys.localStorage.setItem(JSON.stringify("HighScore"),dataHighScore);
                //var value = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("HighScore")));
                cc.log(dataHighScore2[0].message);
                var message_success = dataHighScore2[0].message;

                if(message_success == "success"){
                    cc.sys.localStorage.setItem(JSON.stringify("HighScore"),dataHighScore);
                    var value = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("HighScore")));
                    cc.director.runScene( new cc.TransitionPageTurn( 1, new HighScoreScene(), false ) );
                }



                //this.getHighScore();
                

            }
        };
        xmlhttp.open("GET","src/src_database/saveHighScore.php?nama="+highScoreName+"&score="+score,true);
        xmlhttp.send();
    },
    addExplosions:function(explosion){
        this._explosions.addChild(explosion);
    }


});




/*
var PlayLayer = cc.Layer.extend({
    bgSprite : null,
    sushiSprites : null,
    scoreLabel : null,
    timeoutLabel : null,
    timeout : 60,
    score : 0,

    ctor : function(){
        this._super();
        this.sushiSprites = [];

        var size = cc.winSize;

        this.bgSprite = new cc.Sprite( res.background_png );
        this.bgSprite.attr({
            x : size.width / 2,
            y : size.height / 2
        });

        this.addChild( this.bgSprite, 0 );

        this.schedule( this.update, 1, 16*1024, 1 );

        //加载帧图片到缓存
        try{
            cc.spriteFrameCache.addSpriteFrames( res.sushi_plist );
        }catch ( e ){
            console.log( e );
        }

        //score label
        this.scoreLabel = new cc.LabelTTF( 'score:0', 'Arial', 30 );
        this.scoreLabel.attr({
            x : size.width / 2 + 100,
            y : size.height - 20
        });
        this.addChild( this.scoreLabel, 5 );

        //timeout label
        this.timeoutLabel = new cc.LabelTTF( '' + this.timeout, 'Arial', 30 );
        this.timeoutLabel.attr({
            x : 20,
            y : size.height - 20
        });
        this.addChild( this.timeoutLabel, 5 );

        //定时
        this.schedule( this.timer, 1, this.timeout, 1 );

        return true;
    },

    update : function(){
        this.removeSushi();
        this.addSushi();
    },

    addSushi : function(){

        var scope = this;
        var sushi = new SushiSprite( res.sushi_1n_png );
        sushi.setTouchCallback(function(){
            scope.addScore();
        });
        var size = cc.winSize;

        var x = sushi.width / 2 + size.width / 2 * cc.random0To1();
        sushi.attr({
            x : x,
            y : size.height - 30
        });

        var dropAction = cc.MoveTo.create( 4, cc.p( sushi.x, -300 ) );
        sushi.runAction( dropAction );

        this.sushiSprites.push( sushi );
        this.addChild( sushi, 5 );
    },

    removeSushi : function(){
        for( var i = 0; i < this.sushiSprites.length; i ++ ){
            if( 0 >= this.sushiSprites[i].y ){
                this.sushiSprites[ i].removeFromParent();
                this.sushiSprites[ i ] = undefined;
                this.sushiSprites.splice( i, 1 );
                i = i -1;
            }
        }
    },

    addScore : function(){
        this.score += 1;
        this.scoreLabel.setString('score:' + this.score);
    },

    timer : function(){

        if( this.timeout == 0 ){

            var gameover = new cc.LayerColor( cc.color( 255, 255, 255, 100 ) );
            var size = cc.winSize;
            var titleLabel = new cc.LabelTTF( 'Game Over', 'Aral', 38 );
            titleLabel.attr({
                x : size.width / 2,
                y : size.height / 2
            });
            gameover.addChild( titleLabel, 5);

            var tryAgainItem = new cc.MenuItemFont(
                'Try Again',
                function(){
                    var transition = new cc.TransitionFade( 1, new PlayScene(), cc.color( 255, 255, 255, 255 ) );
                    cc.director.runScene( transition );
                },
                this
            );

            tryAgainItem.attr({
                x : size.width / 2,
                y : size.height / 2 - 60,
                anchorX : 0.5,
                anchorY : 0.5
            });

            var menu = new cc.Menu( tryAgainItem );
            menu.x = 0;
            menu.y = 0;
            gameover.addChild( menu, 1 );
            this.getParent().addChild( gameover );

            this.unschedule( this.update );
            this.unschedule( this.timer );

            return;
        }

        this.timeout --;
        this.timeoutLabel.setString( '' + this.timeout );

    }
});
*/