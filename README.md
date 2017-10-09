# pyrite
A web-based test engine for research on visual presentation factors in online
news articles. A slimmed-down version of this application was created to administer this experiment in a proctored setting: that code can be found at https://github.com/marijnburger/pyrite_proctored.

# Local Setup
1. Download repository & [install Node.js](https://nodejs.org/en/download/)
2. Install bower globally: `$ npm install -g bower`
3. `$ npm install` will install all necessary npm dependencies listed in `package.json`, followed by automatically installing all bower dependencies in `bower.json`
4. Generate articles (see below)
5. Initialize application: `$ sudo node server.js` (needs 'sudo' because it runs on port 80)
6. Visit application in a web browser at `http://localhost/`

# EC2 Setup
1. Download repository
2. Copy directory `pyrite_prod` to EC2 Instance
3. Connect to EC2 instance via SSH
4. Install `npm`, `bower`, and `forever` locally
5. Navigate into `pyrite_prod/` and compile dependencies: `$ npm install`
6. Generate articles (see below)
7. Launch: `$ sudo forever start server.js`
8. Visit application in a web browser at EC2 instance address

# Generate Articles 
1. Navigate into directory `app/scripts/articleGenerator/`
2. Build directories: `$ node run.js buckets`
3. Generate articles: `$ node run.js all`
  * If any articles need to be redone, do so with `$ node run.js [article-id]` where `[article-id]` is the string of numbers and dashes at the end of the article's title, i.e. `article_[article-id].html`
4. Copy the newly created and filled directory `articles/` to `public/data/`
