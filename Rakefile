
DOCKER_TAG = "pietvanzoen/pietvanzoen.com:latest"

task :serve do
  sh "bundle exec middleman serve"
end

task :build do
  sh "bundle exec middleman build"
end

task :test => ["build", "test_html", "build_docker", "docker_test"]

task :test_html do
  sh "bundle exec ruby test.rb"
end

task :docker_build do
  sh "docker build -t #{DOCKER_TAG} ."
end

task :docker_run do
  sh "docker run --rm -d -p 8080:8080 #{DOCKER_TAG}"
end

task :docker_test do
  sh "curl http://localhost:8080/healthcheck/"
end

task :docker_deploy do
  sh "echo \"$DOCKER_PASSWORD\" | docker login -u $DOCKER_USERNAME --password-stdin"
  sh "docker push #{DOCKER_TAG}"
end
