# freeCodeCamp - Node and Express Basics

Node.js is a Javascript runtime environment that allows developers to write back-end programs
(server-side) in JavaScript. Node.js comes with several built-in modules — small independent programs —
that help with this.

Some of the main modules include HTTP, which acts as a server, and a file system, which acts as a
module for reading and modifying files.

In the last few courses, you learned how to install and manage packages from npm, which are collections of small modules.

These packages can help you build larger, more complex applications.

Express is a lightweight framework for creating web applications, and is one of the most popular packages on npm.
Express makes it much easier to create a server and handle routing for your application, handling things
how to direct people to the correct page when they visit a certain endpoint, such as /blog.

In this course, you will learn the basics of Node and Express, including how to create a server, handle files
different and handle different requests from a browser.


## Get to know the Node console
During the development process, it is important to be able to check what is happening in the code.

Node is just a JavaScript environment. Like client-side JavaScript, you can use the console to display
useful debugging information. On your local machine, you would see console output in a terminal.
In Replit, a terminal is open in the right pane by default.

We recommend that the terminal remains open while you work on these challenges.
By reading the output in the terminal, you can see errors that may occur.

Modify the myApp.js file to log "Hello World" to the console.

```javascript
let express = require('express');
let app = express();
console.log("Hello World");

module.exports = app;
```

Tests:
- "Hello World" must be in the console


## Start a working Express server
In the first two lines of the myApp.js file, you can see how easy it is to create an Express application object.
This object has several methods and you will learn many of them in these challenges.
A fundamental method is `app.listen(port).`
It tells the server to listen on a certain port, putting it in a running state.
For testing purposes, we need the app to be running in the background so we can add this method
in the server.js file for you.

Let's serve our first string!
In Express, routes have the following structure: app.METHOD(PATH, HANDLER).
METHOD is a lowercase http method.
PATH is a relative path on the server (it can be a string or even a regular expression).
HANDLER is a function that Express calls when the route matches.
Handlers have the form function(req, res) {...}, where req is the requested object, and res is the response object.

For example, the handler
```javascript
function(req, res) {
   res.send('Response String');
}
```
will serve the string 'Response String'.

**Use the `app.get()` method to serve the "Hello Express" string for GET requests that match the
path / (root).**

Make sure your code works by looking at the logs, then see the results in the preview if you
are using Replit.

```javascript
app.get('/', function(req, res){
     res.send("Hello Express");
});
```

Tests:
- Your application must serve the string 'Hello Express'


## Serve an HTML file
You can respond to requests with a file using the res.sendFile(path) method.
You can place it inside the app.get('/', ...) route handler.
Behind the scenes, this method will set the appropriate headers to instruct the browser how to handle the file
you want to send, depending on the type. Then it will read and send the file.
This method needs an absolute file path.
We recommend that you use Node's global variable __dirname to calculate the path like this:
`absolutePath = __dirname + '/relativePath/file.ext'`

Send the /views/index.html file as a response to GET requests for the / path.
When you see your application live, you should notice a large HTML title (and a form, which we will use later…),
without any style applied.

Note: You can edit the previous challenge solution or create a new one.
If you create a new solution, keep in mind that Express evaluates routes from top to bottom and executes the handler
for the first match.
You have to comment the previous solution, or the server will continue responding with a string.

```javascript
app.get('/', function(req, res){
     let pathFile = __dirname + '/views/index.html'
     res.sendFile(pathFile);
});
```

Tests:
- The application must serve the views/index.html file


## Serve static assets
An HTML server usually has one or more user-accessible directories.
You can place the static resources needed for the application there (stylesheets, scripts and images).

In Express, you can do this functionality using the express.static(path) middleware, where the path parameter is the
absolute path of the folder containing the files.

If you don't know what middleware is... don't worry. We will discuss this in detail later.
Basically, middleware are functions that intercept route handlers, adding some type of information.
A middleware needs to be assembled using the app.use(path, middlewareFunction) method.
The first argument, path, is optional. If you do not pass this argument, the middleware will be executed on all
requests.

**Mount the `express.static()` middleware to the /public path with `app.use()`.**
The absolute path to the file folder is __dirname + /public.

