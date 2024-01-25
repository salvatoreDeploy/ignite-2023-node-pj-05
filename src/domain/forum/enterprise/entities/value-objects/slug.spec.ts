import { Slug } from './slug'

test('Should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('A Example question title')

  expect(slug.value).toEqual('a-example-question-title')
})
