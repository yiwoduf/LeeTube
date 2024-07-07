# LeeTube: Full-Stack Video Sharing Service

### ACTIVE PROJECT: WORKING ON UPDATES

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

LeeTube is a full-stack video sharing platform created as a personal project to clone YouTube's core functionality. It utilizes modern web technologies and frameworks to provide a seamless video sharing experience.

## 🛠️ Built with

[![JavaScript][JavaScript]][JavaScript-url]
[![Express.js][Express.js]][Express-url]
[![MongoDB][MongoDB]][MongoDB-url]
[![Mongoose][Mongoose]][Mongoose-url]
[![Babel][Babel]][Babel-url]
[![Pug][Pug]][Pug-url]
[![Node.js][Node.js]][Node.js-url]
[![npm][npm]][npm-url]

## Features

- **User Authentication**: Secure user registration and login system using bcrypt for password hashing.
- **Video Upload and Sharing**: Users can upload and share their videos with the community.
- **Video Playback**: Smooth video playback functionality for uploaded content.
- **Database Integration**: Efficient data storage and retrieval using MongoDB and Mongoose.
- **Server-Side Rendering**: Utilizes Pug templating engine for efficient server-side rendering.

## Prerequisites

- Node.js (v14 or later recommended)
- MongoDB

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/LeeTube.git
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables: Create a .env file in the root directory and add the following:

```javascript
DB_URL = your_mongodb_connection_string;
COOKIE_SECRET = your_session_secret;
```

4. Run the development server:

```bash
npm run dev
```

The application should now be running on http://localhost:4000 (or your specified port).

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/yiwoduf/LeeTube.svg?style=for-the-badge
[contributors-url]: https://github.com/yiwoduf/LeeTube/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/yiwoduf/LeeTube.svg?style=for-the-badge
[forks-url]: https://github.com/yiwoduf/LeeTube/network/members
[stars-shield]: https://img.shields.io/github/stars/yiwoduf/LeeTube.svg?style=for-the-badge
[stars-url]: https://github.com/yiwoduf/LeeTube/stargazers
[issues-shield]: https://img.shields.io/github/issues/yiwoduf/LeeTube.svg?style=for-the-badge
[issues-url]: https://github.com/yiwoduf/LeeTube/issues
[license-shield]: https://img.shields.io/github/license/yiwoduf/LeeTube.svg?style=for-the-badge
[license-url]: https://github.com/yiwoduf/LeeTube/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/yiwoduf/
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Mongoose]: https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white
[Mongoose-url]: https://mongoosejs.com/
[Babel]: https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black
[Babel-url]: https://babeljs.io/
[Pug]: https://img.shields.io/badge/Pug-A86454?style=for-the-badge&logo=pug&logoColor=white
[Pug-url]: https://pugjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node.js-url]: https://nodejs.org/
[npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com/
