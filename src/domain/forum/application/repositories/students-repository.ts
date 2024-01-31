import { Stundet } from '../../enterprise/entities/students'

export abstract class StudentsRepository {
  abstract findByEmail(email: string): Promise<Stundet | null>
  abstract create(student: Stundet): Promise<void>
}
