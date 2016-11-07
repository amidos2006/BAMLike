class SoundManager{
    static MAX_MUSIC:number=0;

    static MUSIC_VOLUME:number = 0.75;
    static SOUND_VOLUME:number = 0.4;
    
    sound:boolean;
    music:boolean;
    game:Phaser.Game;

    currentMusicIndex:number;
    currentMusic:Phaser.Sound;
    currentSounds:Phaser.Sound[];

    constructor(game:Phaser.Game){
        this.sound = true;
        this.music = true;
        this.game = game;
        this.currentSounds = [];
        this.currentMusicIndex = this.game.rnd.integerInRange(0, SoundManager.MAX_MUSIC - 1);
        this.currentMusic = null;
    }

    playMusic(index:number, position:number = 0):void{
        if(this.currentMusic == null || this.currentMusicIndex != index){
            this.stopMusic();
            this.currentMusicIndex = index;
            this.currentMusic = this.game.add.audio("music" + this.currentMusicIndex);
            this.currentMusic.play("", position, SoundManager.MUSIC_VOLUME);
        }
    }

    stopMusic():void{
        if(this.currentMusic != null){
            this.currentMusic.stop();
            this.currentMusic.destroy();
            this.currentMusic = null;
        }
    }

    playSound(key:string):void{
        if(this.sound){
            this.currentSounds.push(this.game.add.audio(key));
            this.currentSounds[this.currentSounds.length - 1].play("", 0, SoundManager.SOUND_VOLUME);
        }
    }

    playCorrectTrack():void{
        if(SoundManager.MAX_MUSIC > 0 && (this.currentMusic == null || 
            (!this.currentMusic.isPlaying && this.currentMusic.currentTime > 10))){
            this.playMusic((this.currentMusicIndex + 
                this.game.rnd.integerInRange(1, SoundManager.MAX_MUSIC - 1)) % SoundManager.MAX_MUSIC);
        }
    }

    update():void{
        if(!this.music){
            this.stopMusic();
        }
        else{
            this.playCorrectTrack();
        }

        for(let i:number=0; i<this.currentSounds.length; i++){
            if(!this.currentSounds[i].isPlaying){
                this.currentSounds[i].destroy();
                this.currentSounds.splice(i, 1);
                i--;
            }
        }
    }
}