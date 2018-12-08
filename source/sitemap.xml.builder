xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  sitemap.resources
    .reject { |page| page.data.noindex }
    .select { |page| page.path =~ /\.html$/ }
    .each do |page|
    xml.url do
      xml.loc "#{URI.join(config.site_url, page.url)}"
      xml.lastmod Date.today.to_time.iso8601
      xml.changefreq page.data.changefreq || "monthly"
      xml.priority page.data.priority || "0.5"
    end
  end
end
