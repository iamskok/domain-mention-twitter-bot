import sys
import json
import random
from datetime import datetime, timedelta
from pprint import pprint

tweets = []

for i in range(20):
  id_str = random.randint(10**17, 10**18-1)

  regular_tweet = {
    'created_at': (datetime.now() - timedelta(minutes=random.randint(1, 1000))).isoformat(),
    'id_str': id_str,
    'text': ''.join([random.choice([chr(n) for n in range(ord('a'), ord('z'))] + [' ', ', '])
      for x in range(random.randint(20, 140))]),
    'user': {
      'screen_name': ''.join([random.choice([chr(n) for n in range(ord('a'), ord('z'))]) for x in range(random.randint(5, 15))])
    },
  }

  quote_tweet = {
    **regular_tweet,
    'quoted_status_id_str': id_str
  }

  reply_tweet = {
    **regular_tweet,
    'in_reply_to_status_id_str': id_str
  }

  tweets.extend([regular_tweet, quote_tweet, reply_tweet])

with open("my_tweets.json", "w") as f:
  f.write(json.dumps(tweets))

# pprint(tweets)
