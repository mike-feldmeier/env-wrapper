# env-wrapper

A simple js wrapper around environmental variables, to allow upfront loading, checking, and defaulting of required variables

- [Installation](#installation)
- [Load environment from a file](#load-environment-from-a-file)
- [Read and enforce that a required environment property is present](#read-and-enforce-that-a-required-environment-property-is-present)
- [Read and default an optional environment property](#read-and-default-an-optional-environment-property)
- [Simple getter / setter](#simple-getter--setter)
- [Testing](#testing)
- [Release History](#release-history)
- [License](#license)

## Installation

From the terminal, install the package from npm:

    npm i env-wrapper

From within your code, import the library:

```javascript
import env from 'env-wrapper'
```

## Load environment from a file

Optionally read key-value pairs from a file and insert them into the environment.  If a filename is not given, '.env' in the base directory is used.  If either the assumed or named file does not exist, no error is issued.  An error will be issued if the file exists but an error is encountered.  Note that this is a convenience method, and env-wrapper will readily handle any environment variables inserted through other means.  In `2.2.1` and previous, the current working directory was prepended to the filename given, so the file would always have to be in the working directory.  As of `2.2.2`, it will resolve between the current working directory and the path given, so that absolute paths and paths relative to current working directory can be used.

```javascript
await env.load()
await env.load('development.env')
await env.load('/absolute/path/development.env')
```

*Example .env file:*

    PORT=1234
    DATABASE_URL=db://localhost

## Read and enforce that a required environment property is present

The original intent of this library was to simply ensure fail-fast behavior if a required environment variable had not been specified, so that we know when the application loads instead of 3am next Tuesday when actually uses it.

```javascript
const databaseUrl = env.require('DATABASE_URL')
```

## Read and default an optional environment property

If the requested environment property cannot be found, and a default value is specified, that value will be inserted into the environment, and then returned as the requested value.  Because the environment can be altered by this form, this can also be used as a shortcut for conditionally priming the environment for later use.

```javascript
const port = env.require('PORT', 3000)
```

## Simple getter / setter

The library also provides a simple getter and setter that can be used for unconditionally inserting a value into the environment, or retrieving a value from the environment.  Unlike *require* above, *get* will either return the found value, or undefined if a value is not found.

```javascript
env.set('my-key', 'abc')
const key = env.get('my-key')
```

## Comments

Any line where the first non-space character is '#' will be ignored.  This allows commenting for clarity, or temporarily removing a line from effect with out actually removing it.

*Example .env file:*

    # Credentials
    USERNAME=public
    PASSWORD*=private


## Optional debug of load behavior

Adding an object that sets debug to true will print any variables that are loaded to the console.

```javascript
await env.load({ debug: true })
await env.load('development.env', { debug: true })
```

Any key names that end with a `*` will have their value replaced with `(secret)` in the console.

*Example .env file:*

    USERNAME=public
    PASSWORD*=private

## Testing

There are several Jasmine-based unit tests that can be run from the terminal if desired:

    npm test

## Release History

Version | Changes
--- | ---
2.2.2 | Fix to loading from outside current working directory
2.2.1 | Update docs for comments (smh)
2.2.0 | Added basic support for comments
2.1.1 | Expanded debug information
2.1.0 | Added debug option for load function
2.0.0 | Updated to be more ES6 friendly; load is now async
1.0.7 | Documentation revamp
1.0.6 | Fix to handle .env file values with embedded '=' symbols
1.0.5 | Changed load to sync operation; Fix to path calculations
1.0.4 | Added load method; moved tests to Jasmine
1.0.3 | Require method returns value
1.0.2 | Fix for error message unit test
1.0.1 | Added set method; fixed package.json NPM error
1.0.0 | Initial Release

## License

This work is released under the MIT license - see the [LICENSE](https://github.com/mike-feldmeier/env-wrapper/blob/master/LICENSE) file for details