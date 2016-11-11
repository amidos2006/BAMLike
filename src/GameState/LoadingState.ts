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
    }

    update(){
        PhasePunk.initialize(this.game);
        PhasePunk.loadGame();
        
        this.game.state.start("MainMenu", true);
    }
}