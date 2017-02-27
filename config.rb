set :site_url, 'http://pietvanzoen.com'

activate :directory_indexes
activate :syntax
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :blog do |blog|
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
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
  deploy.branch = 'gh-pages'
end
