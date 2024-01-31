import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

interface StudentProps {
  name: string
  email: string
  password: string
}

export class Stundet extends Entity<StudentProps> {
  get name() {
    return this.name
  }

  get email() {
    return this.email
  }

  get password() {
    return this.password
  }

  static create(props: StudentProps, id?: UniqueEntityId) {
    const student = new Stundet(props, id)

    return student
  }
}
