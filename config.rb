require "dotenv/load"
require "lib/asset_cacher.rb"
require 'uri'
helpers AssetCacher

set :site_url, "https://piet.me/"
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
  blog.name = "posts"
  blog.layout = "post"
  blog.permalink = "blog/{title}.html"
  blog.sources = "blog/{year}-{month}-{day}-{title}.html"
  blog.default_extension = ".md"
  blog.page_link = "page/{num}"

  blog.tag_template = nil
  blog.calendar_template = nil
  blog.paginate = false
end

activate :blog do |blog|
  blog.name = "updates"
  blog.layout = "update"
  blog.permalink = "updates/{year}-{month}-{day}-{title}.html"
  blog.sources = "updates/{year}-{month}-{day}-{title}.html"
  blog.default_extension = ".md"
  blog.page_link = "p{num}"

  blog.tag_template = nil
  blog.calendar_template = nil
  blog.paginate = true
end

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
  deploy.branch = "gh-pages"
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

  def is_route?(str)
    current_page.url == str
  end

  def word_count(str)
    strip_tags(str).split.count.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse
  end

  def reading_time(str, wpm)
    strip_tags(str).split.count / wpm
  end

  def to_slug(str)
    #strip the string
    ret = str.strip

    #blow away apostrophes
    ret.gsub! /['`]/, ""

    # @ --> at, and & --> and
    ret.gsub! /\s*@\s*/, " at "
    ret.gsub! /\s*&\s*/, " and "

    #replace all non alphanumeric, underscore or periods with underscore
    ret.gsub! /\s*[^A-Za-z0-9\.\-]\s*/, "-"

    #convert double underscores to single
    ret.gsub! /_+/, "-"

    #strip off leading/trailing underscore
    ret.gsub! /\A[_\.]+|[_\.]+\z/, ""

    ret.downcase
  end

  def get_host(url)
    URI.parse(url).host
  end
end
