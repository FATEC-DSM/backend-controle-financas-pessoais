import { Application } from 'express'
import session from 'express-session'
// import { RedisStore } from 'connect-redis'
// import { createClient } from 'redis'

// const redisClient = createClient()

export function sessionInit(app: Application) {
  // redisClient.connect().catch(console.error)

  app.use(
    session({
      // store: new RedisStore({ client: redisClient, prefix: 'myapp:' }),
      secret: 'secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        // secure: true,
        // Enable only for HTTPS
        // httpOnly: true,
        // Prevent client-side access to cookies
        sameSite: 'strict',
        // Mitigate CSRF attacks
      },
    })
  )
}
