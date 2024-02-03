import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { JwtAuthGaurd } from '@/infra/authenticate/jwt-auth-guard'
import { FetchRecentQuestionUseCase } from '@/domain/forum/application/use-cases/fetch-recent-question'
import { HttpQuestionPresenter } from '../presenters/http-question-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParam = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
export class FetchRecentQuestionController {
  constructor(private fetchRecentQuestionUseCase: FetchRecentQuestionUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParam) {
    // const perPage = 20

    /* const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    }) */

    const result = await this.fetchRecentQuestionUseCase.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const questions = result.value.questions

    return {
      questions: questions.map((question) => {
        return HttpQuestionPresenter.toHttp(question)
      }),
    }
  }
}
