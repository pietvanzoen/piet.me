---
title: 7 reasons not to skip the tests
date: 2018-12-05
tags: tdd
unsplash_img_id: nGwhwpzLGnU
img_alt: A person peering over the edge of a cliff.

---

We've all been tempted to skip writing the tests. Whether it's time pressure, business pressure, the complexity of testing, or we just want to get on with something else. We might be tempted to say "YOLO!" and move on. So here's a list of reasons why you might want to think twice before doing that.

READMORE

## The Reasons

There are 7 of them, I counted. Why 7? That's how many I thought of. I may add more.

### Feature security

Making changes to existing programs is risky. You and your team have spent a lot of time and hard work getting it to where it is. Are you confident that if you implement a new feature you won't break an existing one? Tests give you this confidence.

If you think you have confidence in your code without tests, then would ask you to prove it. If you start poking around the program, triggering various behaviour, I'm pretty sure we could be sat around most of the day validating edge cases. This is not easily repeatable proof.

With good test coverage, you can run one command to quickly validate that your changes have not broken any tested behaviour.

### They're not just tests, they're documentation

Well structured tests with good descriptions provide a clear picture of expected behaviour. Including how the program should and shouldn't be used. If you come across a piece of code and don't understand it's purpose, try this: Make some changes, run the tests and see what failed. The failing test should tell you about the expected behaviour of that code.

Viewing tests as documentation is also a great way to get to know how a program works. This is particularly useful if you're new to a code base. Also if you're on-boarding new people, walking through the tests is a great way to help them get familiar with a project.

Obviously, if you skip writing the tests you loose this valuable resource.

### Testing makes you faster

Despite common misconceptions, sticking to the tests makes you ship value faster. This works in two ways:

First, with a well tested code base you can massively reduce the amount of time code spelunking. This is where you go from line to line, debugging, reading, and figuring out what some piece of code does. The tests give you picture of what the program is doing in a fraction of the time. You still need to do code reading, but the tests provide an invaluable companion to understanding what code is doing.

The second way tests make you ship value faster, is by vastly reducing the number of bugs you're shipping. Bugs are a debt against your time and the features you want to build. Bugs take your time away from shipping value, and they are a drain on the value of what you're shipping. If users want _x_ feature, but they end up _y_, and _z_ bug too, the value of _x_ is going to be reduced.

### Tests are automatable, you are not

The time a person spends running one off commands, or clicking around a screen to validate behaviour, is lost time. Wouldn't you rather spend this time actually writing features? These things are not automatable. Tests, on the other hand, can be configured to run as a part of your continuous integration processes. You create a pull request and tests run automatically, and your whole team can see the results. Manually validating code for all your team is laborious, and not easily repeatable, so the time is wasted.

That's not to say that all manual testing is wasted time. Some is necessary. But manual testing that could be easily automated, is time wasted. And when you'd rather be shipping value, time is your one of your most important resource.

### Green just looks good

Ok, this is a rather subjective point but... Green looks and feels good. Seeing that beautiful green band streak across the screen is just lovely. The confidence, the speed, the ease. Ugh. I love it.

### You probably won't go back and do them later

"How about we ship it now and write the tests later." If you've ever said or heard this before, I challenge you to find out if those tests were ever written. If you're lucky there's a tech-debt ticket floating around that no-one really wants to work on. Once code hits the master branch, the expectation, the motivation, and the incentive to write those tests all but disappear.

Even for someone who has experience writing tests, writing tests after merging is much harder than when you're actually working on the feature. When you're working on a feature, your mind is centered around the problem you're trying to solve. In that state it's much easier to think about what tests you need to write. Once you've moved onto another problem, remembering everything about that old one will be a struggle.

### Your later self (or a colleague) will appreciate it

Imagine this.

You settle down to add a new feature. Your good self (or a colleague) has left a nicely structured test suite documenting the behaviour of this program you need to modify. You add new tests, make your changes, fix some things you broke, and submit your PR. You feel confident about your newly added functionality. You feel good that you didn't break any existing behaviour. The process went quite smoothly.

**It can be this blissful.** Not all the time. Shit can hit the fan in a myriad of ways with software. But it can be blissful. Either way, consider the alternative.

You settle down to add a new feature. There are some tests. But it turns out there are tests missing for some of the behaviour. What do you do? If you implement your feature you may unknowingly break some untested feature. So, you have to first put your new feature on hold, find out what logic is not tested, then reverse engineer tests for it. But you're not working on your feature! You're doing someone else's work for them. That's no fun.

Do your future self (or colleague) a favour and keep a program tested. And with that, be sure to thank your past self (or colleague) for leaving a nicely tested program.

## Caveats and tips

These reasons are all well and good. But we don't live in a perfect code base. Here are some notes and tips on keeping the tests while living in an imperfect world.

### Caveat: Good coverage

Good coverage is a life saver. Obviously if you're starting from an existing code base with little or no tests you're going to have a harder time writing tests. But I strongly encourage you and your team to set the standard that any new code is tested. As the test coverage grows, so will your confidence, and ability to ship value quickly.

### Caveat: Testing is a skill

Unfortunately writing good tests is a skill learned with experience. If you're not comfortable writing tests or are having a hard time figuring out how to test a program, then this is the perfect time for pairing. Find that person that enjoys testing (they do exist), and ask them to help you. You may find that their enjoyment of testing rubs off on you. You never know.

### Tip: What (not) to test

Not everything is worth testing. But a lot is. I don't believe in 100% coverage. Most apps have a lot of startup logic and configuration that isn't worth testing, because without it the app just won't start.

My golden rule for what to test is, 'if it makes a decision, test it'. I guess you could add to that, 'unless it kill's the app on start'.

### Caveat/Tip: Perseverance

Stick at it, especially if you're adding tests to an existing code base. Coverage reports in CI builds (such as [Coveralls](https://coveralls.io/)) can be a great motivator. Make the coverage public, put it on a dashboard, and watch it go up!

## Conclusions

Forfeiting tests in the name of shipping faster is deceivingly harmful to your productivity. Be vary wary if you're being asked by colleges to skip test writing to save time. Ultimately it is slower and it will hurt your team. Find other ways to save time if deadlines are an issue, such as reducing the scope of the feature. But making testing a integral part of your workflow will benefit you, your future self, and anyone else who touches that code.

Happy testing!

### Further reading/watching

If you're new to testing check out these resources for learning more about TDD:

* [TDD & The Lump Of Coding Fallacy](http://geepawhill.org/tdd-and-the-lump-of-coding-fallacy/)
* [5 Common Misconceptions About TDD & Unit Tests - Eric Elliott](https://medium.com/javascript-scene/5-common-misconceptions-about-tdd-unit-tests-863d5beb3ce9#.i0eyob6as)
* [Writing Testable JavaScript - Rebecca Murphey](https://alistapart.com/article/writing-testable-javascript)

<br>
_Also posted on [medium.com](https://medium.com/@pietvanzoen/x-reasons-not-to-skip-the-tests-4ac8dfb2c6d2)._
