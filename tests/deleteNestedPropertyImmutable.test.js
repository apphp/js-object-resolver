const {deleteNestedPropertyImmutable: deleteNestedPropertyImmutableTest} = require('../src/object-resolver');

describe('Test function deleteNestedPropertyImmutable', () => {
  test('Should delete nested value on a cloned object', () => {
    const original = { user: { profile: { name: 'John', age: 30 } } };

    const updated = deleteNestedPropertyImmutableTest(original, 'user.profile.name');

    expect(updated).toEqual({ user: { profile: { age: 30 } } });
    expect(original).toEqual({ user: { profile: { name: 'John', age: 30 } } });
    expect(updated).not.toBe(original);
    expect(updated.user).not.toBe(original.user);
  });

  test('Should keep shape unchanged when path does not exist', () => {
    const original = { user: { profile: { age: 30 } } };

    const updated = deleteNestedPropertyImmutableTest(original, 'user.profile.name');

    expect(updated).toEqual({ user: { profile: { age: 30 } } });
    expect(original).toEqual({ user: { profile: { age: 30 } } });
    expect(updated).not.toBe(original);
  });
});
