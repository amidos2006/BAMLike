class MainMenuState extends BaseState{
    spaceFlicker:Phaser.Text;

    constructor(){
        super();
    }

    create():void{
        super.create();

        let style = { font: "16px pixelFont", fill: "rgb(192,235,211)", align: "center" };
        let text:Phaser.Text = new Phaser.Text(this.game, this.game.width/2, this.game.height/2 - 16, "BAMLike", style);
        text.anchor.set(0.5, 0.5);
        this.add.existing(text);

        style = { font: "8px pixelFont", fill: "rgb(60,160,106)", align: "center" };
        this.spaceFlicker = new Phaser.Text(this.game, text.x, text.y + 16, "Press Space to Start", style);
        this.spaceFlicker.anchor.set(0.5, 0.5);
        this.add.existing(this.spaceFlicker);

        let timer:Phaser.Timer = new Phaser.Timer(this.game);
        this.game.time.add(timer);
        timer.loop(400, this.flicker, this);
        timer.start();
    }

    flicker():void{
        this.spaceFlicker.alpha = 1 - this.spaceFlicker.alpha;
    }

    update():void{
        super.update();

        if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.game.state.start("Gameplay");
            PhasePunk.newGame();
            this.game.input.reset();
        }
    }
}