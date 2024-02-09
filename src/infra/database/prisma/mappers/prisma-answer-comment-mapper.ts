import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { AnswerComment as DomainAnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): DomainAnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type')
    }

    return DomainAnswerComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        answerId: new UniqueEntityId(raw.answerId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    answerComment: DomainAnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
      answerId: answerComment.answerId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    }
  }
}
