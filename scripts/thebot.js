module.exports = (robot) => {

    robot.respond(/hello/, (message) => {
        message.reply('hello!')
    })    
    
    // 
    robot.respond(/(what time is it|what's the time)/gi, (res) => {
        const d = new Date()
        const t = `${d.getHours()}:${d.getMinutes()} and ${d.getSeconds()} seconds`
        res.reply(`It's ${t}`)
    })

    // 
    robot.respond(/open the door/i, (res) => {
        res.reply("I'm afraid I can't let you do that.")
    })

    // 
    robot.hear(/I like pie/i, (res) => {
        res.emote("makes a freshly baked pie")
    })

    // 
    // robot.http("https://midnight-train")
    //     .header('Accept', 'application/json')
    //     .get() (err, res, body) => {

    //     // err & response status checking code here

    //     if response.getHeader('Content-Type') isnt 'application/json'
    //       res.send("Didn't get back JSON :(")
    //       return
  
    //     data = null
    //     try
    //       data = JSON.parse body
    //     catch error
    //      res.send("Ran into an error parsing JSON :(")
    //      return
  
    //     // your code here
    // }
    
}