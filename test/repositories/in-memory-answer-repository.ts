/* eslint-disable prettier/prettier */
import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { IAnswerAttchmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-reposritory'

import { IAnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements IAnswerRepository {
  public items: Answer[] = []

  constructor(private answerAttchmentRepository: IAnswerAttchmentsRepository) { }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)

    await this.answerAttchmentRepository.createMany(answer.attachment.getItems())

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)

    this.answerAttchmentRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    await this.answerAttchmentRepository.createMany(answer.attachment.getNewItems())

    await this.answerAttchmentRepository.deleteMany(answer.attachment.getRemovedItems())

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }
}
