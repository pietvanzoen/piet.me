---

title: Do your tests have it-should-itis? Here's the cure.
date: 2018-11-30 21:59 UTC
tags: tdd
unsplash_img_id: 3To9V42K0Ag

---

If you have a project that uses an `it "<description>" <test code>` style of test structuring like jest or rspec try running this script in your project:

```bash
grep -RIh --exclude-dir=node_modules -E 'it[\( ][\'"]should' . | sed -e 's/^ *//g'
```

What this script does is find any instance of a test that begins with `it("should...`. There's a good chance you may get a few results. If it's anything like some of the projects I work on there are A LOT. Tack on ` | wc -l` to the end of that script to get a count. One project I tried this against had 855 instances of `it("should...`.

If you're doing TDD then you're expecting the test to fail the first time. So describing the test with "it should do x" makes sense. The program doesn't do the thing _yet_, but we want it to. "It should do x". The trouble is that every program "should" do something. So, often what we end up with is a list of tests that look a bit like this:

```js
examples
```

Reading this, we end up just tuning out the first part of the description. The "should" is redundant. It adds no value to the description. So what's a better way of describing our tests?

A popular blog post ([How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/#imperative)) gives us a tip. "Use the imperative mood." That is to say, "write as if giving an instruction or command". Put another way, describe what the behaviour of the programe *is* rather than what it should be. Good test descriptions read like documentation. If you read documentation about a program feature and it says "it should do this thing", you're not exactly filled with confidence. And we want confidence! I digress.

Good test descriptions read like documentation, because documentation is just a description of what the program does. No if's, no buts, no shoulds, it just does. So how would we rewrite the above examples.

```js
more examples
```

Much better right? It's more succinct, clearer, and each line kkkkkkk

A note on English as a second language. If English is you're first language then thinking in this imperative voice can be tricky. If English isn't your first language, it's doubly so, and you shouldn't feel bad about it.


A program does, or it does not. There is no should.

> Having x say "it should put the lotion in the basket" wouldn't have been half as creepy as "it puts the lotion in the basket".
