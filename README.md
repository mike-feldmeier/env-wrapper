# env-wrapper
A simple js wrapper around environmental variables, to allow upfront checking and defaulting of required variables

## #require
From Node.js:

    var env = require('env-wrapper');
    env.require('MY_ENV_VAR_THAT_EXISTS');               // Nothing happens

    env.require('MY_ENV_VAR_THAT_DOESNT_EXIST', 'xyz');  // process.env.MY_ENV_VAR_THAT_DOESNT_EXISTS
                                                         // now equals 'xyz'

    env.require('MY_ENV_VAR_THAT_DOESNT_EXIST');         // An Error is thrown

## #get
From Node.js:

    var env = require('env-wrapper');
    env.get('MY_ENV_VAR_THAT_EXISTS');                   // Returns the value that has been defined, either
                                                         // from the environment, or through the default require
                                                         // shown above

    env.get('MY_ENV_VAR_THAT_DOESNT_EXIST');             // Returns undefined

## #set
From Node.js:

    var env = require('env-wrapper');
    env.set('MY_ENV_VAR_THAT_EXISTS', 'xyz');            // Sets the given value as an environmental variable 
