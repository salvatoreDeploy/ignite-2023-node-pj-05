/* eslint-disable prettier/prettier */
import { INotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository implements INotificationsRepository {

  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }


  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === notification.id)

    this.items[itemIndex] = notification
  }
}
