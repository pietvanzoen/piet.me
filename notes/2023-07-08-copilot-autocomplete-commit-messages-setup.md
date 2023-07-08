---
title: "How to setup Copilot to autocomplete commit messages"
unsplashImageId: vkfrFrAIO4o
date: 2023-07-08
slug: copilot-autocomplete-commit-messages-setup
featured: true
tags:
  - git
  - dev
---

Copilot, GitHub's AI programming assistant, has been a great addition to my development environment by giving (mostly) intelligent suggestions and autocompletion. Somewhat accidentally I found that Copilot was also good at writing commit messages. In this post, I will show how you can use Copilot to autocomplete your Git commit messages. 

<!-- excerpt -->


--- 

## On writing good commits

Writing clear and accurate commit messages is super helpful for future developers (including yourself) to understand what changes were made. It's great for debugging and getting a grasp on the code you're working with.

Luckily, Copilot can assist with this and works best when the content of a commit is specific and related. And that's exactly what we want! There are plenty of resources available on writing commit messages, so I won't dive into that more here. Feel free to check out these links for some excellent content on the topic:

* [5 Useful Tips For A Better Commit Message - Thoughtbot (2013)](https://thoughtbot.com/blog/5-useful-tips-for-a-better-commit-message)
* [A Note About Git Commit Messages - Tim Pope (2008)](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) 
* [Git commit message guide - Joel Parker Henderson](https://github.com/joelparkerhenderson/git-commit-message)

--- 

## Setting up your commit environment

<aside class="card">
  <em>
    This flow is based on using command line <code>git commit</code>. I have <a href="https://neovim.io">neovim</a> configured as the editor and I use <a href="https://github.com/github/copilot.vim">Github’s official neovim Copilot package</a>. This workflow should work with any editor running Copilot and that's configured as the git editor.
  </em>
</aside>

### Setting up a commit message template

For a long time, I have used the a git commit message template to improve the quality of my commit messages. The template consists of a sentence starter which helps me write a commit message in an imperative voice.

To setup a commit message template add a file in your home directory called `.git-commit-message.txt`. Inside setup your template comments. Mine looks like this:


```gitcommit
# When applied, this commit will (72 character limit)...

# Why is this change needed?

# How does it address the issue?

# Provide links to any relevant tickets, articles or other resources
```

_Including the character limit ensures Copilot doesn’t get too verbose with the message._

To configure git to use this as your commit message template run:

```sh
git config --global commit.template ~/.git-commit-template.txt
```

Once setup, Copilot can use this prompt and try to form a commit message. But without knowing what’s changed it probably won’t be very successful. This is where verbose mode comes in. 

### Git commit verbose mode

Verbose mode shows a unified diff of what would be committed at the bottom of the commit message template.

To use verbose mode we can use the `--verbose` flag. E.g. `git commit --verbose`. We can also enable verbose mode by default by running:

```sh
git config --global commit.verbose true
```

Now that the commit diff is in the commit message template, Copilot can use this as context for generating the commit message. 

### Commit message keyword

Finally, Copilot needs at least one word to begin suggesting a commit message. You can check out the Git Commit Message guide for a list of [suggested keywords](https://github.com/joelparkerhenderson/git-commit-message#summary-keywords) to get you started.

A few example keywords are Add, Drop, Fix, Make, Refactor, Reformat, among others. Once you've staged some changes using git add, run git commit and start writing the commit message using one of these keywords. Copilot will then begin suggesting the rest of the commit message. 🚀

--- 

## Copilot in action

Here’s a quick recording of copilot in action.

<script async id="asciicast-tvFG35UnF0pISTpgn247JyqaP" src="https://asciinema.org/a/tvFG35UnF0pISTpgn247JyqaP.js"></script>

Obviously, Copilot isn't always spot-on. It can make mistakes and give wrong suggestions at times. So, it's important to take its input with a grain of salt and trust your own judgment. Good commit messages should be informative and accurate, so don't forget to review and confirm the commit messages before finalising them.

Apart from that, have fun!
