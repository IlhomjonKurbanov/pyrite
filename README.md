# pyrite
A web-based test engine for research on visual presentation factors in online
news articles. A slimmed-down version of this application was created to administer this experiment in a proctored setting: that code can be found at https://github.com/marijnburger/pyrite_proctored.

# local setup
1. Download repository & [install Node.js](https://nodejs.org/en/download/)
2. Install bower globally: `$ npm install -g bower`
3. `$ npm install` will install all necessary npm dependencies listed in `package.json`, followed by automatically installing all bower dependencies in `bower.json`
4. Initialize application: `$ sudo node server.js` (needs 'sudo' because it runs on port 80)
5. Visit application at `http://localhost/`

# EC2 setup
1. Download repository
2. Copy directory 'pyrite_prod' to EC2 Instance
3. Connect to EC2 instance via SSH
4. Install `npm`, `bower`, and `forever` locally
5. Navigate into `pyrite_prod/` and compile dependencies: `$ npm install`
6. Launch with `sudo forever start server.js`
7. Visit application at EC2 instance address
