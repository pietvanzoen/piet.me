xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  site_url = config.site_url
  xml.title config.site_title
  xml.description "Posts from Piet van Zoen, an English/Dutch web developer living and working in the Netherlands."
  xml.icon "/images/piet_sqr.jpg"
  xml.language "en"
  xml.id site_url
  xml.link "href" => URI.join(site_url, blog.options.prefix.to_s)
  xml.link "href" => URI.join(site_url, current_page.path), "rel" => "self"
  xml.updated(blog.articles.first.date.to_time.iso8601) unless blog.articles.empty?
  xml.rights "&amp;copy; #{Time.now.year} Piet van Zoen", "type" => "html"
  xml.author {
    xml.name "Piet van Zoen"
    xml.uri site_url
    xml.email "hi@piet.me"
  }

  blog.articles[0..5].each do |article|
    xml.entry do
      xml.title article.title
      xml.link "rel" => "alternate", "href" => URI.join(site_url, article.url)
      xml.id URI.join(site_url, article.url)
      xml.published article.date.to_time.iso8601
      xml.updated article.data.updated.to_time.iso8601 if article.data.updated
      xml.author {
        xml.name "Piet van Zoen"
        xml.uri site_url
        xml.email "hi@piet.me"
      }
      xml.rights "&amp;copy; #{Time.now.year} Piet van Zoen", "type" => "html"
      article.tags.each do |tag|
        xml.category "term" => tag
      end
      xml.summary strip_tags article.summary
      xml.content article.body, "type" => "html"
    end
  end
end
