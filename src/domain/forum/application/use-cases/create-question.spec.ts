import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttchmentRepository } from 'test/repositories/in-memory-question-attchment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { InMemoryUploadAndCreateAttachmentRepository } from 'test/repositories/in-memory-upload-and-create-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttchmentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryUploadAndCreateAttachmentRepository: InMemoryUploadAndCreateAttachmentRepository
let sut: CreateQuestionUseCase

describe('Create as Answer', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryUploadAndCreateAttachmentRepository =
      new InMemoryUploadAndCreateAttachmentRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttchmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryUploadAndCreateAttachmentRepository,
      inMemoryStudentsRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to create new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Conteudo da pergunta',
      title: 'Titulo da pergunta ',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question.content).toEqual('Conteudo da pergunta')
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(
      inMemoryQuestionsRepository.items[0].attachment.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachment.currentItems,
    ).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('2'),
      }),
    ])
  })

  it('Should be able to persist attachmemnts when creating a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Conteudo da pergunta',
      title: 'Titulo da pergunta ',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryQuestionAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('2'),
        }),
      ]),
    )
  })
})
