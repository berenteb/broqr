import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import { User, UserInterface } from '../models/user'
import { Configuration } from '../utils/configuration'
import { HeaderAPIKeyStrategy } from 'passport-headerapikey'

if (!Configuration.JWT_SECRET) {
  console.error('JWT_SECRET nem létezik!')
  process.exit(1)
}

const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, (user as UserInterface)._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err: Error, user: UserInterface) => done(err, user))
})

passport.use(
  new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    User.findOne({ username: username.toLowerCase() }, (err: Error | string | undefined | null, user: UserInterface) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(undefined, false, {
          message: `Username ${username} not found.`
        })
      }
      user.comparePassword(password, (err: Error | string | undefined | null, isMatch: boolean) => {
        if (err) {
          return done(err)
        }
        if (isMatch) {
          return done(undefined, user)
        }
        return done(undefined, false, {
          message: 'Invalid username or password.'
        })
      })
    })
  })
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Configuration.JWT_SECRET
    },
    function (jwtToken, done) {
      User.findOne({ username: jwtToken.username }, function (err: Error | string | undefined | null, user: UserInterface) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          return done(undefined, user, jwtToken)
        } else {
          return done(undefined, false)
        }
      })
    }
  )
)

passport.use(
  new HeaderAPIKeyStrategy({ header: 'Authorization', prefix: 'Api-Key ' }, false, function (apiKey, done) {
    User.findOne({ apiKey: apiKey }, function (err: Error, user: UserInterface) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
)
