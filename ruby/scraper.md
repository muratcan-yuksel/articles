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
