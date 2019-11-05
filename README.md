[![Build Status](https://travis-ci.org/ishoborabyose/MyDiary.svg?branch=develop)](https://travis-ci.org/ishoborabyose/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/ishoborabyose/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/ishoborabyose/MyDiary?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/9866de57cd49a0aca06f/maintainability)](https://codeclimate.com/github/ishoborabyose/MyDiary/maintainability)

# MyDiary 

MyDiary is an online journal where users can pen down their thoughts and feelings.

# Getting Started

These instruction will lead you to the application  and running on your local computer for testing and development purposes. 

# BackEnd Tools

- server side framework: ```node js and express```
- Linting Library: ```ESLint```
- Testing Framework: ```mocha```
- TDD assertion library: ```CHAI```
- Database: ```postgressql``` 

# UI Tools

- HTML
- CSS
- Javascript


# Prerequisites

MyDiary is built in node js with ES6 format. to install node js you need 
``` download latest version of node js```

# run

To run this MyDiary in your local machine you need the foolowing

you will first need to clone the Repo in your local machine.

``` Run git clone https://github.com/ishoborabyose/MyDiary.git```

you will need to install all packages in your local machine
```Run npm install```

you will need to run 

```npm run dev```


# Running the tests
to test the API endpoint you will need to run:
```npm test```
# Heroku page
https://beatrice-mydiary.herokuapp.com/

# Gh-pages

https://ishoborabyose.github.io/MyDiary/

# Repo-link

https://github.com/ishoborabyose/MyDiary.git


# API
for getting data you will need to have a postman and paste the following routers and localhost as
```localhost:2000```

``` 
 post:/auth/signup
 post:/auth/signin
 get: /entries
 get: /entries/:id
 post: /entries
 delete: /entries/:id
 patch: /entries/:id'
 ```




