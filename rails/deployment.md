- take sqlite3 to development in gemfile
- create the following=>

```
group :production do
gem 'pg', '~> 1.2', '>= 1.2.3'

end

```

- on the terminal, bundle like this =>
- bundle install --without production
- git push heroku main
- heroku run rails db:migrate
