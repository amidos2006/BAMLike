class HUDEntity extends BaseEntity{
    private chealthText:Phaser.Text;
    private cattackText:Phaser.Text;
    private cstaminaText:Phaser.Text;
    private cmanaText:Phaser.Text;
    private thealthText:Phaser.Text;
    private tattackText:Phaser.Text;
    private tstaminaText:Phaser.Text;
    private tmanaText:Phaser.Text;
    private scoreText:Phaser.Text;

    private healthImage:Phaser.Image;
    private weaponImage:Phaser.Image[];
    private staminaImage:Phaser.Image[];
    private manaImage:Phaser.Image[];

    constructor(game:Phaser.Game, x:number, y:number){
        super(game);

        this.x = x;
        this.y = y;
        this.healthImage = null;
        this.weaponImage = [];
        this.staminaImage = [];
        this.manaImage = [];

        let style = { font: "8px pixelFont", fill: "rgb(192,235,211)", align: "center" };

        let image:Phaser.Image = new Phaser.Image(game, this.game.width/2, this.game.height - 12, "hud");
        image.anchor.set(0.5, 0.5);
        this.add(image);
        this.chealthText = new Phaser.Text(game, image.x - 13, image.y + 2, "", style);
        this.chealthText.anchor.set(0.5, 0.5);
        this.add(this.chealthText);
        this.thealthText = new Phaser.Text(game, image.x + 13, image.y + 2, "", style);
        this.thealthText.anchor.set(0.5, 0.5);
        this.add(this.thealthText);
        this.healthImage = new Phaser.Image(game, image.x - 1, image.y, "heart");
        this.healthImage.anchor.set(0.5, 0.5);
        this.add(this.healthImage);

        image = new Phaser.Image(game, this.game.width/2 - 80, this.game.height - 12, "hud");
        image.anchor.set(0.5, 0.5);
        this.add(image);
        this.cattackText = new Phaser.Text(game, image.x - 13, image.y + 2, "", style);
        this.cattackText.anchor.set(0.5, 0.5);
        this.add(this.cattackText);
        this.tattackText = new Phaser.Text(game, image.x + 13, image.y + 2, "", style);
        this.tattackText.anchor.set(0.5, 0.5);
        this.add(this.tattackText);
        for(let i:number=0; i<3; i++){
            this.weaponImage.push(new Phaser.Image(game, image.x, image.y, "weapon" + i));
            this.weaponImage[i].anchor.set(0.5, 0.5);
            this.weaponImage[i].alpha = 0;
            this.add(this.weaponImage[i]);
        }

        // image = new Phaser.Image(game, this.game.width/2, this.game.height - 12, "hud");
        // image.anchor.set(0.5, 0.5);
        // this.add(image);
        // this.cstaminaText = new Phaser.Text(game, image.x - 13, image.y + 2, "", style);
        // this.cstaminaText.anchor.set(0.5, 0.5);
        // this.add(this.cstaminaText);
        // this.tstaminaText = new Phaser.Text(game, image.x + 13, image.y + 2, "", style);
        // this.tstaminaText.anchor.set(0.5, 0.5);
        // this.add(this.tstaminaText);
        // for(let i:number=0; i<3; i++){
        //     this.staminaImage.push(new Phaser.Image(game, image.x, image.y, "stamina" + i));
        //     this.staminaImage[i].anchor.set(0.5, 0.5);
        //     this.staminaImage[i].alpha = 0;
        //     this.add(this.staminaImage[i]);
        // }

        image = new Phaser.Image(game, this.game.width/2, 12, "hud");
        image.anchor.set(0.5, 0.5);
        this.add(image);
        this.scoreText = new Phaser.Text(game, image.x, image.y + 2, "", style);
        this.scoreText.anchor.set(0.5, 0.5);
        this.add(this.scoreText);

        image = new Phaser.Image(game, this.game.width/2 + 80, this.game.height - 12, "hud");
        image.anchor.set(0.5, 0.5);
        this.add(image);
        this.cmanaText = new Phaser.Text(game, image.x - 13, image.y + 2, "", style);
        this.cmanaText.anchor.set(0.5, 0.5);
        this.add(this.cmanaText);
        this.tmanaText = new Phaser.Text(game, image.x + 13, image.y + 2, "", style);
        this.tmanaText.anchor.set(0.5, 0.5);
        this.add(this.tmanaText);
        for(let i:number=0; i<3; i++){
            this.manaImage.push(new Phaser.Image(game, image.x, image.y, "mana" + i));
            this.manaImage[i].anchor.set(0.5, 0.5);
            this.manaImage[i].alpha = 0;
            this.add(this.manaImage[i]);
        }
    }

    update():void{
        super.update();

        for(let i:number=0; i<this.weaponImage.length; i++){
            this.weaponImage[i].alpha = 0;
        }
        // for(let i:number=0; i<this.staminaImage.length; i++){
        //     this.staminaImage[i].alpha = 0;
        // }
        for(let i:number=0; i<this.manaImage.length; i++){
            this.manaImage[i].alpha = 0;
        }

        let gameplayState:GameplayState = <GameplayState>this.game.state.getCurrentState();

        this.chealthText.text = "" + gameplayState.player.currentHealth;
        this.cattackText.text = "" + gameplayState.player.currentAttack;
        // this.cstaminaText.text = "" + gameplayState.player.currentStamina;
        this.cmanaText.text = "" + gameplayState.player.currentMana;

        this.thealthText.text = "" + gameplayState.player.totalHealth;
        this.tattackText.text = "" + gameplayState.player.totalAttack;
        // this.tstaminaText.text = "" + gameplayState.player.totalStamina;
        this.tmanaText.text = "" + gameplayState.player.totalMana;
        this.scoreText.text = "" + PhasePunk.score;

        this.weaponImage[gameplayState.player.selectedAttack].alpha = 1;
        // this.staminaImage[gameplayState.player.selectedStamina].alpha = 1;
        this.manaImage[gameplayState.player.selectedMana].alpha = 1;
    }
}