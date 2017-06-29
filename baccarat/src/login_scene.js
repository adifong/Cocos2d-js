var LoginScene = cc.Scene.extend({
    onEnter : function(){
        this._super();
      	var layer = new LoginLayer();
        this.addChild( layer );
    }
});