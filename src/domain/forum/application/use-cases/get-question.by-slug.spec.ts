import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question.by-slug'
import { makeQuestion } from 'test/factories/makeQuestion'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttchmentRepository } from 'test/repositories/in-memory-question-attchment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { InMemoryUploadAndCreateAttachmentRepository } from 'test/repositories/in-memory-upload-and-create-attachment'
import { makeStudent } from 'test/factories/makeStudent'
import { makeAttachment } from 'test/factories/makeAttachment'
import { makeQuestionAttchment } from 'test/factories/makeQuestionAttchment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttchmentRepository: InMemoryQuestionAttchmentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryUploadAndCreateAttachmentRepository: InMemoryUploadAndCreateAttachmentRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by Slug', () => {
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
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to get a question by slug', async () => {
    const student = makeStudent({ name: 'John Doe' })

    inMemoryStudentsRepository.items.push(student)

    const newQuestion = makeQuestion({
      authorId: student.id,
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const attachment = makeAttachment({
      title: 'Some attachment',
    })

    inMemoryUploadAndCreateAttachmentRepository.items.push(attachment)

    inMemoryQuestionAttchmentRepository.items.push(
      makeQuestionAttchment({
        attachmentId: attachment.id,
        questionId: newQuestion.id,
      }),
    )

    const result = await sut.execute({
      slug: 'example-question',
    })

    // console.log(result.value)

    expect(result.value?.question.authorId).toBeTruthy()
    expect(result.value?.question.slug).toEqual(newQuestion.slug)
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        authorName: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'Some attachment',
          }),
        ],
      }),
    })
  })
})
