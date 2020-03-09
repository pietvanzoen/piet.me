require "html-proofer"
require "dotenv/load"

raise IOError, "Directory ./build does not exist. Run `middleman build` before running tests" unless Dir.exists?(ENV["BUILD_DIR"])

HTMLProofer.check_directory(ENV["BUILD_DIR"], {
  :log_level => :debug,
  :check_img_http => true,
  :check_html => true, :validation => {:report_missing_names => true},
  :check_favicon => true,
  :check_opengraph => true,
  :url_swap => {"https://piet.me" => "http://localhost:8080"},
  :only_4xx => true,
  :alt_ignore => [/^https:\/\/pietvanzoen\.github\.io/]
}).run
