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
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0,
        // 暂存 Game 对象的引用
        game: {
            default: null,
            serializable: false
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getMonsterDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked()
            return
        }
    },

    getMonsterDistance () {
        // 根据 player 节点位置判断距离
        let pos = this.game.player.getPosition()
        // 根据两点位置计算两点之间距离
        return cc.pDistance(this.node.position, pos)
    },
    // 收集
    onPicked () {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar()
        // 调用 Game 脚本的得分方法
        this.game.gainScore()
        // 然后销毁当前星星节点
        this.node.destroy()
    }
});
