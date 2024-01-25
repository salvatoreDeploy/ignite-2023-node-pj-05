import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

interface IAnswerAttchmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}

export { IAnswerAttchmentsRepository }
