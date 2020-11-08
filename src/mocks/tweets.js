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
];
