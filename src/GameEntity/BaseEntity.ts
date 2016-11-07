class BaseEntity extends Phaser.Group{
    rect:Phaser.Rectangle;
    collisionName:string;
    layer:number;

    constructor(game:Phaser.Game){
        super(game);

        this.collisionName = "";
        this.layer = 0;
    }

    getTilePosition():Phaser.Point{
        return new Phaser.Point(Math.floor(this.x / PhasePunk.TILE_SIZE), 
            Math.floor(this.y / PhasePunk.TILE_SIZE));
    }

    checkCollision(x:number, y:number, e:BaseEntity):boolean{
        let firstRect:Phaser.Rectangle = this.rect.clone(null);
        firstRect.x += this.x + x;
        firstRect.y += this.y + y;
        let secondRect:Phaser.Rectangle = e.rect.clone(null);
        secondRect.x += e.x;
        secondRect.y += e.y;

        return firstRect.intersects(secondRect, 0);
    }

    checkPoint(x:number, y:number):boolean{
        let firstRect:Phaser.Rectangle = this.rect.clone(null);
        firstRect.x += this.x;
        firstRect.y += this.y;

        return firstRect.contains(x, y);
    }

    checkName(x:number, y:number, collisionName:string, layerIndex:number):BaseEntity{
        let result:BaseEntity[] = PhasePunk.getBaseState().layers[layerIndex].getEntities(collisionName);

        for(let i:number=0; i<result.length; i++){
            if(this.checkCollision(x, y, result[i])){
                return result[i];
            }
        }
        return null;
    }
}