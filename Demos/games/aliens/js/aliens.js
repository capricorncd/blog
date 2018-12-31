/**
 * Create by Capricorncd
 * https://github.com/capricorncd
 */
var GameAliens = function () {

  var q = function (selector) {
    return document.querySelector(selector);
  }

  // Game section
  var alienX,
      alienY = 0,
      guessX = 0,
      guessY = 0,
      missileX = 0,
      missileY = 0,
      // cannonX = 0,
      // cannonY = 0,
      shotsRemaning = 8000,
      shotsMade = 0,
      gameState = '',
      gameWon = false;

  var cannon = q('.cannon'),
      alien = q('.alien'),
      missile = q('.missile'),
      explosion = q('.explosion'),
      inputX = q('.input-x-hook'),
      inputY = q('.input-y-hook'),
      output = q('.output'),
      button = q('.button-hook');

  // 实例化BinaryTree()
  var binaryTree =  new BinaryTree();
  // 外星人节点
  var nodesForAlien = {};
  // 随机生成一个外星人位置key
  var alienNodeKey;
  // 随机生成的外星人节点key数组
  var keys = [];

  // 随机设置alien当前alienX位置
  var getRandomKey = function () {
    return keys[Math.floor(Math.random() * 20)];
  }

  // 开始游戏
  var palyGame = function () {
    shotsRemaning -= 1;
    shotsMade += 1;
    gameState = '炮弹数量：' + shotsRemaning;

    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);

    var alienNode = binaryTree.search(guessX);
    if (alienNode !== null && nodesForAlien[alienNode.key].selected === true) {
      if (guessY >= alienY && guessY <= alienY + 20) {
        gameWon = true;
        endGame();
      }
    }
    // 二叉树中找不到节点，即炮弹没有击中
    else {
      output.innerHTML = '没有击中！<br>' + gameState;
      // 判断炮弹数量
      if (shotsRemaning < 1) {
        endGame();
      }
    }

    // 没有击中，改变外星人位置
    if (!gameWon) {
      nodesForAlien[alienNodeKey].selected = false;
      alienNodeKey = getRandomKey();
      nodesForAlien[alienNodeKey].selected = true;
      alienX = alienNodeKey;
      alienY += 30;
      missileX = guessX;
      missileY = guessY;
    }

    // 重新绘制stage
    render();
    console.log('X: ' + alienX, 'Y: ' + alienY);
  }

  var render = function () {
    alien.style.left = alienX + 'px';
    alien.style.top = alienY + 'px';

    cannon.style.left = guessX + 'px';

    missile.style.left = missileX + 'px';
    missile.style.top = missileY + 'px';

    if (gameWon) {
      explosion.style.display = 'block';
      explosion.style.left = alienX + 'px';
      explosion.style.top = alienY + 'px';

      alien.style.display = 'none';
      missile.style.display = 'none';
    }
  }

  var endGame = function () {
    if (gameWon) {
      output.innerHTML = 'Hit!你拯救了地球<br>你发射了炮弹'+ shotsRemaning +'枚';
    } else {
      output.innerHTML = '失败了！<br>外星人已侵入地球。'
    }
    button.removeEventListener('click', clickHandler, false);
    button.disabled = true;
    window.removeEventListener('keyup', keyupHandler, false);
    inputX.disabled = true;
    inputY.disabled = true;
  }

  // 检查用户输入是否为有效值
  var validateInput = function () {
    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);
    if (isNaN(guessX) || isNaN(guessY)) {
      output.innerHTML = '请输入坐标值';
    } else if (guessX > 300 || guessY > 300) {
      output.innerHTML = '坐标值不能大于 300';
    } else {
      palyGame();
    }
  }

  var clickHandler = function (e) {
    e.stopPropagation();
    validateInput();
  }

  var keyupHandler = function (e) {
    e.stopPropagation();
    if (e.keyCode === 13) {
      validateInput();
    }
  }

  // 初始化游戏
  var initGame = function () {

    guessX = 140;
    missileX = 142;
    missileY = 272;

    for (var i = 0; i < 20; i++) {
      // 随机生成key
      var key = Math.floor(Math.random() * 281);
      // 创建外星人X轴位置排序二叉树
      binaryTree.insert(key);
      // 初始化外星人节点数组，key与外星人二叉树key值相同
      nodesForAlien[key] = { selected: false }
      // 存储随机生成的key值
      keys.push(key);
    }

    // 随机生成一个外星人位置key
    alienNodeKey = getRandomKey();
    alienX = alienNodeKey;
    nodesForAlien[alienNodeKey].selected = true;

    button.addEventListener('click', clickHandler, false);
    window.addEventListener('keyup', keyupHandler, false);

    render();
  }

  return {
    init: function () {
      initGame();
    }
  }

}();
