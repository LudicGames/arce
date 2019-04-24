import Ludic, { LudicOptions, ScreenManager } from '@ludic/ludic'
import GameScreen from './screens/GameScreen'

export default class Arce extends Ludic {
  public screenManager: ScreenManager

  constructor(opts: LudicOptions){
    super(opts)

    this.screenManager = new ScreenManager(this)
    this.screenManager.addScreen(new GameScreen())
  }

  update(delta: number){
    console.log("updating")
    this.screenManager.update(delta)
  }
}
