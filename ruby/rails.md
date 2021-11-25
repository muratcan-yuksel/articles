## creating new rails app

rails new name_of_the_app

## start a server

rails server OR rails s on the terminal

# The Model view controller (MVC) pattern

## routes

for GET for "/about" it says:
I see you requested "/bout", we'll give that to the AboutController to handle

## Models

Database wrapper
User:

- query for records
- wrap individual records

## Views

Your response body content. It can be

- Html
- CSV
- PDF
- XML

this is what gets sent back to the browser and displayed

## Controllers

Decide how to process a request and define a response
Controllers decide where things should go.

# Starting with the project

## creating an about page

- go to routes.rb in config folder
- add the following inside the function => muratcan-yuksel/buffer-project

- ==> then, go to app/controllers and create a filed named "about_controller.rb"

now when we go to the /about, it'll look for the above file

- now go to views/about and create "index.html.erb" file and write whatever you wish to write there

### Error. Needed to install webpacker

- bundle exec rails webpacker:install
- and to install that, I needed to re-add the gme into Path again. Need to solve that shit, man.

* this shit =>

export PATH="/home/sirius/.local/share/gem/ruby/3.0.0/bin:$PATH"

<!-- * => now changed my .bashrc (last line) into this, maybe it'll work => export PATH="$PATH:/home/sirius/.local/bin" --> It didn't work

- added the path in bash, profile, and bash_profile... pff... will write a different article on it.

## generate models7

### this is also called active records in rails

- rails generate model User email:string password_digest:string
- rails db:migrate

### for creating users

then, in rails console, something like this:

- User.create({email: "chris@gorails.com", password_digest: "password" })

password didn't work so I used password_digest myself
