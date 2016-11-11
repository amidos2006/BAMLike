class ExitEntity extends BaseEntity{
    constructor(game:Phaser.Game, xTile:number, yTile:number){
        super(game);

        this.x = (xTile + 0.5) * PhasePunk.TILE_SIZE;
        this.y = (yTile + 0.5) * PhasePunk.TILE_SIZE;

        let image:Phaser.Image = new Phaser.Image(game, 0, 0, "exit");
        image.anchor.set(0.5, 0.5);
        this.add(image);
    }
}