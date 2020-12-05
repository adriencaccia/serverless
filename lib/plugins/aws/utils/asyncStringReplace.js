'use strict';

// Credit to https://dev.to/ycmjason/stringprototypereplace-asynchronously-28k9
async function asyncStringReplace(str, regex, aReplacer) {
  const substrings = [];
  let match;
  let i = 0;
  while ((match = regex.exec(str)) !== null) {
    // put non matching string
    substrings.push(str.slice(i, match.index));
    // call the async replacer function with the matched array spreaded
    substrings.push(aReplacer(...match));
    i = regex.lastIndex;
  }
  // put the rest of str
  substrings.push(str.slice(i));
  // wait for aReplacer calls to finish and join them back into string
  return (await Promise.all(substrings)).join('');
}

module.exports = asyncStringReplace;
