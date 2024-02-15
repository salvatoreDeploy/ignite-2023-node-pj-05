import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export abstract class IQuestionAttchmentsRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
