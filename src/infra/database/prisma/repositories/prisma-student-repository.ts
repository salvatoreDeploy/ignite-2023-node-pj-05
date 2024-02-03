import { PaginationParams } from '@/core/repositories/pagination-params'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/students'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(students: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(students)

    await this.prisma.user.create({
      data,
    })
  }

  async findByEmail(email: string): Promise<Student> {
    const students = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!students) {
      return null
    }

    return PrismaStudentMapper.toDomain(students)
  }

  async findById(id: string): Promise<Student | null> {
    const students = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!students) {
      return null
    }

    return PrismaStudentMapper.toDomain(students)
  }

  async delete(students: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(students)

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }

  async save(students: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(students)

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }
}
