/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-30 15:42
 */
import { Mesh, MeshBasicMaterial, Object3D, Scene, SphereGeometry } from 'three'

function SolarSystem() {
  this.radiuses = [2440, 6052, 6371, 3397, 71492, 60268, 25559, 24766]
  this.distances = [5791, 10820, 14960, 22794, 77833, 142940, 287099, 450400]
  this.pub_rotation = [88, 225, 365, 687, 4329, 10767, 30769, 60152]
  this.self_rotation = [58.65, 243, 1, 1, 0.41, 0.42, 0.64, 0.65]
  this.pitchs = [0, 177, 23, 25, 3, 27, 98, 28]
  this.sunObj = {
    radius: 60000//实际695500，为了好看太阳半径缩小了
  }
  this.moonObj = {
    distance: 800, //实际90 为了好看地月距离放大了
    radius: 1737,
    pitchs: 5,
    self_rotation: 27.25,
    pub_rotation: 27.25
  }
  this.asteriodObj = {
    radius: 2000,//
    pub_rotation: 408
  }
}

SolarSystem.prototype = {
  constructor: SolarSystem,
  init() {
    const loader = new TextureLoader();
    const taiyangT = loader.load('/static/images/texture/planets/sun.jpg');
    const shuixingT = loader.load('/static/images/texture/planets/shuixing.jpg');
    const jinxingT = loader.load('/static/images/texture/planets/jinxing.jpg');
    const diqiuT = loader.load('/static/images/texture/planets/diqiu.jpg');
    const huoxingT = loader.load('/static/images/texture/planets/huoxing.jpg');
    const muxingT = loader.load('/static/images/texture/planets/muxing.jpg');
    const tuxingT = loader.load('/static/images/texture/planets/tuxing.jpg');
    const tianwangxingT = loader.load('/static/images/texture/planets/tianwangxing.jpg');
    const haiwangxingT = loader.load('/static/images/texture/planets/haiwangxing.jpg');
    this.yueQiuT = loader.load('/static/images/texture/planets/yueqiu.jpg');
    this.asteriodsT = loader.load('/static/images/texture/planets/asteriod.jpg');
    this.tuxinghuanT = loader.load('/static/images/texture/planets/tuxingring.png');

    this.shuixing = this.createMesh(shuixingT, 0);
    this.jinxing = this.createMesh(jinxingT, 1);
    this.diqiu = this.createMesh(diqiuT, 2);
    this.huoxing = this.createMesh(huoxingT, 3);
    this.muxing = this.createMesh(muxingT, 4);
    this.tuxing = this.createMesh(tuxingT, 5);
    this.tianwangxing = this.createMesh(tianwangxingT, 6);
    this.haiwangxing = this.createMesh(haiwangxingT, 7);
    this.taiyang = this.createTaiYang();
    this.yueqiu = this.createYueQiu();

    const scene = new Scene()

    scene.add(this.shuixing);
    scene.add(this.jinxing);
    scene.add(this.diqiu);
    scene.add(this.huoxing);
    scene.add(this.muxing);
    scene.add(this.tuxing);
    scene.add(this.tianwangxing);
    scene.add(this.haiwangxing);
    scene.add(this.taiyang);
    scene.add(this.yueqiu);
  },
  createMesh(texture, index) {
    let sphere = new SphereGeometry(this.radiuses[index] * this.radius_ratio, 60, 30)
    let material = new MeshBasicMaterial({ map: texture })
    let mesh = new Mesh(sphere, material)
    mesh.position.x = this.distance_ratio * this.distances[index]
    return mesh
  },
  createYueQiu() {
    let sphere = new SphereGeometry(this.moonObj.radius * this.radius_ratio, 30, 20);
    let material = new MeshBasicMaterial({map: this.yueQiuT});
    let mesh = new Mesh(sphere, material);
    mesh.position.x = this.distance_ratio * this.moonObj.distance;
    let moon = new Object3D();
    moon.position.copy(this.diqiu.position);
    moon.add(mesh);
    return moon;
  }
}
