import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

interface InstructorPorps {
  name: string
}

export class Instructor extends Entity<InstructorPorps> {
  static create(props: InstructorPorps, id?: UniqueEntityId) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
