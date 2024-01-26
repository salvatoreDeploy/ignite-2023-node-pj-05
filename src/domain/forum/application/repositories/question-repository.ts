import { PaginationParams } from '@/core/repositories/pagination-params'
import { Questions } from '../../enterprise/entities/questions'

export abstract class IQuestionsRepository {
  abstract create(question: Questions): Promise<void>
  abstract findBySlug(slug: string): Promise<Questions | null>
  abstract findById(id: string): Promise<Questions | null>
  abstract findManyToRecents(params: PaginationParams): Promise<Questions[]>
  abstract delete(question: Questions): Promise<void>
  abstract save(question: Questions): Promise<void>
}
