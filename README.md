# baabo
Bellingham Adults Against B-oredom

## Notes

### Dates

In JS, we deal in `Date` objects.

In JSON/localStorage and before sending to the database, we serialize to ISO8601 strings. `JSON.stringify()` does this automatically.

When going the other way (8601 string -> `Date` obj) we pass the function exported by timestampReviver.js as the second, "reviver" argument to `JSON.parse()`.

When comparing/sorting, we take the `Date` object and `.getTime()` to get the number of milliseconds since the epoch.

