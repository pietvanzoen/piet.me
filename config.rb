require "dotenv/load"

set :site_url, "http://pietvanzoen.com"
set :site_title, "Piet van Zoen"
set :site_description, "Leiden based software engineer"

activate :directory_indexes
activate :syntax
activate :imageoptim
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

activate :blog do |blog|
  blog.layout = "post"
  blog.permalink = "blog/{title}.html"
  blog.sources = "blog/{year}-{month}-{day}-{title}.html"
  blog.default_extension = ".md"
  blog.page_link = "page/{num}"

  blog.tag_template = nil
  blog.calendar_template = nil
  blog.paginate = false
end

page "/feed.xml", layout: false

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :asset_hash
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
  deploy.branch = "dist"
end
