import Ludic, { Screen, Camera } from '@ludic/ludic'
import { Engine } from '@ludic/ein';
import CharacterSelectSystem from '../systems/characterSelect/CharacterSelectSystem';
import PlayerCreate from '../systems/PlayerCreate';
import CharacterSelectRenderer from '../systems/characterSelect/CharacterSelectRenderer';
import PositionComponent from '../components/PositionComponent';
import MechComponent from '../components/MechComponent';

export default class CharacterSelectScreen extends Screen {
  engine: Engine
  camera: Camera
  selectSystem = new CharacterSelectSystem()

  constructor(){
    super()
    this.engine = new Engine()
    this.camera = new Camera(Ludic.canvas)
    this.camera.centerWorldToCamera()
    // this.camera.pixelsToMeters = 20
  }

  onAddedToManager(){
    this.engine.addSystem(new PlayerCreate())
    this.engine.addSystem(this.selectSystem)
    this.selectSystem.listenForReady(this.onSelectReady.bind(this))
    this.engine.addSystem(new CharacterSelectRenderer(this.camera))
    // init the class entities
    this.initMechClasses()
  }

  onSelectReady(signal: any, data: {[key: number]: string}){
    this.finish(data)
  }

  initMechClasses(){
    const mech1 = this.engine.createEntity()
    mech1.add(new PositionComponent(-10, 2))
    mech1.add(new MechComponent('red'))
    this.engine.addEntity(mech1)
    
    const mech2 = this.engine.createEntity()
    mech2.add(new PositionComponent(-4, 2))
    mech2.add(new MechComponent('green'))
    this.engine.addEntity(mech2)
    
    const mech3 = this.engine.createEntity()
    mech3.add(new PositionComponent(2, 2))
    mech3.add(new MechComponent('blue'))
    this.engine.addEntity(mech3)
    
    const mech4 = this.engine.createEntity()
    mech4.add(new PositionComponent(8, 2))
    mech4.add(new MechComponent('orange'))
    this.engine.addEntity(mech4)
  }

  update(delta: number){
    this.engine.update(delta)
  }
}