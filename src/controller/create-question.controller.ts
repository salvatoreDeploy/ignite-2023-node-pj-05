import { Body, Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/authenticate/current-user-decorator";
import { JwtAuthGaurd } from "src/authenticate/jwt-auth-guard";
import { TokenPayload } from "src/authenticate/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";


const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestion = z.infer<typeof createQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(JwtAuthGaurd)
export class CreateQuestionController{

  constructor(private prisma: PrismaService){}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateQuestion, @CurrentUser() user: TokenPayload) {
    const { title, content } = body
    
    const userId = user.sub

    const slug = this.convertToSlug(title)
    
    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug
      }
    })
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}