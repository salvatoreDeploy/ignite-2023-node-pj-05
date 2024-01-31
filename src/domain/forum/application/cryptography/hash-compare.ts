export abstract class HasheCompare {
  abstract compare(plain: string, hash: string): Promise<boolean>
}
