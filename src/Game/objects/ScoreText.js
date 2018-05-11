
export default class ScoreText {
    constructor(game) {
        this.game = game;
        this.sprite = this.game.add.text(5, 5, 'Points: 0', {
            font: '18px Arial',
            fill: '#0095DD'
        });

    }

    setText(newText) {
        this.sprite.setText(newText);

        return this;
    }

    update() {

    }
}
