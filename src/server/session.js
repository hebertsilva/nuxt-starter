import session from 'express-session'

export default session({
  name: 'spit-session',
  secret: 'spt7cipqwb0%s%ajk#bg96ht!6t=7y8^n%y8nno2gb45a8l5h&_j8',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000
  }
})
