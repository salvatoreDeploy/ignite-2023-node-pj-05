import { Injectable } from '@nestjs/common'
import { IQuestionsRepository } from '../repositories/question-repository'
import { Either, right } from '@/core/either'
import { QuestionDeatails } from '../../enterprise/entities/value-objects/question-details'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  null,
  {
    question: QuestionDeatails
  }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findDetailsBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return right({ question })
  }
}
