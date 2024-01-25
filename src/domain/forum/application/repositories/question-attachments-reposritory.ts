import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

interface IQuestionAttchmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}

export { IQuestionAttchmentsRepository }
