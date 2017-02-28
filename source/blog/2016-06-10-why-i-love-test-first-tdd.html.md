---
layout: post
title: "Why I love test-first TDD"
date: "2016-06-10"
published: true
unsplash_img_id: 'oTQVwECws8o'
categories:
- blog
tags:
  - TDD
  - BDD
  - testing
---

Twelve months ago I had hardly written a single test. After some encouragement and guidance on how to write tests my world changed. Yes, there's lots of evidence that says writing tests reduces bug density (which is awesome), but that alone isn't necessarily going to persuade you to take the time to do them. What made me adopt a workflow where I write tests first? The fact that I enjoyed it!

READMORE

_Preface: I'm not going to cover how to test in this post. Just why I love it. But how you test and tooling for testing makes a big difference on the fun factor. My quick recommendation is checking out [Wallaby.js](https://wallabyjs.com/). I'll try to do a post on TDD tooling and workflow in the future, or just find some more useful links._

## What makes test-first TDD fun?

### Immediate feedback

My old process involved a lot of leg work, and a lot of fumbling around in the dark. I would write some code, add some console logging, switch contexts to my browser, refresh, read and mentally parse what it returns, rinse, repeat.

Using a test runner that immediately runs your tests after each change is a glorious alternative. Write some code, test fails, adjust code, test passes, success! I don't even have to read what the code returns, all I need to worry about is green verses red. Pass vs fail. Not only am I getting faster feedback, but I'm also reducing the cognitive load. I'm not changing contexts, I'm not interpreting what the code returns, I just want it to pass.

### Confidence in code

Before I used TDD extensively I would end up with some code that I was somewhat confident in. I would have thought about possible edge cases and tried to account for them. It felt _okay_ shipping the code but there was always an element of trepidation.

It would be unwise to think that TDD gives you 100% bug free code. As Rich Hickey said in a talk once, "What do all production bugs have in common? They passed the tests." But, for me, I feel way better about my code when it's tested. In particular, it's way easier to account for edge cases. Once you have your happy path tests in place, you can add edge case tests and implement the code. Provided all the tests pass, you can be confident that adjusting the code for edge cases isn't going to break the primary function of you code.

### Easy refactoring

Another wonderful benefit to TDD is how much easier it is to refactor code when you have a solid set of tests to work with. Feel like some code could be optimized? Refactor without fear! Testing makes it super easy to go back after the fact and make your tests more readable, more DRY, and more maintainable.

But wait there's more! For me the real benefit of easy refactoring comes when you know this before you begin. **Your first version of a piece of code does not have to be perfect, it just needs to make the tests pass.** Once your tests pass and you can go back and make it pretty and optimize it to your heart's delight. The point being, you don't have to waste cognitive power figuring out how all this behaviour is going to fit together for your first version of a piece of code. Do your worst! Then make it awesome when tests are green.

## Conclusion

What I hope you get from this is that test-first TDD doesn't have to be a slog. It doesn't have to be additional work you have to do when you could have been done 20 minutes ago. I believe it can be enjoyable to everyone and that it can be a huge benefit to your work flow.

If you still think writing tests is a slog but you haven't ever tried test-first development then I strongly recommend at least giving it a go. I really enjoy TDD, but I find writing the tests after the fact pretty unbearable. Challenge yourself to do testing first for a couple weeks and let me know how it goes!

_I'd love to hear about your experience with TDD. What do you like/dislike about it? What tools do you find most useful? I'm [@pietvanzoen](https://twitter.com/pietvanzoen) on twitter or just leave a comment below._

### Further reading/watching
- [5 Common Misconceptions About TDD & Unit Tests - Eric Elliott](https://medium.com/javascript-scene/5-common-misconceptions-about-tdd-unit-tests-863d5beb3ce9#.i0eyob6as)
- [Writing Testable JavaScript - Rebecca Murphey](https://alistapart.com/article/writing-testable-javascript)
- [All the Little Things - Sandi Metz (refactoring talk)](https://www.youtube.com/watch?v=8bZh5LMaSmE)
