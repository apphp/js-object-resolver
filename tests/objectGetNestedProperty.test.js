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

})


