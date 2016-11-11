class PlayerEntity extends BaseEntity {
    static healthValue:number;
    static attackValue:number;
    static manaValue:number;

    private imageUp: Phaser.Image;
    private imageDown: Phaser.Image;
    private imageLeft: Phaser.Image;
    private imageRight: Phaser.Image;

    private attackCost: number[];
    private staminaCost: number[];
    private manaCost: number[];

    selectedAttack: number;
    selectedStamina: number;
    selectedMana: number;

    currentAttack: number;
    currentStamina: number;
    currentMana: number;
    currentHealth: number;

    totalAttack: number;
    totalStamina: number;
    totalMana: number;
    totalHealth: number;

    constructor(game: Phaser.Game, xTile: number, yTile: number) {
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

        this.attackCost = [1, 2, 3];
        this.staminaCost = [1, 2, 4];
        this.manaCost = [2, 4, 8];
    }

    destroy():void{
        let tilePosition:Phaser.Point = this.getTilePosition();
        let particle: BaseParticle = new BaseParticle(this.game,
            tilePosition.x, tilePosition.y, "mana0", 2);
        let gameplay: GameplayState = <GameplayState>this.game.state.getCurrentState();

        super.destroy();
    }

    attack(e: BaseEnemyEntity, firstTime:boolean = true): void {
        let gameplay: GameplayState = <GameplayState>this.game.state.getCurrentState();
        if (this.currentAttack >= this.attackCost[this.selectedAttack] || !firstTime) {
            let particle: BaseParticle = new BaseParticle(this.game,
                e.getTilePosition().x, e.getTilePosition().y, "weapon" + this.selectedAttack);
            gameplay.layers[Layer.PARTICLE_LAYER].add(particle);
            e.particle = particle;

            if(firstTime){
                this.currentAttack -= this.attackCost[this.selectedAttack];
            }
            e.takeDamage(1);
        }
        else{
            this.refresh();
            let particle:TextParticle = new TextParticle(this.game,
                gameplay.player.getTilePosition().x, gameplay.player.getTilePosition().y, "no strength");
            gameplay.layers[Layer.PARTICLE_LAYER].add(particle);
        }
    }

    castSpell(): void {
        let gameplayState: GameplayState = <GameplayState>this.game.state.getCurrentState();
        let tilePosition:Phaser.Point = this.getTilePosition();
        if (this.currentMana >= this.manaCost[this.selectedMana]) {
            this.currentMana -= this.manaCost[this.selectedMana];
            switch(this.selectedMana){
                case 0:
                let p:Phaser.Point[] = [];
                for(let x:number=0; x<gameplayState.tileMap.getWidth(); x++){
                    for(let y:number=0; y<gameplayState.tileMap.getHeight(); y++){
                        if(!gameplayState.tileMap.getSolid(x, y) && !tilePosition.equals(new Phaser.Point(x, y))){
                            p.push(new Phaser.Point(x, y));
                        }
                    }
                }
                let randomIndex:number = this.game.rnd.integerInRange(0, p.length - 1);
                this.x = (p[randomIndex].x + 0.5) * PhasePunk.TILE_SIZE;
                this.y = (p[randomIndex].y + 0.5) * PhasePunk.TILE_SIZE;
                let particle: BaseParticle = new BaseParticle(this.game,
                    p[randomIndex].x, p[randomIndex].y, "mana" + this.selectedMana);
                gameplayState.layers[Layer.PARTICLE_LAYER].add(particle);
                particle = new BaseParticle(this.game,
                    tilePosition.x, tilePosition.y, "mana" + this.selectedMana);
                gameplayState.layers[Layer.PARTICLE_LAYER].add(particle);
                this.clearAround();
                break;
                case 1:
                for (let i: number = 0; i < gameplayState.enemies.length; i++) {
                    let ep:Phaser.Point = gameplayState.enemies[i].getTilePosition();
                    if(gameplayState.fogOfWar.getTile(ep.x, ep.y, gameplayState.fogOfWar.getLayerIndex("layer1")) == null){
                        gameplayState.enemies[i].frozen = 4;
                    }
                }
                break;
                case 2:
                for (let i: number = 0; i < gameplayState.enemies.length; i++) {
                    let ep:Phaser.Point = gameplayState.enemies[i].getTilePosition();
                    if(gameplayState.fogOfWar.getTile(ep.x, ep.y, gameplayState.fogOfWar.getLayerIndex("layer1")) == null){
                        gameplayState.enemies[i].takeDamage(1);
                        let particle: BaseParticle = new BaseParticle(this.game,
                            ep.x, ep.y, "mana" + this.selectedMana);
                        gameplayState.layers[Layer.PARTICLE_LAYER].add(particle);
                        gameplayState.enemies[i].particle = particle;
                    }
                }
                break;
            }
        }
        else{
            this.refresh();
            let particle:TextParticle = new TextParticle(this.game,
                gameplayState.player.getTilePosition().x, gameplayState.player.getTilePosition().y, "no mana");
            gameplayState.layers[Layer.PARTICLE_LAYER].add(particle);
        }
    }

    move(direction: Phaser.Point): void {
        let willCost: boolean = false;
        let gameplayState: GameplayState = <GameplayState>this.game.state.getCurrentState();
        for (let i: number = 0; i < gameplayState.enemies.length; i++) {
            if (gameplayState.enemies[i].discovered) {
                willCost = true;
                break;
            }
        }
        // if(willCost){
        //     if(this.currentStamina >= this.staminaCost[this.selectedStamina]){
        //         this.currentStamina -= this.staminaCost[this.selectedStamina];
        //     }
        //     else{
        //         return;
        //     }
        // }
        this.x += direction.x * PhasePunk.TILE_SIZE;
        this.y += direction.y * PhasePunk.TILE_SIZE;
    }

    takeDamage(damage: number): void {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
        }
        let gameplay:GameplayState = <GameplayState> this.game.state.getCurrentState();
        gameplay.startVibrating();
    }

    refresh(): void {
        this.currentAttack += 1;
        this.currentStamina += 1;
        this.currentMana += 1;
        if (this.currentAttack > this.totalAttack) {
            this.currentAttack = this.totalAttack;
        }
        if (this.currentStamina > this.totalStamina) {
            this.currentStamina = this.totalStamina;
        }
        if (this.currentMana > this.totalMana) {
            this.currentMana = this.totalMana;
        }
        (<GameplayState>this.game.state.getCurrentState()).highChange = true;
    }

    healthRefresh():void{
        this.currentHealth += 1;
        if(this.currentHealth > this.totalHealth){
            this.currentHealth = this.totalHealth;
        }
    }

    updateStep(direction: Phaser.Point): void {
        let gameplayState: GameplayState = <GameplayState>this.game.state.getCurrentState();
        let playerTile: Phaser.Point = this.getTilePosition();
        let happen:boolean = false;
        for (let i: number = 0; i < gameplayState.enemies.length; i++) {
            let p: Phaser.Point = gameplayState.enemies[i].getTilePosition();
            switch (this.selectedAttack) {
                case 0:
                    if (p.equals(new Phaser.Point(playerTile.x + direction.x, playerTile.y + direction.y))) {
                        this.attack(gameplayState.enemies[i]);
                        happen = true;
                    }
                    break;
                case 2:
                    if (p.equals(new Phaser.Point(playerTile.x + direction.x, playerTile.y + direction.y))) {
                        this.attack(gameplayState.enemies[i], !happen);
                        happen = true;
                    }
                    if(p.equals(new Phaser.Point(playerTile.x + direction.x + direction.y, playerTile.y + direction.y + direction.x))){
                        this.attack(gameplayState.enemies[i], !happen);
                        happen = true;
                    }
                    if(p.equals(new Phaser.Point(playerTile.x + direction.x - direction.y, playerTile.y + direction.y - direction.x))){
                        this.attack(gameplayState.enemies[i], !happen);
                        happen = true;
                    }

                    if (p.equals(new Phaser.Point(playerTile.x - direction.x, playerTile.y - direction.y))) {
                        this.attack(gameplayState.enemies[i], !happen);
                        happen = true;
                    }
                    if(p.equals(new Phaser.Point(playerTile.x - direction.x + direction.y, playerTile.y - direction.y + direction.x))){
                        this.attack(gameplayState.enemies[i], !happen);
                        happen = true;
                    }
                    if(p.equals(new Phaser.Point(playerTile.x - direction.x - direction.y, playerTile.y - direction.y - direction.x))){
                        this.attack(gameplayState.enemies[i], !happen);
                        happen = true;
                    }

                    if (p.equals(new Phaser.Point(playerTile.x + direction.y, playerTile.y + direction.x))) {
                        this.attack(gameplayState.enemies[i], !happen);
                        happen = true;
                    }
                    if (p.equals(new Phaser.Point(playerTile.x - direction.y, playerTile.y - direction.x))) {
                        this.attack(gameplayState.enemies[i], !happen);
                        happen = true;
                    }
                    break;
                case 1:
                    for(let j:number=0; j<Math.max(gameplayState.tileMap.getWidth(), gameplayState.tileMap.getHeight()); j++){
                        if(gameplayState.tileMap.getSolid(playerTile.x + direction.x, playerTile.y + direction.y, false)){
                            break;
                        }
                        let ep:Phaser.Point = gameplayState.enemies[i].getTilePosition();
                        if(p.equals(new Phaser.Point(playerTile.x + direction.x * j, playerTile.y + direction.y * j)) &&
                            gameplayState.fogOfWar.getTile(ep.x, ep.y, gameplayState.fogOfWar.getLayerIndex("layer1")) == null){
                            this.attack(gameplayState.enemies[i]);
                            happen = true;
                            break;
                        }
                    }
                    break;
            }
            if(happen && this.selectedAttack != 2){
                break;
            }
        }
        for (let i: number = 0; i < gameplayState.treasures.length; i++) {
            let p: Phaser.Point = gameplayState.treasures[i].getTilePosition();
            if (p.equals(new Phaser.Point(playerTile.x + direction.x, playerTile.y + direction.y))) {
                gameplayState.treasures[i].open();
                break;
            }
        }
        if (gameplayState.exit != null) {
            let p: Phaser.Point = gameplayState.exit.getTilePosition();
            if (p.equals(new Phaser.Point(playerTile.x + direction.x, playerTile.y + direction.y))) {
                PhasePunk.level += 1;
                PlayerEntity.healthValue = this.currentHealth;
                PlayerEntity.attackValue = this.currentAttack;
                PlayerEntity.manaValue = this.currentMana;

                this.game.state.start("Gameplay");
            }
        }
        if (!happen) {
            if(!gameplayState.tileMap.getSolid(playerTile.x + direction.x, playerTile.y + direction.y)){
                this.move(direction);
            }
            else{
                this.refresh();
            }
        }
        this.updateGraphics(direction);
        this.clearAround();
    }

    clearAround(): void {
        let gameplayState: GameplayState = <GameplayState>this.game.state.getCurrentState();
        let playerTile: Phaser.Point = this.getTilePosition();
        for (let x: number = -4; x <= 4; x++) {
            for (let y: number = -4; y <= 4; y++) {
                if (Math.abs(x) + Math.abs(y) < 4) {
                    gameplayState.fogOfWar.clearTile(1, playerTile.x + x, playerTile.y + y);
                }
            }
        }
    }

    updateGraphics(direction: Phaser.Point): void {
        if (direction.x < 0) {
            this.imageDown.alpha = 0;
            this.imageUp.alpha = 0;
            this.imageLeft.alpha = 0;
            this.imageRight.alpha = 0;

            this.imageLeft.alpha = 1;
        }
        if (direction.x > 0) {
            this.imageDown.alpha = 0;
            this.imageUp.alpha = 0;
            this.imageLeft.alpha = 0;
            this.imageRight.alpha = 0;

            this.imageRight.alpha = 1;
        }
        if (direction.y < 0) {
            this.imageDown.alpha = 0;
            this.imageUp.alpha = 0;
            this.imageLeft.alpha = 0;
            this.imageRight.alpha = 0;

            this.imageUp.alpha = 1;
        }
        if (direction.y > 0) {
            this.imageDown.alpha = 0;
            this.imageUp.alpha = 0;
            this.imageLeft.alpha = 0;
            this.imageRight.alpha = 0;

            this.imageDown.alpha = 1;
        }
    }

    update(): void {
        super.update();

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.selectedAttack += 1;
            this.selectedAttack %= 3;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
            this.selectedStamina += 1;
            this.selectedStamina %= 3;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.selectedMana += 1;
            this.selectedMana %= 3;
            this.game.input.reset();
        }
    }
}