/// <reference path="BaseState.ts" />

class GameplayState extends BaseState {
    player: PlayerEntity;
    tileMap: GameTilemap;
    fogOfWar: GameTilemap;
    dijkstraMap: number[][];
    enemies: BaseEnemyEntity[];
    treasures:BaseTreasureEntity[];

    constructor() {
        super();
    }

    isSolid(x: number, y: number, level: String[][]): boolean {
        if (x < 0) {
            return true;
        }
        if (y < 0) {
            return true;
        }
        if (x > level[0].length - 1) {
            return true;
        }
        if (y > level.length - 1) {
            return true;
        }
        return level[y][x].trim() == "solid";
    }

    getSolidTileValue(level: String[][], x: number, y: number): number {
        let result: number = 0;
        if (this.isSolid(x - 1, y, level)) {
            result += 4;
        }
        if (this.isSolid(x + 1, y, level)) {
            result += 2;
        }
        if (this.isSolid(x, y - 1, level)) {
            result += 1;
        }
        if (this.isSolid(x, y + 1, level)) {
            result += 8;
        }

        return result;
    }

    calculateDijkstra(x: number, y: number): void {
        let nodes: Phaser.Point[] = [new Phaser.Point(x, y)];
        while (nodes.length > 0) {
            let current: Phaser.Point = nodes.splice(0, 1)[0];
            if (!this.tileMap.getSolid(current.x - 1, current.y, false)) {
                let value: number = this.dijkstraMap[current.y][current.x] + 1;
                if (this.dijkstraMap[current.y][current.x - 1] == -1) {
                    this.dijkstraMap[current.y][current.x - 1] = value;
                    nodes.push(new Phaser.Point(current.x - 1, current.y));
                }
                else if (this.dijkstraMap[current.y][current.x - 1] > value) {
                    this.dijkstraMap[current.y][current.x - 1] = value;
                }
            }
            if (!this.tileMap.getSolid(current.x + 1, current.y, false)) {
                let value: number = this.dijkstraMap[current.y][current.x] + 1;
                if (this.dijkstraMap[current.y][current.x + 1] == -1) {
                    this.dijkstraMap[current.y][current.x + 1] = value;
                    nodes.push(new Phaser.Point(current.x + 1, current.y));
                }
                else if (this.dijkstraMap[current.y][current.x + 1] > value) {
                    this.dijkstraMap[current.y][current.x + 1] = value;
                }
            }
            if (!this.tileMap.getSolid(current.x, current.y - 1, false)) {
                let value: number = this.dijkstraMap[current.y][current.x] + 1;
                if (this.dijkstraMap[current.y - 1][current.x] == -1) {
                    this.dijkstraMap[current.y - 1][current.x] = value;
                    nodes.push(new Phaser.Point(current.x, current.y - 1));
                }
                else if (this.dijkstraMap[current.y - 1][current.x] > value) {
                    this.dijkstraMap[current.y - 1][current.x] = value;
                }
            }
            if (!this.tileMap.getSolid(current.x, current.y + 1, false)) {
                let value: number = this.dijkstraMap[current.y][current.x] + 1;
                if (this.dijkstraMap[current.y + 1][current.x] == -1) {
                    this.dijkstraMap[current.y + 1][current.x] = value;
                    nodes.push(new Phaser.Point(current.x, current.y + 1));
                }
                else if (this.dijkstraMap[current.y + 1][current.x] > value) {
                    this.dijkstraMap[current.y + 1][current.x] = value;
                }
            }
        }
    }

