var MenuLayer = cc.Layer.extend({
    backgroundUsername : null,
    labelUsername : null,
    labelBalance : null,
    buttonLogOut : null,
    localStoreData : null,
    ctor : function(){
        this._super();

    },
    init : function(){
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.menu_button_plist, res.menu_button_png); 
        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width/2 , winsize.height/2);

        //this.addChild(backgroundMenu);
        var spritebg = new cc.Sprite(res.bg_menu_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);


        // Title Game
        var label = new cc.LabelTTF("Baccarat","Aral");
        label.setFontSize(40);
        label.setPosition(cc.p(winsize.width/2,winsize.height-50));
        label.setColor(cc.color(255,255,255));
        this.addChild(label);

        var showMenu = 0;

        if(isLogin == 1){
            //login data
            this.localStoreData = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("dataLogin")));
            if(this.localStoreData.length > 0 ){
                cc.log("xxxlogin!!!!!");    
                showMenu = 1;
            }
        }

        if(showMenu == 0 ){
            // show menu login & register
            var menuLogin   = new cc.MenuItemImage("#login.png","#login_active.png",login);
            var menuRegister   = new cc.MenuItemImage("#register.png","#register_active.png",register);
            var menu = new cc.Menu(menuLogin,menuRegister);

            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu);
        }
        else{

            // show menu play & profile
            var menuPlay   = new cc.MenuItemImage("#play.png","#play_active.png",play);
            var menu = new cc.Menu(menuPlay);

            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu);

            // show username & current balance
            this.setLabelUsername(this.localStoreData[0].username, this.localStoreData[0].balance);
            playerBalance = this.localStoreData[0].balance;
            

            //declare min max balance
            minBet = this.localStoreData[0].betting_min;
            maxBet = this.localStoreData[0].betting_max;
            MaxbetToPlayer = this.localStoreData[0].player_max;
            MaxbetToBanker = this.localStoreData[0].banker_max;
            MaxbetToTie = this.localStoreData[0].tie_max;
            MaxbetToSmall = this.localStoreData[0].small_max;
            MaxbetToBig = this.localStoreData[0].big_max;
            MaxbetToPlayerPair = this.localStoreData[0].player_pair_max;
            MaxbetToPerfectPair = this.localStoreData[0].perfect_pair_max;
            MaxbetToBankerPair = this.localStoreData[0].either_pair_max;
            MaxbetToEitherPair = this.localStoreData[0].banker_pair_max;

        }




    },
    logOut:function(){


        var login_id = this.localStoreData[0].login_id;
        var balance = this.localStoreData[0].balance;

        cc.log("logout!!");

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
                cc.log(xmlhttp.responseText);   
                var dataPlayer = JSON.parse(xmlhttp.responseText);

                cc.log(dataPlayer[0].errorFlag);
                var returnVal = dataPlayer[0].errorFlag;

                if(returnVal == 1){
                    scope.flagError = 1;  
                    isLogin = 0;
                    cc.director.runScene(new MenuScene());
                }
            }
        };
        xmlhttp.open("GET","src/database/logout.php?login_id="+login_id+"&balance="+balance,true);
        xmlhttp.send();

        return returnVal;



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
    setLabelUsername:function(name, balance){

        //textFieldMessageError
        //backgroundMessageError
        var winsize = cc.director.getWinSize();

        this.backgroundUsername = new cc.LayerColor( cc.color( 131, 139, 131),150,80 );
        this.backgroundUsername.attr({
            x : winsize.width -150,
            y : winsize.height-80
        });
        this.backgroundUsername.opacity = 100;
        this.addChild(this.backgroundUsername);

        this.labelUsername = new cc.LabelTTF("Hi "+name+" !","Aral",14,cc.size(150,15));
        this.labelUsername.setPosition(winsize.width-55 ,winsize.height-13);
        this.labelUsername.setColor(cc.color(255,255,255));
        this.addChild(this.labelUsername);

        this.labelBalance = new cc.LabelTTF("Balance : "+balance,"Aral",14,cc.size(150,15));
        this.labelBalance.setPosition(winsize.width-55 ,winsize.height-32);
        this.labelBalance.setColor(cc.color(255,255,255));
        this.addChild(this.labelBalance);


        //button logout
        var buttonLogout = new ccui.Button();
        buttonLogout.loadTextures(res.button_logout_png,res.button_logout_a_png);
        buttonLogout.x = winsize.width-80;
        buttonLogout.y = winsize.height-60;
        buttonLogout.addTouchEventListener(this.touchLogout,this);
        this.addChild(buttonLogout);


    }

});



var play = function(){

    cc.log("start Game");
    cc.director.runScene(new PlayScene());
}

var login = function(){
    cc.log("run login layer");
    cc.director.runScene(new LoginScene());
}


var register = function(){
    cc.log("run login layer");
    cc.director.runScene(new RegisterScene());
}




var MenuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});