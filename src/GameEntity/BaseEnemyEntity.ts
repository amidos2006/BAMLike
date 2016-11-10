/// <reference path="BaseEntity.ts" />

class BaseEnemyEntity extends BaseEntity{
    health:number;
    discovered:boolean;
    frozen:number;
    private frozenImage:Phaser.Image;

    constructor(game:Phaser.Game, xTile:number, yTile:number, health:number){
        super(game);

        this.x = (xTile + 0.5) * PhasePunk.TILE_SIZE;
        this.y = (yTile + 0.5) * PhasePunk.TILE_SIZE;
        this.health = health;

        let image:Phaser.Image = new Phaser.Image(game, 0, 0, "enemy_0");
        image.anchor.set(0.5, 0.5);
        this.add(image);
        this.discovered = false;
        this.frozen = 0;

        this.frozenImage = new Phaser.Image(game, 0, 0, "frozen");
        this.frozenImage.anchor.set(0.5, 0.5);
        this.frozenImage.alpha = 0;
        this.add(this.frozenImage);
    }

    move(direction:Phaser.Point):void{
        let gameplayState:GameplayState = <GameplayState>this.game.state.getCurrentState();
        let playerTile:Phaser.Point = this.getTilePosition();
        if(!gameplayState.tileMap.getSolid(playerTile.x + direction.x, playerTile.y + direction.y)){
            this.x += direction.x * PhasePunk.TILE_SIZE;
            this.y += direction.y * PhasePunk.TILE_SIZE;
        }
    }

    takeDamage(damage:number){
        this.health -= damage;
        if(this.health <= 0){
            this.health = 0;
        }
    }

    attack():void{
        let gameplayState:GameplayState = <GameplayState>this.game.state.getCurrentState();
        gameplayState.player.takeDamage(1);
    }

    stepUpdate():void{
        let gameplay:GameplayState = <GameplayState>this.game.state.getCurrentState();
        let currentPos:Phaser.Point = this.getTilePosition();
        if(!this.discovered){
            if(gameplay.fogOfWar.getTile(currentPos.x, currentPos.y, gameplay.fogOfWar.getLayerIndex("layer1")) == null){
                this.discovered = true;
            }
            return;
        }
        if(this.frozen > 0){
            this.frozen -= 1;
            return;
        }

        let direction:Phaser.Point = new Phaser.Point();
        if(!gameplay.tileMap.getSolid(currentPos.x, currentPos.y-1) && 
            gameplay.dijkstraMap[currentPos.y-1][currentPos.x]<gameplay.dijkstraMap[currentPos.y][currentPos.x]){
            direction.y = -1;
        }
        else if(!gameplay.tileMap.getSolid(currentPos.x, currentPos.y+1) && 
            gameplay.dijkstraMap[currentPos.y+1][currentPos.x]<gameplay.dijkstraMap[currentPos.y][currentPos.x]){
            direction.y = 1;
        }
        else if(!gameplay.tileMap.getSolid(currentPos.x-1, currentPos.y) && 
            gameplay.dijkstraMap[currentPos.y][currentPos.x-1]<gameplay.dijkstraMap[currentPos.y][currentPos.x]){
            direction.x = -1;
        }
        else if(!gameplay.tileMap.getSolid(currentPos.x+1, currentPos.y) && 
            gameplay.dijkstraMap[currentPos.y][currentPos.x+1]<gameplay.dijkstraMap[currentPos.y][currentPos.x]){
            direction.x = 1;
        }
        if(gameplay.dijkstraMap[currentPos.y + direction.y][currentPos.x + direction.x] == 0){
            this.attack();
        }
        else{
            this.move(direction);
        }
    }

    update():void{
        super.update();

        this.frozenImage.alpha = this.frozen / 4;
    }
}