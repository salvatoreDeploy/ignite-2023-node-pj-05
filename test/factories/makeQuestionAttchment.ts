/* eslint-disable prettier/prettier */

import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { QuestionAttachment, QuestionAttachmentProps } from '@/domain/forum/enterprise/entities/question-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'


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

@Injectable()
export class QuestionAttchmentFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaQuestionAttachment(
    data: Partial<QuestionAttachmentProps> = {},
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttchment(data)

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString()
      },
      data: {
        questionId: questionAttachment.questionId.toString()
      }
    })

    return questionAttachment
  }
}
