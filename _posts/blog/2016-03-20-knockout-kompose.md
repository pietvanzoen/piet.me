---
layout: post
title: "Functional programming, lodash, and knockout obserables"
date: "2016-03-20"
published: false
categories:
- blog
---


Functional programming in javascript is a great way to take complex code and break it down into smaller, easier to digest chunks of code. Utility libraries like Lodash have given us excellent tools to make FP in javascript easy to do. Take this for example:

Say you want to create an array of peoples `age` in `years`s from this array:

```
var people = [
  { name: 'Ron', age: { years: 55, months: 6 } },
  { name: 'Leslie', age: { years: 41, months: 2 } },
  { name: 'Tom, age: { years: 30, months: 8 } },
];

// the plain js way
people.map(function (person) {
  return person.age.years;
});
// => [55, 41, 30]

// a better way
people.map(_.property('age.years'));
// => [55, 41, 30]

// even better still
_.map(people, 'age.years')
// => [55, 41, 30]
```

However if you're using Knockout this becomes a little more tricky since your object path might include observables that need to be unwrapped:

```
var people = ko.observableArray([
  { name: 'Ron Swanson', age: ko.observable({ years: 55, months: 6 }) },
  { name: 'Leslie Knope', age: ko.observable({ years: 41, months: 2 }) },
  { name: 'Andy Dwyer', age: ko.observable({ years: 34, months: 8 }) },
]);
)_.map(people, 'age.years');
// => []
```

Why an empty array? `people` is an observable array so we need to invoke it to get the value.

```
_.map(people(), 'age.years');
// => [undefined, undefined, undefined]
```

Here lodash is traversing the property path without invoking the observables so rather than retrieving the value of `years` inside the observable `age` it's trying to find the property `years` on the actual observable instance. Since years is not defined there, it just returns undefined for each person.

Here's how we might get around this.

```
_.map(people(), function (person) {
  return persion.age().years;
});
// => [55, 41, 30]
```

We're back to writing callbacks. That succinct, readable code we had earlier is gone. And what if someone's `age` ends up being `null`?

```
people.push({ name: 'Ann Perkins', age: null });
_.map(people(), function (person) {
  return person.age().years;
});
// => Uncaught TypeError: person.age is not a function
```

Dammit. If this were a written without obserables and using `_.map(people, 'age.years');` we'd simply get `[55, 41, 30, undefined]` because if the path does not exist lodash will simply return `undefined` for that person.

Here's how we'd get around that problem:

```
_.map(people(), function (person) {
  return person.age ? person.age().years : undefined;
});
// => [55, 41, 30, undefined]
```

And because this is knockout we probably want this in a computed obserable:

```
var peopleAgeYears = ko.pureComputed(function () {
  return _.map(people(), function (person) {
    return person.age ? person.age().years : undefined;
  });
});
peopleAgeYears();
// => [55, 41, 30, undefined]
```

This is managable but damn, it's nowhere near as nice as `_.map(people, 'age.years');`.

## Introducing Kompose

Kompose offers several helper functions that behave somewhat like lodash's path traversing helpers (e.g. `_.property`, `_.get`), but with the added benefit of unwrapping observables along the way. Let's write that `peopleAgeYears` computed using `kp.computedMap`.


```
var peopleAgeYears = kp.computedMap(people, 'age.years');
peopleAgeYears();
// => [55, 41, 30, undefined]
```

Nice! Just like the previous example, this computed will traverse the people objects in the observable array `people` and map their `age` in `years`. We're back to our clear, easy to read, code from earlier.

Like `_.map` passing a path is a convenience feature that creates an iteratee function using `kp.property`. You can also pass your own iteratee to `kp.computedMap`. Instead of everyone's age, say we wanted a computed that calculated everyones "[half your age plus seven](http://www.urbandictionary.com/define.php?term=half-your-age-plus-seven+rule)" age.

Let's start with the long form, and let's give Ann an age.

```
people.push({ name: 'Ann', age: ko.observable({ years: 39, months: 5 }) });
var youngestDatingAge = kp.computedMap(people, function (person) {
  var age = kp.get(person, 'age.years');
  return (age / 2) + 7;
});
youngestDatingAge();
// => [34.5, 27.5, 22, 26.5];
```

(Here `kp.get` acts like `_.get` except that it unwraps observables along the way.)

We can do much better than this though. If we break this down into it's element parts we can make this much easier to reason with. Let's start with a function to calculate someone's youngest date age based on the "half your age plus seven" rule.


```
function youngestDateAge(age) {
  return (age / 2) + 7;
}
```

We can also do away with setting the `age` variable.

```
var youngestDatingAge = kp.computedMap(people, function (person) {
  return youngestDateAge(kp.get(person, 'age.years'));
});
youngestDatingAge();
// => [34.5, 27.5, 22, 26.5];
```

Nice! But there's one more step. If you've never used `_.flow` before, read up on it and start using it. `_.flow` returns a function that allows you to pipe a value through several functions, with each function passing it's return value into the next. Here's how it fits in our example:


```
var youngestDatingAges = kp.computedMap(people, _.flow(kp.property('age.years'), youngestDateAge));
youngestDatingAges();
// => [34.5, 27.5, 22, 26.5];
```

Here we're using `kp.property` to fetch the value at `age.years`, which is then passed into our `youngestDateAge` function.

## Conclution

In the these examples I've tried to illustrate how kompose might work along side lodash to break your code down into smaller, easier to manage pieces. But it's not limited to the examples above. When I created kompose I did not want to replace lodash, but to simply address some of the difficulty of using lodash with objects that contain observables.

Right now the kompose API offers alternative methods to `_.get`, `_.property`, `_.method` and `_.matchesProperty`. Plus computed generators `kp.computedApply` and `kp.computedMap`. [Check out the docs](https://github.com/pietvanzoen/knockout-kompose/tree/master/doc) and please make any suggestions for improvements.