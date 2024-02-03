import { HasheCompare } from '@/domain/forum/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashGenerator, HasheCompare {
  private HASH_SALT_LENGHT = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGHT)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
