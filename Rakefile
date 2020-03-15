require "bundler"
Bundler.setup(:default)
require "dotenv/load"

LINKS_FILE = "./data/links.yml".freeze
UPDATES_DIR = "./source/updates".freeze

desc "run dev server"
task :serve do
  sh "bundle exec middleman serve --build-dir=#{ENV["BUILD_DIR"]}"
end

desc "build html"
task :build do
  raise "Run 'rake generate_links' before running build." unless File.exist? LINKS_FILE
  raise "Run 'rake generate_updates' before running build." unless File.exist? UPDATES_DIR

  sh "bundle exec middleman build --build-dir=#{ENV["BUILD_DIR"]} --verbose"
end


task :deploy do
  sh "bundle exec middleman deploy"
end

desc "test html"
task :test do
  sh "bundle exec ruby test.rb"
end

task :generate_links do
  require "open-uri"
  require "json"
  require "yaml"
  request_url = URI("https://api.raindrop.io/rest/v1/raindrops/0")
  request_url.query = 'search=[{"key":"tag","val":"share"}]'
  puts request_url
  buffer = open(request_url, "Authorization" => "Bearer #{ENV['RAINDROP_TOKEN']}").read
  links = JSON.parse(buffer)
  File.write(LINKS_FILE, links.to_yaml)
  puts "#{links.count} links written to #{LINKS_FILE}"
end

task :generate_updates do
  require "open-uri"
  require "json"
  require "yaml"
  request_url = URI("https://pietvanzoen.github.io/updates/updates.json")
  buffer = open(request_url).read
  updates = JSON.parse(buffer)['updates']
  FileUtils.rm_r UPDATES_DIR, :force => true
  FileUtils.mkdir UPDATES_DIR
  updates.each do |update|
    slug = update['path'].gsub(/\.md$/, '')
    update['slug'] = slug
    File.write("#{UPDATES_DIR}/#{slug}.html.md", update.to_yaml + '---')
  end
  puts "generated #{updates.size} updates in #{UPDATES_DIR}"
end


task :build_now => ["generate_links", "generate_updates", "build", "test"]

task :update_links do
  if ENV['CI'].nil?
    puts "Not in CI. Aborting."
    exit 0
  end
  if ENV["TRAVIS_BRANCH"] != 'master'
    puts "Not on master branch. Aborting."
    exit 0
  end
  sh "curl -L http://scripts.piet.me/ci/setup-git | bash -e"
  sh "git add #{LINKS_FILE}"
  sh "git commit -m 'ci: update links data' || true"
  sh "git push"
end
