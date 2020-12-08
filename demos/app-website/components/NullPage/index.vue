<template>
  <div class="xm-null-page-wrapper">
    <div
      class="text-wrapper">
      <span>{{ message }}</span>
      <span class="star-ball">
        <img src="./img/star-ball.png">
      </span>
      <span>{{ code }}</span>
    </div>
    <!--<div class="stars-wrapper"/>-->
    <div class="astronaut-wrapper">
      <img
        src="./img/astronaut.png"
        alt="astronaut">
    </div>
    <div
      id="nullPageCanvasId"
      class="canvas-nest-wrapper"/>
    <div
      id="nullPageCanvasId2"
      class="canvas-nest-wrapper"/>
    <div
      id="nullPageCanvasId3"
      class="canvas-nest-wrapper"/>
  </div>
</template>

<script>
  import starYellow from './img/icons/star-yellow.png'
  import starWhite from './img/icons/star-white.png'
  import dotWhite from './img/icons/dot.png'
  // https://blog.csdn.net/wildye/article/details/80371999
  const particlesJson = {
    particles: {
      number: {
        value: 12,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'image',
        stroke: {
          width: 0,
          color: '#000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: starYellow,
          width: 42,
          height: 42
        }
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 20,
        random: true,
        anim: {
          enable: false,
          speed: 80,
          size_min: 0.5,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 300,
        color: '#ffffff',
        opacity: 0.4,
        width: 2
      },
      move: {
        enable: true,
        speed: 8,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: true,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 800,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 800,
          size: 80,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 400,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }
  const particlesJson2 = {
    particles: {
      number: {
        value: 5,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'image',
        stroke: {
          width: 0,
        },
        image: {
          src: starWhite,
          width: 30,
          height: 29
        }
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.5,
          sync: false
        }
      },
      size: {
        value: 20,
        random: true,
        anim: {
          enable: false,
          speed: 80,
          size_min: 0.2,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 300,
        color: '#fff',
        opacity: 0.4,
        width: 2
      },
      move: {
        enable: true,
        speed: 5,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: true,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 800,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 800,
          size: 80,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 400,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }
  const particlesJson3 = {
    particles: {
      number: {
        value: 5,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'image',
        stroke: {
          width: 0,
        },
        image: {
          src: dotWhite,
          width: 18,
          height: 18
        }
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.5,
          sync: false
        }
      },
      size: {
        value: 10,
        random: true,
        anim: {
          enable: false,
          speed: 80,
          size_min: 0.8,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 300,
        color: '#ffffff',
        opacity: 0.4,
        width: 2
      },
      move: {
        enable: true,
        speed: 5,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: true,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 800,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 800,
          size: 80,
          duration: 2,
          opacity: 0.8,
          speed: 3
        },
        repulse: {
          distance: 400,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }

  export default {
    props: {
      code: {
        type: [String, Number],
        default: 'Stay tuned！'
      },
      message: {
        type: String,
        default: 'This page is under development,'
      }
    },
    mounted () {
      if (process.browser) {
        require('particles.js')
        this.$nextTick(_ => {
          window.particlesJS('nullPageCanvasId', particlesJson)
          window.particlesJS('nullPageCanvasId2', particlesJson2)
          window.particlesJS('nullPageCanvasId3', particlesJson3)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "assets/scss/constants";
  .xm-null-page-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $--color-primary url('./img/sun.png') 0 0 no-repeat;
    .canvas-nest-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &#nullPageCanvasId {
        z-index: 10;
      }
    }
    /*
    .stars-wrapper {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height:100%;
      background: url('./img/stars.png');
    }
    */
    .astronaut-wrapper {
      position: absolute;
      z-index: 3;
      top: 73px;
      left: 50%;
      transform: translateX(-801px);
    }
    .text-wrapper {
      position: relative;
      z-index: 5;
      margin: 500px auto 0;
      text-align: center;
      span {
        display: inline-block;
        font-size: 48px;
        vertical-align: bottom;
        color: #fff;
        &.star-ball {
          margin: 0 80px -10px 40px;
          img {
            animation: spin 5s infinite linear;
          }
        }
      }
    }
  }
</style>
