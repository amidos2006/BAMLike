class GameTilemap extends Phaser.Tilemap{
    private solid:boolean[][];

    constructor(game:Phaser.Game, width:number, height:number, parent:Phaser.Group){
        super(game, null, PhasePunk.TILE_SIZE, PhasePunk.TILE_SIZE);

        this.solid = [];
        for(let y:number=0; y<height; y++){
            this.solid.push([]);
            for(let x:number=0; x<width; x++){
                this.solid[y].push(false);
            }
        }
        this.addTilesetImage("tiles");
        this.create("layer1", width, height, PhasePunk.TILE_SIZE, PhasePunk.TILE_SIZE, parent); 
        this.createBlankLayer("layer2", width, height, PhasePunk.TILE_SIZE, PhasePunk.TILE_SIZE, parent); 
    }

    getWidth():number{
        return this.solid[0].length;
    }

    getHeight():number{
        return this.solid.length;
    }

    setTile(id:number, layerID:number, x:number, y:number):void{
        if(x >= 0 && y >= 0 && x < this.getWidth() && y < this.getHeight()){
            this.putTile(id, x, y, this.getLayerIndex("layer" + layerID));
        }
    }

    clearTile(layerID:number, x:number, y:number):void{
        if(x >= 0 && y >= 0 && x < this.getWidth() && y < this.getHeight()){
            this.putTile(null, x, y, this.getLayerIndex("layer" + layerID));
        }
    }

    setSolid(value:boolean, x:number, y:number):void{
        if(x >= 0 && y >= 0 && x < this.getWidth() && y < this.getHeight()){
            this.solid[y][x] = value;
        }
    }

    getSolid(x:number, y:number, enable:boolean=true):boolean{
        if(enable){
            let gameplay:GameplayState = <GameplayState>this.game.state.getCurrentState();
            for(let i:number=0; i<gameplay.enemies.length; i++){
                let point:Phaser.Point = gameplay.enemies[i].getTilePosition();
                if(point.equals(new Phaser.Point(x, y))){
                    return true;
                }
            }
            for(let i:number=0; i<gameplay.treasures.length; i++){
                let point:Phaser.Point = gameplay.treasures[i].getTilePosition();
                if(point.equals(new Phaser.Point(x, y))){
                    return true;
                }
            }
        }

        if(x >= 0 && y >= 0 && x < this.getWidth() && y < this.getHeight()){
            return this.solid[y][x];
        }
        return false;
    }
}