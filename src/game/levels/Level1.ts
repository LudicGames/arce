import Ludic, {Screen, Camera} from '@ludic/ludic'
import {Engine, Entity} from '@ludic/ein'

import PositionSystem from '../systems/PositionSystem'
import PositionComponent from '../components/PositionComponent'
import Player from '../entities/Player'
import GamepadComponent from '../components/GamepadComponent'
import PlayerCreate from '../systems/PlayerCreate'
import PlayerControlSystem from '../systems/PlayerControlSystem'
import BaseLevel from './BaseLevel'


export default class Level1 extends BaseLevel {
  engine: Engine
  camera: Camera

  constructor(engine: Engine, camera: Camera){
    super()
    this.engine = engine
    this.camera = camera
  }

  init(){
    this.initSystems()
    this.initEntities()
  }

  initSystems(){
    console.log("init Systems")
    this.engine.addSystem(new PlayerControlSystem())
    this.engine.addSystem(new PlayerCreate())
  }

  initEntities(){
	  // const entity = this.engine.createEntity()
    // entity.add(new PositionComponent(10, 0))
    // this.player = new Player()
    // this.player.add(new GamepadComponent(0))
    // this.engine.addEntity(this.player)
  }

}
