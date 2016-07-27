

var MenuLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
    },
    init:function(){
        //call super class's super function
        this._super();

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.background_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);

        //5.
        cc.MenuItemFont.setFontSize(60);

        //6.create a menu and assign onPlay event callback to it
        
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.start_menu_normal_png), // normal state image
            new cc.Sprite(res.start_menu_active_png), //select state image
            this.onPlay, this);


        var menuItemHighScore = new cc.MenuItemSprite(
            new cc.Sprite(res.highscore_menu_normal_png), // normal state image
            new cc.Sprite(res.highscore_menu_active_png), //select state image
            this.onHighScore, this);

        var menu = new cc.Menu(menuItemPlay,menuItemHighScore);  //7. create the menu
        menu.alignItemsVerticallyWithPadding(15);
        //menu.setPosition(centerpos);
        this.addChild(menu);
        this.getHighScore();


        
    },

    onPlay : function(){
        cc.log("==onplay clicked");
        cc.director.runScene( new cc.TransitionPageTurn( 1, new PlayScene(), false ) );

    },
    onHighScore : function(){
        cc.log("==onHighScore clicked");
        cc.director.runScene( new cc.TransitionPageTurn( 1, new HighScoreScene(), false ) );

    },
    getHighScore : function(){
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
                //var dataHighScore2 = JSON.parse(xmlhttp.responseText);
                cc.sys.localStorage.setItem(JSON.stringify("HighScore"),dataHighScore);
                var value = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("HighScore")));
                cc.log(value[0].name);

            }
        };
        xmlhttp.open("GET","src/src_database/getHighScore.php",true);
        xmlhttp.send();

        

    }

});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});
