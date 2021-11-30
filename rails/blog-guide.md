- rails g scaffold post title:string category:string author:string content:text image_url:string
- rails db:migrate

## to add new things to the migration

- rails g migration AddContentToPost content:text
