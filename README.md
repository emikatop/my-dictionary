# My Dictionary

A minimalist vocabulary tracker for language learners who want one clean place 
to store words — without unnecessary features.

> Built for myself while learning German. Currently migrating from localStorage 
> to a full Node.js + SQLite backend.

## Features

- Add, edit, and delete words with translation and example sentence
- Dark / light theme toggle
- Data persistence via localStorage *(migration to SQLite in progress)*

## Planned

- SQLite database with Node.js + Express backend
- Word categories
- Sorting

## Tech Stack

**Frontend:** HTML, CSS, JavaScript (DOM manipulation)  
**Backend:** Node.js + Express *(in development)*  
**Database:** SQLite *(in development)*  

## Why SQLite?

Single-user app with no need for a separate database server — 
SQLite lives in one file and is ideal for this scale.

## Run Locally

```bash
git clone https://github.com/emikatop/my-dictionary.git
cd my-dictionary
open index.html
```

## What I'm Learning

This is my first backend project. I'm building a REST API from scratch — 
GET, POST, PUT, DELETE endpoints connected to a real database, 
replacing the current localStorage implementation.