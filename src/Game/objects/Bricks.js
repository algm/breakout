import Brick from './Brick';

const settings = {
    width: 50,
    height: 20,
    count: {
        row: 3,
        col: 7
    },
    offset: {
        top: 50,
        left: 60
    },
    padding: 10
};

export default class Bricks {
    constructor(game) {
        this.game = game;
        this.bricks = null;
        this.objects = [];
    }

    init() {
        this.bricks = this.game.add.group();

        for (let c = 0; c < settings.count.col; c++) {
            for (let r = 0; r < settings.count.row; r++) {
                let brickX = (c * (settings.width + settings.padding)) + settings.offset.left;
                let brickY = (r * (settings.height + settings.padding)) + settings.offset.top;

                let newBrick = new Brick(this.game, this.bricks, brickX, brickY);
                this.objects.push(newBrick);
            }
        }
    }

    getBricks() {
        return this.objects;
    }

    getGroup() {
        return this.bricks;
    }
}