Your application should now be able to serve a CSS stylesheet.
Note that the /public/style.css file is referenced in /views/index.html in the project's boilerplate.
The homepage should look a little better now!

```javascript
// app.use(express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/public"));
```

Tests:
- Your application must serve asset files from the /public directory to the /public path
- The application must not serve files from folders other than the /public directory


## Serve JSON on a specific route
While an HTML server serves HTML files, an API serves data.
A REST API (Representational State Transfer) allows the exchange of data in a simple way without the
need for clients to know any detail about the server.
The client just needs to know where the resource is (what its URL is) and the action it wants to perform on it (the verb).
The GET verb is used when you search for some information, without modifying anything.

Today, the preferred data format for moving information around the web is JSON.
Simply put, JSON is a convenient way to represent a JavaScript object as a string, which can then be
easily transmitted.

Let's create a simple API, generating a route that responds with JSON in the path /json.
You can do this as usual with the app.get() method.
Inside the route handler, use the res.json() method, passing an object as an argument.
This method closes the request-response loop, returning the data. Behind the scenes, it converts a JavaScript object
valid in a string.
Then set the appropriate headers to tell the browser that you are serving JSON and send the data to
return.

A valid object has the usual {key:data} structure. data can be a number, a string, a nested object or an array.
data can also be a variable or the result of a function call.
In this case, it will be evaluated before being converted to a string.

**Serve the {"message": "Hello json"} object as a response, in JSON format, to GET requests made
to the /json route.
Then point your browser to your-app-url/json.**

You should see the message on the screen.
```javascript
app.get("/json", function(req, res){
     res.json({"message": "Hello json"});
});
```

Tests:
- The /json endpoint must serve the JSON object {"message": "Hello json"}


## Use .env file
The .env file is a hidden file that is used to pass environment variables to your application.
This file is secret, no one but you can access it.
It can be used to store data that you want to keep private or hidden.
For example, you can store API keys of external services or the URI of your database.
You can also use it to store configuration options.
By setting configuration options, you can change the behavior of your application without needing to rewrite
some code.

Environment variables can be accessed by the application using `process.env.VAR_NAME`.
The process.env object is a global Node object and its variables are passed as strings.
By convention, variable names are all capitalized, with words separated by an underscore.
The .env is a shell file. So you don't need to encapsulate names or values in quotes.
It is also important to note that there can be no space around the equals sign when you are assigning values to
your variables, such as VAR_NAME=value.
Typically, you will place each variable definition on a separate line.

Let's add an environment variable as a configuration option.

**Create a .env file in the root of your project directory and store the variable `MESSAGE_STYLE=uppercase` in it.**

Then, in the GET /json route handler that you created in the last challenge, access process.env.MESSAGE_STYLE and
transform the message of the response object into uppercase if the variable is equal to uppercase.

The response object must be {"message": "Hello json"} or {"message": "HELLO JSON"}, depending on the value of
MESSAGE_STYLE.
Note that you must read the value of process.env.MESSAGE_STYLE inside the route handler, not outside it, due to the
how our tests are run.

Note: If you are using Replit, you cannot create an .env file.
Instead, use the built-in SECRETS tab to add the variable.

If you are working locally, you will need the dotenv package.
It loads the environment variables from your .env file into process.env.
The dotenv package has already been installed and is in the project's package.json file.

**At the top of your myApp.js file, add `require('dotenv').config()` to load the variables from
environment.**

```
MESSAGE_STYLE=uppercase
```

```javascript
let dotenv = require('dotenv').config();

app.get("/json", function(req, resp){
     if(process.env.MESSAGE_STYLE=="uppercase"){
         res.json({"message": "HELLO JSON"});
     } else{
         res.json({"message": "Hello json"});
     }
});
```

Tests:
- The /json endpoint response must be changed according to the MESSAGE_STYLE environment variable


## Implement a request middleware at the root level
Previously, we introduced you to the `express.static()` middleware function.
Now it's time to see what middleware is, in more detail.

Middleware functions are functions that take 3 arguments: the request object, the response object, and the
next function in the application's request and response cycle.
These functions execute some code that may have side effects on the application.

Typically, they add information to the request or response objects.
They can also end the cycle by sending a response when some condition is met.
If they don't send the response when they're done, they start executing the next function on the stack.
This triggers the call of the third argument, `next()`.

