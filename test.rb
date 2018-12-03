
require "html-proofer"

raise IOError, "Directory ./build does not exist. Run `middleman build` before running tests" unless Dir.exists?("./build")

HTMLProofer.check_directory("./build", {
  :log_level => :debug,
  :check_img_http => true,
  :check_html => true, :validation => {:report_missing_names => true},
  :check_favicon => true,
  :check_opengraph => true,
  :url_swap => {"https://piet.me" => "http://localhost:8080"},
  :http_status_ignore => [0, 999, 403, 401, 302],
}).run
