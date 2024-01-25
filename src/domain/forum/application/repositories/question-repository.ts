import { PaginationParams } from '@/core/repositories/pagination-params'
import { Questions } from '../../enterprise/entities/questions'

interface IQuestionsRepository {
  create(question: Questions): Promise<void>
  findBySlug(slug: string): Promise<Questions | null>
  findById(id: string): Promise<Questions | null>
  findManyToRecents(params: PaginationParams): Promise<Questions[]>
  delete(question: Questions): Promise<void>
  save(question: Questions): Promise<void>
}

export { IQuestionsRepository }
