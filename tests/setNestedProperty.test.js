const {setNestedProperty: setNestedPropertyTest} = require('../dist/object-resolver');

describe('Test function setNestedProperty', () => {

// Test cases for setNestedProperty
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


