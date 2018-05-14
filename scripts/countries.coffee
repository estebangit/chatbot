process.env.HUBOT_COUNTRIES_API_URL ||='https://restcountries.eu/rest/v2/all'
process.env.HUBOT_COUNTRY_API_URL ||='https://restcountries.eu/rest/v2/name/{name}'

module.exports = (robot) ->

  # All countries  
  robot.hear /all countries/i, (msg) ->
    country = msg.match[1]
    query = { q: country }
    url = process.env.HUBOT_COUNTRIES_API_URL
    msg.robot.http(url).query(query).get() (err, res, body) ->
      data = JSON.parse(body)
      tab = []
      for w in data
        tab.push w.name
      msg.reply "All : #{tab.join(', ')} "

  # Country detail
  robot.hear /country (\w+)/i, (msg) ->
    country = msg.match[1]
    query = { name: country }
    url = process.env.HUBOT_COUNTRY_API_URL
    msg.robot.http(url).query(query).get() (err, res, body) ->
      data = JSON.parse(body)
      tab = []
      for w in data
        tab.push "Country #{w.name} - capital: #{w.capital}"
      msg.reply "#{tab.join(', ')}"
