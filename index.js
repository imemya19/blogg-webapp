
const express = require('express');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//****** */
const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');


const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const app = express();


//for views and all
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    prefix: '/css',
    outputStyle: 'extended',
}));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.use(express.static('assets'));
///////make the uploads parts available to the brpwser
app.use('/uploads', express.static('./uploads'));
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use(express.urlencoded()); //to extract data from form and add it to req.body

app.use(session({
    name: 'practicesetup-session',
    secret: 'blahhsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
            mongoUrl: 'mongodb://localhost/fileupload',
            mongooseConnection: db,
            autoRemove: 'disabled',
        },
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//keep at last
app.use('/', require('./routes/'));

app.listen(port, function(err) {
    if (err) {
        console.log('error in running server', err);
        return;
    }

    console.log('SERVER IS running on port', port);
});