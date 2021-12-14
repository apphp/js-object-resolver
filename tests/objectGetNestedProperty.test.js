const {objectGetNestedProperty: objectGetNestedPropertyTest, objectCloneTest} = require('../dist/object-resolver');

describe('Test function objectGetNestedProperty', () => {

  test('Given an undefined values', async () => {
    const prop = undefined;
    const receivedProp = objectGetNestedPropertyTest();
    expect(receivedProp).toBe(prop);
  })

  test('Receive a simple not existing scalar prop', async () => {
    const obj = {'a':1};
    const expectedProp = undefined;
    const receivedProp = objectGetNestedPropertyTest(obj, 'b');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple existing boolean prop', async () => {
    const obj = {'a':false};
    const expectedProp = false;
    const receivedProp = objectGetNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple existing nullable prop', async () => {
    const obj = {'a':null};
    const expectedProp = null;
    const receivedProp = objectGetNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple existing prop with undefined value', async () => {
    const obj = {'a':undefined};
    const expectedProp = undefined;
    const receivedProp = objectGetNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple not existing scalar prop default value defined', async () => {
    const obj = {'a':1};
    const expectedProp = 2;
    const receivedProp = objectGetNestedPropertyTest(obj, 'b', 2);
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a simple existing scalar prop', async () => {
    const obj = {'a':1};
    const expectedProp = 1;
    const receivedProp = objectGetNestedPropertyTest(obj, 'a');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive a complicated existing object', async () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const expectedProp = {'bb': 2, 'bbb': {'ccc':3}};
    const receivedProp = objectGetNestedPropertyTest(obj, 'b');
    expect(receivedProp).toStrictEqual(expectedProp);
  })

  test('Receive a complicated existing object prop', async () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const expectedProp = {'ccc':3};
    const receivedProp = objectGetNestedPropertyTest(obj, 'b.bbb');
    expect(receivedProp).toStrictEqual(expectedProp);
  })

  test('Receive a complicated existing object prop value', async () => {
    const obj = {'a':1, 'b': {'bb': 2, 'bbb': {'ccc':3}}};
    const expectedProp = 3;
    const receivedProp = objectGetNestedPropertyTest(obj, 'b.bbb.ccc');
    expect(receivedProp).toBe(expectedProp);
  })

  test('Receive an embedded existing array prop', async () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bb': 22}]};
    const expectedProp = [{'bb': 21}, {'bb': 22}];
    const receivedProp = objectGetNestedPropertyTest(obj, 'b');
    expect(receivedProp).toStrictEqual(expectedProp);
  })

  test('Receive an embedded existing array prop', async () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bb': 22}]};
    const expectedProp = {'bb': 22};
    const receivedProp = objectGetNestedPropertyTest(obj, 'b.1');
    expect(receivedProp).toStrictEqual(expectedProp);
  })

  test('Receive an embedded existing array prop value', async () => {
    const obj = {'a':1, 'b': [{'bb': 21}, {'bbb': 222}]};
    const expectedProp = 222;
    const receivedProp = objectGetNestedPropertyTest(obj, 'b.1.bbb');
    expect(receivedProp).toBe(expectedProp);
  })

})


