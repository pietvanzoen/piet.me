require "dotenv/load"
require "lib/asset_cacher.rb"
helpers AssetCacher

set :site_url, "https://piet.me"
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
  AssetCacher::BUILD_DIR = "./source"
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

helpers do
  def nav_link(name, url, options = {})
    options = {
      class: "",
      active_if: url,
      page: current_page.url,
    }.update options
    a = options.delete(:active_if)
    active = Regexp === a ? current_page.url =~ a : current_page.url == a
    options[:class] += " active" if active

    link_to name, url, options
  end
end
