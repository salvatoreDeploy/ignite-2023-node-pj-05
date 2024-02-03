import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Student as DomaninStudent } from '@/domain/forum/enterprise/entities/students'
import { User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): DomaninStudent {
    return DomaninStudent.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(student: DomaninStudent): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}
