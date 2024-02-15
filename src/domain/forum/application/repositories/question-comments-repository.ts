import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export abstract class IQuestionCommentsRepository {
  abstract create(question: QuestionComment): Promise<void>
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract delete(questionComment: QuestionComment): Promise<void>
}
