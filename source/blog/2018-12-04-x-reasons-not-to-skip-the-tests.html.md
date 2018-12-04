---
title: 7 reasons not to skip the tests
date: 2018-12-04
tags: tdd
unsplash_img_id: nGwhwpzLGnU
img_alt: A person peering over the edge of a cliff.

---

We've all been tempted to skip writing the tests. Whether it's time pressure, business pressure, the complexity of testing, or we just want to get on with something else, we might be tempted to say "YOLO!" and move on. Here's a list of things to think about before ditching the tests.

READMORE

## The Reasons

There are 7 of them, I counted. Why 7? That's how many I thought of. I may add more.

### Feature security

Making changes to existing programs is risky business. You and your team have spent a lot of time and hard work getting it to where it is. Are you sure that if you implement a new feature you won't break an existing one? Tests give you this confidence.

If you think you have confidence in your code without tests, then would ask you to prove it. If you proceed to poke around the program triggering various behaviour I'm pretty sure we could be sat around most of the day validating edge cases.

With good coverage, running one command quickly and efficiently validates that your changes have not broken any tested behaviour.

### They're not just tests, they're documentation

Well structured tests with good descriptions provide a clear picture of expected behaviour, including how the program should and shouldn't be used. If you come across a piece of code and don't understood it's purpose, try making some changes, running the tests and seeing what failed. The failing test should tell you about the expected behaviour of that code.

Viewing tests as documentation is also a great way to know how a program works. This is particularly useful if you're new to a code base. Also if you're on-boarding new people, walking through the tests is a great way to help them get familiar with a project.

### Testing makes you faster

Despite common misconceptions, sticking to the tests makes you ship value faster.

This works in two ways. First, with a well tested code base you can massively reduce the amount of time code spelunking. This is where you go from line to line, `console.log`ing and reading, figuring out what some piece of code does. Through the tests you can gain a picture of what the program is doing in a fraction of the time. You still need to do some reading, but the tests provide an invaluable companion to understanding what code is doing.

The second way tests make you ship value faster is by vastly reducing the number of bugs you're shipping. Bugs are a debt against your time and the features you want to build. Bugs take your time away from shipping value, and they are a drain on the value of what you're shipping. If users want _x_ feature, but with it they get _y_, and _z_ bug, the value of _x_ is going to be diminished.

### Tests are automatable, you are not

The time a person uses running one off commands, or clicking around a screen to validate behaviour, is lost time. These things are not automatable. Tests can be configured to run as a part of continuous integration processes. You create a pull request and tests run automatically, and your whole team can see the results. Manually validating code for all your team is laborious, and not easily repeatable, so the time is wasted. And when you'd rather be shipping value, time is your one of your most important resource.

### Green just looks good

Green just looks and feels good. This is a rather subjective point, but seeing that beautiful green band streak across the screen is just lovely. The confidence, the speed, the ease. Ugh. I love it.

### You probably won't go back and do them later

"How about we ship it now and write the tests later." If you've said or heard this before I challenge you to find out if those tests were ever written. If you're lucky there's a tech-debt ticket floating around that no-one really wants to work on. Once code hits the master branch the expectation and the motivation to write those tests dissipates.

Even for someone who loves writing tests, writing tests after merging is much harder than when you're actually working on the feature. When you're working on a feature, your mind is centered around the problem you're trying to solve. In that state it's much easier to think about what the tests should look like. Once you've moved onto another problem, remebering everything about that old one will be a struggle.

### Your later self (or a colleague) will appreciate it

You settle down to add a new feature, your good self (or a colleague) has left a nicely structured test suite documenting the behaviour of this program you need to modify. You add new tests, make your changes, fix some things you broke and submit your PR. You feel confident about your newly added functionality, you feel good that you didn't break any existing behaviour, the process went quite smoothly. It can be this blissful. Not all the time. Shit can hit the fan in a myriad of ways with software, but it can be blissful. Either way, consider the alternative.

You settle down to add a new feature. There are some tests, but it turns out there are tests missing for some of the behaviour. What do you do? If you implement your feature you don't know that you haven't broken something else. So, you have to first put your new feature on hold, find out what logic is not tested, then figure out what it's doing so you can write a test for it. But you're not working on your feature! You're doing someone else's job for them. That's no fun.

## Caveats and tips

These reasons are all well and good. But we don't live in a perfect code base. Here's some notes and tips on keeping the tests while living in an imperfect world.

### Caveat: Good coverage

Good coverage is a life saver. Obviously if you're starting from an existing code base with little or no tests you're going to have a harder time writing tests. But I strongly encourage you and your team to set the standard that any new code is tested.

### Caveat: Testing is a skill

A good test is not a burden. Unfortunately writing good tests is a skill learned with experience. If you're not comfortable writing tests or are having a hard time figuring out how to test a program, then this is the perfect time for pairing. Even if it's with someone who is as comfortable with testing as you are, two heads are better than one.

### Tip: What (not) to test

Not everything is worth testing. But a lot is. I don't believe in 100% coverage. Most apps have a lot of startup logic and configuration that isn't worth testing, because without it the app just won't start.

My golden rule for what to test is, 'if it makes a decision, test it'. I guess you could add to that, 'unless it kill's the app on start'.

### Caveat/Tip: Perseverance

Stick at it, especially if you're adding tests to an existing code base. Coverage reports in CI builds (such as [Coveralls](https://coveralls.io/)) can be a great motivator. Make the coverage public, put it on a dashboard, and watch it go up!

## Conclusions

Forfeiting tests in the name of shipping faster is deceivingly harmful to your productivity. Be vary wary if you're being asked by colleges to skip test writing to save time. Ultimately it is slower and it will hurt your team in the long run. Find other ways to save time if deadlines are an issue, such as reducing the scope of the feature.

Happy testing.

### Further reading/watching

If you're new to testing check out these resources for learning more about TDD:

* [TDD & The Lump Of Coding Fallacy](http://geepawhill.org/tdd-and-the-lump-of-coding-fallacy/)
* [5 Common Misconceptions About TDD & Unit Tests - Eric Elliott](https://medium.com/javascript-scene/5-common-misconceptions-about-tdd-unit-tests-863d5beb3ce9#.i0eyob6as)
* [Writing Testable JavaScript - Rebecca Murphey](https://alistapart.com/article/writing-testable-javascript)
