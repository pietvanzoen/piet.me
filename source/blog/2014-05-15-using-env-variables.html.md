---
title:  "Using local environment (ENV) variables."
---

Often enough you'll need to reference sensitive credentials in your project, or give an easy way for people using your project to change environment relative information in your project. Normally it's not ideal to commit sensitive information to a public repository. Neither is it ideal to commit code which only works for your setup. Enter 'Environment Variables'.

READMORE

Setting Environment variables
---

In terminal you can easily set environment (or ENV) variables by running this command: `export VAR_NAME=foo`. For multi word variables be sure to wrap the variable in quotes: `export VAR_NAME="foo bar"`. But when you reboot your shell you'll lose these variables. So lets look at how to set variables that persist.

Open up `.bash_profile` or `.bashrc` in your home folder using your text editor, if you don't have a bash file create it like so:

1. Start up Terminal
2. Type `cd ~` or just `cd` to go to your home folder.
3. Type `touch .bash_profile` to create your new file.
4. Edit `.bash_profile` with your favorite editor (or you can just type `open -e .bash_profile` to open it in the default editor.

Once you have your `.bash_profile` open you can add `export VAR_NAME=VALUE` to set an environment variable. Once you're done save, exit and type `. .bash_profile` in your terminal to reload .bash_profile. That's it.

**Update:** A note about case-sensitivity. Depending on what system/software you're using variables are or are not case-sensitive. Always be sure not to accidentally overwrite other variables in your environment. In some systems `Var_Name` will be the same as `VAR_NAME`.

Using ENV variables in code
---

ENV Variables are accessible by basically any server-side programming language. Here are a few examples:

Say I set this in my `.bash_profile`:

```bash
export WIBBLE=woo
```

**Ruby**

```ruby
wibble = ENV['WIBBLE']
print wibble
# => 'woo'
```

**Node**

```js
var wibble = process.env.WIBBLE;
console.log(wibble)
// => 'woo'
```

**Python**

```python
import os
wibble = os.environ['WIBBLE']
print wibble
# => 'woo'
```

Looking up ENV variables
---

Finally here are a couple quick commands for looking up what ENV variables have already been set.

- To print out a list of all your ENV variables just use the command `env`.
- To sort the output of ENV alphabetically use `env | sort`.
- To search for a ENV variable use `env | grep WIBBLE`. ~~Remember this is case-sensitive~~. Be aware that this can be case-sensitive depending on what system/software you're using.

If you have any questions or corrections just comment or email me.


