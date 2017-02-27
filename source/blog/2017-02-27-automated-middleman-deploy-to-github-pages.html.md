---
title: Automated middleman deploy to Github pages
---

I recently switched from Jekyll to [Middleman](https://middlemanapp.com/) for my personal website. After using Middleman for a couple projects I felt that Middleman was much easier to setup and manage than Jekyll, also I really don’t like liquid templating. The one thing I missed from Jekyll was automated deploys to Github pages. It wasn’t very difficult but you have to jump through a few hoops. Since I’m running my own build I decided to add some tests for my static site too. So here’s the how-to.

READMORE

## Testing setup

I wanted to add some basic testing for my site, simple things like HTML validation and link checking. For that I found [HTMLProofer](https://github.com/gjtorikian/html-proofer) which can run a variety of tests against a folder of html files.

Add HTMLProofer to your `Gemfile` and `bundle install`:

```ruby
gem 'html-proofer'
```

HTMLProofer can run via command line, but for ease of running locally and remotely with all of my configuration I chucked it in a `test.rb` and included a simple check for the build folder.

```ruby
# test.rb

require 'html-proofer'

raise IOError, 'Directory ./build does not exist. Run `middleman build` before running tests' unless Dir.exists?('./build')

HTMLProofer.check_directory('./build', {
  :check_img_http => true,
  :check_html => true, :validation => { :report_missing_names => true },
  :check_favicon => true,
  :check_opengraph => true,
  :http_status_ignore => [0,999,403,401]
}).run
# Check out the config docs for more: https://github.com/gjtorikian/html-proofer#configuration
```

If you’re already using a `Rakefile` you could add the HTMLProofer code to a `:test` task. This test was going to be the only task in my `Rakefile` so I decided to stick with a plain old `.rb` file I could run.

Run `ruby test.rb` and you should see something like this:

```shell
Running ["ImageCheck", "FaviconCheck", "ScriptCheck", "OpenGraphCheck", "HtmlCheck", "LinkCheck"] on ["./build"] on *.html...

Checking 62 external links...
Ran on 13 files!
```

The first time I ran this I discovered a handful of links that were either just wrong or had gone stale over time. Nice to know these will be caught in advance moving forward!

## Deploy configuration

The [middleman-deploy](https://github.com/middleman-contrib/middleman-deploy) gem has what you need to “deploy” your site to git. Basically what that means is that middleman will build your site, copy the files to an orphan branch, commit the changes and push. By default middleman deploys to the `gh-pages` branch for sites using Github pages.

Add the gem to your `Gemfile` and `bundle install`. To work with middleman v4 I had to install the pre-alpha gem. This hasn’t been a problem for what I need so far.

```ruby
gem 'middleman-deploy', '~> 2.0.0.pre.alpha'
```

Then in your `config.rb` add your deploy setup:

```ruby
activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.branch = 'gh-pages'
end
```

Make sure the whole process works by running `middleman build && ruby test.rb && middleman deploy`.

## CircleCI configuration

I’m using [CircleCI](https://circleci.com/) for my build platform, but the configuration should be fairly similar for other platforms.

Add the following to your `circle.yml` in the root of your repo:

```yaml
# circle.yml

compile:
  override:
    - bundle exec middleman build

test:
  override:
    - bundle exec ruby test.rb

deployment:
  build:
    branch: master
    commands:
      - git config user.email $GIT_USER_EMAIL
      - git config user.name $GIT_USER_NAME
      - bundle exec middleman deploy
```

For each build, this will build the site, run the tests, and for builds on `master` branch it will run the deploy. You’ll need to configure your git details too. For ease of configuration I’m using env vars for my git user config. Head to `https://circleci.com/gh/you/test-repo/edit#env-vars` to add your github info.

## Git write access for the build

Next you need to configure CircleCI to have write access to the repo. By default Circle only has read access to the repo. Instructions for [setting up a read/write deploy key](https://circleci.com/docs/1.0/adding-read-write-deployment-key/) are in the circle docs, but here’s the break down.

### Generate a new SSH key

First we’ll need to create a new SSH key for Circle:

```shell
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
Generating public/private rsa key pair.
Enter file in which to save the key: /Users/<you>/.ssh/circleci_deploy_key
Enter passphrase (empty for no passphrase):
```

Give a location for your new ssh key and do *not* enter a passphrase, just hit return.

### Add the public key to CircleCI

Copy the public version of your new new SSH key:

```shell
cat ~/.ssh/circle_deploy_key.pub | pbcopy
```

Go to `https://circleci.com/gh/you/test-repo/edit#ssh` and add the public key that you just created. Use github.com  in the *Hostname* field.

### Add the private key to Github

Next head to your repo in GitHub and add the private key to our repo.

```shell
cat ~/.ssh/circle_deploy_key | pbcopy
```

Go to `https://github.com/you/test-repo/settings/keys` on GitHub and add the public key that you just created and copied. Make sure to “Allow write access” and save the key.

## Deploy!

That should be everything you need to run the build. Push some changes to master and check out the build. Here’s an [example build from my site](https://circleci.com/gh/pietvanzoen/pietvanzoen.com/29).

You should now be able to simply push changes to your master branch and have the site automatically update, plus if there are any broken links your build will fail and the deploy won’t happen. 🎉 Enjoy!

### Further reading:
* [Setting up a custom domain for your `gh-pages` site.](http://stackoverflow.com/a/22374542)
* [HTTPProofer config](https://github.com/gjtorikian/html-proofer#configuration) with extra options for testing.

_If anything in this post turns out to be incorrect or incomplete please comment and let me know._
