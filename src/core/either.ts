// Error

export class Left<L, R> {
  readonly value: L // Motivo do erro

  constructor(reason: L) {
    this.value = reason
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}

// Success
export class Right<L, R> {
  readonly value: R // Resultado so sucesso

  constructor(result: R) {
    this.value = result
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

export const left = <L, R>(reason: L): Either<L, R> => {
  return new Left(reason)
}

export const right = <L, R>(result: R): Either<L, R> => {
  return new Right(result)
}
