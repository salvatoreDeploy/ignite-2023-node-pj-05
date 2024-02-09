import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { AnswerAttachment as DomainAnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): DomainAnswerAttachment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type')
    }

    return DomainAnswerAttachment.create(
      {
        attachmentId: new UniqueEntityId(raw.id),
        answerId: new UniqueEntityId(raw.answerId),
      },
      new UniqueEntityId(raw.id),
    )
  }
}
