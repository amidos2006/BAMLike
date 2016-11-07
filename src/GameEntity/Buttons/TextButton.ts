class TextButton extends ButtonEntity{
    text:Phaser.Text;

    constructor(game:Phaser.Game, x:number, y:number, text:string){
        super(game, x, y);

        let style = { font: "20px pixelFont", fill: "#ffffff", align: "center" };
        this.text = new Phaser.Text(this.game, 0, 0, text, style);
        this.text.anchor.set(0.5, 0.5);
        this.add(this.text);
        this.rect = new Phaser.Rectangle(-this.text.width / 2, -this.text.height / 2, 
            this.text.width, this.text.height);
    }
}