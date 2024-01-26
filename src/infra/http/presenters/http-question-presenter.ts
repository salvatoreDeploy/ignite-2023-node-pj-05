import { Questions } from '@/domain/forum/enterprise/entities/questions'

export class HttpQuestionPresenter {
  static toHttp(question: Questions) {
    return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
