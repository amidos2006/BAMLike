class SimpleGame {
    game: Phaser.Game;
    
    constructor() {
        this.game = new Phaser.Game(400, 400, Phaser.AUTO, 'content', null, false, false);
        
        this.game.state.add("Loading", LoadingState, false);
        this.game.state.add("Gameplay", GameplayState, false);
        
        this.game.state.start("Loading", false, false);
    }
}

window.onload = () => {
    var game:SimpleGame = new SimpleGame();
};