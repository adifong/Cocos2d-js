var MenuLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
    },
    init : function(){
        this._super();
        levelPlayer = 1;
        lifePlayer =3;
        scorePlayer = 0;

        var winsize = cc.director.getWinSize();
        
        var centerpos = cc.p(winsize.width/2 , winsize.height/2);

        //sprite for background image
        var backgroundMenu = new cc.LayerColor( cc.color( 100, 100, 255) );

        this.addChild(backgroundMenu);
        //var spritebg = new cc.Sprite(res.menu_bg_png);
        //spritebg.setPosition(centerpos);
        //this.addChild(spritebg);


        // Title Game
        var label = new cc.LabelTTF("Front Invaders","Arial");
        label.setFontSize(30);
        label.setPosition(cc.p(winsize.width/2,winsize.height-50));
        label.setColor(cc.color(140,100,60));
        this.addChild(label);

        var menuStart   = new cc.MenuItemImage(res.start_menu_normal_png,res.start_menu_active_png,startGameFunction);
        var menuHow   = new cc.MenuItemImage(res.how_menu_normal_png,res.how_menu_active_png,startGameFunction);
        var menuAbout     = new cc.MenuItemImage(res.about_normal_png,res.about_active_png,startGameFunction);
        var menu = new cc.Menu(menuStart,menuHow,menuAbout);

        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu);
        

         cc.MenuItemFont.setFontSize(60);
        
    }

});


var startGameFunction = function(){

    cc.log("start Game");
    cc.director.runScene(new PlayScene());
}


var MenuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});