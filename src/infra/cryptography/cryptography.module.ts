import { Encrypt } from '@/domain/forum/application/cryptography/encryptet'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { BcryptHasher } from './bcrypt-hasher'
import { HasheCompare } from '@/domain/forum/application/cryptography/hash-compare'

@Module({
  providers: [
    { provide: Encrypt, useClass: JwtEncrypter },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HasheCompare, useClass: BcryptHasher },
  ],

  exports: [Encrypt, HashGenerator, HasheCompare],
})
export class CryptographyModule {}
