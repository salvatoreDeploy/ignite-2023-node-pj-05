import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { AnswerCreatedEvent } from '../events/answer-created-event'

export interface AnswerProps {
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  attachment: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date | null
}

export class Answer extends AggregateRoot<AnswerProps> {
  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    return (this.props.updatedAt = new Date())
  }

  get except() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get attachment() {
    return this.props.attachment
  }

  set attachment(attachment: AnswerAttachmentList) {
    this.props.attachment = attachment
    this.touch()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachment'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachment: props.attachment ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewAnswer = !id

    if (isNewAnswer) {
      answer.addDomainEvent(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}
