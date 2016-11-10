class BaseParticle extends BaseEntity{
    deltaAlpha:number;
    deltaScale:number;

    constructor(game:Phaser.Game, xTile:number, yTile:number, name:string, 
        startingScale=1, startingAlpha=1, deltaScale:number = 0, deltaAlpha:number = -0.05){
        super(game);

        this.x = (xTile + 0.5) * PhasePunk.TILE_SIZE;
        this.y = (yTile + 0.5) * PhasePunk.TILE_SIZE;

        let image:Phaser.Image = new Phaser.Image(game, 0, 0, name);
        image.anchor.set(0.5, 0.5);
        this.add(image);

        this.alpha = startingAlpha;
        this.scale.set(startingScale, startingScale);
        this.deltaAlpha = deltaAlpha;
        this.deltaScale = deltaScale;
    }

    update():void{
        super.update();

        if(this.alpha < 0){
            this.destroy();
        }
        else{
            this.alpha += this.deltaAlpha;
            this.scale.set(this.scale.x + this.deltaScale, this.scale.y + this.deltaScale);
        }
    }
}