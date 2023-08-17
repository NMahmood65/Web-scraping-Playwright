const playwright = require("playwright")
//const random_useragent = require("random-useragent")
//const fs =require("fs")

//const BASE_URL = "https://old.reddit.com/r/askreddit"

 (async () => {
    //create random user
    const agent = random_useragent.getRandom()
    
    //setup browser
    const browser = await playwright.chromium.launch({headless:true})
    const context = await browser.newContext({userAgent:agent})
    const page = await context.newPage({ bypassCSP:true })
    await page.setDefaultTimeout(10000)
    await page.setViewportSize({width:800, height:600})
    await page.goto("https://old.reddit.com/r/askreddit")
    await page.waitForSelector("#siteTable")

    //get data from website
    let data =[]
    const posts = await page.$$('div.thing')
    for (let post of posts) {
        const title = await post.$eval('.title a', el => el.textContent)
        const url = await post.$eval('.title a', el => el.href)
        const upvotes = await post.$eval('.score.unvoted', el => el.textContent)
        const comments = await post.$eval('.comments', el => el.textContent)
        const time = await post.$eval('.tagline time', el => el.textContent)
        data.push({ title, url, upvotes, comments, time })
    }
    console.log(data)
    console.log(data.length)
    await browser.close()

})().catch(error => {
    console.log(error)
    process.exit(1)
})

//export{}