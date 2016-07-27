var PlayScene = cc.Scene.extend({
    onEnter : function(){
        this._super();
        var layer = new PlayLayer();
        this.addChild( layer );
    }
});