require "dotenv/load"

desc "Run dev server"
task :serve do
  sh "bundle exec middleman serve"
end

desc "Build site and image"
task :build => ["build_html", "build_image"]

desc "Validate build"
task :test => ["test_html", "test_image"]

desc "Deploy image to docker"
task :deploy => ["test_image"] do
  sh "echo \"$DOCKER_PASSWORD\" | docker login -u $DOCKER_USERNAME --password-stdin"
  sh "docker tag $TEST_IMAGE $PROD_IMAGE"
  sh "docker push $PROD_IMAGE"
end

task :test_html do
  sh "bundle exec ruby test.rb"
end

task :test_image => ["run_image"] do
  sh "curl http://localhost:8080/healthcheck/ | grep 'Nothing to see here.'"
end

task :build_html do
  sh "bundle exec middleman build"
end

task :build_image do
  sh "docker build -t $TEST_IMAGE ."
end

task :run_image do
  sh "docker-compose up -d --force-recreate"
end
