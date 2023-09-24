const {removeUndefinedProperties: removeUndefinedPropertiesTest} = require('../dist/object-resolver');

describe('Test function removeUndefinedProperties', () => {

  test('Should remove undefined properties from an object', () => {
    const original = { a: 1, b: undefined, c: 'test' };
    const result = removeUndefinedPropertiesTest(original);
    expect(result).toEqual({ a: 1, c: 'test' });
  });

  test('Should remove undefined properties from nested objects', () => {
    const original = { a: 1, b: { d: undefined, e: 2 }, c: undefined };
    const result = removeUndefinedPropertiesTest(original);
    expect(result).toEqual({ a: 1, b: { e: 2 } });
  });

  test('Should not modify the original object', () => {
    const original = { a: 1, b: undefined };
    const result = removeUndefinedPropertiesTest(original);
    expect(original).toEqual({ a: 1, b: undefined });
    expect(result).toEqual({ a: 1 });
  });

  test('Should return an empty object if all properties are undefined', () => {
    const original = { a: undefined, b: undefined };
    const result = removeUndefinedPropertiesTest(original);
    expect(result).toEqual({});
  });

  test('Should handle arrays properly', () => {
    const original = [{ a: undefined, b: 1 }, undefined, 'test'];
    const result = removeUndefinedPropertiesTest(original);
    expect(result).toEqual([{ b: 1 }, undefined, 'test']);
  });

  test('Should return the same value if it is not an object or array', () => {
    const original = 'test';
    const result = removeUndefinedPropertiesTest(original);
    expect(result).toEqual('test');
  });
})


