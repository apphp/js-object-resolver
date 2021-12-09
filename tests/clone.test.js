const {objectClone} = require('../dist/object-resolver');

describe('Test function objectClone', ()=>{

  test('Given an undefined value', async()=>{
      const data = undefined;
      const clone = objectClone();
      expect(clone).toBe(data);
  })

  test('Given an empty value', async()=>{
    const data = {};
    const clone = objectClone(data);
    expect(clone).toEqual(data);
  })

  test('Given a null value', async()=>{
    const data = null;
    const clone = objectClone(data);
    expect(clone).toBeNull();
  })

  test('Given a simple object value', async()=>{
    const data = {'a':1};
    const clone = objectClone(data);
    expect(clone).toEqual(data);
  })

  test('Given a nested object value', async()=>{
    const data = {'a':{'b':2}, 'c':3};
    const clone = objectClone(data);
    expect(clone).toEqual(data);
  })

  test('Given a nested object value with null and undefined', async()=>{
    const data = {'a':{'b':2}, 'c':3, 'd':null, 'e':undefined};
    const clone = objectClone(data);
    expect(clone).toEqual(data);
  })

})


