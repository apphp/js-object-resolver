const {filterObject: filterObjectTest} = require('../dist/object-resolver');

describe('Test function filterObject', () => {

  test('Should return an object with properties that satisfy the predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    // Keep even numbers
    const predicate = (value) => value % 2 === 0;
    const result = filterObjectTest(obj, predicate);
    expect(result).toEqual({ b: 2 });
  });

  test('Should return an empty object if no properties satisfy the predicate', () => {
    const obj = { a: 1, b: 3, c: 5 };
    // Keep even numbers
    const predicate = (value) => value % 2 === 0;
    const result = filterObjectTest(obj, predicate);
    expect(result).toEqual({});
  });

  test('Should not modify the original object', () => {
    const obj = { "a": 1, b: 2, c: 3 };
    // Keep even numbers
    const predicate = (value) => value % 2 === 0;
    filterObjectTest(obj, predicate);
    // Original object remains unchanged
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('Should return an empty object if input object is empty', () => {
    const obj = {};
    // Keep even numbers
    const predicate = (value) => value % 2 === 0;
    const result = filterObjectTest(obj, predicate);
    expect(result).toEqual({});
  });

  test('Should throw an error if predicate is not a function', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(() => filterObjectTest(obj, 'not a function')).toThrow(TypeError);
  });

  test('Should handle null and undefined gracefully', () => {
    const predicate = (value) => value != null;
    expect(filterObjectTest(null, predicate)).toEqual({});
    expect(filterObjectTest(undefined, predicate)).toEqual({});
  });
})


