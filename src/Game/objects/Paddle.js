import Phaser from 'phaser';

export default class Paddle {
    constructor(game, ball) {
        this.game = game;
        this.ball = ball;
        this.sprite = game.add.sprite(game.world.width * 0.5, game.world.height - 5, 'paddle');
        this.sprite.anchor.set(0.5, 1);
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.immovable = true;
    }

    update(playing = false) {
        if (playing) {
            this.sprite.x = this.game.input.x || this.game.world.width * 0.5;
        }
    }
}

