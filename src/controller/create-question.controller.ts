import { Controller, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGaurd } from "src/authenticate/jwt-auth-guard";

@Controller('/questions')
@UseGuards(JwtAuthGaurd)
export class CreateQuestionController{

  @Post()
  async handle() {
    return 'ok'
  }
  
}