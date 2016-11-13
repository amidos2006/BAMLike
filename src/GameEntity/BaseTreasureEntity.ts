class BaseTreasureEntity extends BaseEntity{
    images:Phaser.Image[];
    chestState:number = 0;
    
    constructor(game:Phaser.Game, xTile:number, yTile:number){
        super(game);

        this.x = (xTile + 0.5) * PhasePunk.TILE_SIZE;
        this.y = (yTile + 0.5) * PhasePunk.TILE_SIZE;

        this.images = [];
        for(let i:number=0; i<2; i++){
            this.images.push(new Phaser.Image(game, 0, 0, "chest" + i));
            this.images[i].anchor.set(0.5, 0.5);
            this.images[i].alpha = 0;
            this.add(this.images[i]);
        }
        this.chestState = 0;
    }

    open():void{
        if(this.chestState == 1){
            return;
        }

        this.chestState = 1;
        let randomValue:number = this.game.rnd.integerInRange(2, 4);
        for(let i:number=0; i<randomValue; i++){
            let gameplay:GameplayState = <GameplayState> this.game.state.getCurrentState();
            gameplay.player.refresh();
            gameplay.player.healthRefresh();
        }
        PhasePunk.soundManager.playSound("treasure");
    }

    update():void{
        super.update();

        for(let i:number=0; i<this.images.length; i++){
            this.images[i].alpha = 0;
        }
        this.images[this.chestState].alpha = 1;
    }
}