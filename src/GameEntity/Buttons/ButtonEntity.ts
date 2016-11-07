/// <reference path="../BaseEntity.ts"/>

class ButtonEntity extends BaseEntity{
    onClickSignal:Phaser.Signal;
    upSignal:Phaser.Signal;
    downSignal:Phaser.Signal;
    
    rect:Phaser.Rectangle;
    graphics:Phaser.Graphics;
    firstTime:boolean;

    constructor(game:Phaser.Game, x:number, y:number){
        super(game);

        this.x = x;
        this.y = y;

        this.onClickSignal = new Phaser.Signal();
        this.upSignal = new Phaser.Signal();
        this.downSignal = new Phaser.Signal();
        this.firstTime = true;

        this.graphics = new Phaser.Graphics(this.game, 0, 0);
        this.add(this.graphics);
    }

    clickHandler():void{
        this.firstTime = false;
        this.onClickSignal.dispatch();
    }

    downHandler():void{
        this.downSignal.dispatch();
    }

    upHandler():void{
        this.firstTime = true;
        this.upSignal.dispatch();
    }

    update():void{
        super.update();

        let touchX:number = this.game.input.mousePointer.x - this.x;
        let touchY:number = this.game.input.mousePointer.y - this.y;
        if(this.rect.contains(touchX, touchY)){
            if(this.game.input.mousePointer.isDown){
                this.downHandler();  
                if(this.firstTime){
                    this.clickHandler();
                }
            }
            else{
                this.upHandler();
            }
        }
        else{
            this.upHandler();
        }
    }
}