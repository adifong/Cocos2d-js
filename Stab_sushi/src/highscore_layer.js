var highScoreLayer = cc.Layer.extend({
	 ctor : function(){
        this._super();

        

        var size = cc.winSize;
        this.bgSprite = new cc.Sprite(res.background_png);
        this.bgSprite.attr({
            x : size.width/2,
            y : size.height/2
        });
        this.addChild(this.bgSprite);


        var highScore = new cc.LayerColor( cc.color( 255, 255, 255, 100 ) );
        var size = cc.winSize;
        var titleLabel = new cc.LabelTTF( 'High Score', 'Arial', 60 );
        titleLabel.attr({
            x : size.width / 2,
            y : size.height - 50
        });
        highScore.addChild( titleLabel, 5);

        var titleNo  = new cc.LabelTTF( 'RANK', 'Arial', 40 );
        titleNo.attr({
            x : size.width/2 - 390 ,
            y : size.height - 150
        });
        highScore.addChild( titleNo, 5);

        var titleNama  = new cc.LabelTTF( 'NAME', 'Arial', 40 );
        titleNama.attr({
            x : size.width/2  ,
            y : size.height - 150
        });
        highScore.addChild( titleNama, 5);

        var titleScore  = new cc.LabelTTF( 'SCORE', 'Arial', 40 );
        titleScore.attr({
            x : size.width/2 + 320 ,
            y : size.height - 150
        });
        highScore.addChild( titleScore, 5);




        
        var value = JSON.parse(cc.sys.localStorage.getItem(JSON.stringify("HighScore")));
        

        var rankVal ="";


        for(var i =0 ; i<value.length ; i++){


        	if(i+1== 1)
        		rankVal = "ST";
        	else if(i+1== 2)
        		rankVal = "ND";
        	else if(i+1== 3)
        		rankVal = "RD";
        	else
        		rankVal = "TH";

        	var valueNo 	= new cc.LabelTTF( (i+1)+""+rankVal, 'Arial', 40 );
	        valueNo.attr({
	            x : size.width/2 - 390 ,
	            y : size.height - 220 - (i*50)
	        });
	        highScore.addChild( valueNo, 5);

	        var valueName 	= new cc.LabelTTF( value[i].name, 'Arial', 40 ); 
	        valueName.attr({
	            x : size.width/2  ,
	            y : size.height - 220 - (i*50)
	        });
	        highScore.addChild( valueName, 5);


	        var valueScore 	= new cc.LabelTTF( value[i].score, 'Arial', 40 );
	        valueScore.attr({
	            x : size.width/2 + 320 ,
	            y : size.height - 220 - (i*50)
	        });

	        highScore.addChild( valueScore, 5);


        }
		//        cc.log(value.length);


		// menu Back to -> main Menu

			var mainMenuItem = new cc.MenuItemFont(
                'Back',
                function(){
                    var transition = new cc.TransitionFade( 1, new MenuScene(), cc.color( 255, 255, 255, 255 ) );
                    cc.director.runScene( transition );
                },
                this
            );

            mainMenuItem.attr({
                x : size.width -100,
                y : 50
            });

            var menu = new cc.Menu( mainMenuItem );
            menu.x=0;
            menu.y=0;
            highScore.addChild( menu, 1 );
            //this.addChild( gameover );

        //end back to main menu
        this.addChild(highScore);


     },


        

    

});