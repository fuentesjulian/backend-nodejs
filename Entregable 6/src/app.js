// importo express
import express from "express";

// importo el cookie parser
import cookieParser from "cookie-parser";
// importo mongostore, session y passport
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

// importo handlebars
import handlebars from "express-handlebars";

// importo los routers
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import messagesRouter from "./routes/messages.router.js";
import usersRouter from "./routes/users.router.js";
import githubRouter from "./routes/github.router.js";
// declaro mi app
const app = express();

// agrego middlewares de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware para cookie parser
app.use(cookieParser("secret"));

// session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/ecommerce",
      mongoOptions: {
        useNewUrlParser: true,
      },
      ttl: 600,
    }),
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// setteo el engine
app.engine("handlebars", handlebars.engine());

// setteo rutas de archivos estaticos
app.use(express.static("public"));

//app.set("views", path.join(__dirname, "..", "/views"));
app.set("views", "views/");
app.set("view engine", "handlebars");

// defino las rutas
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", usersRouter);
app.use("/api/github", githubRouter);
app.use("/", viewsRouter);
// exporto la app
export default app;
