require "bundler"
Bundler.setup(:default)
require "dotenv/load"

desc "Run dev server"
task :serve do
  sh "bundle exec middleman serve"
end

task :build do
  sh "bundle exec middleman build"
end

task :test do
  sh "bundle exec ruby test.rb"
end

task :test_with_server do
  ENV["SERVER_BRANCH"] = (ENV["TRAVIS_BANCH"] || `git rev-parse --abbrev-ref HEAD`).strip
  puts "Testing branch #{ENV["SERVER_BRANCH"]}"
  sh "docker-compose up -d --force-recreate --build"
  sleep 4
  sh "docker-compose logs | grep pulled"
  begin
    Rake::Task["test"].invoke
  ensure
    sh "docker-compose down"
  end
end
