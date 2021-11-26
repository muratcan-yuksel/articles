## to create a view

simply run `rails generate controller Articles index` and it'll create basically everything you need.

- another e.g. => rails g controller home index

NB! But, you have to fix the routes.rb as it's faulty in this syntax

Correct it like this => e.g. => get "about", to: "about#index"
=> NO, you might NOT need to change anything after all. Will look further into it.

## partials

Partials are like JS components, they're partial views.
e.g. created a `_header.html.erb` (notice the underscore) in app/views/home, and then went to `application.html.erb` in views/layouts and pasted the following there => ` <%= render 'home/header' %>`
