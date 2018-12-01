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
