const {setNestedProperty: setNestedPropertyTest} = require('../dist/object-resolver');

describe('Test function setNestedProperty', () => {
  // Test cases for setNestedProperty

  let obj;

  beforeEach(() => {
    obj = {
      existing: { property: 'value' },
      arrayProperty: [{ nestedArray: 'nestedValue' }]
    };
  });

  test('Should throw an error when trying to modify __proto__', () => {
    const obj = {};
    expect(() => setNestedPropertyTest(obj, '__proto__.polluted', 'yes')).toThrow('Invalid property key');
  });

  test('Should throw an error for non-string and non-array path', () => {
    expect(() => setNestedPropertyTest(obj, null, 'newValue')).toThrow('Path must be a string or an array');
    expect(() => setNestedPropertyTest(obj, 42, 'newValue')).toThrow('Path must be a string or an array');
    expect(() => setNestedPropertyTest(obj, {}, 'newValue')).toThrow('Path must be a string or an array');
  });

  test('Should throw an error when trying to modify prototype', () => {
    expect(() => setNestedPropertyTest(obj, 'prototype.polluted', 'yes')).toThrow('Invalid property key');
  });

  test('Should throw an error when trying to modify constructor', () => {
    expect(() => setNestedPropertyTest(obj, 'constructor.polluted', 'yes')).toThrow('Invalid property key');
  });

  test('Sets a value at an existing index in an array', () => {
    const obj = {
      numbers: [1, 2, 3]
    };

    setNestedPropertyTest(obj, 'numbers.1', 99);
    expect(obj.numbers[1]).toBe(99);
  });

  test('Should set a deeply nested property', () => {
    const obj = {};
    setNestedPropertyTest(obj, 'user.profile.name', 'John Doe');
    expect(obj).toEqual({ user: { profile: { name: 'John Doe' } } });
  });

  test('Should create intermediate objects if they do not exist', () => {
    const obj = {};
    setNestedPropertyTest(obj, 'user.profile.name', 'Jane Doe');
    expect(obj).toEqual({ user: { profile: { name: 'Jane Doe' } } });
  });

  test('Should overwrite an existing property value', () => {
    const obj = { user: { profile: { name: 'John Doe' } } };
    setNestedPropertyTest(obj, 'user.profile.name', 'Jane Doe');
    expect(obj).toEqual({ user: { profile: { name: 'Jane Doe' } } });
  });

  test('Should set a top-level property', () => {
    const obj = {};
    setNestedPropertyTest(obj, 'name', 'John Doe');
    expect(obj).toEqual({ name: 'John Doe' });
  });

  test('Should overwrite an existing top-level property value', () => {
    const obj = { name: 'John Doe' };
    setNestedPropertyTest(obj, 'name', 'Jane Doe');
    expect(obj).toEqual({ name: 'Jane Doe' });
  });

  test('Should set a deeply nested property with numeric keys', () => {
    const obj = {};
    setNestedPropertyTest(obj, 'user.0.profile.1.name', 'John Doe');
    expect(obj).toEqual({ user: {"0" : { profile: {"1": { name: 'John Doe' }} }} });
  });

  test('Should set a deeply nested property with special characters in keys', () => {
    const obj = {};
    setNestedPropertyTest(obj, 'user.profile.@name', 'John Doe');
    expect(obj).toEqual({ user: { "profile": { '@name': 'John Doe' } } });
  });

  test('Should set a deeply nested property with mixed dot and array notation', () => {
    const obj = {};
    setNestedPropertyTest(obj, 'user.profile[0].name', 'John Doe');
    expect(obj).toEqual({ user: { "profile[0]":  { 'name': 'John Doe' } } } );
  });

  test('Should set a deeply nested property with mixed array and dot notation', () => {
    const obj = {};
    setNestedPropertyTest(obj, 'user.profile.0[1].name', 'John Doe');
    expect(obj).toEqual({ user: { "profile":  { "0[1]" : { 'name': 'John Doe' }} } } );
  });

})


