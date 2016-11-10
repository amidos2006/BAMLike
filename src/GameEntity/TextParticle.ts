class TextParticle extends BaseEntity{
    deltaAlpha:number;
    deltaScale:number;
    ySpeed:number;

    constructor(game:Phaser.Game, xTile:number, yTile:number, text:string, 
        ySpeed:number = -0.25, startingScale=1, startingAlpha=1, deltaScale:number = 0, deltaAlpha:number = -0.01){
        super(game);

        this.x = (xTile + 0.5) * PhasePunk.TILE_SIZE;
        this.y = (yTile + 0.5) * PhasePunk.TILE_SIZE;

        let style = { font: "8px pixelFont", fill: "rgb(192,235,211)", align: "center" };
        let gameText:Phaser.Text = new Phaser.Text(game, 0, 0, text, style);
        gameText.anchor.set(0.5, 0.5);
        this.add(gameText);

        this.alpha = startingAlpha;
        this.scale.set(startingScale, startingScale);
        this.deltaAlpha = deltaAlpha;
        this.deltaScale = deltaScale;
        this.ySpeed = ySpeed;
    }

    update():void{
        super.update();

        if(this.alpha < 0){
            this.destroy();
        }
        else{
            this.alpha += this.deltaAlpha;
            this.scale.set(this.scale.x + this.deltaScale, this.scale.y + this.deltaScale);
            this.y += this.ySpeed;
        }
    }
}