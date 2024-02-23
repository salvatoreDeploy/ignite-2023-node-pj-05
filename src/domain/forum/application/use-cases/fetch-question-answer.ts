import { Either, right } from '@/core/either'
import { IAnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../../enterprise/entities/answer'
import { Injectable } from '@nestjs/common'

interface FetchQuestionAnswerUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswerUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

@Injectable()
export class FetchQuestionAnswerUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    return right({
      answers,
    })
  }
}
