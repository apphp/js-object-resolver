const {cloneObject: cloneObjectTest} = require('../dist/object-resolver');

describe('Test function cloneObject', () => {

  test('Given an undefined value', () => {
    const obj = undefined;
    const objCopy = cloneObjectTest();
    expect(objCopy).toBe(obj);
  })

  test('Given an empty value', () => {
    const obj = {};
    const objCopy = cloneObjectTest(obj);
    expect(objCopy).toEqual(obj);
  })

  test('Given a null value', () => {
    const obj = null;
    const objCopy = cloneObjectTest(obj);
    expect(objCopy).toBeNull();
  })

  test('Given a simple object value', () => {
    const obj = {'a': 1};
    const objCopy = cloneObjectTest(obj);
    expect(objCopy).toEqual(obj);
  })

  test('Given a nested object value', () => {
    const obj = {'a': {'b': 2}, 'c': 3};
    const objCopy = cloneObjectTest(obj);
    expect(obj).toEqual(objCopy);
  })

  test('Given a nested object value with null and undefined', () => {
    const obj = {'a': {'b': 2}, 'c': 3, 'd': null, 'e': undefined};
    const objCopy = cloneObjectTest(obj);
    expect(objCopy).toEqual(obj);
  })

})


