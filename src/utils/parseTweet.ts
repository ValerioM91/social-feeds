import parse from 'html-react-parser';

const parseTweet = (text: string): string | JSX.Element | JSX.Element[] => {
  const urlRegex =
    /(([a-z]+:\/\/)?(([a-z0-9\\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\\.~]+)*(\/([a-z0-9_\-\\.]*)(\?[a-z0-9+_\-\\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

  let parsedtext = text.replace(
    urlRegex,
    (url) => '<a class="underline" target="_blank" href="' + url + '">' + url + '</a>'
  );

  const mentionRegex = /\B@\w+/g;
  parsedtext = parsedtext.replace(
    mentionRegex,
    (mention) =>
      '<a class="underline" target="_blank" href="https://twitter.com/' +
      mention.slice(1) +
      '">' +
      mention +
      '</a>'
  );

  const hashtagRegex = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
  parsedtext = parsedtext.replace(
    hashtagRegex,
    (hashtag) =>
      '<a class="underline" target="_blank" href="https://twitter.com/search?q=%23' +
      hashtag.slice(1) +
      '">' +
      hashtag +
      '</a>'
  );

  return parse(parsedtext);
};

export default parseTweet;
