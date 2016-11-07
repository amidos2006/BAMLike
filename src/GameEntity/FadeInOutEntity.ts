/// <reference path="BaseEntity.ts" />

class FadeInOutEntity extends BaseEntity{
    graphics:Phaser.Graphics;
    tween:Phaser.Tween;

    constructor(game:Phaser.Game, color:number){
        super(game);

        this.graphics = new Phaser.Graphics(game, 0, 0);
        this.graphics.beginFill(color, 1);
        this.graphics.drawRect(0, 0, this.game.width, this.game.height);
        this.graphics.endFill();
        this.alpha = 0;

        this.add(this.graphics);
    }

    fadeIn(time:number):void{
        if(this.tween != null){
            this.tween.stop();
        }
        this.alpha = 0;
        this.tween = new Phaser.Tween(this, this.game, this.game.tweens);
        this.tween.to({alpha: 1}, time);
        this.tween.start();
    }

    fadeOut(time:number):void{
        if(this.tween != null){
            this.tween.stop();
        }
        this.alpha = 1;
        this.tween = new Phaser.Tween(this, this.game, this.game.tweens);
        this.tween.to({alpha: 0}, time);
        this.tween.start();
    }

    destroy():void{
        if(this.tween != null){
            this.tween.stop();
            this.game.tweens.remove(this.tween);
        }
        super.destroy();
    }
}