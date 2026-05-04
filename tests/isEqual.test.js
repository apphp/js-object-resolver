const {isEqual: isEqualTest} = require('../src/object-resolver');

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

  test('Should return true for objects with different key order', () => {
    const obj1 = { a: 1, b: 2, c: { x: 10, y: 20 } };
    const obj2 = { c: { y: 20, x: 10 }, b: 2, a: 1 };
    expect(isEqualTest(obj1, obj2)).toBeTruthy();
  });

  test('Should compare Date and RegExp values correctly', () => {
    expect(isEqualTest(new Date('2023-01-01'), new Date('2023-01-01'))).toBeTruthy();
    expect(isEqualTest(new Date('2023-01-01'), new Date('2024-01-01'))).toBeFalsy();

    expect(isEqualTest(/abc/gi, /abc/gi)).toBeTruthy();
    expect(isEqualTest(/abc/g, /abc/i)).toBeFalsy();
  });

  test('Should compare Set and Map values correctly', () => {
    const set1 = new Set([1, { a: 2 }]);
    const set2 = new Set([{ a: 2 }, 1]);
    expect(isEqualTest(set1, set2)).toBeTruthy();

    const map1 = new Map([[{ id: 1 }, { role: 'admin' }], ['k', 10]]);
    const map2 = new Map([[{ id: 1 }, { role: 'admin' }], ['k', 10]]);
    const map3 = new Map([[{ id: 1 }, { role: 'user' }], ['k', 10]]);
    expect(isEqualTest(map1, map2)).toBeTruthy();
    expect(isEqualTest(map1, map3)).toBeFalsy();
  });

  test('Should handle circular references', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    obj1.self = obj1;
    obj2.self = obj2;

    const obj3 = { a: 1, self: {} };

    expect(isEqualTest(obj1, obj2)).toBeTruthy();
    expect(isEqualTest(obj1, obj3)).toBeFalsy();
  });

  test('Should compare ArrayBuffer values correctly', () => {
    const sameA = new Uint8Array([1, 2, 3]).buffer;
    const sameB = new Uint8Array([1, 2, 3]).buffer;
    const differentLength = new Uint8Array([1, 2]).buffer;
    const differentContent = new Uint8Array([1, 9, 3]).buffer;

    expect(isEqualTest(sameA, sameB)).toBeTruthy();
    expect(isEqualTest(sameA, differentLength)).toBeFalsy();
    expect(isEqualTest(sameA, differentContent)).toBeFalsy();
  });

  test('Should compare typed arrays correctly', () => {
    expect(isEqualTest(new Uint8Array([1, 2]), new Uint8Array([1, 2]))).toBeTruthy();
    expect(isEqualTest(new Uint8Array([1, 2]), new Uint16Array([1, 2]))).toBeFalsy();
    expect(isEqualTest(new Uint8Array([1, 2]), new Uint8Array([1, 2, 3]))).toBeFalsy();
    expect(isEqualTest(new Uint8Array([1, 2]), new Uint8Array([1, 9]))).toBeFalsy();
  });

  test('Should return false for map and set size mismatch', () => {
    expect(isEqualTest(new Map([['a', 1]]), new Map([['a', 1], ['b', 2]]))).toBeFalsy();
    expect(isEqualTest(new Set([1]), new Set([1, 2]))).toBeFalsy();
  });

  test('Should return false for non-matching set values', () => {
    expect(isEqualTest(new Set([1, 2]), new Set([1, 3]))).toBeFalsy();
  });

  test('Should return false for arrays with different length', () => {
    expect(isEqualTest([1, 2], [1, 2, 3])).toBeFalsy();
  });

  test('Should return false for objects with different key shapes', () => {
    expect(isEqualTest({ a: 1 }, { a: 1, b: 2 })).toBeFalsy();
    expect(isEqualTest({ a: 1, b: 2 }, { a: 1, c: 2 })).toBeFalsy();
  });
})


