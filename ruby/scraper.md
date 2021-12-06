- go to an empty folder
- -touch Gemfile scraper.rb

## Gemfile

source "https://rubygems.org"

gem "httparty"
gem "nokogiri"
gem "byebug"

## scraper.rb

require "nokogiri"
require "httparty"
require "byebug"

def scraper
url = "https://fr.indeed.com/jobs?q=smart%20contract&l="
#get the raw html with httparty
unparsed_page= HTTParty.get(url)
#parse the page with nokogiri
parsed_page= Nokogiri::HTML(unparsed_page)
byebug #sets a debugger

end

scraper

## terminal

- ruby scraper.rb
- byebug will stop the execution.
- I inspected the page and found out the jobs were listed with a card with the class of "slider_container". Now, nokogiri helps finding all css items tagged with a class of slider_container with the following command =>
- parsed_page.css('div.slider_container')

* define a variable
* jobCards= parsed_page.css('div.slider_container')
* jobCards.count will return 15, as it's the amount of jobs listed on that particular page
* we can do sth like this too=> first_job= jobCards.first (will get the first job item)
* the element (the title) I'm looking for is tagged as .jobTitle-color-purple span in the page. So I do this => first_job.css('.jobTitle-color-purple span')
* I want to get the text from that=> first_job.css('.jobTitle-color-purple span').text => Event manager (the title on the web page)
* first_job.css('span.companyName').text=> Platinium Group for instance

# scraping the whole website instead of a single page

we need to know:

- how many items are listed per page(15 in our case)
- total number of listings (497 in our case)
- what changes with pagination(when we click to the next page?). In our case, the url changes a bit for instance
