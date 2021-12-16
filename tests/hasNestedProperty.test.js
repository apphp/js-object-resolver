const {hasNestedProperty: hasNestedPropertyTest, getNestedPropertyTest} = require('../dist/object-resolver');

describe('Test function hasNestedProperty', ()=>{

  test('Given an undefined values', async () => {
    const receivedProp = hasNestedPropertyTest();
    expect(receivedProp).toBe(false);
  })

  test('Receive a simple not existing scalar prop', async () => {
    const obj = {'a':1};
    const expectedProp = undefined;
    const receivedProp = hasNestedPropertyTest(obj, 'b');
    expect(receivedProp).toBe(false);
  })

  test('Receive a simple existing boolean prop', async () => {
    const obj = {'a':false};
    const receivedProp = hasNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(true);
  })

  test('Receive a simple existing nullable prop', async () => {
    const obj = {'a':null};
    const receivedProp = hasNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(true);
  })

  test('Receive a simple existing prop with undefined value', async () => {
    const obj = {'a':undefined};
    const receivedProp = hasNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(true);
  })

  test('Receive a simple not existing scalar prop default value defined', async () => {
    const obj = {'a':1};
    const receivedProp = hasNestedPropertyTest(obj, 'b', 2);
    expect(receivedProp).toBe(false);
  })

  test('Receive a simple existing scalar prop', async () => {
    const obj = {'a':1};
    const receivedProp = hasNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(true);
  })

  test('Receive a complicated existing object', async () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const receivedProp = hasNestedPropertyTest(obj, 'b');
    expect(receivedProp).toStrictEqual(true);
  })

  test('Receive a complicated existing object prop', async () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const receivedProp = hasNestedPropertyTest(obj, 'b.bbb');
    expect(receivedProp).toStrictEqual(true);
  })

  test('Receive a complicated existing object prop value', async () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const receivedProp = hasNestedPropertyTest(obj, 'b.bbb.ccc');
    expect(receivedProp).toBe(true);
  })

  test('Receive an embedded existing array prop', async () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bb': 22}]};
    const receivedProp = hasNestedPropertyTest(obj, 'b');
    expect(receivedProp).toStrictEqual(true);
  })

  test('Receive an embedded existing array prop', async () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bb': 22}]};
    const receivedProp = hasNestedPropertyTest(obj, 'b.1');
    expect(receivedProp).toStrictEqual(true);
  })

  test('Receive an embedded existing array prop value', async () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bbb': 222}]};
    const receivedProp = hasNestedPropertyTest(obj, 'b.1.bbb');
    expect(receivedProp).toBe(true);
  })

  test('Receive an embedded non existing array prop value', async () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bbb': 222}]};
    const receivedProp = hasNestedPropertyTest(obj, 'b.1.ccc');
    expect(receivedProp).toBe(false);
  })

})


