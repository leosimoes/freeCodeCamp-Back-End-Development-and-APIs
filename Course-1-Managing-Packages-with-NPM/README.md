# freeCodeCamp - Managing Packages with NPM

npm (Node Package Manager) is a command-line tool for installing, creating and sharing packages
of JavaScript code written for Node.js. There are many open source packages available on npm.
So, before starting a project, explore the packages that already exist so that you can't recreate things from scratch
how to work with data or fetch data from an API.

In this course, you will learn the basics of using npm, including how to work with package.json and how
manage your installed dependencies.


## Using package.json, the heart of any Node.js project or npm package
The `package.json` file is the heart of any Node.js project or npm package.
It stores information about your project, similar to what the main section of an HTML document uses to
Describe the content of a web page.
It consists of a single JSON object, where information is stored in key-value pairs.
There are only two required fields: name and version.
However, it is good practice to provide additional information about your project that may be useful to future users.
or maintainers.

If you look at the project file tree, you will find the package.json file at the top level of the tree.
This is the file that you will improve in the next challenges.

One of the most common pieces of information in this file is the author field. Specify who created the project and may 
consist of a string or an object with contact or other details.
An object is recommended for larger projects, but a simple string like the example below will do the trick for this.
project. `"author": "Jane Doe",`

**Add your name as the project author in the package.json file.**

