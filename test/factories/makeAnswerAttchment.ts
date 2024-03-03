/* eslint-disable prettier/prettier */

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { AnswerAttachment, AnswerAttachmentProps } from '@/domain/forum/enterprise/entities/answer-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'


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

@Injectable()
export class AnswerAttchmentFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaAnswerAttachment(
    data: Partial<AnswerAttachmentProps> = {},
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString()
      },
      data: {
        answerId: answerAttachment.answerId.toString()
      }
    })

    return answerAttachment
  }
}
