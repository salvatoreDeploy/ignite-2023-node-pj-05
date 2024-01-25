/* eslint-disable prettier/prettier */

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionAttachment, QuestionAttachmentProps } from '@/domain/forum/enterprise/entities/question-attachment'


export function makeQuestionAttchment(
  overriide: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...overriide,
    },
    id,
  )

  return questionAttachment
}
