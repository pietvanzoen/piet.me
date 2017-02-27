---
layout: post
title: "Lodash, Knockout, and functional programming"
date: "2016-03-20"
published: true
categories:
- blog
unsplash_img_id: 5eZu5p0vSPg
---

Lodash and functional programming offers some wonderful ways to make code cleaner and more readable. But they don't always play nice if you happen to use Knockout observables. I'm going to introduce a way to make handling observables in functional style easier.

READMORE

Let's start with a plain object example. Say you want to create an array of people's `age` in `years` from this array:

~~~js
var people = [
  { name: 'Ron Swanson', age: { years: 55, months: 6 } },
  { name: 'Leslie Knope', age: { years: 41, months: 2 } },
  { name: 'Andy Dwyer', age: { years: 34, months: 8 } },
];

// the plain js way
people.map(function (person) {
  return person.age.years;
});
// => [55, 41, 34]

// a better way with _.property
people.map(_.property('age.years'));
// => [55, 41, 34]

// even better still with _.map
_.map(people, 'age.years')
// => [55, 41, 34]
~~~

Clean succinct code. Excellent!

Adding Observables
---

If you're using [Knockout](http://knockoutjs.com), this becomes a little more tricky because your object path might include observables that need to be unwrapped:

~~~js
var people = ko.observableArray([
  { name: 'Ron Swanson', age: ko.observable({ years: 55, months: 6 }) },
  { name: 'Leslie Knope', age: ko.observable({ years: 41, months: 2 }) },
  { name: 'Andy Dwyer', age: ko.observable({ years: 34, months: 8 }) },
]);
_.map(people, 'age.years');
// => []
~~~

Why an empty array? `people` is an observable array so we need to invoke it to get the value.

~~~js
_.map(people(), 'age.years');
// => [undefined, undefined, undefined]
~~~

Here Lodash is traversing the property path without invoking the observables, so rather than retrieving the value of `years` from inside the observable it's trying to find the property `years` on the actual observable instance. Since `years` does not exist, it just returns `undefined` for each person.

Here's how we might get around this:

~~~js
_.map(people(), function (person) {
  return persion.age().years;
});
// => [55, 41, 30]
~~~

We're back to writing callbacks. That succinct, readable code we had earlier is gone. And what if someone's `age` ends up being `null`?

~~~js
people.push({ name: 'Ann Perkins', age: null });
_.map(people(), function (person) {
  return person.age().years;
});
// => Uncaught TypeError: person.age is not a function
~~~

Dammit. If this were a written without observables and using `_.map(people, 'age.years');` we'd simply get `[55, 41, 30, undefined]`. Lodash is robust enough that it will simply return `undefined` for that person.

Here's how we'd get around that problem:

~~~js
_.map(people(), function (person) {
  return person.age ? person.age().years : undefined;
});
// => [55, 41, 30, undefined]
~~~

We have to use a conditional to get around our `null` problem, which adds complexity, which makes the code less readable.

Since we're using knockout, we probably want this to be a computed observable, so that the value we get is always up to date with our `people` array.

~~~js
var peopleAgeYears = ko.pureComputed(function () {
  return _.map(people(), function (person) {
    return person.age ? person.age().years : undefined;
  });
});
peopleAgeYears();
// => [55, 41, 30, undefined]
~~~

Yikes. Let's take stock. We have two nested functions, a variable used twice, a path named twice, and an `undefined` return. This is manageable but damn, it's nowhere near as nice as `_.map(people, 'age.years');`.

## Introducing Kompose

Kompose offers several helper functions that behave like Lodash's path traversing helpers (such as `_.property` and `_.get`), but with the added benefit of unwrapping observables along the way.

Let's start with our people again:

