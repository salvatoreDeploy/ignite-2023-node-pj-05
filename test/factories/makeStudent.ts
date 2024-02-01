import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/students'

import { faker } from '@faker-js/faker'

export function makeStudent(
  overriide: Partial<StudentProps> = {},
  id?: UniqueEntityId,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...overriide,
    },
    id,
  )

  return student
}
