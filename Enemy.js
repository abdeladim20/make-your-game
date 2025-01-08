export default class Enemy {
  constructor(x, y, imageNumber) {
    this.x = x;
    this.y = y;

    this.image = new image();
    this.image.src = `images/enemy${imageNumber}.png`;
  }
}
