import Ludic, { LudicOptions, ScreenManager, ScreenManagerListener, Screen, GamepadController } from '@ludic/ludic'
import GameScreen from './screens/GameScreen'

export default class Arce extends Ludic implements ScreenManagerListener {
  public screenManager: ScreenManager

  constructor(opts: LudicOptions){
    super(opts)

    Ludic.input.addController(new GamepadController())

    this.screenManager = new ScreenManager()
    this.screenManager.addScreenEventListener(this)
    this.screenManager.addScreen(new GameScreen())
  }

  onScreenFinished(screen: Screen, manager: ScreenManager, finalData: Screen['_finalData']): void {

  }
  onScreenAdded(screen: Screen, manager: ScreenManager, replace: boolean): void {

  }
  onScreensRemoved(screens: Screen[], manager: ScreenManager): void {

  }

  onWarnPopScreen(stack: Screen[], manager: ScreenManager): void {

  }

  update(time: number, delta: number){
    Ludic.input.update(time, delta)
    this.screenManager.update(delta)
  }
}
