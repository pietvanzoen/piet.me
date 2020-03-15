---
title: "How I organize my cloned git projects"
unsplash_img_id: W_ZYCEUapF0
updated: 2019-02-01
date: 2018-05-31
published: true

---

For a while I've been looking for a better way to organize the git repos I work with. I've tried just dumping them into a single directory, and I've tried adding sub folders such as `personal`, `work`, and `tools`. But both of these solutions had the same problems:

* Repos that I clone to play around with cause clutter alongside projects I'm actively working on.
* Cloning forked repos along with the original repos cause folder name conflicts. Meaning I would have to use a different a folder name to the project name, which might cause confusion when working on a project.
* It's unclear who owns what without going to the cloned repo and running `git remote -v`.

I figured there's probably a better way.

## Enter Go

I really like the way that [Go](https://golang.org) organizes source code. The command `go get <git-url>` installs packages to `$GOPATH/src`. (`$GOPATH` defaults to `$HOME/go` in Unix systems.) From there, repos are organized in directories by git host, user name, and repo name. For example, `go get github.com/pietvanzoen/pietvanzoen.com` would clone the project into `$GO_PATH/src/github.com/pietvanzoen/pietvanzoen.com`. This gives you several benefits:

* You avoid folder naming conflicts.
* It's clear where a repo came from.
* Your work/personal projects are automatically grouped.
* Source code is organized in a consistent and easy-to-understand way.

## But I don't work with Go

I occasionally work with Go, but I mostly work with JavaScript. Initially I thought I could just co-opt the `go get` command and organize my non-Go projects alongside the handful of Go projects I work with. But Go recognizes that a project isn't Go and prints a warning message. Apart from the warning message, I didn't feel comfortable co-opting Go functionality to organize folders unrelated to Go. It's not what the tool is intended for and there's no guarantee it won't break later on.

## The Solution... `git get`

So... I came up with [git get](https://github.com/pietvanzoen/git-get). It's just a single Python script that parses the given git url, creates the directory structure, and clones the repo into the created directory. I define a `$GIT_PATH` to store all my repos in (I chose `~/repos`). Then I can run `git get git@github.com:pietvanzoen/dotfiles.git`, which clones my dotfiles into `~/repos/github.com/pietvanzoen/dotfiles`. Also, `git get` can be run from any directory.

So now my projects look a bit like this:

```
~/repos
├── bitbucket.org
│   └── pietvanzoen
│       └── wibble
├── github.com
│   ├── LeidenDevs
│   │   └── leidendevs
│   ├── chriso
│   │   └── validator.js
│   ├── pietvanzoen
│   │   ├── discussie
│   │   ├── dotfiles
│   │   ├── pietvanzoen.com
│   │   └── validator.js
│   └── wting
│       └── autojump
└── gitlab.com
    └── pietvanzoen
        └── wibble
```

You can see I've cloned `validator.js` twice. One is the original project by github user *chriso*, and the other is my fork. With the single level folder structure I used before I would have to name the clone folder for one of those projects to something else.

## But that's a lot of directories to navigate

One drawback to this approach is that we now have a lot of directories to navigate. Depending on your patience, this may or may not be an issue to you. If it is an issue, I really like using [autojump](https://github.com/wting/autojump). The `autojump` command (bound to `j` for brevity) builds an index of commonly visited directories. After visiting a directory for the first time, you can then run `j <partial-dir-name>` and you'll be taken to the first match in the autojump index. E.g `j dot` will take me to `~/repos/github.com/pietvanzoen/dotfiles`.

## Conclusion

I've been using this new directory structure for about a month and I love it. It feels clean and organized and I don't worry about where I'm cloning repos into. Check out [the `git-get` source code](https://github.com/pietvanzoen/git-get) and try it out. If you have ideas for improvement please submit an issue.
