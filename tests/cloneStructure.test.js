const {cloneStructure: cloneStructureTest} = require('../dist/object-resolver');

// Check the Node.js version
const nodeMajorVersion = parseInt(process.versions.node.split('.')[0]);

describe('Test function cloneStructure', () => {

  test('Given an undefined value', async () => {
    if (nodeMajorVersion < 17) {
      expect(true).toBe(true);
      return;
    }

    const obj = undefined;
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toBe(obj);
  })

  test('Given a null value', async () => {
    if (nodeMajorVersion < 17) {
      expect(true).toBe(true);
      return;
    }

    const obj = null;
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toBe(obj);
  })

  test('Given a simple object value', async () => {
    if (nodeMajorVersion < 17) {
      expect(true).toBe(true);
      return;
    }

    const obj = {'a': 1};
    const objCopy = cloneStructureTest(obj);
    expect(objCopy).toBe(obj);
  })

})


