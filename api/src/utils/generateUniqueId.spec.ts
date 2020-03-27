import generateUniqueId from './generateUniqueId'

describe('Generate Unique ID', () => {
  it('should generate an unique id', () => {
    const id1 = generateUniqueId()
    const id2 = generateUniqueId()
    expect(typeof id1).toBe('string')
    expect(typeof id2).toBe('string')
    expect(id1).toHaveLength(8)
    expect(id2).toHaveLength(8)
    expect(id1).not.toEqual(id2)
  })
})
