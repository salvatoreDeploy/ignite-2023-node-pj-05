import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Attachment as DomaninAttachment } from '@/domain/forum/enterprise/entities/attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): DomaninAttachment {
    return DomaninAttachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    attachments: DomaninAttachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachments.id.toString(),
      title: attachments.title,
      url: attachments.url,
    }
  }
}
