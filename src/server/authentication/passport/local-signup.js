const PassportLocalStrategy = require('passport-local').Strategy;

const { addUser } = require('../../api/db/user/user.actions');

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    mustChangePassword: false
  };

  addUser(userData).then((user) => done(null, user)).catch(done);
});
