import Phaser from 'phaser';

export default class Ball {
    constructor(game, paddle) {
        this.paddle = paddle;
        this.sprite = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
        this.game = game;
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.lives = 3;
        this.livesText = game.add.text(game.world.width - 5, 5, 'Lives: ' + this.lives, {
            font: '18px Arial',
            fill: '#0095DD'
        });
        this.livesText.anchor.set(1, 0);

        this.lifeLostText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'Life lost, click to continue', {
            font: '18px Arial',
            fill: '#0095DD'
        });
        this.lifeLostText.anchor.set(0.5);
        this.lifeLostText.visible = false;


        this.sprite.body.velocity.set(150, -150);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.set(1);

        //lose condition
        game.physics.arcade.checkCollision.down = false;
        this.sprite.checkWorldBounds = true;
        this.sprite.events.onOutOfBounds.add(this.ballOut.bind(this));


    }

    ballOut() {
        this.lives--;
        if (this.lives) {
            this.livesText.setText('Lives: ' + this.lives);

            this.lifeLostText.visible = true;

            this.sprite.reset(this.game.world.width * 0.5, this.game.world.height - 25);
            this.paddle.sprite.reset(this.game.world.width * 0.5, this.game.world.height - 5);
            this.game.input.onDown.addOnce(function () {
                this.lifeLostText.visible = false;
                this.sprite.body.velocity.set(150, -150);
            }, this);
        } else {
            alert('Game over!');
            location.reload();
        }
    }


    update() {

    }
}
