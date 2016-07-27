var res = {


   // menu
    start_menu_normal_png : "res/menu/start_normal.png",
    start_menu_active_png : "res/menu/start_active.png",
    how_menu_normal_png : "res/menu/how_normal.png",
    how_menu_active_png : "res/menu/how_active.png",
    about_normal_png : "res/menu/about_normal.png",
    about_active_png : "res/menu/about_active.png",

    // player
    player_png : "res/player/player1.png",

    // bullet 
    bullet_png : "res/bullet.png",

    // enemy 
    enemyBlue_plist : "res/enemyblue.plist",
    enemyBlue_png : "res/enemyblue.png",
    enemyRed_plist : "res/enemyred.plist",
    enemyRed_png : "res/enemyred.png",
    enemyGreen_plist : "res/enemygreen.plist",
    enemyGreen_png : "res/enemygreen.png",

    // message board 
    message_board_png : "res/message.png",

    // play button
    play_button_normal_png : "res/play-btn.png",
    play_button_active_png : "res/play-btn-s.png"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}