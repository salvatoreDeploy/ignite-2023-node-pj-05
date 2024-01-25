import { Questions } from '../../enterprise/entities/questions'
import { IQuestionsRepository } from '../repositories/question-repository'
import { Either, right } from '@/core/either'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}

type FetchRecentQuestionUseCaseResponse = Either<
  null,
  {
    questions: Questions[]
  }
>

export class FetchRecentQuestionUseCase {
  constructor(private questionRepository: IQuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionRepository.findManyToRecents({ page })

    return right({
      questions,
    })
  }
}
