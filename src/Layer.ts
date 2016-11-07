class Layer extends Phaser.Group{
    static BACKGROUND_LAYER:number = 0;
    static TILE_LAYER:number = 1;
    static OBJECT_LAYER:number = 2;
    static UPPER_LAYER:number = 3;
    static PARTICLE_LAYER:number = 4;
    static HUD_LAYER:number = 5;
    static TRANSITION_LAYER:number = 6;

    constructor(game:Phaser.Game){
        super(game);
    }

    getFirstEntity(collisionName:string):BaseEntity{
        for(let i:number=0; i<this.children.length; i++){
            let e:BaseEntity = <BaseEntity>this.getChildAt(i);
            if(e.collisionName == collisionName){
                return e;
            }
        }

        return null;
    }

    getEntities(collisionName:string):BaseEntity[]{
        let result:BaseEntity[] = [];
        for(let i:number=0; i<this.children.length; i++){
            let e:BaseEntity = <BaseEntity>this.getChildAt(i);
            if(e.collisionName == collisionName){
                result.push(e);
            }
        }

        return result;
    }

    getPoint(x:number, y:number, collisionName:string):BaseEntity{
        let result:BaseEntity[] = this.getEntities(collisionName);
        for(let i:number=0; i<result.length; i++){
            if(result[i].checkPoint(x, y)){
                return result[i];
            }
        }

        return null;
    }
}