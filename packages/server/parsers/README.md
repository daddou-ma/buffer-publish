# Parsers

These parsers are used primarily by the server's RPC layer to parse responses from the Buffer API.

We keep them under the `server` package because both the bundled front-end code AND the server need to run them. (At the moment it's just the `pusher-sync` package's middleware that needs the `postParser` in the front-end.)
