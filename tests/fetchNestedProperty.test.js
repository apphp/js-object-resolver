const {fetchNestedProperty: fetchNestedProperty} = require('../dist/object-resolver');

describe('Test function fetchNestedProperty', () => {

  test('Missing required arguments', () => {
    const prop = undefined;
    const receivedProp = fetchNestedProperty();
    expect(receivedProp).toBe(prop);
  })

  test('Missing first required argument', () => {
    const obj = {};
    const prop = undefined;
    const receivedProp = fetchNestedProperty(obj);
    expect(receivedProp).toBe(prop);
  })

  test('Missing second required argument', () => {
    const path = 'role';
    const prop = undefined;
    const receivedProp = fetchNestedProperty(null, path);
    expect(receivedProp).toBe(prop);
  })

  test('Wrong property name', () => {
    const obj = { role: { role: { role: 'student' } }};
    const path = 'np-role';
    const prop = undefined;
    const receivedProp = fetchNestedProperty(obj, path);
    expect(receivedProp).toBe(prop);
  })

  test('Missing sub-property', () => {
    const obj = { role: { name: { role: 'student' } }};
    const path = 'role';
    const prop = undefined;
    const receivedProp = fetchNestedProperty(obj, path);
    expect(receivedProp).toBe(prop);
  })

  test('Valid property 1 level', () => {
    const prop = 'student';
    const obj = { role: { role: prop } };
    const path = 'role';
    const receivedProp = fetchNestedProperty(obj, path);
    expect(receivedProp).toBe(prop);
  })

  test('Valid property 2 levels', () => {
    const prop = 'student';
    const obj = { role: { role: { role: prop } }};
    const path = 'role';
    const receivedProp = fetchNestedProperty(obj, path);
    expect(receivedProp).toBe(prop);
  })

  test('Valid property 3 levels', () => {
    const prop = 'student';
    const obj = { role: { role: { role: { role: { role: prop } } } }};
    const path = 'role';
    const receivedProp = fetchNestedProperty(obj, path);
    expect(receivedProp).toBe(prop);
  })

})


