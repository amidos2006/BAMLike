/// <reference path="../GameEntity/FadeInOutEntity.ts" />

class BaseState extends Phaser.State{
    layers:Layer[];
    fadeInOutEntity:FadeInOutEntity;

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
        
        this.camera.setPosition(0, 0);
    }

    update():void{
        super.update();

        for(let i:number = 0; i<Layer.TRANSITION_LAYER + 1; i++){
            if(!this.layers[i].fixedToCamera){
                this.layers[i].sort("layer", Phaser.Group.SORT_ASCENDING);
            }
        }

        PhasePunk.soundManager.update();
    }
}