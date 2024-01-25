import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Questions } from '../entities/questions'

export class QuestionBestAnswerChooseEvent implements DomainEvent {
  public ocurredAt: Date
  public question: Questions
  public bestAnswerId: UniqueEntityId

  constructor(question: Questions, bestAnswerId: UniqueEntityId) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id
  }
}
