import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository copy'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makeStudent } from 'test/factories/makeStudent'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypt: FakeEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypt = new FakeEncrypter()

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypt,
    )
  })

  it('Should be able to register new student', async () => {
    const student = makeStudent({
      email: 'joedoe@email.com',
      password: await fakeHasher.hash('123456'),
    })

    await inMemoryStudentsRepository.create(student)

    console.log(student)

    const result = await sut.execute({
      email: 'joedoe@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  /* it('Should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'Joe Doe',
      email: 'joedoe@email.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  }) */
})
