// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    spawnNewStar () {
        // 使用给定的模板在场景中生成一个新节点
        let newStar = cc.instantiate(this.starPrefab)
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar)
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition())

        // 将 Game 组件的实例传入星星组件
        newStar.getComponent('Star').game = this
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration)
        this.timer = 0
    },

    getNewStarPosition () {
        let randX = 0
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        let randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        let maxX = this.node.width / 2
        randX = cc.randomMinus1To1() * maxX
        // 返回星星坐标
        return cc.p(randX, randY)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.isGameOver = false
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height / 2
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0
        // 生成一个新的星星
        this.spawnNewStar()
        // 初始化计分
        this.score = 0
        // 重新开始游戏
        this.restart()
    },

    start () {

    },

    update (dt) {
        // 加入计时器更新和判断超过时限的逻辑：
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver()
            return
        }
        this.timer += dt
    },

    gainScore: function () {
        this.score += 1
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString()
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false)
    },

    gameOver () {
        //停止 player 节点的跳跃动作
        this.player.stopAllActions() 
        this.isGameOver = true
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'GameOver\n Score: ' + this.score.toString() + '\n Enter key to Restart'
        // cc.director.loadScene('game')
    },

    restart () {
        // 松开按键时，停止向该方向的加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e) => {
            if (e.keyCode === cc.KEY.enter) {
                if (this.isGameOver) {
                    cc.director.loadScene('game')
                    this.isGameOver = false
                }
            }
        })
    }
});
