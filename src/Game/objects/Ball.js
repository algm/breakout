import Phaser from 'phaser';

export default class Ball {
    constructor(game) {
        this.sprite = game.add.sprite(game.world.width * 0.5, game.world.height - 25, 'ball');
        game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.body.velocity.set(150, -150);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.set(1);

        //lose condition
        game.physics.arcade.checkCollision.down = false;
        this.sprite.checkWorldBounds = true;
        this.sprite.events.onOutOfBounds.add(() => {
            //alert('Game over!');
            //location.reload();
        });
    }

    update() {

    }
}
