/* eslint-disable prettier/prettier */

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { AnswerAttachment, AnswerAttachmentProps } from '@/domain/forum/enterprise/entities/answer-attachment'


export function makeAnswerAttachment(
  overriide: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overriide,
    },
    id,
  )

  return answerAttachment
}
