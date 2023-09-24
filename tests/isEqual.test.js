const {isEqual: isEqualTest} = require('../dist/object-resolver');

describe('Test function isEqual', () => {

  test('Should return true for two empty objects', async () => {
    expect(isEqualTest({}, {})).toBeTruthy();
  })

  test('Should return true for two equal objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(isEqualTest(obj1, obj2)).toBeTruthy();
  });

  test('Should return false for two different objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    expect(isEqualTest(obj1, obj2)).toBeFalsy();
  });

  test('Should return true for two equal arrays', () => {
    expect(isEqualTest([1, 2, 3], [1, 2, 3])).toBeTruthy();
  });

  test('Should return false for two different arrays', () => {
    expect(isEqualTest([1, 2, 3], [1, 2, 4])).toBeFalsy();
  });

  test('Should return true for identical strings', () => {
    expect(isEqualTest('test', 'test')).toBeTruthy();
  });

  test('Should return false for non-identical strings', () => {
    expect(isEqualTest('test', 'Test')).toBeFalsy();
  });

  test('Should return true for identical numbers', () => {
    expect(isEqualTest(5, 5)).toBeTruthy();
  });

  test('Should return false for non-identical numbers', () => {
    expect(isEqualTest(5, 10)).toBeFalsy();
  });

  test('Should return false when comparing objects to non-objects', () => {
    expect(isEqualTest({}, 'test')).toBeFalsy();
    expect(isEqualTest({}, 5)).toBeFalsy();
    expect(isEqualTest({}, [])).toBeFalsy();
  });
})