    create() {
        super.create();
        let data = {
            "mapData": ["25x25", "solid:empty"],
            "roomData": ["equal:2x2:4", "empty:1|solid:2"],
            "names": ["empty:-1", "solid:-1", "player:1", "enemy:60", "treasure:10"],
            "neighbourhoods": {
                "plus": "010,101,010",
                "all": "111,101,111"
            },
            "generationRules": [
                {
                    "genData": ["1", "room:-1", "connect:plus:1"],
                    "rules": ["empty,all,or,solid>5,solid:1"]
                },
                {
                    "genData": ["0", "map:-1", "connect:plus:1"],
                    "rules": []
                },
                {
                    "genData": ["1", "room:-1", "connect:plus:1"],
                    "rules": ["solid,all,or,empty>3,empty:1"]
                },
                {
                    "genData": ["4", "map:-1", "none:plus:1"],
                    "rules": ["empty,plus,or,solid<1,player:1|empty:100"]
                },
                {
                    "genData": ["2", "map:-1", "none:plus:0"],
                    "rules": ["empty,plus,or,solid<3,enemy:1|empty:30"]
                },
                {
                    "genData": ["1", "map:-1", "none:plus:0"],
                    "rules": ["empty,plus,or,solid==3,treasure:1"]
                }
            ]
        };
        procengine.initialize(data);
        let level: String[][] = procengine.generateMap();
        let playerPos: Phaser.Point = new Phaser.Point();
        this.tileMap = new GameTilemap(this.game, level.length, level[0].length, this.layers[Layer.TILE_LAYER]);
        this.fogOfWar = new GameTilemap(this.game, level.length, level[0].length, this.layers[Layer.UPPER_LAYER]);
        this.dijkstraMap = [];
        this.enemies = [];
        this.treasures = [];
        for (let y: number = 0; y < this.tileMap.getHeight(); y++) {
            this.dijkstraMap.push([]);
            for (let x: number = 0; x < this.tileMap.getWidth(); x++) {
                this.dijkstraMap[y].push(-1);
                let weird: number = -1;
                if (this.game.rnd.realInRange(0, 1) < 0.1 && level[y][x] != "solid") {
                    weird = this.game.rnd.integerInRange(4, 6);
                }
                else {
                    weird = this.game.rnd.integerInRange(0, 3);
                }
                this.tileMap.setTile(weird, 1, x, y);
                if (level[y][x] == "solid") {
                    weird = 6 + this.getSolidTileValue(level, x, y);
                    this.tileMap.setTile(weird, 2, x, y);
                    this.tileMap.setSolid(true, x, y);
                }
                this.fogOfWar.setTile(22, 1, x, y);
                if (level[y][x] == "player") {
                    playerPos.x = x;
                    playerPos.y = y;
                }
                if (level[y][x] == "enemy") {
                    this.enemies.push(new BaseEnemyEntity(this.game, x, y, 1));
                    this.layers[Layer.OBJECT_LAYER].add(this.enemies[this.enemies.length - 1]);
                }
                if (level[y][x] == "treasure") {
                    this.treasures.push(new BaseTreasureEntity(this.game, x, y));
                    this.layers[Layer.OBJECT_LAYER].add(this.treasures[this.treasures.length - 1]);
                }
            }
        }

        this.player = new PlayerEntity(this.game, playerPos.x, playerPos.y);
        this.player.clearAround();

        this.dijkstraMap[playerPos.y][playerPos.x] = 0;
        this.calculateDijkstra(playerPos.x, playerPos.y);

        this.layers[Layer.OBJECT_LAYER].add(this.player);
        this.layers[Layer.HUD_LAYER].add(new HUDEntity(this.game, 0, 0));
    }

    selectNearestPoint(p:Phaser.Point, ps:Phaser.Point[]):Phaser.Point{
        let priority:number[] = [1/(Math.abs(ps[0].x - p.x) + Math.abs(ps[0].y - p.y))];
        for(let i=1; i<ps.length; i++){
            priority.push(1/(Math.abs(ps[0].x - p.x) + Math.abs(ps[0].y - p.y)) + priority[i-1]);
        }
        for(let i=0; i<ps.length; i++){
            priority[i] /= priority[priority.length - 1];
        }
        let value:number = this.game.rnd.realInRange(0, 1);
        for(let i=0; i<ps.length; i++){
            if(value < priority[i]){
                return ps[i];
            }
        }
        return ps[ps.length - 1];
    }

    createNewEnemy(probability:number):void{
        if(this.game.rnd.realInRange(0, 1)>probability){
            return;
        }

        let ps:Phaser.Point[] = [];
        for(let x:number=0; x<this.tileMap.getWidth(); x++){
            for(let y:number=0; y<this.tileMap.getHeight(); y++){
                if(!this.tileMap.getSolid(x, y) && !this.player.getTilePosition().equals(new Phaser.Point(x, y)) && 
                    this.fogOfWar.getTile(x, y, this.fogOfWar.getLayerIndex("layer1")) == null){
                    ps.push(new Phaser.Point(x, y));
                }
            }
        }
        if(ps.length > 0){
            let selected:Phaser.Point = this.selectNearestPoint(this.player.getTilePosition(), ps);
            this.enemies.push(new BaseEnemyEntity(this.game, selected.x, selected.y, 1));
            this.layers[Layer.OBJECT_LAYER].add(this.enemies[this.enemies.length - 1]);
        }
    }

    update(): void {
        super.update();

        if(this.player.currentHealth <= 0){
            return;
        }

        let direction: Phaser.Point = new Phaser.Point();
        let spacebar: boolean = false;
        let spell:boolean = false;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            direction.y -= 1;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            direction.y += 1;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            direction.x -= 1;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            direction.x += 1;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            spacebar = true;
            this.game.input.reset();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            spell = true;
            this.game.input.reset();
        }
        if (direction.x != 0 && direction.y != 0) {
            direction.x = 0;
        }

        if (direction.x != 0 || direction.y != 0 || spacebar || spell) {
            if (spacebar) {
                this.player.refresh();
            }
            else if(spell){
                this.player.castSpell();
            }
            else {
                this.player.updateStep(direction);
            }
            let playerPos: Phaser.Point = this.player.getTilePosition();
            for (let i: number = 0; i < this.dijkstraMap.length; i++) {
                for (let j: number = 0; j < this.dijkstraMap[i].length; j++) {
                    this.dijkstraMap[i][j] = -1;
                }
            }
            this.dijkstraMap[playerPos.y][playerPos.x] = 0;
            this.calculateDijkstra(playerPos.x, playerPos.y);
            for (let i: number = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].health > 0) {
                    this.enemies[i].stepUpdate();
                }
            }
            if(spacebar){
                this.createNewEnemy(0.75);
            }
            else{
                this.createNewEnemy(0.1);
            }
        }
        if (this.player.currentHealth <= 0) {
            this.player.destroy();
        }
        for (let i: number = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].health <= 0) {
                PhasePunk.score += 1;
                this.enemies[i].destroy();
                this.enemies.splice(i, 1);
                i--;
            }
        }
    }

    render(): void {
        super.render();
    }
}