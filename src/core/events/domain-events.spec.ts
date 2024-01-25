/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/value-objects/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class TestAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: TestAggregate

  constructor(aggregate: TestAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class TestAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new TestAggregate(null)

    aggregate.addDomainEvent(new TestAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('Should be able to dispatch an listen to events', () => {
    // Contante que recebe a função de observar se uma função é chamada dentro do ViTest
    const callbackSpy = vi.fn()

    // Subscriber cadastrado (ouvindo o evento de "resposta criada")
    DomainEvents.register(callbackSpy, TestAggregateCreated.name)

    // Estou criando uma resposta porem SEM salvar no Banco ou Repositorio Fake
    const aggregate = TestAggregate.create()

    // Estou assegurando que o evento foi criado porem NÂO foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Estou salavndo a resposta no banco ou Repositorio Fake e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e faz o que precisa e limpa
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
