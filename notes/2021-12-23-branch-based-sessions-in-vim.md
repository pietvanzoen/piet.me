---
title: "Branch based sessions in Vim"
unsplashImageId: 5t1lUr0NmHI
date: 2021-12-23
slug: branch-based-sessions-in-vim
tags:
  - vim
  - command line
  - git

---

Vim sessions are a great way to save the state of vim so you don’t have to reopen all your files after closing it. I use [tpope’s Obsession plugin](https://github.com/tpope/vim-obsession) which ensures a session file is always up to date. But by default this will only setup one session file per project.

I tend to be working on multiple branches at the same time, which means that I’m switching between a few groups of files depending on the branch I’m working on. So I came up with a couple scripts for automatically maintaining a session for each branch.

## Creating and opening branch based sessions

My approach relies on tpope’s Obsession plugin. If you don’t have it already, follow the instructions to get it installed: <https://github.com/tpope/vim-obsession>

Next add this function to your shell configuration file (E.g. Your `~/.bashrc` or `~/.zshrc`):

```bash
vm() {

  # Create .sessions directory if it doesn't exist
  if [[ ! -d './.sessions' ]]; then
    mkdir './.sessions'
  fi

  # Create a session file name based on the current branch
  local session_name=".sessions/$(git rev-parse --abbrev-ref HEAD)-session.vim"

  if [ -e $session_name ]; then
    # If the session file exists open it
    vim -S $session_name
  else
    # Otherwise create it
    vim -c "Obsession $session_name" .
  fi
}
```

After adding this script reload your shell and the function will be available by running `vm`.

After changing branches I run `vm` to either open an existing session for the branch or create a new one.

## Cleaning up session files

Ideally we want to clean up our session files when branches are deleted. This script will keep your session files up to date with your current list of locally checked out branches.

```bash
#!/usr/bin/env bash
set -e

# Get the root directory of the repository
git_root_dir="$(git rev-parse --show-toplevel 2> /dev/null || echo '.')"

# Get a list of local branches
branches="$(git branch | sed -r 's/\*?\s*(.*?)\s*$/\1/')"

# Get a list existing sessions, trimmed down to the branch name portion of the filename. (This line handles sessions in directories up to 4 levels deep).
sessions="$(find $git_root_dir -maxdepth 4 -wholename '*/.sessions/*-session.vim' | sed 's/.*\.sessions\/\(.*\)-session\.vim/\1/' | sort | uniq)"

# Loop through session names
for session in $sessions ; do
  if [[ "$branches" != *"$session"* ]]; then
    # If session name isn't in the branches list, delete it.
    rm -v `find $git_root_dir -maxdepth 4 -wholename "*/.sessions/$session-session.vim"`
  fi
done
```

Add this script to a file named `git-prune-sessions` in a directory in your `$PATH`. Make it executable by running `chmod +x ./git-prune-sessions`. Then you can run `git prune-sessions` to clean out any unused sessions.

_Questions? Comments? Post a message below or ping me on [twitter](https://twitter.com/pietvanzoen)._
