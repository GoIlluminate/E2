export class ColorController {
  private constructor() { }

  public static getColor(): string {
    const elmColors = [
      '#5A6379',
      '#5CB5CD',
      '#F2AE00',
      '#7CD32B'
    ]
    const random = Math.floor(Math.random() * elmColors.length)
    return elmColors[random];
  }
}
