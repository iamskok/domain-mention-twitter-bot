import { loggerTimestamp, commentTimestamp } from '../timestamp';

describe('loggerTimestamp utility', () => {
  it('returns formatted `YYYY-MM-DD HH:mm:ss:SSS` string', () => {
    expect(loggerTimestamp('1601687314622'))
      .toBe('2020-10-02 21:09:52:801');
  });
});

describe('commentTimestamp utility', () => {
  it('returns formatted `MM-DD-YYYY` string', () => {
    expect(commentTimestamp('Wed Sep 30 17:52:59 +0000 2020'))
      .toBe('10-02-2020');
  });
});
