import express from 'express';
import session from 'express-session';
import passport from './passport-config'; 
import authRoutes from './routes/auth.routes'; 

const app = express();

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes); 

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
