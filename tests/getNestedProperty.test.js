const {getNestedProperty: getNestedPropertyTest} = require('../dist/object-resolver');

describe('Test function getNestedProperty', () => {

  test('Given an undefined values', () => {
    const prop = undefined;
    const receivedProp = getNestedPropertyTest();
    expect(receivedProp).toBe(prop);
  })

  test('Receive a simple not existing scalar prop', () => {
    const obj = {'a':1};
    const expectedProp = undefined;
    const receivedProp = getNestedPropertyTest(obj, 'b');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple existing boolean prop', () => {
    const obj = {'a':false};
    const expectedProp = false;
    const receivedProp = getNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple existing nullable prop', () => {
    const obj = {'a':null};
    const expectedProp = null;
    const receivedProp = getNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple existing prop with undefined value', () => {
    const obj = {'a':undefined};
    const expectedProp = undefined;
    const receivedProp = getNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple not existing scalar prop default value defined', () => {
    const obj = {'a':1};
    const expectedProp = 2;
    const receivedProp = getNestedPropertyTest(obj, 'b', 2);
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple existing scalar prop', () => {
    const obj = {'a':1};
    const expectedProp = 1;
    const receivedProp = getNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a complicated existing object', () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const expectedProp = {'bb': 2, 'bbb': {'ccc':3}};
    const receivedProp = getNestedPropertyTest(obj, 'b');
    expect(receivedProp).toStrictEqual(expectedProp);
  })

  test('Receive a complicated existing object prop', () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const expectedProp = {'ccc':3};
    const receivedProp = getNestedPropertyTest(obj, 'b.bbb');
    expect(receivedProp).toStrictEqual(expectedProp);
  })

  test('Receive a complicated existing object prop value', () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const expectedProp = 3;
    const receivedProp = getNestedPropertyTest(obj, 'b.bbb.ccc');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive an embedded existing array prop', () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bb': 22}]};
    const expectedProp = [{'bb': 21}, {'bb': 22}];
    const receivedProp = getNestedPropertyTest(obj, 'b');
    expect(receivedProp).toStrictEqual(expectedProp);
  })

  test('Receive an embedded existing array prop', () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bb': 22}]};
    const expectedProp = {'bb': 22};
    const receivedProp = getNestedPropertyTest(obj, 'b.1');
    expect(receivedProp).toStrictEqual(expectedProp);
  })

  test('Receive an embedded existing array prop value', () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bbb': 222}]};
    const expectedProp = 222;
    const receivedProp = getNestedPropertyTest(obj, 'b.1.bbb');
    expect(receivedProp).toBe(expectedProp);
  })

})


