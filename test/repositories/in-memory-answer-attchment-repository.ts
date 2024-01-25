/* eslint-disable prettier/prettier */
import { IAnswerAttchmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-reposritory'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentRepository
  implements IAnswerAttchmentsRepository {

  public items: AnswerAttachment[] = []

  async findManyByAnswerId(
    answerId: string,
  ): Promise<AnswerAttachment[]> {
    const answerAttachment = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachment
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachment = this.items.filter(item => item.answerId.toString() !== answerId)

    this.items = answerAttachment
  }

}
