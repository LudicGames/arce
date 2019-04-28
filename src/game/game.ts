import Ludic, { LudicOptions, ScreenManager, ScreenManagerListener, Screen } from '@ludic/ludic'
import GameScreen from './screens/GameScreen'

export default class Arce extends Ludic implements ScreenManagerListener {
  public screenManager: ScreenManager

  constructor(opts: LudicOptions){
    console.log("constructor", opts)
    super(opts)

    this.screenManager = new ScreenManager()
    this.screenManager.addScreenEventListener(this)
    this.screenManager.addScreen(new GameScreen())
  }

  onScreenFinished(screen: Screen, manager: ScreenManager, finalData: Screen['_finalData']): void {

  }
  onScreenAdded(screen: Screen, manager: ScreenManager, replace: boolean): void {
    console.log("onScreenAdded: ", screen)
  }
  onScreensRemoved(screens: Screen[], manager: ScreenManager): void {

  }

  onWarnPopScreen(stack: Screen[], manager: ScreenManager): void {

  }

  update(delta: number){
    // console.log("updating")
    this.screenManager.update(delta)
  }
}
