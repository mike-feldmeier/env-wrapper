# env-wrapper
A simple js wrapper around environmental variables, to allow upfront checking and defaulting of required variables

## Example

    const env = require('env-wrapper');

    env.load();                                          // Load .env file if available
    const port = env.require('PORT', 3000);              // Retrieve port from environment, 
                                                         // default to 3000 if not there
    const databaseUrl = env.require('DATABASE_URL');     // Retrieve database from environment, 
                                                         // throw error if not there

## Example .env file

    PORT=1234
    DATABASE_URL=db://localhost

## API

### #load(filename = '.env')
From Node.js:

    const env = require('env-wrapper');
    env.load();                                          // Loads .env into the environment 
                                                         // from the current directory if available
    env.load('/my-files/my.env')                         // Loads the specified file into the environment 

### #require(key, defaultValue?)
From Node.js:

    const env = require('env-wrapper');
    env.require('MY_ENV_VAR_THAT_EXISTS');               // Nothing happens

    env.require('MY_ENV_VAR_THAT_DOESNT_EXIST', 'xyz');  // process.env.MY_ENV_VAR_THAT_DOESNT_EXISTS
                                                         // now equals 'xyz'

    env.require('MY_ENV_VAR_THAT_DOESNT_EXIST');         // An Error is thrown

### #get(key)
From Node.js:

    const env = require('env-wrapper');
    env.get('MY_ENV_VAR_THAT_EXISTS');                   // Returns the value that has been defined, either
                                                         // from the environment, or through the default require
                                                         // shown above

    env.get('MY_ENV_VAR_THAT_DOESNT_EXIST');             // Returns undefined

## #set(key, value)
From Node.js:

    const env = require('env-wrapper');
    env.set('MY_ENV_VAR_THAT_EXISTS', 'xyz');            // Sets the given value as an environmental variable 


## Changes

Version | Changes
--- | ---
1.0.4 | Added load method; moved tests to Jasmine
1.0.3 | Require method returns value
1.0.2 | Fix for error message unit test
1.0.1 | Added set method; fixed package.json NPM error
1.0.0 | Initial Release