[![Build Status](https://travis-ci.org/ishoborabyose/MyDiary.svg?branch=develop)](https://travis-ci.org/ishoborabyose/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/ishoborabyose/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/ishoborabyose/MyDiary?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/9866de57cd49a0aca06f/maintainability)](https://codeclimate.com/github/ishoborabyose/MyDiary/maintainability)

# MyDiary

MyDiary is an online journal where users can pen down their thoughts and feelings.

# Gh-pages

https://ishoborabyose.github.io/MyDiary/

# Repo-link

https://github.com/ishoborabyose/MyDiary.git

# UI Tools

- HTML
- CSS
- Javascript

# API

- userRoute.post('/auth/signup', validate, signup);
- userRoute.post('/auth/signin',validate, signin);
- router.get('/entries',verifiedToken, getAllDiaries);
- router.get('/entries/:id', verifiedToken, getDiaryById);
- router.post('/entries', verifiedToken, validate, createEntry);
- router.delete('/entries/:id', verifiedToken, deleteEntries);
- router.patch('/entries/:id',verifiedToken, validate, modifyEntry );
