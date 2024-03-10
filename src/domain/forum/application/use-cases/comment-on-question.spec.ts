import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/makeQuestion'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionCase } from './comment-on-question'
import { InMemoryQuestionAttchmentRepository } from 'test/repositories/in-memory-question-attchment-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { InMemoryUploadAndCreateAttachmentRepository } from 'test/repositories/in-memory-upload-and-create-attachment'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttchmentRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryUploadAndCreateAttachmentRepository: InMemoryUploadAndCreateAttachmentRepository
let sut: CommentOnQuestionCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryUploadAndCreateAttachmentRepository =
      new InMemoryUploadAndCreateAttachmentRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttchmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
      inMemoryUploadAndCreateAttachmentRepository,
      inMemoryStudentsRepository,
    )
    sut = new CommentOnQuestionCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('Should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Commentario Test',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Commentario Test',
    )
  })
})
