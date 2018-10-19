---

title: how to describe your tests
date: 2018-10-19 17:54 UTC
tags: tdd

---


## Intro
Testing is hard.
we forget about designing tests with good language.
particularly hard for non native english speakers.
here are some ways that I've learned to structure test descriptions
mostly from a perspective of rspec and jasmine/jest

## Nesting your tests `describe`s

Start your test description with the highest level thing in the file you're testing. This is the title of the module of code you're testing. If it's a class it's the name of the class. If it's a collection of utility functions then it's probably the name of the module they live under.

Say we have a module called `foo-helpers`. Our test file would begin like this:

```js
import FooHelpers from './foo-helpers';

describe('FooHelpers'. () => {
  // tests will go here
});
```

Next level will be each of the methods or functions contained in that module.

```js
describe('FooHelpers', () => {

  describe('calculate', () => {});
  describe('do', () => {});
  describe('something', () => {});

});
```


wrap method tests in a block with the method name

## Describe behaviour in an imperative mood.

You may have heard of the "imperative mood" before as it's also a good way to describe git commits. Simply put it means "speaking as if giving a command".

## avoid describing the implementation and describe the behaviour
* "it works"

## Conclution

Think of test descriptions as documentation
