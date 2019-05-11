import Ludic, {Screen, Camera} from '@ludic/ludic'
import {Engine, Entity} from '@ludic/ein'

// Systems
import PlayerRenderSystem from '../systems/PlayerRenderSystem'
import TileRenderSystem from '../systems/TileRenderSystem'
import PlayerCreate from '../systems/PlayerCreate'
import PlayerControlSystem from '../systems/PlayerControlSystem'
import TileActivationSystem from '../systems/TileActivationSystem'

// Entities
import Player from '../entities/Player'
import Tile from '../entities/Tile'

export default class Level2 {
  engine: Engine
  camera: Camera

  constructor(engine: Engine, camera: Camera){
    this.engine = engine
    this.camera = camera
  }

  initSystems(){
    this.engine.addSystem(new PlayerControlSystem())
    this.engine.addSystem(new TileRenderSystem(this.camera))
    this.engine.addSystem(new PlayerRenderSystem(this.camera))
    this.engine.addSystem(new TileActivationSystem())
    this.engine.addSystem(new PlayerCreate())
  }

  initEntities(){
    this.initTiles(3)
  }
  initTiles(size: number){
    const ptm = this.camera.pixelsToMeters
    const h = this.camera.height / ptm
    const w = this.camera.width / ptm
    const d = size * 2

    const totalY = Math.ceil(h / size) + 3
    const totalX = Math.ceil(w / (d + size))


    // console.log("h: ", h)
    // console.log("w: ", w)
    // console.log("ptm: ", ptm)

    // console.log("h/ptm: ", h/ptm)
    // console.log("w/ptm: ", w/ptm)

    // console.log("totalX: ", totalX)
    // console.log("totalY: ", totalY)

    let x = size / 2
    let y = 0
    let toggle = false

    for(let i=0; i<totalX; i++){
      for(let j=0; j<totalY; j++){
        let extra = 0
        if(j % 2) extra = d * .775
        this.engine.addEntity(new Tile(x+extra, y, size))
        y += size * .89
      }
      y = 0
      x += size * 3.1
    }
  }
}
