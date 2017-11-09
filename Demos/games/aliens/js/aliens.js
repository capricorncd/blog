var GameAliens = function () {

  var q = function (selector) {
    return document.querySelector(selector);
  }

  var binaryTree =  new BinaryTree();
  // init alienSiteArray
  var nodesForAlien = [];

  var keys = [];

  // var nodesForAlien = [];
  for (var i = 0; i < 20; i++) {
    var key = Math.floor(Math.random() * 281);
    binaryTree.insert(key);
    nodesForAlien.push({
      key: key,
      selected: false
    })
    keys.push(key);
  }

  // activate first alienSite
  var alienNodeSelect = Math.floor(Math.random() * 20);
  // binaryTree.updateSelected(alienNodeSelect, true);

  nodesForAlien[alienNodeSelect] = binaryTree.search(keys[alienNodeSelect]);
  nodesForAlien[alienNodeSelect].selected = true;

  // Game section
  var alienX,
      alienY = 20,
      guessX = 0,
      guessY = 0,
      shotsRemaning = 8,
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

  // 开始游戏
  var palyGame = function () {
    shotsRemaning -= 1;
    shotsMade += 1;
    gameState = '炮弹数量：' + shotsRemaning;

    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);

    var alienNode = binaryTree.search(guessX);
    if (alienNode !== null && alienNode.selected === true) {
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
      nodesForAlien[alienNodeSelect].selected = false;
      alienNodeSelect = Math.floor(Math.random() * 20);
      nodesForAlien[alienNodeSelect] = binaryTree.search(keys[alienNodeSelect]);
      nodesForAlien[alienNodeSelect].selected = true;
      alienX = nodesForAlien[alienNodeSelect].key;
      alienY += 30;
    }

    // 重新绘制stage
    render();
    console.log('X: ' + alienX, 'Y: ' + alienY);
  }

  var render = function () {
    alien.style.left = alienX + 'px';
    alien.style.top = alienY + 'px';

    cannon.style.left = guessX + 'px';

    missile.style.left = guessX + 'px';
    missile.style.top = guessY + 'px';

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

  return {
    init: function () {
      button.addEventListener('click', clickHandler, false);
      window.addEventListener('keyup', keyupHandler, false);
    }
  }

}();
