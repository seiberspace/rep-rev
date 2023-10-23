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

### Get started

```js
import {
  createRepRevCollection,
} from 'rep-rev';

const transformer = createRepRevCollection();
const items = JSON.parse(text, transformer.revive);
```

That's it. The default-transformer collection has built-in rep-revs for `Map`, `Set` and
`Date`.

All of these are transformed through an `InstanceRepRev` which creates an
intermediate format for the resulting JSON. E.g. a `Date` becomes:

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

