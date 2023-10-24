# rep-rev

Replace / revive for the built-in `JSON` object.

You were ever doing this `const str = JSON.stringify(obj, null, 2)` and thinking about the `null` you are passing here?

What if you pass something else?

That's where rep-rev comes into play.

The two methods of `JSON` each take an
additional parmeter:

```js
JSON.stringify(value, replacer, space);
JSON.parse(text, reviver);
```
`replacer` and `reviver`.

rep-rev utilizes those to provide a way of manipulating the values going in and
out of `JSON.stringify()` resp. `JSON.parse()`.

For example a `Date`: It stringifies just fine to a string, but
stays a string when getting parsed. So you end up doing things like:

```js
const items = JSON.parse(text);
for (const item of items) {
  item.date = new Date(item.date);
}
```

Time to

### Get Started

#### Install

```sh
$ npm install rep-rev
# Or:
$ yarn add rep-rev
```

#### Simple Example

```js
import {
  createRepRevCollection,
} from 'rep-rev';

const transformer = createRepRevCollection();
const items = JSON.parse(text, transformer.revive);
```

That's it. The default transformer collection has built-in rep-revs for `Map`, `Set` and
`Date`.

All of these are transformed through an `InstanceRepRev` which creates / parses
an intermediate format for the resulting JSON. E.g. a `replaced()`d `Date` becomes:

```json
{
  "$class": "Date",
  "data": "2023-10-23T15:44:04.986Z"
}
```

A `Map` becomes:

```json
{
  "$class": "Map",
  "data": [
    ["<key1>", "<value1>"],
    ["<key2>", "<value2>"]
  ]
}
```

The `data`-member can easily be serialized back into a `Map` or `Date` via
`new(data)`.

#### More Examples

There are two examples in the [examples folder](examples), I think, you
get the gist of it. Planning on adding more.

That's all for now.

Oh, one more thing:

### Q&A

- *Can I transform json to json?*  
  Well... there is an experimental function `transformJson(value, repl)` that
  mimics the behaviour of `JSON[stringify|parse]`
  (I hope - unit tests still missing). You can use that with both a `replace()`
  or a `revive()` to map json to json.