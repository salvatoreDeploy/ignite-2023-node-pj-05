import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  QuestionProps,
  Questions,
} from '@/domain/forum/enterprise/entities/questions'

import { faker } from '@faker-js/faker'

export function makeQuestion(
  overriide: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Questions.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...overriide,
    },
    id,
  )

  return question
}
