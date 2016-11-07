class Direction{
    static LEFT:number = 0;
    static RIGHT:number = 1;
    static UP:number = 2;
    static DOWN:number = 3;
    static NONE:number = 4;

    static reverseDirection(dir:number):number{
        return Math.floor(dir / 2) * 2 + (dir + 1) % 2;
    }

    static getPoint(dir:number):Phaser.Point{
        return new Phaser.Point(( 1 - Math.floor(dir / 2)) * (2 * (dir % 2) - 1), 
            Math.floor(dir / 2) * (2 * (dir % 2) - 1));
    }

    static getDirection(point:Phaser.Point):number{
        return Math.floor((point.x + 1) / 2) + 
            Math.floor((point.y + 1) / 2) + Math.abs(point.y) * 2;
    }

    static getRandomDirection(game:Phaser.Game){
        let x:number = game.rnd.integerInRange(0, 3);
        if(x == 0){
            return new Phaser.Point(0, 1);
        }
        if(x == 1){
            return new Phaser.Point(0, -1);
        }
        if(x == 2){
            return new Phaser.Point(1, 0);
        }
        return new Phaser.Point(-1, 0);
    }
}