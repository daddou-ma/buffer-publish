import { getTime } from './index';

describe('Date utilities', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return time for current date', () => {
    const mockDate = new Date('2020-01-01T10:10:00.000Z');
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    expect(getTime()).toBe(1577873400);
    spy.mockRestore();
  });

  it('should return time for a given date', () => {
    const time = getTime(new Date('2020-06-10T11:30:00.000Z'));
    expect(time).toBe(1591788600);
  });
});
