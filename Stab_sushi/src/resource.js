var res = {
    background_png : 'res/background.png',

    //start scene
    start_N_png : 'res/start_N.png',
    start_S_png : 'res/start_S.png',

    //play scene
    sushi_1n_png : 'res/sushi_1n/sushi_1n.png',
    sushi_plist : 'res/sushi.plist',

    //player 
    runner_png  : "res/running.png",
    runner_plist : "res/running.plist",
    //attack 
    attack_png  : "res/attack.png",
    attack_plist : "res/attack.plist",

    //blood
    blood_png  : "res/blood.png",
    blood_plist : "res/blood.plist",

    // menu
    start_menu_normal_png : "res/menu/start_game_normal.png",
    start_menu_active_png : "res/menu/start_game_active.png",
    highscore_menu_normal_png : "res/menu/high_score_normal.png",
    highscore_menu_active_png : "res/menu/high_score_active.png",
    setting_menu_normal_png : "res/menu/setting_normal.png",
    setting_menu_active_png : "res/menu/setting_active.png",
    save_normal_png : "res/menu/save_normal.png",
    save_active_png : "res/menu/save_active.png",

    //sound
    slash_sword_sound : "res/Sound/slash_sword.ogg",
    pew_pew_sound : "res/Sound/pew-pew-lei.wav",
    background_sound : "res/Sound/background-music.ogg"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}