import { IQuestionsRepository } from '../repositories/question-repository'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { IQuestionCommentsRepository } from '../repositories/question-comments-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { QuestionComment } from '../../enterprise/entities/question-comment'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionCase {
  constructor(
    private questionRepository: IQuestionsRepository,
    private quetionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new NotAllowedError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.quetionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
