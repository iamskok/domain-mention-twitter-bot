export default [
  // Original tweet
  {
    created_at: 'Wed Oct 10 01:19:24 +0000 2020',
    id_str: '000000000000000000',
    text: 'Hey eveyone!',
    user: { screen_name: 'Mike' },
  },

  // Mike's tweet
  // 2nd level quote
  {
    created_at: 'Wed Oct 10 01:30:24 +0000 2020',
    id_str: '111111111111111111',
    text: 'Hey!!',
    user: { screen_name: 'John' },
    quoted_status_id_str: '000000000000000000',
  },
  // 2nd level reply
  {
    created_at: 'Wed Oct 10 01:34:24 +0000 2020',
    id_str: '222222222222222222',
    text: 'Hello world',
    user: { screen_name: 'Marry' },
    in_reply_to_status_id_str: '000000000000000000',
  },

  // John's tweet
  // 2nd level quote
  {
    created_at: 'Wed Oct 10 01:50:24 +0000 2020',
    id_str: '333333333333333333',
    text: 'Yo!',
    user: { screen_name: 'Lisa' },
    quoted_status_id_str: '111111111111111111',
  },
  // 2nd level reply
  {
    created_at: 'Wed Oct 10 01:40:24 +0000 2020',
    id_str: '444444444444444444',
    text: 'How are you guys?',
    user: { screen_name: 'Beth' },
    in_reply_to_status_id_str: '111111111111111111',
  },

  // Marry's tweet
  // 2nd level reply
  {
    created_at: 'Wed Oct 10 02:30:24 +0000 2020',
    id_str: '555555555555555555',
    text: 'How are you guys?',
    user: { screen_name: 'Bob' },
    in_reply_to_status_id_str: '222222222222222222',
  },
  // 2nd level quote
  {
    created_at: 'Wed Oct 10 02:40:24 +0000 2020',
    id_str: '666666666666666666',
    text: 'Hello friends!',
    user: { screen_name: 'Cindy' },
    quoted_status_id_str: '222222222222222222',
  },

  // Tweet without quotes and replies
  {
    created_at: 'Wed Oct 10 04:40:24 +0000 2020',
    id_str: '777777777777777777',
    text: 'JavaScript 4ever',
    user: { screen_name: 'Eric' },
  },

  // Stream tweets
  // 1st tweet with URL entities
  {
    created_at: 'Wed Oct 10 05:40:24 +0000 2020',
    id_str: '88888888888888888888',
    text: '1st tweet with URL - http://t.co/12345',
    user: { screen_name: 'Mark' },
    entities: {
      urls: [
        {
          expanded_url: 'https://example.com/blog/javascript',
        },
      ],
    },
  },
  // 2nd tweet with URL entities
  {
    created_at: 'Wed Oct 10 06:40:24 +0000 2020',
    id_str: '030303030303030303',
    text: '2nd tweet with URL - http://t.co/54321',
    user: { screen_name: 'Joe' },
    entities: {
      urls: [
        {
          expanded_url: 'https://example.com/blog/react',
        },
      ],
    },
  },
  // Quoted tweet with URL entities
  {
    created_at: 'Wed Oct 10 05:40:24 +0000 2020',
    id_str: '010101010101010101',
    text: 'Quoted Tweet with URL - http://t.co/11111',
    user: { screen_name: 'Evan' },
    quoted_status_id_str: '999999999999999999',
    entities: {
      urls: [
        {
          expanded_url: 'https://example.com/blog/go',
        },
      ],
    },
  },
  // Retweeted tweet with URL entities
  {
    created_at: 'Wed Oct 10 06:44:24 +0000 2020',
    id_str: '040404040404040404',
    text: 'Quoted Tweet with URL - http://t.co/33333',
    user: { screen_name: 'Amanda' },
    retweeted_status: {
      tweet: {
        user: {
          screen_name: 'Alice',
        },
      },
    },
    entities: {
      urls: [
        {
          expanded_url: 'https://example.com/blog/typescript',
        },
      ],
    },
  },
  // Tweet without URL entities
  {
    created_at: 'Wed Oct 10 05:40:24 +0000 2020',
    id_str: '020202020202020202',
    text: 'Tweet without URL',
    user: { screen_name: 'George' },
  },
];