~~~js
var people = ko.observableArray([
  { name: 'Ron Swanson', age: ko.observable({ years: 55, months: 6 }) },
  { name: 'Leslie Knope', age: ko.observable({ years: 41, months: 2 }) },
  { name: 'Andy Dwyer', age: ko.observable({ years: 34, months: 8 }) },
  { name: 'Ann Perkins', age: ko.observable({ years: 39, months: 5 }) }
]);
~~~

Let's write that `peopleAgeYears` computed using `kp.computedMap`.

~~~js
var peopleAgeYears = kp.computedMap(people, 'age.years');
peopleAgeYears();
// => [55, 41, 30, 39]
~~~

Nice! Just like the verbose `peopleAgeYears` example above, this computed will traverse the people objects in the observable array `people` and map their `age` in `years`. We're back to our clear, easy to read, code from earlier.

Going the extra functional mile
---

Like `_.map`, passing a path to `kp.computedMap` is a convenience feature that creates an iteratee function using `kp.property`. You can also pass your own iteratee function to `kp.computedMap`. Instead of everyone's age, say we wanted a computed that calculated everyone's "[half your age plus seven](https://www.youtube.com/watch?v=7dsVYswSfow)" age.

Let's start with the long(ish)form:

~~~js
var youngestDatableAges = kp.computedMap(people, function (person) {
  var personAgeYears = kp.get(person, 'age.years');
  return (personAgeYears / 2) + 7;
});
youngestDatableAges();
// => [34.5, 27.5, 22, 26.5];
~~~

(`kp.get` is like `_.get` except that it unwraps observables along the way.)

We can do much better than this though. If we break the above example down into it's element parts we can make this much easier to reason with. Let's start by breaking out our equation:

~~~js
function datableAge(age) {
  return (age / 2) + 7;
}
~~~

We can also do away with setting the `personAgeYears` variable and just pass the return value from `kp.get` straight into the `datableAge` function.

~~~js
var youngestDatableAges = kp.computedMap(people, function (person) {
  return datableAge(kp.get(person, 'age.years'));
});
youngestDatableAges();
// => [34.5, 27.5, 22, 26.5];
~~~

Not bad! But wouldn't it be great if we didn't have to define the callback function and the `person` variable? Well, there's a way with `_.flow`.

If you've never used `_.flow` before (sometimes called `pipe` in other functional libraries), I really recommend reading up and trying it out. `_.flow` returns a function that allows you to pipe a value through several functions, with each function passing it's return value into the next. Here's how it fits in our example:

~~~js
var youngestDatableAges = kp.computedMap(people, _.flow(kp.property('age.years'), datableAge));
youngestDatableAges();
// => [34.5, 27.5, 22, 26.5];
~~~
That's it! No function declarations. No unnecessary variables. This is Point Free (or Tacit) Functional Programming:

> Tacit programming, also called point-free style, is a programming paradigm in which function definitions do not identify the arguments (or "points") on which they operate. Instead the definitions merely compose other functions, among which are combinators that manipulate the arguments. ~ [Wikipedia](https://en.wikipedia.org/wiki/Tacit_programming)

## Conclusion

In the these examples I've tried to illustrate how Kompose might work alongside Lodash to produce succinct, point-free, functional code that's easy to read. But it's not limited to the examples above. When I wrote Kompose I did not want to replace Lodash, I wanted to give Knockout users a tool to make it easier to write functional code that handles observables.

Right now the kompose API offers alternative methods for `_.get`, `_.property`, `_.method` and `_.matchesProperty`. Plus computed generators `kp.computedApply` and `kp.computedMap`. [Check out the docs](https://github.com/pietvanzoen/knockout-kompose/tree/master/doc) and please make any suggestions for improvements.

Further Reading
---

- [Kompose on Github](https://github.com/pietvanzoen/knockout-kompose)
- [Point-free programming is not pointless (post)](https://glebbahmutov.com/blog/point-free-programming-is-not-pointless/)
- [JavaScript Allongé (ES5) - A long pull of functions, combinators, & decorators (book)](https://leanpub.com/javascript-allonge)
