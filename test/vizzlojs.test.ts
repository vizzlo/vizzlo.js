import Vizzlo from '../src/vizzlojs'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Have empty API key', () => {
    expect(Vizzlo.APIKey).toBeUndefined()
  })
})