Observe the example below:
```javascript
function(req, res, next) {
   console.log("I'm a middleware...");
   next();
}
```
Let's assume you set up this function in a route.
When a request matches the route, it displays the string "I'm a middleware…" and then executes the next function in the
battery.

In this exercise, you will create middleware at the root level.
As you saw in challenge 4, to set up a middleware function at the root level, you can use the method
`app.use(<mware-function>)`.
In this case, the function will run for all requests, but you can also define more specific conditions.
For example, if you want a function to only run for POST requests, you could use
`app.post(<mware-function>)`. There are analogous methods for all HTTP verbs (GET, DELETE, PUT, …).

**Create a simple logger.**
For each request, it must record a string in the console with the following format: method path - ip.
An example would look like this: GET /json - ::ffff:127.0.0.1.
Note that there is a space between method and path and that the dash separating path and ip is surrounded by a space between both
the sides.

You can get the request method (http verb), the relative route path and the IP of the caller to
from the request object using `req.method`, `req.path` and `req.ip`.
Remember to call `next()` when you're ready, or the server will hang forever.
Make sure the 'Logs' are open and see what happens when some requests come in.

Note: Express evaluates functions in the order they appear in the code.
This also applies to middleware.
If you want it to work for all routes, you need to mount it before them.

```javascript
app.use("/reg", function(req, res, next){
     console.log(req.method + " " + req.path + " - " + req.ip);
     next();
});
```

Tests:
- Root logger middleware must be active


## Chain middleware to create a time server
Middleware can be mounted to a specific route using `app.METHOD(path, middlewareFunction)`.
Middleware can also be chained to route definitions.

Observe the example below:
```javascript
app.get('/user', function(req, res, next) {
   req.user = getTheUserSync(); // Hypothetical synchronous operation
   next();
}, function(req, res) {
   res.send(req.user);
});
```

This method is useful for separating server operations into smaller chunks.
This provides a better application structure, as well as the ability to reuse code in different parts.
This method can also be used to perform some data validations.
At each point in the middleware stack, you can block execution of the current chain and pass control to functions
created specifically to manage errors.
You can also pass control to the next matching route to manage special cases.
We'll see how to do this in the advanced section of Express.

**In the `app.get('/now', ...)` route, chain a middleware function and the final handler.**
**In the middleware function, you must add the current time in the request object in the req.time key.**
You can use `new Date().toString()`.
In the manager, respond with a JSON object, taking the structure `{time: req.time}`.

Note: The test will not pass if you do not chain the middleware.
If you mount the function somewhere else, the test will fail, even if the end result is correct.

```javascript
app.get("/now", function(req, res, next){
     req.time = new Date().toString();
     next();
}, function(req, res){
     res.json({"time": req.time});
});
```

Tests:
- The endpoint (URL) /now must have the middleware mounted
- The /now endpoint must return the current time.


## Get routing parameter input from client
When building an API, we have to allow users to communicate to us what they want to get from our service.
For example, if the client is requesting information about a user stored in the database, it needs
a way to tell us which user they are interested in.

One possible way to achieve this result is by using routing parameters.
Routing parameters are named segments of the URL, delimited by forward slashes (/).
Each segment captures the value of the part of the URL that corresponds to its position.
The captured values can be found in the `req.params` object.
```
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```

Create an echo server, mounted on the `GET /:word/echo` route. Respond with a JSON document, taking the structure
`{echo: word}`. You can find the word to be repeated in `req.params.word`.
You can test your route through your browser's address bar by visiting some corresponding routes,
such as `your-app-rootpath/freecodecamp/echo`.

```javascript
app.post("/:word/echo", function(req, resp){
     const {word} = req.param.word;
     res.json({"echo": word});
});

```

Tests:
- Test 1: Echo server must repeat words correctly
- Test 2: Echo server must repeat words correctly


