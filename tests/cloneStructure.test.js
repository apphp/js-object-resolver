const {cloneStructure: cloneStructureTest} = require('../dist/object-resolver');

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
    expect(objCopy).toBe(obj);
  })

})


