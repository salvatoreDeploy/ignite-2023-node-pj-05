import { IAnswerRepository } from '../repositories/answer-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { IAnswerAttchmentsRepository } from '../repositories/answer-attachments-reposritory'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { Injectable } from '@nestjs/common'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>
@Injectable()
export class EditAnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private answerAttachmentRepository: IAnswerAttchmentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttchment =
      await this.answerAttachmentRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttchment,
    )

    const answerAttachment = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachment)

    answer.attachment = answerAttachmentList
    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
