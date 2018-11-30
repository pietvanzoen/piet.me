
task :serve do
  sh "bundle exec middleman serve"
end

task :build do
  sh "bundle exec middleman build"
end

task :test => ["build", "test_html"]

task :test_html do
  sh "bundle exec ruby test.rb"
end

task :docker_build do
  sh "docker build -t pietvanzoen/pietvanzoen.com:latest ."
end
