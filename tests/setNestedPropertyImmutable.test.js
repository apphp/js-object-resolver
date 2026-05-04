const {setNestedPropertyImmutable: setNestedPropertyImmutableTest} = require('../src/object-resolver');

describe('Test function setNestedPropertyImmutable', () => {
  test('Should set nested value on a cloned object', () => {
    const original = { user: { profile: { name: 'John' } } };

    const updated = setNestedPropertyImmutableTest(original, 'user.profile.name', 'Jane');

    expect(updated).toEqual({ user: { profile: { name: 'Jane' } } });
    expect(original).toEqual({ user: { profile: { name: 'John' } } });
    expect(updated).not.toBe(original);
    expect(updated.user).not.toBe(original.user);
  });

  test('Should create missing path on a cloned object', () => {
    const original = {};

    const updated = setNestedPropertyImmutableTest(original, 'user.profile.name', 'Jane');

    expect(updated).toEqual({ user: { profile: { name: 'Jane' } } });
    expect(original).toEqual({});
  });

  test('Should use structuredClone path when available', () => {
    const originalStructuredClone = global.structuredClone;
    global.structuredClone = (value) => JSON.parse(JSON.stringify(value));

    try {
      const original = { user: { profile: { name: 'John' } } };
      const updated = setNestedPropertyImmutableTest(original, 'user.profile.name', 'Jane');

      expect(updated).toEqual({ user: { profile: { name: 'Jane' } } });
      expect(original).toEqual({ user: { profile: { name: 'John' } } });
    } finally {
      global.structuredClone = originalStructuredClone;
    }
  });
});
