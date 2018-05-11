import 'pixi';
import 'p2';
import Phaser from 'phaser';
import ball from './assets/img/ball.png';
import paddle from './assets/img/paddle.png';
import brick from './assets/img/brick.png';
import Ball from './objects/Ball';
import Paddle from './objects/Paddle';
import Bricks from './objects/Bricks';
import ScoreText from './objects/ScoreText';

let game = null;
let objects = [];
let bricksCollection = null;
let score = 0;
let scoreText = null;

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
            game.load.image('ball', ball);
            game.load.image('paddle', paddle);
        }

        function create() {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //paddle
            this.paddle = new Paddle(game);
            objects.push(this.paddle);

            //ball
            this.ball = new Ball(game, this.paddle);
            objects.push(this.ball);


            //bricks
            initBricks();

            //score
            scoreText = new ScoreText(game);
            objects.push(scoreText);
        }

        function update() {
            game.physics.arcade.collide(this.ball.sprite, this.paddle.sprite);
            game.physics.arcade.collide(this.ball.sprite, bricksCollection.getGroup(), ballHitBrick);


            for (let obj of objects) {
                obj.update();
            }
        }

        function ballHitBrick(ball, brick) {
            brick.kill();
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
