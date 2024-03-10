/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAnswer } from 'test/factories/makeAnswer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attchment-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttchmentRepository } from 'test/repositories/in-memory-question-attchment-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notification-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { makeQuestion } from 'test/factories/makeQuestion'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student-repository'
import { InMemoryUploadAndCreateAttachmentRepository } from 'test/repositories/in-memory-upload-and-create-attachment'

let inMemoryQuestionsAttchmentsRepository: InMemoryQuestionAttchmentRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMmemoryAttachmentsRepository: InMemoryAnswerAttachmentRepository
let inMemoryNotificationRepository: InMemoryNotificationsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryUploadAndCreateAttachmentRepository: InMemoryUploadAndCreateAttachmentRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNOtificationNotificationSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    inMmemoryAttachmentsRepository = new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMmemoryAttachmentsRepository,
    )

    inMemoryQuestionsAttchmentsRepository =
      new InMemoryQuestionAttchmentRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryUploadAndCreateAttachmentRepository =
      new InMemoryUploadAndCreateAttachmentRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttchmentsRepository,
      inMemoryUploadAndCreateAttachmentRepository,
      inMemoryStudentsRepository,
    )

    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNOtificationNotificationSpy = vi.spyOn(
      sendNotificationUseCase,
      'execute',
    )

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('Should send a notification when an answer is created', async () => {
    // Criando a question
    const question = makeQuestion()

    // Criando a answer da question acima
    const answer = makeAnswer({ questionId: question.id })

    // Criando o subscriber, assim ouvindo o evento de um a nova answer criada
    inMemoryQuestionsRepository.create(question)

    // Apos ter salvo a answer no banco de dados, ele dispara a notificação sobre a criação
    inMemoryAnswerRepository.create(answer)

    await waitFor(() => {
      expect(sendNOtificationNotificationSpy).toHaveBeenCalled()
    })
  })
})
