
async function getRandomQuote() {
  const url = './quotes.json'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    const randPick = getRandPick(json.length)
    const randQuote = json[randPick]

    document.getElementById('rand-quote').innerHTML =
      `<div><span class="quote">${randQuote.text}</span><span class="author">-${randQuote.source}</span></div>`
  } catch (error) {
    console.error(error.message)
  }
}

async function loadContentLinks() {
  const url = './links.json'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()

    json.forEach((nextSection) => {
      switch (nextSection.section) {
        case 'resources':
          let resourcesContent = `<h2>Resources</h2>`
          resourcesContent += `<ul>`
          nextSection.links.forEach((nextLink) => {
            resourcesContent += `<li><a target="_blank" href="${nextLink.url}">${nextLink.text}</a></li>`
          })
          resourcesContent += `</ul>`
          document.getElementById('resources').innerHTML = resourcesContent
          break

        case 'here-now':
          document.getElementById('here-now').innerHTML =
            getSectionMarkup('Here &amp; Now', nextSection, 11)
            + `<dl class="extra"><dt>&nbsp;</dt><dd><a href="/here-now.html">&raquo; more</a></dd></dl>`
          break

        case 'start-here':
          document.getElementById('start-here').innerHTML = getSectionMarkup('Start Here', nextSection)
          break

        case 'further':
          document.getElementById('further').innerHTML = getSectionMarkup('Further', nextSection)
          break
      }
    })

  } catch (error) {
    console.error(error.message)
  }
}

async function loadHereNowLinks() {
  const url = './links.json'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    let linkContent = ""

    json.forEach((nextSection) => {
      if (nextSection.section === 'here-now') {
        document.getElementById('here-now').innerHTML =
          getSectionMarkup('Here &amp; Now', nextSection)
          + `<dl class="extra"><dt>&nbsp;</dt><dd><a href="/">&laquo; back</a></dd></dl>`
      }
    })
  } catch (error) {
    console.error(error.message)
  }
}

function getSectionMarkup(sectionName, sectionContent, limit=0) {
  let counter = limit > 0 ? 0 : -1

  let markup = `<h2>${sectionName}</h2>`
  markup += `<dl>`
  sectionContent.links.forEach((nextLink) => {
    if (counter !== -1 ) {
      counter++
    }

    if (counter < limit) {
      markup += `<dt>${nextLink.author} - ${nextLink.date}</dt>`
      markup += `<dd><a target="_blank" href="${nextLink.url}">${nextLink.title}</a></dd>`
    }
  })
  markup += `</dl>`

  return markup
}

function getRandPick (max) {
  return Math.floor(Math.random() * max)
}

