var HighScoreScene = cc.Scene.extend({
    onEnter : function(){
        this._super();
        var layer = new highScoreLayer();
        this.addChild( layer );
    }
});