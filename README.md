# ENV366

## Building (Windows)
- Download and install NodeJS (v7.x): https://nodejs.org/en/download/current/
- Download and install git: https://git-scm.com/download/
- Downalod and install Ruby: http://rubyinstaller.org/downloads/
  - Check "Add Ruby executables to your PATH"
- Open Command Prompt as Administrator:
```
  npm install -g grunt-cli
  npm install -g serve
  gem install sass
```
- Open normal Command Prompt:
```
  cd %HOMEPATH%/Desktop
  git clone https://github.com/Zordon23/ENV366/
  cd ENV366
  npm install
  grunt
```
After following the steps above, simply run `grunt` in the repo's directory to build it.

After building, open a command prompt and run the following:
```
  cd %HOMEPATH%/Desktop/ENV366/build/www
  serve
```
A message will appear telling you that a web serve has been created on a certain port (usually 5000). Open the URL provided in your browser to preview the site.

The web server does not need to be restarted between builds.
