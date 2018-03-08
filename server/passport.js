const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, id, password, done) {
    if (id === 'admin' && password === '12341234') {
      return done(null, {
        'user_id': id,
      });
    } else {
      return done(false, null)
    }
  }))

  /*
  passport.use(new FacebookStrategy({
      clientID: "",
      clientSecret: "",
      profileFields: ['id', 'displayName', 'photos'],
      callbackURL: 'http://localhost:3000/facebook/callback'
    },

    function(accessToken, refreshToken, profile, done) {
      const socialId = profile.id;
      const nickname = profile.displayName;
      const profileImageUrl = profile.photos[0].value;

      onLoginSuccess('Facebook', socialId, nickname, profileImageUrl, done);
    }
  ));

  passport.use(new GithubStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: 'http://localhost:3000/github/callback'
  }, function(accessToken, refreshToken, profile, done) {
    const socialId = profile.id;
    const nickname = profile.username;
    const profileImageUrl = profile.photos[0].value;

    onLoginSuccess('Github', socialId, nickname, profileImageUrl, done);
  }));*/

  passport.use(new GoogleStrategy({
    callbackURL: '/google/callback',
    clientID: '453032720086-b9u2mqngtc3drsdf82t858tts38orf9a.apps.googleusercontent.com',
    clientSecret: 'pPARlB0EPucZvbxuZBlIznEk'
  }, () => {

  }))
}
