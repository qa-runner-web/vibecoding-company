# Migration note: ISO timestamps in retry parsing

The retry parser accepts ISO 8601 timestamp strings.

## Behavior

- Provide retry timestamps in ISO 8601 form, such as `2025-03-08T12:34:56Z`.
- Timestamps with an explicit offset are supported, such as `2025-03-08T07:34:56-05:00`.
- The parser preserves the instant represented by the timestamp. An offset is interpreted as part of the timestamp rather than discarded or treated as a different local time.

For example, `2025-03-08T12:34:56Z` and `2025-03-08T07:34:56-05:00` represent the same instant and are equivalent for retry parsing.

Existing retry timestamps can be migrated to ISO 8601 without changing the moment at which the retry is intended to occur.
