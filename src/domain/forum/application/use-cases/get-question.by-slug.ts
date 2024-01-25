import { Questions } from '../../enterprise/entities/questions'
import { IQuestionsRepository } from '../repositories/question-repository'
import { Either, right } from '@/core/either'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  null,
  {
    question: Questions
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return right({ question })
  }
}
