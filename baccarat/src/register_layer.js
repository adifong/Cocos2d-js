var RegisterLayer = cc.Layer.extend({
    sprite:null,
    size:null,
    textFieldUserName:null,
    textErorrConnectedField:null, 
    enterWorldScene:null,
    textField:null,
    textFieldUsername:null,
    textFieldPassword:null,
    textFieldPasswordConfirm : null,
    textFieldMessageError : null,
    backgroundUsername: null,
    backgroundPassword: null,
    backgroundPasswordConfirm: null,
    backgroundMessageError : null,
    flagError : 0,
    ctor : function(){
        this._super();
        cc.log("login layer");
        this.size = cc.winSize; 
        return true;
    },
    onEnter:function () {
        //----start2----onEnter
        this._super();         
        var winSize = cc.director.getWinSize();

        var centerpos = cc.p(winSize.width/2 , winSize.height/2);
        //this.addChild(backgroundMenu);
        var spritebg = new cc.Sprite(res.bg_menu_png);
        spritebg.setPosition(centerpos);        
        this.addChild(spritebg);

        // Title Game
        var label = new cc.LabelTTF("Register","Aral");
        label.setFontSize(40);
        label.setPosition(cc.p(winSize.width/2,winSize.height-100));
        label.setColor(cc.color(0,0,0));
        this.addChild(label);

        // username Label
        var label = new cc.LabelTTF("Username : ","Aral");
        label.setFontSize(25);
        label.setPosition(cc.p(winSize.width/2 - 80,winSize.height-150));
        label.setColor(cc.color(0,0,0));
        this.addChild(label);


        // Create the textfield username
       
        
        this.textFieldUsername = new cc.EditBox(cc.size(170, 33), new cc.Scale9Sprite(res.white_txt_png), new cc.Scale9Sprite(res.orange_txt_png));
        this.textFieldUsername.setPlaceHolder("Username");
        //this.textFieldUsername.setPlaceholderFontColor(cc.color(255, 255, 255));
        this.textFieldUsername.x = this.size.width/2+64;
        this.textFieldUsername.y = this.size.height-150;
        this.textFieldUsername.setFontColor(cc.color(0, 0, 0));
        this.textFieldUsername.setDelegate(this);
        this.addChild(this.textFieldUsername);



        // password Label
        var label = new cc.LabelTTF("Password : ","Aral");
        label.setFontSize(25);
        label.setPosition(cc.p(winSize.width/2 - 77,winSize.height-190));
        label.setColor(cc.color(0,0,0));
        this.addChild(label);


        // Create the textfield username
        this.textFieldPassword = new cc.EditBox(cc.size(170, 33), new cc.Scale9Sprite(res.white_txt_png), new cc.Scale9Sprite(res.orange_txt_png));
        this.textFieldPassword.setPlaceHolder("Password");
        this.textFieldPassword.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.textFieldPassword.x = this.size.width/2+64;
        this.textFieldPassword.y = this.size.height-192;
        this.textFieldPassword.setFontColor(cc.color(0, 0, 0));
        this.textFieldPassword.setDelegate(this);
        this.addChild(this.textFieldPassword);




        //xxxx
        // password confirm Label
        var label = new cc.LabelTTF("Confirm Password : ","Aral");
        label.setFontSize(25);
        label.setPosition(cc.p(winSize.width/2 - 122,winSize.height-228));
        label.setColor(cc.color(0,0,0));
        this.addChild(label);


        // Create the textfield username
        

        this.textFieldPasswordConfirm = new cc.EditBox(cc.size(170, 33), new cc.Scale9Sprite(res.white_txt_png), new cc.Scale9Sprite(res.orange_txt_png));
        this.textFieldPasswordConfirm.setPlaceHolder("Confirm Password");
        this.textFieldPasswordConfirm.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.textFieldPasswordConfirm.x = this.size.width/2+64;
        this.textFieldPasswordConfirm.y = this.size.height-230;
        this.textFieldPasswordConfirm.setFontColor(cc.color(0, 0, 0));
        this.textFieldPasswordConfirm.setDelegate(this);
        this.addChild(this.textFieldPasswordConfirm);
        
        
        
        //button save

        var buttonSave = new ccui.Button();
        buttonSave.loadTextures(res.button_submit_png,res.button_submit_a_png);
        buttonSave.x = this.size.width/2-60;
        buttonSave.y = this.size.height-300;
        buttonSave.addTouchEventListener(this.touchEvent,this);
        this.addChild(buttonSave);

        var buttonBack = new ccui.Button();
        buttonBack.loadTextures(res.button_back_png,res.button_back_a_png);
        buttonBack.x = this.size.width/2+40;
        buttonBack.y = this.size.height-300;
        buttonBack.addTouchEventListener(this.backToMenu,this);
        this.addChild(buttonBack);
        
        
        
    },
    backToMenu:function(sender,type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                 cc.log("back to menu");
                cc.director.runScene(new MenuScene());
                break;
        }

    },
    setMessageError:function(message){
        //textFieldMessageError
        //backgroundMessageError

        this.backgroundMessageError = new cc.LayerColor( cc.color( 131, 139, 131),400,30 );
        this.backgroundMessageError.attr({
            x : 130 ,
            y : this.size.height/4+19
        });
        this.backgroundMessageError.opacity = 100;
        this.addChild(this.backgroundMessageError);

        this.textFieldMessageError = new cc.LabelTTF(message,"Aral",14,cc.size(400,30));
        
        this.textFieldMessageError.setPosition(335 ,this.size.height/4+25);
        this.textFieldMessageError.setColor(cc.color(255,255,255));
        this.addChild(this.textFieldMessageError);

    },
    removeMessageError:function(){
        
        if(this.flagError == 1){
            this.removeChild(this.textFieldMessageError); 
            this.removeChild(this.backgroundMessageError); 
            this.backgroundMessageError = null;
            this.textFieldMessageError = null;  
            this.flagError = 0;  
        }

    },
    touchEvent : function(sender,type){

        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                this.removeMessageError();
                cc.log("Touch Down");

                if(this.textFieldUsername.string == "" )
                {
                    this.flagError = 1;
                    cc.log("Username must be Filled!!!");
                    this.setMessageError("Username must be Filled!");
                    
                }
                else if(this.textFieldPassword.string == "" ){
                    this.flagError = 1;
                    cc.log("password must be Filled!!!");
                    this.setMessageError("password must be Filled!");
                }
                else if(this.textFieldPasswordConfirm.string == ""){
                    this.flagError = 1;
                    cc.log("password must be Filled!!!");
                    this.setMessageError("password must be Filled!");
                }
                else if(this.textFieldPassword.string != this.textFieldPasswordConfirm.string){
                    this.flagError = 1;
                    cc.log("password must match with confirm password!!");
                    this.setMessageError("Your password and confirmation password do not match!");
                }
                else{
                    
                    this.createUsername(this.textFieldUsername.string,this.textFieldPassword.string);
                    
                }

                //this.saveHighScore(textField.string,this.score);
                break;
        }


    },
    createUsername : function(username, password){
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

                //store value database
                //dataHighScore = xmlhttp.responseText;
                //cc.log(xmlhttp.responseText);   
                //var dataHighScore2 = JSON.parse(xmlhttp.responseText);
                //cc.sys.localStorage.setItem(JSON.stringify("HighScore"),dataHighScore);
                //var value = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("HighScore")));
                //cc.log(dataHighScore2[0].message);
                //var message_success = dataHighScore2[0].message;

                //if(message_success == "success"){
                 //   cc.sys.localStorage.setItem(JSON.stringify("HighScore"),dataHighScore);
                 //   var value = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("HighScore")));
                 //   cc.director.runScene( new cc.TransitionPageTurn( 1, new HighScoreScene(), false ) );
               // }
                //this.getHighScore();

                //cc.log(xmlhttp.responseText);
                returnVal = xmlhttp.responseText;
                cc.log("cek 1 : "+returnVal);
                cc.log("cek 2 : "+xmlhttp.responseText);

                    if(returnVal == 0){
                        scope.flagError = 1;
                        scope.removeMessageError();
                        scope.setMessageError("Username already in database!");
                    }
                    else if(returnVal == 1){
                        scope.flagError = 1;
                        scope.removeMessageError();
                        scope.setMessageError("Success to register, press back to main menu!");   
                    }
                    else if(returnVal == 2){
                        scope.flagError = 1;
                        scope.removeMessageError();
                        scope.setMessageError("Failed connection... please try again later");   
                    }
            }
        };
        xmlhttp.open("GET","src/database/register.php?username="+username+"&password="+password,true);
        xmlhttp.send();

        return returnVal;
    },
    onExit:function () {
         this._super();    
    },

});

