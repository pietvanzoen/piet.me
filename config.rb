require "open-uri"

set :site_url, 'http://pietvanzoen.com'
set :site_title, 'Piet van Zoen'
set :site_description, 'Leiden based software engineer'

activate :directory_indexes
activate :syntax
activate :imageoptim
set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :blog do |blog|
  blog.layout = 'post'
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
  # TODO: Re-enable asset hashing when i've figured out how it works with
  # unsplash image downloading
  # activate :asset_hash
end

activate :deploy do |deploy|
  deploy.build_before = true
  deploy.deploy_method = :git
  deploy.branch = 'gh-pages'
end

helpers do
  def unsplash_image(id, size)
    image_path = "/images/unsplash-#{id}-#{size}.jpg"
    source_path = "./build#{image_path}"
    url = "https://source.unsplash.com/#{id}/#{size}"

    return url unless build?

    if !File.exist? source_path
      puts "downloading #{url} to #{source_path}"
      File.open(source_path, 'wb') do |fo|
        fo.write open(url).read
      end
    end

    return image_path
  end
end
