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
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
        // 跳跃音效资源
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    setJumpAction () {
        // 跳跃上升
        let jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut())
        // 下落
        let jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn())
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        let callback = cc.callFunc(this.playJumpSound, this)
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback))
    },

    setInputControl () {
        // 添加键盘事件监听
        // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e) => {
            switch (e.keyCode) {
                case cc.KEY.a:
                    this.accLeft = true
                    break
                case cc.KEY.d:
                    this.accRight = true
                    break
            }
        })

        // 松开按键时，停止向该方向的加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (e) => {
            switch (e.keyCode) {
                case cc.KEY.a:
                    this.accLeft = false
                    break
                case cc.KEY.d:
                    this.accRight = false
                    break
            }
        })
    },

    playJumpSound () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction()
        this.node.runAction(this.jumpAction)

        // 加速度方向开关
        this.accLeft = false
        this.accRight = false
        // 主角当前水平方向速度
        this.xSpeed = 0
        // 初始化键盘输入监听
        this.setInputControl()
    },


    start () {

    },

    update (dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
        }
        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt
    }
});
