class PhasePunk{
    static TILE_SIZE:number = 16;

    static soundManager:SoundManager;
    static game:Phaser.Game;
    static score:number;
    
    static initialize(game:Phaser.Game):void{
        PhasePunk.soundManager = new SoundManager(game);
        PhasePunk.game = game;
    }

    static newGame():void{
        PhasePunk.score = 0;
    }

    static getBaseState():BaseState{
        return <BaseState>PhasePunk.game.state.getCurrentState();
    }

    static RGBtoString(rgb:number){
        return "rgb(" + (rgb >> 16)%256 + ", " + 
            (rgb >> 8) % 256 + ", " + (rgb)%256 + ")";
    }

    static HSVtoRGB(h:number, s:number, v:number):number {
        var r:number, g:number, b:number, i:number, f:number, p:number, q:number, t:number;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return (Math.round(r * 255)<<16) + (Math.round(g * 255)<<8) + Math.round(b * 255);
    }

    static saveGame():void{
        var date = new Date();
        date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000)
        var value:string = "music=" + PhasePunk.soundManager.music + 
            " sound=" + PhasePunk.soundManager.sound;
        value += " expires=" + date.toUTCString() +
            " path=/";
        document.cookie = value;
    }

    static loadGame():void{
        var array:string[] = (<string>document.cookie).split(" ");
        for(var i:number=0; i<array.length; i++){
            var key:String = array[i].split("=")[0];
            var value:String = array[i].split("=")[1];
            if(key.trim() == "sound"){
                PhasePunk.soundManager.sound = value.trim() == "true";
            }
            if(key.trim() == "music"){
                PhasePunk.soundManager.music = value.trim() == "true";
            }
        }
    }

    static mapLinear(value:number, a1:number, a2:number, b1:number, b2:number):number{
        return Phaser.Math.clamp(Phaser.Math.mapLinear(value, a1, a2, b1, b2), Math.min(b1, b2), Math.max(b1, b2))
    }
}