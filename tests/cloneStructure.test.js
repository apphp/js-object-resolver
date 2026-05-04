const {cloneStructure: cloneStructureTest} = require('../dist/object-resolver');

const hasStructuredClone = typeof structuredClone === 'function';

describe('Test function cloneStructure', () => {

  test('Given an undefined value', async () => {
    if (!hasStructuredClone) {
      expect(true).toBe(true);
      return;
    }

    const obj = undefined;
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toBe(obj);
  })

  test('Given a null value', async () => {
    if (!hasStructuredClone) {
      expect(true).toBe(true);
      return;
    }

    const obj = null;
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toBe(obj);
  })

  test('Given a simple object value', async () => {
    if (!hasStructuredClone) {
      expect(true).toBe(true);
      return;
    }

    const obj = {'a': 1};
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toStrictEqual(obj);
    expect(objCopy).not.toBe(obj);
  })

})


