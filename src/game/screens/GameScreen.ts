import Ludic, {Screen, Camera, ScreenManager} from '@ludic/ludic'

import Level1 from '../levels/level1/level'
// import Player from '../entities/Player'
// import BaseLevel from '../levels/BaseLevel'
import { CameraComponent } from '../components'
import CameraRenderSystem from '../systems/CameraRenderSystem'
import { World } from 'ecsy'
import { Scene, PerspectiveCamera, WebGLRenderer, Raycaster, BoxGeometry, MeshBasicMaterial, Mesh, ShapeGeometry, Shape, Vector2, OrthographicCamera, Color } from 'three'
import { WEBGL } from 'three/examples/jsm/WebGL'
import { hex_vertices } from '../utils/Hex'
import { ContextComponent } from '../components/ContextComponent'
import { TileInitSystem } from '../systems'

export default class GameScreen extends Screen {
  engine: World
  // player: Player
  // level: BaseLevel
  // camera: Camera
  scene: Scene
  camera: OrthographicCamera
  renderer: WebGLRenderer

  x: number = 0
  y: number = 0
  maxX: number = 1
  maxY: number = 1

  constructor() {
    super()
    this.engine = new World()

    this.scene = new Scene()

    const size = 100
    const aspect = Ludic.canvas.element.width / Ludic.canvas.element.height
    // this.camera = new PerspectiveCamera(90, Ludic.canvas.element.width / Ludic.canvas.element.height)
    this.camera = new OrthographicCamera(size * aspect / -2, size * aspect / 2, size / 2, size / -2, 1, 10)

    let context = WEBGL.isWebGL2Available()
      ? Ludic.canvas.element.getContext('webgl2', { alpha: false })
      : Ludic.canvas.element.getContext('webgl', { alpha: false })
    this.renderer = new WebGLRenderer({canvas: Ludic.canvas.element, context, antialias: true})
    // this.renderer.setPixelRatio(window.devicePixelRatio)

    this.engine.createEntity()
      .addComponent(ContextComponent, {camera: this.camera, scene: this.scene, renderer: this.renderer})

    this.camera.position.z = 8

    this.engine.registerSystem(TileInitSystem)
    
  }

  public onAddedToManager(manager: ScreenManager, finalData?: {[key: number]: string}) {
    // this.level.init({
    //   playerMap: finalData
    // })

    // Fired by the CastleDamageSystem
    // window.addEventListener('GAME_OVER', () => {
    //   // TODO add cool stats here, from this.engine.stats()
    //   console.log("GAMEOVER")
    //   // @ts-ignore
    //   console.log(this.engine.stats())
    //   this.finish({})
    // })
  }

  update(delta: number, time: number){

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.engine.execute(delta, time)

    this.renderer.render(this.scene, this.camera)
  }
}
