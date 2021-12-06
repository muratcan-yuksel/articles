=> tutorial => https://www.youtube.com/watch?v=1UYBAn69Qrk

- add pry, nokogiri and watir gems
- downloaded & extracted chromedriver and added it into usr/local/bin, I've done it once so no need to do it again but just so you know it's needed if you don't have it.

* in rails console => browser = Watir::Browser.new(:chrome)
* some commands: browser.goto("google.com") for instance. Or browser.html, browser.url

## e.g.

- browser = Watir::Browser.new(:chrome)
- browser.goto("https://news.ycombinator.com/")
- doc = Nokogiri::HTML.parse(browser.html)
- for instance, we can do this => doc.css("a").count
- doc.at_css("a").count=> get the first one
- doc.at_css("a:nth-child(4)")

## level 1 static content

- url => https://www.basketball-reference.com/players/k/kinseta01/gamelog/2009

* in the terminal =>

- browser = Watir::Browser.new(:chrome)
- browser.goto( "https://www.basketball-reference.com/players/k/kinseta01/gamelog/2009")
- - doc = Nokogiri::HTML.parse(browser.html)
    =>=> get the table with the most rows
- games_table= doc.css("table").sort {|x,y| y.css("tr").count <=> x.css("tr").count}.first
  => get the rows
- rows= games_table.css('tr')
  !!! STOPPED HERE. UNNECESSARILY COMPLICATED FOR JUST CHECKING STH OUT. IF I HAD A PROJECT, I COULD LEARN IT.
