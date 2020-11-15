import setFirebaseUpdated from '../set-firebase-updated';
import responses from '../../tests/options/responses';

describe('setFirebaseUpdated', () => {
  it('returns false when old and all responses are equal', () => {
    expect(setFirebaseUpdated(responses.old, responses.all)).toBe(false);
  });

  it('returns true when old and all responses have the same value', () => {
    expect(setFirebaseUpdated(
      responses.old,
      [...responses.all, { id_str: '444444444444444444' }],
    )).toBe(true);
  });
});
