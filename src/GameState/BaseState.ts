/// <reference path="../GameEntity/FadeInOutEntity.ts" />

class BaseState extends Phaser.State{
    layers:Layer[];
    fadeInOutEntity:FadeInOutEntity;
    vibrate:boolean;

    constructor(){
        super();
    }

    create(){
        this.layers = [];
        for(let i:number = 0; i<Layer.TRANSITION_LAYER + 1; i++){
            this.layers.push(new Layer(this.game));
            this.add.existing(this.layers[i]);
        }
        this.layers[Layer.HUD_LAYER].fixedToCamera = true;
        this.layers[Layer.TRANSITION_LAYER].fixedToCamera = true;

        this.fadeInOutEntity = new FadeInOutEntity(this.game, 0x000000);
        this.layers[Layer.TRANSITION_LAYER].add(this.fadeInOutEntity)
        
        this.world.setBounds(-10, -10, this.game.width + 20, this.game.height + 20);
        this.camera.setBoundsToWorld();
        this.camera.setPosition(0, 0);

        this.vibrate = false;
    }

    startVibrating():void{
        this.vibrate = true;
        let timer:Phaser.Timer = new Phaser.Timer(this.game);
        timer.repeat(100, 1, ()=>{this.vibrate = false; this.camera.x = 0; this.camera.y = 0;}, this);
        this.game.time.add(timer);
        timer.start();
    }

    cameraVibrate():void{
        if(this.vibrate){
            this.camera.x = this.game.rnd.integerInRange(-5, 5);
            this.camera.y = this.game.rnd.integerInRange(-5, 5);
        }
    }

    update():void{
        super.update();

        for(let i:number = 0; i<Layer.TRANSITION_LAYER + 1; i++){
            if(!this.layers[i].fixedToCamera){
                this.layers[i].sort("layer", Phaser.Group.SORT_ASCENDING);
            }
        }

        PhasePunk.soundManager.update();
        this.cameraVibrate();
    }
}