## Get input from client query parameter
Another common way to obtain input from the client is to encode the data after the route path, using a string of
Query.
The query string is delimited by a question mark (?) and includes field=value pairs.
Each pair is separated by an ampersand (&).
Express can parse the query string data and populate the `req.query` object.
Some characters, such as percentage (%), cannot be in URLs and must be encoded in a different format
before you send them.
If you use the JavaScript API, you can use specific methods to encode/decode these characters.
```
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```
**Make an endpoint API (URL), mounted on `GET /name`.**
Respond with a JSON document, taking the structure `{ name: 'firstname lastname'}`.

The first and last name parameters must be encoded in a query string, for example:
`?first=firstname&last=lastname`.

Note: In the following exercise, you will receive data from a POST request, in the same `/name` route path.
If you want, you can use the `app.route(path).get(handler).post(handler)` method.
This syntax allows you to chain different verb-type handlers together on the same route path.
You will save on typing and have cleaner code.

```javascript
app.get("/name", function(req, res){
     const {first: firstname, last: lastname} = req.query;
     const fullname = firstname + " " + lastname;
     res.json({ name: fullname});
});
```

## Use body-parser to parse POST requests
In addition to GET, there is another common HTTP verb, POST.
POST is the standard method used to submit client data with HTML forms.
In the REST convention, POST is used to send data to create new items in the database (a new user, or a
new blog post).
You don't have a database in this project, but you will learn how to handle POST requests anyway.

In this type of request, the data does not appear in the URL. They are hidden in the request body.
The body is a part of the HTTP request, also called payload.
Even though the data is not visible in the URL, that does not mean it is private.
To see why, see the raw content of an HTTP POST request:
```
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25
```
As you can see, the body is encoded as the query string.
This is the standard format used by HTML forms.
With Ajax, you can also use JSON to process data with a more complex structure.
There is also another type of encoding: multipart/form-data. This is used to send binary files.
In this exercise, you will use an encoded body of the URL.
To parse data coming from POST requests, you must install the body-parser package.
This package allows you to use a series of middleware, which can decode data into different formats.

`body-parser` is already installed and is in the project's package.json file.
Require at the top of the `myApp.js` file and store it in a variable called bodyParser.

The middleware for manipulating URL-encoded data is returned by `bodyParser.urlencoded({extended: false})`.
Pass the function returned by the previous method call to `app.use()`.
As always, the middleware must be mounted before all routes that depend on it.

Note: extended is a configuration option that tells body-parser that parsing needs to be used.
When `extended=false` it uses the classic coding library, querystring.
When `extended=true` it uses the qs library for analysis.

When using `extended=false`, values can only be strings or arrays.
The object returned when using querystring does not prototypically inherit from the standard JavaScript Object, which means that
functions like `hasOwnProperty` and `toString` will not be available.
The extended version allows more flexibility to the data, but is outperformed by JSON.

```javascript
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

Tests:
- The 'body-parser' middleware must be mounted


## Get data from POST requests
**Mount a POST handler in the path `/name`.**
It's the same path as before.
We prepare a form on the html home page.
It will send the same data as exercise 10 (query string).
If the body-parser is configured correctly, you should find the parameters of the req.body object.
Take a look at the usual library example:
```
route: POST '/library'
urlencoded_body: userId=546&bookId=6754
req.body: {userId: '546', bookId: '6754'}
```

**Respond with the same JSON object used before: {name: 'firstname lastname'}.**
Test that your endpoint (URL) works using the html form we provide on the app's home page.

Tip: There are several other http methods besides GET and POST.
By convention, there are correspondences between the http verb and the operation you are going to perform on the server.
The conventional mapping is:
- POST (sometimes PUT) – Creates a new resource using the information sent with the request,
- GET - Reads an existing resource without modifying it,
- PUT or PATCH (sometimes POST) – Updates a resource using the sent data,
- DELETE - Deletes a resource.

There are also some other methods that are used to establish a connection with the server.
With the exception of GET, all other methods listed above can have a payload.
(example: the data sent in the body of the request). The body-parser middleware also works with these methods.

```javascript
app.post("/name", function(req, res){
     const fullname = req.body.firstname + " " + req.body.lastname;
     res.json({ name: fullname});
});
```


## References
https://www.freecodecamp.org/portuguese/learn/back-end-development-and-apis/#basic-node-and-express
, accessed on 02/02/2023.

https://github.com/freeCodeCamp/boilerplate-express/ , accessed on 02/02/2023.