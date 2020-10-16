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
        // 引用星星预制资源
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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height / 2
        // 生成一个新的星星
        this.spawnNewStar()
        // 初始化计分
        this.score = 0
    },

    start () {

    },

    // update (dt) {},

    // 生成一个新的星星
    spawnNewStar () {
        // 使用给定的模板在场景中生成一个新节点
        const star = cc.instantiate(this.starPrefab)
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(star)
        star.setPosition(this.starRanddPosition())
        // 将 Game 组件的实例传入星星组件
        star.getComponent('Star').game = this
    },
    starRanddPosition () {
        let randX = 0
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        let jumpHeight = this.player.getComponent('Monster').jumpHeight
        let randY = this.groundY + cc.random0To1() * jumpHeight + 50
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        let maxX = this.node.width / 2
        randX = cc.randomMinus1To1() * maxX
        // 返回星星坐标
        return cc.p(randX, randY)
    },

    gainScore () {
        this.score += 1
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = `Score: ${this.score.toString()}`
    }
});
