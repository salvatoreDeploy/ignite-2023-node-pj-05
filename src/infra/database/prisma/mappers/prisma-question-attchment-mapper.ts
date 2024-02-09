import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionAttachment as DomainQuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): DomainQuestionAttachment {
    if (!raw.questionId) {
      throw new Error('Invalid comment type')
    }

    return DomainQuestionAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
