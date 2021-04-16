const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const userRoutes = require('./routes/user.js');
const Admin_route = require('./routes/admin.js');
const Article_route = require('./routes/article.js');
const app = express();
const port = process.env.PORT || 3000;
require('./config/passport')(passport)
const dbUrl = "giveyoururl";
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', function(req, res) {
    res.render('landing');
});
app.get('/dashboard', function(req, res) {
    res.render('dash');
});
app.use(Article_route)
app.use('/users', userRoutes);
app.use('/admin', Admin_route)

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