Note: Remember that you are writing JSON.
Therefore, all field names must use double quotation marks (") and be separated by a comma (,).
```json
{
    "name": "fcc-learn-npm-package-json",
    "version": "1.0.0",
    "author": "Leonardo Simões"
}
```

Tests:
- Package.json must have a valid “author” key


## Add a description to package.json
The next part of a good package.json file is the description field.
This is where you should put a short but informative description of the project.

If you plan to publish a package to npm, this is a string that should sell an idea to the user so they can decide 
whether you want to install the package or not. However, this is not the only use case for description.
It's a great way to summarize what a project does.
It is also important, in any Node.js project, to help other developers, future maintainers or even
your future I want to quickly understand the project.

Regardless of what you plan for your project, a description is definitely recommended.
Example: `"description": "A project that does something amazing",`

**Add a description to the project's package.json file.**

Note: Remember to use double quotes for field names (") and commas (,) to separate fields.
```json
{
    "description": "freeCodeCamp project - Package management with NPM"
}
```

Tests:
- Package.json must have a valid “description” key


## Add keywords to your package.json
The `keywords` field is where you can describe your project using related keywords.
Example: `"keywords": [ "descriptive", "related", "words" ]`,
As you can see, this field is structured as an array of sentences surrounded by double quotes.

**Add an array of suitable strings to the keywords field in your project's package.json file.**

One of the keywords should be "freecodecamp".
```json
{
   "keywords": ["freecodecamp", "nodejs", "npm"]
}
```

Tests:
- package.json must have a valid "keywords" key
- The "keywords" field must be an array
- The "keywords" field must include "freecodecamp"


## Add a license to package.json
The `license` field is where you tell users what they are allowed to do with your project.

Some common licenses for open source projects include MIT and BSD.
License information is not required.
Copyright laws in most countries will give you ownership of what you create by default.
However, it is always good practice to explicitly state what users can and cannot do.
Here is an example of the license field: `"license": "MIT",`

**Fill in the `license` field in your project's package.json file as you see fit.**
```json
{
   "license": "MIT"
}
```

Tests:
- The package.json must have a valid "license" key


## Add a version to package.json
One of the required fields in your package.json file is version.
This field describes the current version of your project.
Example: `"version": "1.2.0",`

**Add a version to the project's package.json file.**
```json
{
   "version": "1.0.0"
}
```

Tests:
- Package.json must have a valid "version" key


## Expand your project with external npm packages
One of the biggest reasons to use a package manager is its powerful dependency management.
Instead of having to manually ensure you have all the dependencies every time you set up a project in a new
computer, npm automatically installs everything for you.
But how can npm know exactly what your project needs?
Know the dependencies section of your package.json file.

In this section, packages that your project requires are stored using the following format:
```json
{
   "dependencies": {
     "package-name": "version",
     "express": "4.14.0"
   }
}
```

**Add version 1.1.0 of the @freecodecamp/example package to the dependencies field of the package.json.** file

Note: @freecodecamp/example is a fake package used as a learning tool.
```json
{
   "dependencies" : {
     "@freecodecamp/example": "1.1.0"
   }
}
```

Tests:
- "dependencies" must include "@freecodecamp/example".
- The version of "@freecodecamp/example" must be "1.1.0".


## Manage npm dependencies by understanding semantic versioning
The Versions of npm packages in the dependencies section of your package.json file follow what we call
Semantic Versioning (SemVer), an industry standard for software versioning, intended to facilitate
dependency management.

Libraries, frameworks, or other tools published to npm must use SemVer to clearly communicate what type
of changes projects can expect if they update.

Knowing SemVer can be useful when you develop software that uses external dependencies (something you do
often).
One day, your understanding of these numbers will prevent you from accidentally introducing changes that cause problems
in your project, without understanding why things that worked yesterday suddenly don't work today.

This is how Semantic Versioning works according to the official website: `"package": "MAJOR.MINOR.PATCH"`
- The MAJOR (major) version should increment when you make incompatible changes to the API.
- The MINOR (minor) version should increase when adding backwards compatible features.
- The PATCH version should increment when you make backwards compatible bug fixes.
  This means that PATCHes are bug fixes and MINORs add new features,
  but none of them break what worked before. Finally, MAJORs add changes that won't work with
  previous versions.

**In the dependencies section of the package.json file, change the version of @freecodecamp/example to match your
MAJOR 1 version, MINOR 2 version and PATCH 13 version.**
```json
{
   "version": "1.2.13"
}
```

Tests:
- "dependencies" must include "@freecodecamp/example".
- The version of "@freecodecamp/example" must be "1.2.13".


## Use the tilde to always use the latest patch version of a dependency
In the last challenge, you told npm to only include a specific version of a package.
This is a useful way to freeze your dependencies if you need to ensure that different parts of your project
remain compatible with each other.

But in most use cases, you don't want to miss bug fixes, as they usually include fixes
important security features and (hopefully) don't break anything in doing so.

To allow an npm dependency to update to the latest PATCH version, you can prefix the version of the
dependency on the tilde (~) character. Here is an example of how to allow upgrades to any 1.3.x version.
`"package": "~1.3.8"`

In the package.json file, the current rule for how npm can update @freecodecamp/example is to use a specific version
(1.2.13). But now, you want to allow the latest version of 1.2.x.

**Use the tilde (~) to prefix the version of @freecodecamp/example to the dependencies and allow npm to update the 
package for any new patch version.**

Note: The version numbers themselves should not be changed.

```json
{
   "version": "~1.2.13"
}
```

Tests
- "dependencies" must include "@freecodecamp/example".
- The version of "@freecodecamp/example" must match "~1.2.13".


## Use caret to use the latest minor version of a dependency
In the same way as the tilde, which we learned in the last challenge and which allows npm to install the latest PATCH 
of a dependency, the caret (^) allows npm to install future updates as well.
The difference is that caret will allow both MINOR updates and PATChes.

Your current version of @freecodecamp/example should be ~1.2.13, which will allow npm to install version 1.2.x later
recent.
If you used the caret (^) as a version prefix, npm would be allowed to update to any version
1.x.x.
```json
{
   "package": "^1.3.8"
}
```
This would allow upgrades to any 1.x.x version of the package.
**Use the caret (^) to prefix the version of @freecodecamp/example to your dependencies and allow npm to update
for any MINOR version.**

Note: The version numbers themselves should not be changed.

```json
{
   "version": "^1.2.13"
}
```

Tests:
- "dependencies" must include "@freecodecamp/example".
- The version of "@freecodecamp/example" must match "^1.x.x".


## Remove a package from its dependencies
You've now tested some ways to manage your project's dependencies using the dependencies section of the
package.json.
You've also included external packages, adding them to the archive and even telling npm what types of versions you want,
using special characters such as tilde or caret.

But what if you wanted to remove an external package that you no longer need? You may have already guessed: just
remove the key-value pair corresponding to this package from the dependencies.

This same method also applies to removing other fields in your package.json.

**Remove the @freecodecamp/example package from dependencies.**

Note: Make sure you have the right amount of commas after you remove it.

```json
{
   "dependencies" : {
   }
}
```

Tests:
- "dependencies" should not include "@freecodecamp/example".


## References
https://www.freecodecamp.org/learn/back-end-development-and-apis/#managing-packages-with-npm 
, accessed on 02/01/2023.

https://github.com/freeCodeCamp/boilerplate-npm/ , accessed on 02/01/2023.