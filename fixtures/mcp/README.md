# Disposable MCP fixture

This directory contains an offline JSON-RPC transcript for local MCP integration tests and demos.

- Every value is synthetic and intentionally fictional.
- The transcript is disposable; it is safe to delete and regenerate.
- It does not contain responses copied from connected services, customer records, credentials, or live URLs.
- Treat the transcript as test data, not as a production MCP endpoint.

The fixture covers initialization, tool discovery, and one `list_vibes` call filtered to the synthetic `DevTools` category.
