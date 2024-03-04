/* eslint-disable @typescript-eslint/no-explicit-any */

export class ValueObject<Props> {
  protected props: Props

  constructor(props: Props) {
    this.props = props
  }

  public equals(valueObject: ValueObject<unknown>) {
    if (valueObject === null || valueObject === undefined) {
      return false
    }

    if (valueObject.props === undefined) {
      return false
    }

    return JSON.stringify(valueObject.props) === JSON.stringify(this.props)
  }
}
