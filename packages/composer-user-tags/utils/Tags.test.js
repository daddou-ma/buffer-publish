import moment from 'moment-timezone';
import { getClientXY, removeClientXY } from './Tags';

describe('Tags Utils', () => {
  describe('getClientXY', () => {
    const xyObj = { x: 0.5, y: 0.2 };
    it('calculates clientX & clientY for each item in array', () => {
      const arrToSend = [...xyObj];
      const format = getClientXY([...objToSend]);
      expect(format).toEqual([{ ...objToSend, clientX: }]);
    });
    it('returns readable date with BST timezone and 24h time', () => {
      const objToSend = {
        uses24hTime: true,
        scheduledAt: 1569261207,
        timezone: 'Europe/London',
      };
      const format = getReadableDateFormat(objToSend);
      expect(format).toEqual('Sep 23, 18:53');
    });
  });
  describe('removeClientXY', () => {
    it('removes clientX & clientY props from array items', () => {
      const arrToSend = [{
        ...xyObj,
        clientX: 282,
        clientY: 302.2,
      }];
      const format = removeClientXY(arrToSend);
      expect(arrToSend).toEqual([...xyObj]);
    });
  });
});
