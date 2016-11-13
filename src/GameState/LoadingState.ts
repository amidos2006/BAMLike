class LoadingState extends Phaser.State{
    constructor(){
        super();
    }

    preload(){
        for(let i:number=0; i<SoundManager.MAX_MUSIC; i++){
            
        }

        for(let i:number=1; i<10; i++){
            this.game.load.image("hero_" + (i-1), "assets/graphics/people/npc01_" + i + ".png");
        }
        this.game.load.image("enemy_1", "assets/graphics/objects/villain0" + 0 + ".png");
        this.game.load.image("enemy_2", "assets/graphics/objects/villain0" + 4 + ".png");
        this.game.load.image("enemy_3", "assets/graphics/objects/villain0" + 1 + ".png");

        this.game.load.image("tiles", "assets/graphics/tiles.png");
        this.game.load.image("hud", "assets/graphics/hud.png");
        this.game.load.image("heart", "assets/graphics/objects/treasure00.png");
        this.game.load.image("frozen", "assets/graphics/objects/rock01.png");
        
        this.game.load.image("weapon0", "assets/graphics/objects/weap00.png");
        this.game.load.image("weapon1", "assets/graphics/objects/weap02.png");
        this.game.load.image("weapon2", "assets/graphics/objects/weap01.png");

        this.game.load.image("stamina0", "assets/graphics/objects/weap00.png");
        this.game.load.image("stamina1", "assets/graphics/objects/weap01.png");
        this.game.load.image("stamina2", "assets/graphics/objects/weap03.png");

        this.game.load.image("mana0", "assets/graphics/objects/teleport.png");
        this.game.load.image("mana1", "assets/graphics/objects/ice.png");
        this.game.load.image("mana2", "assets/graphics/objects/fire.png");

        this.game.load.image("chest0", "assets/graphics/objects/chest00.png");
        this.game.load.image("chest1", "assets/graphics/objects/chest01.png");

        this.game.load.image("exit", "assets/graphics/objects/step00.png");

        this.game.load.audio("attack0", "assets/sfx/Sword Hit.wav");
        this.game.load.audio("attack1", "assets/sfx/Arrow Hit.wav");
        this.game.load.audio("attack2", "assets/sfx/Axe Hit.wav");
        this.game.load.audio("spell0", "assets/sfx/Blink Spell.wav");
        this.game.load.audio("spell1", "assets/sfx/Ice Spell.wav");
        this.game.load.audio("spell2", "assets/sfx/Fire Spell.wav");
        this.game.load.audio("monster1", "assets/sfx/Monster Attack 1.wav");
        this.game.load.audio("monster2", "assets/sfx/Monster Attack 2.wav");
        this.game.load.audio("monster3", "assets/sfx/Monster Attack 3.wav");
        this.game.load.audio("move1", "assets/sfx/Footstep 1.wav");
        this.game.load.audio("move2", "assets/sfx/Footstep 2.wav");
        this.game.load.audio("move3", "assets/sfx/Footstep 3.wav");
        this.game.load.audio("move4", "assets/sfx/Footstep 4.wav");
        this.game.load.audio("treasure", "assets/sfx/Treasure Fanfare Fix.wav");
        this.game.load.audio("death", "assets/sfx/Death Fanfare.wav");
        this.game.load.audio("start", "assets/sfx/Sword Hit.wav");
        this.game.load.audio("win", "assets/sfx/Ladder.wav");
        this.game.load.audio("rest", "assets/sfx/Wait.wav")

        this.game.load.audio("music", "assets/music/Background Theme.wav");

        let style = { font: "8px pixelFont", fill: "rgb(60,160,106)", align: "center" };
        let text:Phaser.Text = new Phaser.Text(this.game, this.game.width/2, this.game.height/2, "Loading...", style);
        text.anchor.set(0.5, 0.5);
        this.add.existing(text);
    }

    update(){
        PhasePunk.initialize(this.game);
        // PhasePunk.loadGame();
        
        this.game.state.start("MainMenu", true);
    }
}