const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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
    clientID: "93407170622-6aj2r2k85m4td8hk2jf250h96tv0asac.apps.googleusercontent.com",
    clientSecret: "jayLRcvfHCrirMwbpuGrnDs4",
    callbackURL: 'http://localhost:3000/google/callback',
    scope: ['https://www.googleapis.com/auth/plus.me']
  }, function(accessToken, refreshToken, profile, done) {
    /*const socialId = profile.id;
    const nickname = profile.displayName;
    const profileImageUrl = profile.photos[0].value;*/
    done(null, profile);
  }));
};
