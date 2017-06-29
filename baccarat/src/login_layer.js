var LoginLayer = cc.Layer.extend({
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
    _box1 : null,
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





        


        //var ebox = cc.EditBox.create(cc.size(170, 50), cc.Scale9Sprite.create(res.edit_box), cc.Scale9Sprite.create(res.edit_box));
        //ebox.setPlaceHolder("Password");
        //ebox.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        //ebox.setPosition(cc.p(winsize.width/2,winsize.height/2));
        //ebox.setFontColor({"r": 50, "g": 50, "b": 50});
        //ebox.setDelegate(this);
        //this.layer.addChild(ebox,1);







        var centerpos = cc.p(winSize.width/2 , winSize.height/2);
        //this.addChild(backgroundMenu);
        var spritebg = new cc.Sprite(res.bg_menu_png);
        spritebg.setPosition(centerpos);        
        this.addChild(spritebg);

        // Title Game
        var label = new cc.LabelTTF("Login","Aral");
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

        //this.backgroundUsername = new cc.LayerColor( cc.color( 255, 255, 255),150,30 );
        //this.backgroundUsername.attr({
        //    x : winSize.width/2-20 ,
        //    y : winSize.height-167
        //});
        //this.backgroundUsername.opacity = 255;
        //this.addChild(this.backgroundUsername);


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

        this.backgroundPassword = new cc.LayerColor( cc.color( 255, 255, 255),150,30 );
        this.backgroundPassword.attr({
            x : winSize.width/2-20 ,
            y : winSize.height-206
        });
        this.backgroundPassword.opacity = 255;
        this.addChild(this.backgroundPassword);


        // Create the textfield password
       
        this.textFieldPassword = new cc.EditBox(cc.size(170, 33), new cc.Scale9Sprite(res.white_txt_png), new cc.Scale9Sprite(res.orange_txt_png));
        this.textFieldPassword.setPlaceHolder("Password");
        this.textFieldPassword.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.textFieldPassword.x = this.size.width/2+64;
        this.textFieldPassword.y = this.size.height-192;
        this.textFieldPassword.setFontColor(cc.color(0, 0, 0));
        this.textFieldPassword.setDelegate(this);
        this.addChild(this.textFieldPassword);

        
        //button save

        var buttonSave = new ccui.Button();
        buttonSave.loadTextures(res.button_submit_png,res.button_submit_a_png);
        buttonSave.x = this.size.width/2-60;
        buttonSave.y = this.size.height-265;
        buttonSave.addTouchEventListener(this.touchEvent,this);
        this.addChild(buttonSave);

        var buttonBack = new ccui.Button();
        buttonBack.loadTextures(res.button_back_png,res.button_back_a_png);
        buttonBack.x = this.size.width/2+40;
        buttonBack.y = this.size.height-265;
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
            y : this.size.height/4+58
        });
        this.backgroundMessageError.opacity = 100;
        this.addChild(this.backgroundMessageError);

        this.textFieldMessageError = new cc.LabelTTF(message,"Aral",14,cc.size(400,30));
        
        this.textFieldMessageError.setPosition(335 ,this.size.height/4+65);
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
                else{
                    this.checkLogin(this.textFieldUsername.string,this.textFieldPassword.string);
                }

                //this.saveHighScore(textField.string,this.score);
                break;
        }


    },
    checkLogin : function(username, password){
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
                //dataPlayer = xmlhttp.responseText;

                var data = xmlhttp.responseText;
                //cc.log(xmlhttp.responseText);   
                var dataPlayer = JSON.parse(xmlhttp.responseText);

                //cc.log(dataPlayer[0].errorFlag);
                var returnVal = dataPlayer[0].errorFlag;


                // get card deck
                var cardDeck = {};
                for(var i =0; i< dataPlayer[0].data_card.length; i++ ){
                    cardDeck = {
                        id : dataPlayer[0].data_card[i].deck_card_id,
                        point : parseInt(dataPlayer[0].data_card[i].card_point),
                        cardName : dataPlayer[0].data_card[i].card_png,
                        cardNameID : dataPlayer[0].data_card[i].card_name_id
                    };
                    cardNew.card.push(cardDeck);

                }

                    if(returnVal == 0){
                        scope.flagError = 1;
                        scope.removeMessageError();
                        scope.setMessageError("Username Or Password wrong!");
                    }
                    else if(returnVal == 1){
                        scope.flagError = 1;
                        scope.removeMessageError();
                        //scope.setMessageError("Success to Login!");   
                        isLogin = 1;

                        scope.removeChild(this.textFieldUsername); 
                        scope.removeChild(this.textFieldPassword); 

                        cc.sys.localStorage.setItem(JSON.stringify("dataLogin"),data);
                        var value = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("dataLogin")));


                        //cc.director.runScene( new cc.TransitionPageTurn( 2, new MenuScene(), false ) );
                        cc.director.runScene(new MenuScene());
                    }
            }
        };
        xmlhttp.open("GET","src/database/login.php?username="+username+"&password="+password,true);
        xmlhttp.send();

        return returnVal;
    },
    onExit:function () {
         this._super();    
    },

});

