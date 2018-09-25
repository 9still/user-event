<div align="center">
<h1>user-event</h1>

<a href="https://www.emojione.com/emoji/1f415">
<img height="80" width="80" alt="dog" src="https://raw.githubusercontent.com/gpx/user-event/master/other/dog.png" />
</a>

<p>Simulate user events for <a href="https://github.com/kentcdodds/react-testing-library">react-testing-library</a></p>
</div>

<hr />

[![Build Status](https://travis-ci.org/Gpx/user-event.svg?branch=master)](https://travis-ci.org/Gpx/user-event)
[![Maintainability](https://api.codeclimate.com/v1/badges/75f1ff4397e994c6004e/maintainability)](https://codeclimate.com/github/Gpx/user-event/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/75f1ff4397e994c6004e/test_coverage)](https://codeclimate.com/github/Gpx/user-event/test_coverage)

## The problem

From
[kentcdodds/dom-testing-library#107](https://github.com/kentcdodds/dom-testing-library/issues/107):

> [...] it is becoming apparent the need to express user actions on a web page
> using a higher-level abstraction than `fireEvent`

## The solution

`user-event` tries to simulate the real events that would happen in the browser
as the user interacts with it. For example `userEvent.click(checkbox)` would
change the state of the checkbox.

**The library is still a work in progress and any help is appreciated.**

## Installation

With NPM:

`npm install user-event --dev`

With Yarn:

`yarn add user-event --dev`

Now simply import it in your tests:

```js
import userEvent from "user-event";
// or
var userEvent = require("user-event");
```

## API

### `click(element)`

Clicks `element`, depending on what `element` is it can have different side
effects.

```jsx
import React from "react";
import { render } from "react-testing-library";
import userEvent from "user-event";

const { getByText, getByTestId } = test("click", () => {
  render(
    <div>
      <label htmlFor="checkbox">Check</label>
      <input id="checkbox" data-testid="checkbox" type="checkbox" />
    </div>
  );
});

userEvent.click(getByText("Check"));
expect(getByTestId("checkbox")).toHaveAttribute("checked", true);
```

### `type(element, text, [options])`

Writes `text` inside an `<input>` or a `<textarea>`. `options` accepts one
argument `allAtOnce` which is `false` by default. If it's set to `true` it will
write `text` at once rather than one character at the time.

```jsx
import React from "react";
import { render } from "react-testing-library";
import userEvent from "user-event";

const { getByText } = test("click", () => {
  render(<textarea data-testid="email" />);
});

userEvent.type(getByTestId("email"), "Hello, World!");
expect(getByTestId("email")).toHaveAttribute("value", "Hello, World!");
```
