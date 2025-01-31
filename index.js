async function getRandomQuote(elem) {
  const url = './quotes.json'
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const randPick = getRandPick(json.length)
    const randQuote = json[randPick]
    elem.innerHTML = 
      `<div><div class="quote">${randQuote.text}</div><div class="author">-${randQuote.source}</div></div>`

    console.log(randQuote)
  } catch (error) {
    console.error(error.message);
  }
}

function getRandPick (max) {
  return Math.floor(Math.random() * max)
}