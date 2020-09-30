const tweetURL = ({
  user: {
    screen_name: userName,
  },
  id_str: idStr,
}) => `https://twitter.com/${userName}/status/${idStr}`;

export default tweetURL;
