## to create a view

simply run `rails generate controller Articles index` and it'll create basically everything you need.

- another e.g. => rails g controller home index

NB! But, you have to fix the routes.rb as it's faulty in this syntax

Correct it like this => e.g. => get "about", to: "about#index"
=> NO, you might NOT need to change anything after all. Will look further into it.

## partials

Partials are like JS components, they're partial views.
e.g. created a `_header.html.erb` (notice the underscore) in app/views/home, and then went to `application.html.erb` in views/layouts and pasted the following there => ` <%= render 'home/header' %>`

# CRUD operations

## creating a scaffold

e.g.

- rails g scaffold users first_name: string last_name: string email: string phone: string twitter: string

OR

- rails g scaffold user first_name last_name email phone twitter

Yea, you most likely don't need `: string` part

As the first one threw error with db:migrate command
then

- rails db:migrate

then,

- delete the scaffolds.scss in app/assets as it conflicts with our bootstrap

# devise (gem)

- handles user managements
  in order :
- bundle install
- (go here => https://github.com/heartcombo/devise)
- rails generate devise:install
- read through what it says in the terminal
- - go to development.rb and paste this for instance `config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }` before the end of the function
- - do the same for production but not for localhost, but for the real host when you choose one
- rails g devise:views
- rails generate devise `MODEL`(name for the model)
- rails db:migrate
