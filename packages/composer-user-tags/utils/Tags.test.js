import { getClientXY, removeClientXY } from './Tags';

describe('Tags Utils', () => {
  const xyObj = { x: 0.5, y: 0.2 };
  describe('getClientXY', () => {
    it('adds clientX & clientY for each item in array', () => {
      const format = getClientXY([...xyObj]);
      expect(format).toEqual([{ ...xyObj, clientX: 50, y: 20 }]);
    });
  });
  describe('removeClientXY', () => {
    it('removes clientX & clientY props from array items', () => {
      const arrToSend = [
        {
          ...xyObj,
          clientX: 50,
          clientY: 20,
        },
      ];
      const format = removeClientXY(arrToSend);
      expect(format).toEqual([...xyObj]);
    });
  });
});
