import Phaser from 'phaser';

export default class Brick {
    constructor(game, collection, x, y) {
        this.game = game;
        this.sprite = game.add.sprite(x, y, 'brick');
        this.collection = collection;

        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
        this.sprite.anchor.set(0.5);
        this.collection.add(this.sprite);
    }

    update() {

    }
}

