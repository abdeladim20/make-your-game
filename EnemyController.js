export default class EnemyController {
  enemyMap = [
    [1, 1, 2, 1, 1],
    [1, 2, 3, 2, 1],
    [2, 1, 2, 1, 2], 
  ];

  enemyRows = [];

  constructor(canvas) {
    this.canvas = canvas;
  }

  draw(context) {}

  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNumber, enemyIndex) => {
        if (enemyNumber > 0) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
          );
        }
      });
    });
  }
}
