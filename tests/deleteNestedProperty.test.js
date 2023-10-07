const {deleteNestedProperty: deleteNestedPropertyTest} = require('../dist/object-resolver');

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
})


