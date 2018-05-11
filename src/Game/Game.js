import 'pixi';
import 'p2';
import Phaser from 'phaser';
import ball from './assets/img/wobble.png';
import paddle from './assets/img/paddle.png';
import brick from './assets/img/brick.png';
import button from './assets/img/button.png';
import Ball from './objects/Ball';
import Paddle from './objects/Paddle';
import Bricks from './objects/Bricks';
import ScoreText from './objects/ScoreText';

let game = null;
let objects = [];
let bricksCollection = null;
let score = 0;
let scoreText = null;
let playing = false;
let startButton;
let gball = null;

export default {

    init() {
        game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
            preload: preload,
            create: create,
            update: update
        });

        function preload() {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.stage.backgroundColor = '#eee';

            preloadSprites();
        }

        function initBricks() {
            bricksCollection = new Bricks(game);
            bricksCollection.init();

            objects.push(...bricksCollection.getBricks());
        }

        function preloadSprites() {
            game.load.image('brick', brick);
            game.load.spritesheet('ball', ball, 20, 20);
            game.load.image('paddle', paddle);
            game.load.spritesheet('button', button, 120, 40);
        }

        function create() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //paddle
            this.paddle = new Paddle(game);
            objects.push(this.paddle);

            //ball
            gball = this.ball = new Ball(game, this.paddle);
            objects.push(this.ball);

            //bricks
            initBricks();

            //score
            scoreText = new ScoreText(game);
            objects.push(scoreText);

            //start
            startButton = game.add.button(game.world.width * 0.5, game.world.height * 0.5, 'button', startGame, this, 1, 0, 2);
            startButton.anchor.set(0.5);
        }

        function startGame() {
            startButton.destroy();
            gball.start();
            playing = true;
        }

        function update() {
            game.physics.arcade.collide(this.ball.sprite, this.paddle.sprite, ballHitPaddle);
            game.physics.arcade.collide(this.ball.sprite, bricksCollection.getGroup(), ballHitBrick);


            for (let obj of objects) {
                if (typeof obj.update == 'function') {
                    obj.update(playing);
                }
            }
        }

        function ballHitPaddle(ball, paddle) {
            ball.animations.play('wobble');
        }

        function ballHitBrick(ball, brick) {
            ball.animations.play('wobble');
            let killTween = game.add.tween(brick.scale);
            killTween.to({
                x: 0,
                y: 0
            }, 200, Phaser.Easing.Linear.None);
            killTween.onComplete.addOnce(function () {
                brick.kill();
            }, this);
            killTween.start();

            bricksCollection.kill();
            score += 10;
            scoreText.setText('Points: ' + score);

            if (bricksCollection.isEmpty()) {
                alert('You won the game, congratulations!');
                location.reload();
            }

        }
    }
}
