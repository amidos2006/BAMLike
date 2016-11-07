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
        for(let i:number=0; i<10; i++){
            this.game.load.image("enemy_" + (i), "assets/graphics/objects/villain0" + i + ".png");
        }
        this.game.load.image("tiles", "assets/graphics/tiles.png");
    }

    update(){
        PhasePunk.initialize(this.game);
        PhasePunk.loadGame();
        
        this.game.state.start("Gameplay", true);
    }
}