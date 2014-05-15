---
layout: post
title:  "Using local environment variables."
date:   2014-05-12
type: blog
published: true
categories: 
- blog
---

Often enough you'll need to reference sensitive credentials in your project, or give an easy way for people using your project to change environment relative information in your project. Normally it's not ideal to commit sensitive information to a public repository. Neither is it ideal to commit code which only works for your setup. Enter 'Environment Variables'.


Setting ENV variables
---
In terminal you can easily set ENV variables by running this command: `export VAR_NAME=FOO`. But when you reboot your shell you'll loose this variable. So lets look at how to set variables that persist.

In open up your `.bash_profile` or `.bashrc` in your home folder using your text editor, if you don't have a bash file create it like so:

1. Start up Terminal
2. Type `cd ~/` to go to your home folder
3. Type `touch .bash_profile` to create your new file.
4. Edit .bash_profile with your favorite editor (or you can just type `open -e .bash_profile` to open it in TextEdit (OSX).
5. Type `. .bash_profile` to reload .bash_profile and update any functions you add.

Once you have your `.bash_profile` open you can add `export VAR_NAME=VALUE` to set an environment variable. That's it.

Using ENV variables in code
---

ENV Variables are accessable by basically any serverside programming language. Here are a few examples:

Say I set this in my `.bash_profile`:

```
export WIBBLE=WOO
```

**Ruby**

```
wibble = ENV['WIBBLE']
print wibble
# => 'WOO'
```

**Node**

```
var wibble = process.env.WIBBLE;
console.log(wibble)
// => 'WOO'
```

**Python**

```
import os
wibble = os.environ['WIBBLE']
print wibble
# => 'WOO'
```

If you have any questions or corrections just comment or email me. 
