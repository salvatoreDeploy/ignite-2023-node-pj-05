import { IAnswerRepository } from '../repositories/answer-repository'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { IAnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answerComment: AnswerComment
  }
>

@Injectable()
export class CommentOnAnswerCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private quetionCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new NotAllowedError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.quetionCommentsRepository.create(answerComment)

    return right({ answerComment })
  }
}
