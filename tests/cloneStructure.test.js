const {cloneStructure: cloneStructureTest} = require('../src/object-resolver');

const originalStructuredClone = global.structuredClone;

beforeAll(() => {
  global.structuredClone = (value) => JSON.parse(JSON.stringify(value));
});

afterAll(() => {
  global.structuredClone = originalStructuredClone;
});

describe('Test function cloneStructure', () => {

  test('Given an undefined value', async () => {
    const obj = undefined;
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toBe(obj);
  })

  test('Given a null value', async () => {
    const obj = null;
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toBe(obj);
  })

  test('Given a simple object value', async () => {
    const obj = {'a': 1};
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toStrictEqual(obj);
    expect(objCopy).not.toBe(obj);
  })

})


