import { Encrypt } from '@/domain/forum/application/cryptography/encryptet'

export class FakeEncrypter implements Encrypt {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
