
async function getRandomQuote(elem) {
  const url = './quotes.json'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    const randPick = getRandPick(json.length)
    const randQuote = json[randPick]
    elem.innerHTML = 
      `<div><span class="quote">${randQuote.text}</span><span class="author">-${randQuote.source}</span></div>`
  } catch (error) {
    console.error(error.message)
  }
}

function getRandPick (max) {
  return Math.floor(Math.random() * max)
}

async function loadContentLinks(elem) {
  const url = './links.json'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    let linkContent = ""

    json.forEach((nextSection) => {
      if (nextSection.section === 'Resources') {
        linkContent += `<h2>${nextSection.section}</h2>`
        linkContent += `<ul>`

        nextSection.links.forEach((nextLink) => {
          linkContent += `<li><a target="_blank" href="${nextLink.url}">${nextLink.text}</a></li>`
        })

        linkContent += `</ul>`
      } else {
        linkContent += `<h2>${nextSection.section}</h2>`
        linkContent += `<dl>`

        if (nextSection.section == 'Here & Now') {
          hnCounter = 0
          nextSection.links.forEach((nextLink) => {
            hnCounter++
            if (hnCounter < 4) {
              linkContent += `<dt>${nextLink.author} - ${nextLink.date}</dt>`
              linkContent += `<dd><a target="_blank" href="${nextLink.url}">${nextLink.title}</a></dd>`
            }
          })
          linkContent += `<dl><dt>&nbsp;</dt><dd><a href="/here-now.html">&raquo; more</a></dd></dl>`
        } else {
          nextSection.links.forEach((nextLink) => {
            linkContent += `<dt>${nextLink.author} - ${nextLink.date}</dt>`
            linkContent += `<dd><a target="_blank" href="${nextLink.url}">${nextLink.title}</a></dd>`
          })
        }

        linkContent += `</dl>`
      }
    })

    elem.innerHTML = linkContent
  } catch (error) {
    console.error(error.message)
  }
}

async function loadHereNowLinks(elem) {
  const url = './links.json'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    let linkContent = ""

    json.forEach((nextSection) => {
      if (nextSection.section === 'Here & Now') {
        linkContent += `<h2>${nextSection.section}</h2>`
        linkContent += `<dl>`

        nextSection.links.forEach((nextLink) => {
          linkContent += `<dt>${nextLink.author} - ${nextLink.date}</dt>`
          linkContent += `<dd><a target="_blank" href="${nextLink.url}">${nextLink.title}</a></dd>`
        })

        linkContent += `</dl>`
        linkContent += `<dl><dt>&nbsp;</dt><dd><a href="/">&laquo; back</a></dd></dl>`
      }
    })

    elem.innerHTML = linkContent
  } catch (error) {
    console.error(error.message)
  }
}

