import Ludic, { LudicOptions, ScreenManager, ScreenManagerListener, Screen, GamepadController } from '@ludic/ludic'
import GameScreen from './screens/GameScreen'
import MapGeneratorScreen from './screens/MapGeneratorScreen'
// import CharacterSelectScreen from './screens/CharacterSelectScreen'

export default class Arce extends Ludic implements ScreenManagerListener {
  public screenManager: ScreenManager

  constructor(opts: LudicOptions){
    super(opts)

    Ludic.input.addController(new GamepadController())

    this.screenManager = new ScreenManager()
    this.screenManager.addScreenEventListener(this)
    this.screenManager.addScreen(new GameScreen(), false, {
      0: '#e67e22',
      // 1: '#3498db',
      // 2: '#9b59b6',
    })
    // this.screenManager.addScreen(new CharacterSelectScreen())
  }

  onScreenFinished(screen: Screen, manager: ScreenManager, finalData: Screen['_finalData']): void {
    // if(screen instanceof CharacterSelectScreen){
    //   // replace this screen with a game screen
    //   this.screenManager.addScreen(new GameScreen(), true)
    //   // this.screenManager.addScreen(new MapGeneratorScreen(), true)
    // }
  }
  onScreenAdded(screen: Screen, manager: ScreenManager, replace: boolean): void {

  }
  onScreensRemoved(screens: Screen[], manager: ScreenManager): void {

  }

  onWarnPopScreen(stack: Screen[], manager: ScreenManager): void {

  }

  update(time: number, delta: number){
    super.update(time, delta)
    this.screenManager.update(delta, time)
  }
}
