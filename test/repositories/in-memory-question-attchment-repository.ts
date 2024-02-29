/* eslint-disable prettier/prettier */
import { IQuestionAttchmentsRepository } from '@/domain/forum/application/repositories/question-attachments-reposritory'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttchmentRepository
  implements IQuestionAttchmentsRepository {
  public items: QuestionAttachment[] = []

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.items.filter(item => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = questionAttachments
  }

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttchment = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttchment
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttchment = this.items.filter(item => item.questionId.toString() !== questionId)

    this.items = questionAttchment
  }
}
