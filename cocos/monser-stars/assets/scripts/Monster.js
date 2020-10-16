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
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0
    },

    setJumpAction () {
        let jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut())
        let jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn())
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown))
    },

    handleInput () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, e => {
            switch (e.keyCode) {
                case cc.KEY.left:
                    this.accelLeft = true
                    break
                case cc.KEY.right:
                    this.accelRight = true
                    break
            }
        })
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, e => {
            switch (e.keyCode) {
                case cc.KEY.left:
                    this.accelLeft = false
                    break
                case cc.KEY.right:
                    this.accelRight = false
                    break
            }
        })
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.jumpAction = this.setJumpAction()
        this.node.runAction(this.jumpAction)
        this.accelLeft = false
        this.accelRight = false
        this.xSpeed = 0
        this.handleInput()
    },

    start () {

    },

    update (dt) {
        // cc.log(dt)
        if (this.accelLeft) {
            this.xSpeed -= this.accel * dt
        } else if (this.accelRight) {
            this.xSpeed += this.accel * dt
        }
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }
        this.node.x += this.xSpeed * dt
    }
});
