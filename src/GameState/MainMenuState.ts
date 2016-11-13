class MainMenuState extends BaseState{
    spaceFlicker:Phaser.Text;

    constructor(){
        super();
    }

    create():void{
        super.create();

        let style = { font: "24px pixelFont", fill: "rgb(192,235,211)", align: "center" };
        let text:Phaser.Text = new Phaser.Text(this.game, this.game.width/2, 32, "BAMLike", style);
        text.anchor.set(0.5, 0.5);
        this.add.existing(text);

        style = { font: "8px pixelFont", fill: "rgb(60,160,106)", align: "center" };
        this.spaceFlicker = new Phaser.Text(this.game, text.x, text.y + 24, "Press Space to Start", style);
        this.spaceFlicker.anchor.set(0.5, 0.5);
        this.add.existing(this.spaceFlicker);

        style = { font: "16px pixelFont", fill: "rgb(60,160,106)", align: "center" };
        text = new Phaser.Text(this.game, text.x, this.spaceFlicker.y + 16, "Controls", style);
        text.anchor.set(0.5, 0);
        this.add.existing(text);

        style = { font: "8px pixelFont", fill: "rgb(192,235,211)", align: "center" };
        text = new Phaser.Text(this.game, text.x, text.y + 24, "Arrows - Move or Attack\n" +
            "Space - Restore 1 point with higher enemy spawning chances\n" + 
            "S - Cast the selected spell\n" +
            "A - Change the current attack\n" +
            "D - Change the current spell", style);
        text.anchor.set(0.5, 0);
        this.add.existing(text);

        style = { font: "16px pixelFont", fill: "rgb(60,160,106)", align: "center" };
        text = new Phaser.Text(this.game, text.x, text.y + text.height + 8, "Skills & Spells", style);
        text.anchor.set(0.5, 0);
        this.add.existing(text);

        style = { font: "8px pixelFont", fill: "rgb(192,235,211)", align: "center" };
        let firstY:number = text.y + 36;
        let image:Phaser.Image = new Phaser.Image(this.game, 48, firstY, "weapon0");
        image.anchor.set(1, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, image.x, image.y + 2, " Attack infront (Cost: 1 Atk)", style);
        text.anchor.set(0, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x, text.y + 24, "weapon1");
        image.anchor.set(1, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, image.x, image.y + 2, " Shoot infront (Cost: 2 Atk)", style);
        text.anchor.set(0, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x, text.y + 24, "weapon2");
        image.anchor.set(1, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, image.x, image.y + 2, " Attack around (Cost: 3 Atk)", style);
        text.anchor.set(0, 0.5);
        this.add.existing(text);

        image = new Phaser.Image(this.game, this.game.width - 48, firstY, "mana0");
        image.anchor.set(0, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, image.x, image.y + 2, "(Cost: 2 Mana) Blink ", style);
        text.anchor.set(1, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x, text.y + 24, "mana1");
        image.anchor.set(0, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, image.x, image.y + 2, "(Cost: 4 Mana) Freeze all ", style);
        text.anchor.set(1, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x, text.y + 24, "mana2");
        image.anchor.set(0, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, image.x, image.y + 2, "(Cost: 8 Mana) Damage all ", style);
        text.anchor.set(1, 0.5);
        this.add.existing(text);

        style = { font: "16px pixelFont", fill: "rgb(60,160,106)", align: "center" };
        text = new Phaser.Text(this.game, this.game.width/2, text.y + 16, "Goal & Enemies", style);
        text.anchor.set(0.5, 0);
        this.add.existing(text);

        style = { font: "8px pixelFont", fill: "rgb(192,235,211)", align: "center" };
        text = new Phaser.Text(this.game, text.x, text.y + 36, " Go to next level (Appear after certain amount of score) ", style);
        text.anchor.set(0.5, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x - text.width/2, text.y - 2, "exit");
        image.anchor.set(1, 0.5);
        this.add.existing(image);
        image = new Phaser.Image(this.game, text.x + text.width/2, text.y - 2, "exit");
        image.anchor.set(0, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, text.x, text.y + 16, " Restore from 2 to 4 points, health, and score ", style);
        text.anchor.set(0.5, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x - text.width/2, text.y - 4, "chest0");
        image.anchor.set(1, 0.5);
        this.add.existing(image);
        image = new Phaser.Image(this.game, text.x + text.width/2, text.y - 4, "chest0");
        image.anchor.set(0, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, text.x, text.y + 16, " Enemy with 1 HP ", style);
        text.anchor.set(0.5, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x - text.width/2, text.y - 2, "enemy_1");
        image.anchor.set(1, 0.5);
        this.add.existing(image);
        image = new Phaser.Image(this.game, text.x + text.width/2, text.y - 2, "enemy_1");
        image.anchor.set(0, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, text.x, text.y + 16, " Enemy with 2 HP ", style);
        text.anchor.set(0.5, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x - text.width/2, text.y - 2, "enemy_2");
        image.anchor.set(1, 0.5);
        this.add.existing(image);
        image = new Phaser.Image(this.game, text.x + text.width/2, text.y - 2, "enemy_2");
        image.anchor.set(0, 0.5);
        this.add.existing(image);
        text = new Phaser.Text(this.game, text.x, text.y + 16, " Enemy with 3 HP ", style);
        text.anchor.set(0.5, 0.5);
        this.add.existing(text);
        image = new Phaser.Image(this.game, text.x - text.width/2, text.y - 2, "enemy_3");
        image.anchor.set(1, 0.5);
        this.add.existing(image);
        image = new Phaser.Image(this.game, text.x + text.width/2, text.y - 2, "enemy_3");
        image.anchor.set(0, 0.5);
        this.add.existing(image);

        style = { font: "8px pixelFont", fill: "rgb(60,160,106)", align: "right" };
        text = new Phaser.Text(this.game, this.game.width - 5, this.game.height, "#procjam", style);
        text.anchor.set(1, 1);
        this.add.existing(text);
        style = { font: "8px pixelFont", fill: "rgb(60,160,106)", align: "left" };
        text = new Phaser.Text(this.game, 5, this.game.height, "Game by Amidos\nSound & Music by Mark Benis", style);
        text.anchor.set(0, 1);
        this.add.existing(text);

        let timer:Phaser.Timer = new Phaser.Timer(this.game);
        this.game.time.add(timer);
        timer.loop(400, this.flicker, this);
        timer.start();

        PhasePunk.musicTrack.play("", 0, SoundManager.MUSIC_VOLUME, true);
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