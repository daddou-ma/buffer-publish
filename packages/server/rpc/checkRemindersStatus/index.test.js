import checkRemindersStatus from '.';

describe('rpc/checkRemindersStatus', () => {
  it('should have the expected name', () => {
    expect(checkRemindersStatus.name).toBe('checkRemindersStatus');
  });

  it('should have the expected docs', () => {
    expect(checkRemindersStatus.docs).toBe(
      'check if profiles have push notifications and reminders in the queue'
    );
  });
});
