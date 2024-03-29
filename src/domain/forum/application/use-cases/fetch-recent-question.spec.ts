import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/makeQuestion'
import { FetchRecentQuestionUseCase } from './fetch-recent-question'
import { InMemoryQuestionAttchmentRepository } from 'test/repositories/in-memory-question-attchment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { InMemoryUploadAndCreateAttachmentRepository } from 'test/repositories/in-memory-upload-and-create-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttchmentRepository: InMemoryQuestionAttchmentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryUploadAndCreateAttachmentRepository: InMemoryUploadAndCreateAttachmentRepository
let sut: FetchRecentQuestionUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttchmentRepository =
      new InMemoryQuestionAttchmentRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryUploadAndCreateAttachmentRepository =
      new InMemoryUploadAndCreateAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttchmentRepository,
      inMemoryUploadAndCreateAttachmentRepository,
      inMemoryStudentsRepository,
    )
    sut = new FetchRecentQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 23) }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 18) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 25) }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 0, 25),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 23),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 18),
      }),
    ])
  })

  it('Should be able to fetch to paginated recent questions', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.questions).toHaveLength(2)
  })
})
