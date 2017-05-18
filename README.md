[![Build Status](https://travis-ci.org/andela-oolarewaju/news-flash.svg?branch=development)](https://travis-ci.org/andela-oolarewaju/news-flash)
[![Coverage Status](https://coveralls.io/repos/github/andela-oolarewaju/news-flash/badge.svg?branch=development)](https://coveralls.io/github/andela-oolarewaju/news-flash?branch=development)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Code Climate](https://codeclimate.com/github/andela-oolarewaju/news-flash//badges/gpa.svg)](https://codeclimate.com/github/andela-oolarewaju/news-flash/)

# Welcome

Welcome to News Flash! This project gives you access to high quality, cutting edge news from 
sources worldwide. It is also designed to be intuitive and easy to use, all with a 
great, responsive UI. To see a live version of this project, please visit [this link](https://newsapi-cp1.herokuapp.com/).


## Table of Contents

  1. [Tech stack](#tech-stack)
  1. [Installation and setup](#installation-and-setup)
  1. [Limitations](#limitations)
  1. [How to Contribute](#how-to-contribute)
  1. [FAQ](#faq)
  1. [License](#license)


## Tech stack

This project uses a host of modern technologies. The core ones are: 
- ECMAScript 6: Also known as ES2015, this is the newest version of Javascript with 
next-generation features like arrow functions, generators, enhanced object literals, 
spread operators and more. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.

- [NodeJS](https://nodejs.org): NodeJS is a server-side JavaScript runtime engine built 
on Chrome's V8 JavaScript engine. It is lightweight, efficient and greatly used in building 
web apps. Please visit [this link](https://nodejs.org) for more details.

- [React](https://facebook.github.io/react/) and [ReactDOM](https://facebook.github.io/react/docs/react-dom.html): 
These were developed by Facebook and are used for building web pages that are structured as a collection of 
components. These components are kept as independent as possible. See [this link](https://facebook.github.io/react/).

- [The Flux architecture](https://facebook.github.io/flux/): This is a design architecture for building stable 
web apps with, among other things, a unidirectional flow of data. See [this link](https://facebook.github.io/flux/) 
for details.

- [Firebase](https://firebase.google.com/): This project makes use of various components of 
[the Firebase suite](https://firebase.google.com/), including Firebase Authentication.


## Installation and setup

Here are the steps you need to follow to run this project on your computer:
- **Install NodeJS**: You may visit [this link](https://nodejs.org/en/download/) for complete 
instructions on installing NodeJS on your computer.

- **Open a terminal/command prompt** on your computer and `cd` into your preferred path/location.

- **Clone this repo**: Enter this command in the terminal:

```bash
git clone git@github.com:andela-oolarewaju/news-flash.git
```

- **Install dependencies**: Do so by running the following command:

```bash
npm install
```
Note: `npm` is a component of NodeJS that serves as its package manager. So, it comes along with installing NodeJS.

- **Create a Firebase project**: This project uses [Firebase Authentication Admin SDK](https://firebase.google.com/docs/auth/admin/) on the server for user authentication, so you'll need to create a 
Firebase project. Please visit [this link](https://firebase.google.com/docs/web/setup) for instructions on creating 
a Firebase project. You will need your firebase config details to run the application locally.

- **Configure the project with your firebase config details**: In the root of this project, create a .env file. Then add config details as follows:

```bash
REACT_APP_API_KEY="your-firebase-api-key"
REACT_APP_AUTH_DOMAIN="your-firebase-auth-domain-here"
REACT_APP_DATABASE_URL="your-firebase-database-url-here"
REACT_APP_PROJECT_ID="your-firebase-projectID-here"
REACT_APP_STORAGE_BUCKET="your-firebase-storage-bucket-here"
REACT_APP_MESSAGING_SENDER_ID="your-firebase-messaging-senderID-here"
```

- **Get a NewsAPI key**: You will need to get an api key from [newsap.org](https://newsapi.org). Then append .env file with oyur api key as follows:

```bash
REACT_APP_NEWS_API_KEY="your-newsapi-key-here"
```

- **Run the project**: This will run the project on your computer so that you can browse it yourself. In the 
terminal/command prompt, enter the following command:

```bash
npm start
```

- **Open a web browser of your choice and visit `http://localhost:3000` if it doesn't open up on your default browser automatically. Voila! It's alive!**


## Limitations

This project has some limitations. The most notable ones are:
- You cannot share multiple articles at once. So, if you see a couple of news articles that 
you would love to share to your followers on Twitter,  you have to do that one article 
at a time.
- You can only read ten (10) articles at a time, and no more i.e pagination is not possible. This 
limitation comes from our central news source, [NewsAPI](https://newsapi.org).


## How to Contribute

Do you want to contribute to this project? We would love for you to do so! The steps involved are:
- fork this repo.
- create a branch using [this format](https://github.com/andela-oolarewaju/news-flash/wiki/Branch-naming-convention).
- make the changes you want and commit them with concise, descriptive commit messages.
- submit a pull request that follows [this format](https://github.com/andela-oolarewaju/news-flash/wiki/Pull-request-naming-and-description).

That's all and thanks a lot for helping out!


## FAQ

- **What if I want to use another port?**

That's easy. In the root of the project. create a file named `.env` and add the following line to it:

```bash
REACT_APP_PORT=<your_desired_port>
```

where <your\_desired\_port> is the port you want to use. So, if you want to use port `8080`, you will write:

```bash
REACT_APP_PORT=8080
```


## License

This project is authored by [Olarewaju Opeyemi](https://google.com/search?q=Opeyemi+Olarewaju) and is licensed 
for your use, modification and distribution under [the MIT license](https://en.wikipedia.org/wiki/MIT_License). 
Feel free to hack, extend and share it!
