var RegisterScene = cc.Scene.extend({
    onEnter : function(){
        this._super();
        var layer = new RegisterLayer();
        this.addChild( layer );
    }
});