export class ColorController {
  private constructor() { }

  public static getColor(): string {
    const elmColors = [
      '#5A6379',
      '#5CB5CD',
      '#F2AE00',
      '#7CD32B',
      '#2f6f26',
      '#982d20',
      '#1039a6'
    ]
    const random = Math.floor(Math.random() * elmColors.length)
    return elmColors[random];
  }
}
