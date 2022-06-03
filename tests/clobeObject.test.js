const {cloneObject: cloneObjectTest} = require('../dist/object-resolver');

describe('Test function cloneObject', () => {

  test('Given an undefined value', async () => {
    const obj = undefined;
    const objCopy = cloneObjectTest();
    expect(objCopy).toBe(obj);
  })

  test('Given an empty value', async () => {
    const obj = {};
    const objCopy = cloneObjectTest(obj);
    expect(objCopy).toEqual(obj);
  })

  test('Given a null value', async () => {
    const obj = null;
    const objCopy = cloneObjectTest(obj);
    expect(objCopy).toBeNull();
  })

  test('Given a simple object value', async () => {
    const obj = {'a': 1};
    const objCopy = cloneObjectTest(obj);
    expect(objCopy).toEqual(obj);
  })

  test('Given a nested object value', async () => {
    const obj = {'a': {'b': 2}, 'c': 3};
    const objCopy = cloneObjectTest(obj);
    expect(obj).toEqual(objCopy);
  })

  test('Given a nested object value with null and undefined', async () => {
    const obj = {'a': {'b': 2}, 'c': 3, 'd': null, 'e': undefined};
    const objCopy = cloneObjectTest(obj);
    expect(objCopy).toEqual(obj);
  })

})


