---

title: git aliases I use every day
date: 2018-03-09 21:40 UTC
tags: git

---

  l = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(blue)<%an>%Creset %C(black)✍ %G?%Creset' --abbrev-commit

  lb = !git l origin/master..$(git symbolic-ref --short HEAD) # Log commits that diverge from origin/master.

  r = !git l -12 # Log recent commits.



  st = status -s # Short status.
  ci = commit --verbose # Verbose commit. Shows diff in commit message editor.
  wip = "!git add . && git commit -m 'WIP'" # Quick commit all changes and untracked files.
  roll-back-one = reset HEAD~1 # Roll back one commit.
  co = checkout
  di = diff
  dc = diff --cached
  amend = commit --amend
  pushf = push --force-with-lease
  aa = add --all
