import { describe, expect, it } from 'vitest'

import examplePackage from '.'

describe('index', () => {
  it('should return "baz" when foo equals "bar"', () => {
    expect(examplePackage('bar')).toEqual('baz')
    expect(examplePackage('Bar')).not.toEqual('baz')
  })

  it('should return "qux" when foodoes not equal "bar"', () => {
    expect(examplePackage('bar')).not.toEqual('qux')
    expect(examplePackage('baz')).toEqual('qux')
  })
})
