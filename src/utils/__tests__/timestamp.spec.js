import { loggerTimestamp, commentTimestamp } from '../timestamp';
import timestamp from '../../tests/options/timestamp';

describe('loggerTimestamp utility', () => {
  it('returns formatted `YYYY-MM-DD HH:mm:ss:SSS` string', () => {
    expect(loggerTimestamp(timestamp.logger))
      .toBe('2020-10-03 00:00:00:000');
  });
});

describe('commentTimestamp utility', () => {
  it('returns formatted `MM-DD-YYYY` string', () => {
    expect(commentTimestamp(timestamp.comment))
      .toBe('10-03-2020');
  });
});
