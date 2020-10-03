import { loggerTimestamp, commentTimestamp } from '../timestamp';

describe('loggerTimestamp utility', () => {
  it('returns formatted `YYYY-MM-DD HH:mm:ss:SSS` string', () => {
    expect(loggerTimestamp('2020-10-03T00:00:00.000Z'))
      .toBe('2020-10-03 00:00:00:000');
  });
});

describe('commentTimestamp utility', () => {
  it('returns formatted `MM-DD-YYYY` string', () => {
    expect(commentTimestamp('Sun Oct 03 00:00:00 +0000 2020'))
      .toBe('10-03-2020');
  });
});
