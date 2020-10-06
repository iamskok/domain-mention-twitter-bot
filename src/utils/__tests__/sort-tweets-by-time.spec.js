import sortTweetsByTime from '../sort-tweets-by-time';

describe('sortTweetsByTime utility', () => {
  it('returns all replies and quotes sorted in ascending order', () => {
    const tweet = {
      created_at: 'Tue Oct 02 19:25:48 +0000 2012',
      quotes: [
        {
          created_at: 'Wed Oct 03 19:25:48 +0000 2012',
          quotes: [
            {
              created_at: 'Wed Oct 03 21:25:48 +0000 2012',
              quotes: [
                {
                  created_at: 'Thu Oct 04 19:25:48 +0000 2012',
                  quotes: [
                    {
                      created_at: 'Thu Oct 04 20:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Thu Oct 04 22:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Thu Oct 04 9:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                  ],
                  replies: [
                    {
                      created_at: 'Thu Oct 04 3:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Thu Oct 04 5:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Thu Oct 04 1:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                  ],
                },
              ],
              replies: [
                {
                  created_at: 'Fri Oct 05 03:00:48 +0000 2012',
                  quotes: [
                    {
                      created_at: 'Fri Oct 05 03:55:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Fri Oct 05 03:09:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Fri Oct 05 04:35:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                  ],
                  replies: [
                    {
                      created_at: 'Fri Oct 05 03:15:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Fri Oct 05 03:09:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Fri Oct 05 04:35:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                  ],
                },
              ],
            },
            {
              created_at: 'Fri Oct 05 20:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Fri Oct 05 22:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
          replies: [
            {
              created_at: 'Wed Oct 03 20:25:48 +0000 2012',
              quotes: [
                {
                  created_at: 'Thu Oct 04 12:25:48 +0000 2012',
                  quotes: [
                    {
                      created_at: 'Fri Oct 05 22:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Fri Oct 05 12:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Fri Oct 05 21:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                  ],
                  replies: [
                    {
                      created_at: 'Fri Oct 05 12:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Fri Oct 05 14:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Fri Oct 05 01:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                  ],
                },
              ],
              replies: [
                {
                  created_at: 'Wed Oct 03 21:25:48 +0000 2012',
                  quotes: [
                    {
                      created_at: 'Tue Oct 02 22:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Tue Oct 02 22:35:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Tue Oct 02 22:45:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                  ],
                  replies: [
                    {
                      created_at: 'Thu Oct 04 01:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Thu Oct 04 03:25:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                    {
                      created_at: 'Thu Oct 04 01:15:48 +0000 2012',
                      quotes: [],
                      replies: [],
                    },
                  ],
                },
              ],
            },
            {
              created_at: 'Wed Oct 03 10:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 20:29:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
        },
        {
          created_at: 'Wed Oct 03 20:25:48 +0000 2012',
          quotes: [
            {
              created_at: 'Wed Oct 03 22:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 23:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 21:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
          replies: [
            {
              created_at: 'Wed Oct 03 19:45:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 19:55:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 19:35:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
        },
        {
          created_at: 'Thu Oct 04 19:27:48 +0000 2012',
          quotes: [
            {
              created_at: 'Thu Oct 04 19:35:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Thu Oct 04 20:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Thu Oct 04 19:30:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
          replies: [
            {
              created_at: 'Thu Oct 04 19:29:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Thu Oct 04 19:28:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Thu Oct 04 23:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
        },
      ],
      replies: [
        {
          created_at: 'Tue Oct 02 19:35:48 +0000 2012',
          quotes: [
            {
              created_at: 'Tue Oct 02 23:45:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Tue Oct 02 20:39:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Tue Oct 02 21:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
          replies: [
            {
              created_at: 'Tue Oct 02 20:15:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Tue Oct 02 20:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Tue Oct 02 20:20:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
        },
        {
          created_at: 'Wed Oct 03 19:25:48 +0000 2012',
          quotes: [
            {
              created_at: 'Wed Oct 03 19:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 19:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 19:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
          replies: [
            {
              created_at: 'Wed Oct 03 19:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Thu Oct 04 19:25:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 19:35:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
        },
        {
          created_at: 'Wed Oct 03 19:26:48 +0000 2012',
          quotes: [
            {
              created_at: 'Wed Oct 03 19:35:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 20:35:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 19:28:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
          replies: [
            {
              created_at: 'Wed Oct 03 19:35:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 19:33:48 +0000 2012',
              quotes: [],
              replies: [],
            },
            {
              created_at: 'Wed Oct 03 19:29:48 +0000 2012',
              quotes: [],
              replies: [],
            },
          ],
        },
      ],
    };

    expect(sortTweetsByTime(tweet, [])).toMatchSnapshot();
  });
});
