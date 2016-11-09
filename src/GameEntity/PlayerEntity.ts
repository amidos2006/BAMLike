class PlayerEntity extends BaseEntity{
    private imageUp:Phaser.Image;
    private imageDown:Phaser.Image;
    private imageLeft:Phaser.Image;
    private imageRight:Phaser.Image;
    
    private attackCost:number[];
    private staminaCost:number[];
    private manaCost:number[];

    selectedAttack:number;
    selectedStamina:number;
    selectedMana:number;

    currentAttack:number;
    currentStamina:number;
    currentMana:number;
    currentHealth:number;

    totalAttack:number;
    totalStamina:number;
    totalMana:number;
    totalHealth:number;

    constructor(game:Phaser.Game, xTile:number, yTile:number){
        super(game);

        this.x = (xTile + 0.5) * PhasePunk.TILE_SIZE;
        this.y = (yTile + 0.5) * PhasePunk.TILE_SIZE;

        this.imageUp = new Phaser.Image(game, 0, 0, "hero_6");
        this.imageUp.anchor.set(0.5, 0.5);
        this.imageUp.alpha = 0;
        this.imageDown = new Phaser.Image(game, 0, 0, "hero_0");
        this.imageDown.anchor.set(0.5, 0.5);
        this.imageDown.alpha = 1;
        this.imageRight = new Phaser.Image(game, 0, 0, "hero_3");
        this.imageRight.anchor.set(0.5, 0.5);
        this.imageRight.alpha = 0;
        this.imageLeft = new Phaser.Image(game, 0, 0, "hero_3");
        this.imageLeft.anchor.set(0.5, 0.5);
        this.imageLeft.scale.set(-1, 1);
        this.imageLeft.alpha = 0;

        this.add(this.imageDown);
        this.add(this.imageRight);
        this.add(this.imageUp);
        this.add(this.imageLeft);

        this.selectedAttack = 0;
        this.selectedStamina = 0;
        this.selectedMana = 0;

        this.totalHealth = 10;
        this.totalAttack = 10;
        this.totalStamina = 10;
        this.totalMana = 10;

        this.currentHealth = this.totalHealth;
        this.currentAttack = this.totalAttack;
        this.currentStamina = this.totalStamina;
        this.currentMana = this.totalMana;

        this.attackCost = [1, 2, 4];
        this.staminaCost = [1, 2, 4];
        this.manaCost = [1, 2, 4];
    }

    attack(e:BaseEnemyEntity):void{
        if(this.currentAttack >= this.manaCost[this.selectedAttack]){
            this.currentAttack -= this.attackCost[this.selectedAttack];
            e.takeDamage(1);
        }
    }

    castSpell():void{
        if(this.currentMana >= this.manaCost[this.selectedMana]){
            this.currentMana -= this.manaCost[this.selectedMana];
        }
    }

    move(direction:Phaser.Point):void{
        let willCost:boolean = false;
        let gameplayState:GameplayState = <GameplayState>this.game.state.getCurrentState();
        for(let i:number=0; i<gameplayState.enemies.length; i++){
            if(gameplayState.enemies[i].discovered){
                willCost = true;
                break;
            }
        }
        if(willCost){
            if(this.currentStamina >= this.staminaCost[this.selectedStamina]){
                this.currentStamina -= this.staminaCost[this.selectedStamina];
            }
            else{
                return;
            }
        }
        this.x += direction.x * PhasePunk.TILE_SIZE;
        this.y += direction.y * PhasePunk.TILE_SIZE;
    }

    takeDamage(damage:number):void{
        this.currentHealth -= damage;
        if(this.currentHealth <= 0){
            this.currentHealth = 0;
        }
    }

    refresh():void{
        this.currentAttack += 1;
        this.currentStamina += 1;
        this.currentMana += 1;
        if(this.currentAttack > this.totalAttack){
            this.currentAttack = this.totalAttack;
        }
        if(this.currentStamina > this.totalStamina){
            this.currentStamina = this.totalStamina;
        }
        if(this.currentMana > this.totalMana){
            this.currentMana = this.totalMana;
        }
    }

    updateStep(direction:Phaser.Point):void{
        let gameplayState:GameplayState = <GameplayState>this.game.state.getCurrentState();
        let playerTile:Phaser.Point = this.getTilePosition();
        for(let i:number=0; i<gameplayState.enemies.length; i++){
            let p:Phaser.Point = gameplayState.enemies[i].getTilePosition();
            if(p.equals(new Phaser.Point(playerTile.x + direction.x, playerTile.y + direction.y))){
                this.attack(gameplayState.enemies[i]);
                break;
            }
        }
        for(let i:number=0; i<gameplayState.treasures.length; i++){
            let p:Phaser.Point = gameplayState.treasures[i].getTilePosition();
            if(p.equals(new Phaser.Point(playerTile.x + direction.x, playerTile.y + direction.y))){
                //Unlock the treasure chest
                break;
            }
        }
        if(!gameplayState.tileMap.getSolid(playerTile.x + direction.x, playerTile.y + direction.y)){
            this.move(direction);
        }
        this.updateGraphics(direction);
        this.clearAround();
    }

    clearAround():void{
        let gameplayState:GameplayState = <GameplayState>this.game.state.getCurrentState();
        let playerTile:Phaser.Point = this.getTilePosition();
        for(let x:number=-4; x<=4; x++){
            for(let y:number=-4; y<=4; y++){
                if(Math.abs(x) + Math.abs(y) < 4){
                    gameplayState.fogOfWar.clearTile(1, playerTile.x + x, playerTile.y + y);
                }
            }
        }
    }

    updateGraphics(direction:Phaser.Point):void{
        if(direction.x < 0){
            this.imageDown.alpha = 0;
            this.imageUp.alpha = 0;
            this.imageLeft.alpha = 0;
            this.imageRight.alpha = 0;

            this.imageLeft.alpha = 1;
        }
        if(direction.x > 0){
            this.imageDown.alpha = 0;
            this.imageUp.alpha = 0;
            this.imageLeft.alpha = 0;
            this.imageRight.alpha = 0;
            
            this.imageRight.alpha = 1;
        }
        if(direction.y < 0){
            this.imageDown.alpha = 0;
            this.imageUp.alpha = 0;
            this.imageLeft.alpha = 0;
            this.imageRight.alpha = 0;
            
            this.imageUp.alpha = 1;
        }
        if(direction.y > 0){
            this.imageDown.alpha = 0;
            this.imageUp.alpha = 0;
            this.imageLeft.alpha = 0;
            this.imageRight.alpha = 0;
            
            this.imageDown.alpha = 1;
        }
    }

    update():void{
        super.update();

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
            this.selectedAttack += 1;
            this.selectedAttack %= 3;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
            this.selectedStamina += 1;
            this.selectedStamina %= 3;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
            this.selectedMana += 1;
            this.selectedMana %= 3;
            this.game.input.reset();
        }
    }
}