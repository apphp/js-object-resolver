const {deleteNestedProperty: deleteNestedPropertyTest} = require('../src/object-resolver');

describe('Test function setNestedProperty', () => {

    test('Should delete a deeply nested property', () => {
        const obj = { user: { profile: { name: 'John Doe' } } };
        deleteNestedPropertyTest(obj, 'user.profile.name');
        expect(obj).toEqual({ user: { profile: {} } });
    });

    test('Should do nothing if the property does not exist', () => {
        const obj = { user: { profile: { email: 'john@example.com' } } };
        deleteNestedPropertyTest(obj, 'user.profile.name');
        expect(obj).toEqual({ user: { profile: { email: 'john@example.com' } } });
    });

    test('Should delete a top-level property', () => {
        const obj = { name: 'John Doe' };
        deleteNestedPropertyTest(obj, 'name');
        expect(obj).toEqual({});
    });

    test('Should do nothing if the top-level property does not exist', () => {
        const obj = { email: 'john@example.com' };
        deleteNestedPropertyTest(obj, 'name');
        expect(obj).toEqual({ email: 'john@example.com' });
    });

    test('Should delete a deeply nested property with numeric keys', () => {
        const obj = { user: [null, { profile: [null, { name: 'John Doe' }] }] };
        deleteNestedPropertyTest(obj, 'user.1.profile.1.name');
        expect(obj).toEqual({ user: [null, { profile: [null, {}] }] });
    });

    test('Should do nothing if the root object is undefined', () => {
        let obj; // Undefined object
        deleteNestedPropertyTest(obj, 'user.profile.name');
        expect(obj).toBeUndefined(); // Object remains undefined
    });

    test('Should do nothing if the root object is null', () => {
        const obj = null; // Null object
        deleteNestedPropertyTest(obj, 'user.profile.name');
        expect(obj).toBeNull(); // Object remains null
    });

    test('Should return early when intermediate path is missing', () => {
        const obj = { user: {} };
        deleteNestedPropertyTest(obj, 'user.profile.name');
        expect(obj).toEqual({ user: {} });
    });

    test('Should delete an item from an array path', () => {
        const obj = { user: { list: ['a', 'b', 'c'] } };
        deleteNestedPropertyTest(obj, 'user.list.1');
        expect(obj.user.list).toEqual(['a', 'c']);
    });

    test('Should delete property using array path input', () => {
        const obj = { user: { profile: { name: 'John Doe', age: 30 } } };
        deleteNestedPropertyTest(obj, ['user', 'profile', 'name']);
        expect(obj).toEqual({ user: { profile: { age: 30 } } });
    });

    test('Should delete property using bracket notation', () => {
        const obj = { user: { list: ['a', 'b', 'c'] } };
        deleteNestedPropertyTest(obj, 'user.list[1]');
        expect(obj.user.list).toEqual(['a', 'c']);
    });

    test('Should delete property with escaped dot in key', () => {
        const obj = { 'user.profile': { name: 'John Doe', age: 30 } };
        deleteNestedPropertyTest(obj, 'user\\.profile.name');
        expect(obj).toEqual({ 'user.profile': { age: 30 } });
    });

    test('Should delete quoted bracket key with dot in key', () => {
        const obj = { user: { 'profile.name': 'John Doe', age: 30 } };
        deleteNestedPropertyTest(obj, 'user["profile.name"]');
        expect(obj).toEqual({ user: { age: 30 } });
    });

    test('Should throw an error when trying to delete through __proto__', () => {
        const obj = {};
        expect(() => deleteNestedPropertyTest(obj, '__proto__.toString')).toThrow('Invalid property key');
        expect(typeof Object.prototype.toString).toBe('function');
    });

    test('Should throw for constructor and prototype segments too', () => {
        const obj = {};
        expect(() => deleteNestedPropertyTest(obj, 'constructor.prototype.toString')).toThrow('Invalid property key');
        expect(() => deleteNestedPropertyTest(obj, 'a.prototype.b')).toThrow('Invalid property key');
        expect(typeof Object.prototype.toString).toBe('function');
    });

    test('Should reject a forbidden segment even when an earlier one is missing', () => {
        // The walk returns early on a missing intermediate, so a check performed
        // during the walk would never reach the __proto__ segment.
        const obj = {};
        expect(() => deleteNestedPropertyTest(obj, 'missing.__proto__.toString')).toThrow('Invalid property key');
        expect(typeof Object.prototype.toString).toBe('function');
    });

})


