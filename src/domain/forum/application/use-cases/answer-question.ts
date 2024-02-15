import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { IAnswerRepository } from '../repositories/answer-repository'
import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

interface AnswerQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>
@Injectable()
export class AnswerQuestionUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
    })

    const answerAttachment = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachment = new AnswerAttachmentList(answerAttachment)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
