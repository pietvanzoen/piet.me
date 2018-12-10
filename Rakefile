require "bundler"
Bundler.setup(:default)
require "dotenv/load"

LINKS_FILE = "./data/links.yml".freeze

desc "run dev server"
task :serve do
  sh "bundle exec middleman serve"
end

desc "build html"
task :build do
  raise "Run 'rake generate_links' before running build." unless File.exist? LINKS_FILE

  branch = ENV["TRAVIS_BRANCH"]
  env = branch == "master" ? "production" : "test"
  sh "ENV=#{env} bundle exec middleman build"
end

desc "test html"
task :test do
  sh "bundle exec ruby test.rb"
end

task :generate_links do
  require "open-uri"
  require "json"
  require "yaml"
  request_uri = "https://api.pinboard.in/v1/posts/all?format=json&tag=share&auth_token=" + ENV["PINBOARD_TOKEN"]
  buffer = open(request_uri).read
  links = JSON.parse(buffer)
  File.write(LINKS_FILE, links.to_yaml)
  puts "#{links.count} links written to #{LINKS_FILE}"
end

namespace "server" do
  DEV_TAG = "pietvanzoen/pietvanzoen.com:dev".freeze
  PROD_TAG = "pietvanzoen/pietvanzoen.com:latest".freeze

  task :test => ["stop", "build"] do
    begin
      puts "==> Starting server"
      container_id = start_server
      puts "==> Testing endpoint"
      sh "curl http://localhost:8080/healthcheck/ | grep 'Nothing to see here.'"
      puts "PASS: ✓ Test passed"
    ensure
      puts "==> Cleaning up"
      sh "docker stop #{container_id}"
    end
  end

  desc "build server"
  task :build do
    puts "==> Building image"
    sh "docker build -t #{DEV_TAG} ."
  end

  desc "start server"
  task :start => ["stop", "build"] do
    puts "==> Starting server"
    start_server
  end

  desc "build, test, and deploy server image"
  task :release => ["test"] do
    puts "==> Deploying image"
    sh "docker tag #{DEV_TAG} #{PROD_TAG}"
    sh "docker push #{PROD_TAG}"
    puts "==> Updating server"
    sh "ssh bmo '/home/piet/server/scripts/update'"
  end

  desc "stop running images"
  task :stop do
    running_images = `docker ps -q --filter "ancestor=#{DEV_TAG}"`
    puts "==> Stopping running images"
    sh "docker stop #{running_images}" unless running_images.empty?
  end
end

def start_server
  container_id = `docker run --rm -p 8080:8080 -d -t #{DEV_TAG}`
  n = 0
  loop do
    logs = `docker logs #{container_id}`
    if logs.include?("exit status")
      puts "Error: Server failed to start"
      logs.lines.each { |l| puts "Debug: #{l}" }
      raise
    end
    raise "Error: Server start timed out" if n == 10

    if logs.include?("http://0.0.0.0:8080")
      puts logs
      break
    end
    n += 1
    sleep 0.5
  end
  container_id
end
