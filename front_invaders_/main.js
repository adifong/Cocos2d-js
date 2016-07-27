cc.game.onStart = function(){


	var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.ORIGINAL_CONTAINER, cc.ContentStrategy.EXACT_FIT);
	cc.view.setDesignResolutionSize(700, 400, policy);


    //cc.view.setDesignResolutionSize(700, 400, cc.ResolutionPolicy.FIXED_HEIGHT);
    

	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MenuScene());
    }, this);
};
cc.game.run();