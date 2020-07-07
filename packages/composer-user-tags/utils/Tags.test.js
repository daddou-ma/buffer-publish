import {
  getClientXY,
  removeClientXY,
  getDefaultIfInfinite,
  DEFAULT_COORDINATE,
} from './Tags';

describe('Tags Utils', () => {
  const xyObj = { x: 0.5, y: 0.2 };
  describe('getClientXY', () => {
    it('adds clientX & clientY for each item in array', () => {
      const format = getClientXY([{ ...xyObj }]);
      expect(format).toEqual([{ ...xyObj, clientX: 50, clientY: 20 }]);
    });
  });
  describe('removeClientXY', () => {
    it('removes clientX & clientY props from array items', () => {
      const objToSend = {
        ...xyObj,
        clientX: 50,
        clientY: 20,
      };
      const format = removeClientXY([{ ...objToSend }]);
      expect(format).toEqual([{ ...xyObj }]);
    });
  });
  describe('getDefaultIfInfinite', () => {
    it('returns default number if value is infinity', () => {
      const infinityValue = getDefaultIfInfinite(Infinity);
      expect(infinityValue).toEqual(DEFAULT_COORDINATE);
    });
    it('returns default number if value is string', () => {
      const stringValue = getDefaultIfInfinite('hello');
      expect(stringValue).toEqual(DEFAULT_COORDINATE);
    });
    it('returns value when number', () => {
      const numberValue = getDefaultIfInfinite(10);
      expect(numberValue).toEqual(10);
    });
  });
});
