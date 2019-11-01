require "open-uri"
require "rack/mime"
require "digest/md5"

module AssetCacher
  ASSET_CACHE_DIR = "./.asset-cache".freeze
  ASSET_SERVE_DIR = "/cached/"

  def cache_remote_asset(url, ext = nil)
    cache_filepart = File.join(ASSET_CACHE_DIR, Digest::MD5.hexdigest(url))
    cache_filepath = Dir[cache_filepart + ".*"].first
    if cache_filepath
      puts "Using cached asset #{cache_filepath} for #{url}"
    else
      file = open(url)
      ext = Rack::Mime::MIME_TYPES.invert[file.content_type]
      cache_filepath = cache_filepart + ext
      FileUtils.mkdir_p(File.dirname(cache_filepath))
      FileUtils.cp(file.path, cache_filepath)
      puts "Downloaded #{url} as #{cache_filepath}"
    end
    asset_servepath = File.join(ASSET_SERVE_DIR, File.basename(cache_filepath))
    asset_filepath = File.join(ENV["BUILD_DIR"], asset_servepath)
    FileUtils.mkdir_p(File.dirname(asset_filepath))
    FileUtils.cp(cache_filepath, asset_filepath)
    puts "Moved #{cache_filepath} to #{asset_filepath}. Serving #{asset_servepath}"
    asset_servepath
  end
end
