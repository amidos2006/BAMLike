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

    update():void{
        super.update();

        for(let i:number=0; i<this.images.length; i++){
            this.images[i].alpha = 0;
        }
        this.images[this.chestState].alpha = 1;
    }
}