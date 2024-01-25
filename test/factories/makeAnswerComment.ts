/* eslint-disable prettier/prettier */
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { AnswerComment, AnswerCommentProps } from '@/domain/forum/enterprise/entities/answer-comment'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  overriide: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      answerId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...overriide,
    },
    id,
  )

  return answerComment
}
