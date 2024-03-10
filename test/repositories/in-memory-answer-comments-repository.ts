/* eslint-disable prettier/prettier */
import { PaginationParams } from '@/core/repositories/pagination-params'
import { IAnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { InMemoryStudentsRepository } from './in-memory-student-repository'

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentsRepository {

  public items: AnswerComment[] = []

  constructor(private studentRepository: InMemoryStudentsRepository) { }

  async create(answerComments: AnswerComment): Promise<void> {
    this.items.push(answerComments)
  }

  async delete(answerComments: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answerComments.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const questionComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async findManyByQuestionIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ) {

    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
      .map(comment => {

        const author = this.studentRepository.items.find(student => {
          return student.id.equals(comment.authorId)
        })

        if (!author) {
          throw new Error(`Author with ID "${comment.authorId.toString()}" does not exists`)
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          authorName: author.name
        })
      })


    return answerComments
  }
}