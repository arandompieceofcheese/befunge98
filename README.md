# JSFunge-98

JSFunge-98 is an (almost) standards-compliant Befunge-98 interpreter written in pure JavaScript.
[Try it here!](http://misc.pietu1998.net/jsfunge-98/befunge98.html)

## Files

  - `befunge98.html`: the main frontend page for the interpreter.
  - `befunge98.css`: the stylesheet for the interpreter.
  - `befunge98.js`: the interpreter control code.
  - `befunge98-engine.js`: the actual interpreter. This file contains everything needed for actually running the
    interpreter.

##Features

###Browser interface

JSFunge-98 has a browser interface that allows for:

  - writing code
  - loading built-in examples
  - loading code files from the user's computer
  - pre-entering input or using an interactive console (todo)
  - running the code, with optional delay
  - stepping code instruction by instruction
  - debugging with stack and Funge-Space views (todo) and
  - entering command line arguments.

###Interpreter

JSFunge-98 implements _almost_ the entire [Befunge-98 specification](http://quadium.net/funge/spec98.html). Filesystem
Funge is not implemented for obvious reasons. Concurrent Funge-98 support may come in the future.

The only unimplemented required feature is the shrinking of Funge-Space when areas are changed to spaces. Also, putting
values to extremely large positions will cause memory problems, as the use of memory is not optimized for them.

JSFunge-98 has been tested against the [Mycology test suite](https://github.com/Deewiant/Mycology/), and passes all
tests except for the ones related to the shrinking of Funge-Space (and input, which is currently untestable).

The following fingerprints are currently implemented:

  - `MODU`
  - `NULL`
  - `ROMA`

##Known issues

  - Input is not working yet.
  - The about button is nonfunctional for now.

##Upcoming features

  - Live debugger, with stack and Funge-Space views.
  - Saving files.
  - Concurrent Funge-98.
  - Working input.