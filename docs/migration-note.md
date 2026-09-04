# Retry parser migration note

The retry parser accepts timestamps in ISO 8601 format.

When an ISO timestamp includes a timezone offset, parsing preserves the
represented instant rather than treating the clock time as a new local time.
For example, `2025-01-15T10:00:00Z` and
`2025-01-15T05:00:00-05:00` identify the same instant and therefore remain
equivalent when used as retry timestamps.
