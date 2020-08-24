const bot = require("./bot")

const DB = {
  tweets: []
}

const targetString = `skok.club`

const userTimelineOptions = {
  count: 3200
}

// Find all personal tweets mentioning `targetString` and save them.
const getUserTimeline = () => {
  bot.get(
    `statuses/user_timeline`,
    userTimelineOptions,
    (err, data, response) => {
      if (err) {
        console.log(err)
      } else {
        data.forEach(item => {
          item.entities.urls.forEach(({ expanded_url: url }) => {
            if (url.includes(targetString)) {
              DB.tweets.push(item)
            }
          })
        })
      }
  })
}

getUserTimeline()

