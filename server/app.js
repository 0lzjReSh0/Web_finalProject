var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
require("dotenv").config();
const expressJWT = require("express-jwt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const Comment = require("./comment");
const Post = require("./post");
var app = express();
const multer = require("multer");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/register', usersRouter);

app.use(
  expressJWT
    .expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
    .unless({
      path: [
        "/api/user/login",
        "/api/user/register",
        "/api/post",
        "/api/posts/comments",
      ],
    })
);
app.use("/users", passport.authenticate("jwt", { session: false }));
// var MongoClient = require('mongodb').MongoClient;

mongoose
  .connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Error connecting to database:", error));

mongoose.set("strictQuery", true);
const opt = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "default.png",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
//create the admin account
users.statics.createAdminUser = async function () {
  const existingAdmin = await this.findOne({
    email: "admin@163.com",
  });
  console.log(existingAdmin);
  if (existingAdmin) {
    return
  }
  const adminUser = new this({
    name: "admin",
    email: "admin@163.com",
    password: "Programmer!123",
  });
  await adminUser.save();

//   next();
}
//
const Users = mongoose.model("Users", users);


Users.createAdminUser();

// const adminUser = new Users({
//     name: "admin",
//     email: 'admin@163.com',
//     password: 'Programmer!123',
// });
// adminUser
//   .save()
//   .then((admin1) => {
//     console.log("Admin user saved:", admin1);
//   })
//   .catch((error) => {
//     console.error("Error saving admin user:", error);
//   });

var admin = 0;
app.post("/api/user/register/", upload.single("avatar"), (req, res) => {
  console.log(123455);
  // console.log(req.body.avatar);
  if (
    req.body.password.length < 8 ||
    !/[a-z]/.test(req.body.password) ||
    !/[A-Z]/.test(req.body.password) ||
    !/[0-9]/.test(req.body.password) ||
    !/[~`!\@\#\$\%\^\&\*\(\)-\_\+\=\{\}\[\]\|\;\:\"\<\>\,\.\/\?]/.test(
      req.body.password
    )
  ) {
    return res.status(400).json("Password is not strong enough");
  }
  console.log(11111111111111111);
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(403).json("Email already in use");
      }
      bcrypt
        .genSalt(10)
        .then((salt) => {
          bcrypt
            .hash(req.body.password, salt)
            .then((hashPass) => {
              const newUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: hashPass,
              });

              if (req.file && req.file.filename) {
                Users.avatar = req.file.filename;
              }
              newUser
                .save()
                .then((user) => {
                  return res.json({
                    success: true,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(500).json({ error: err });
                });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ error: err });
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});
// passport.use(new jwtStrategy(opt, (jwt_payload, done) => {
//     Users.findById(jwt_payload.id)
//         .then(user => {
//             if (user) {
//                 return done(null, user);
//             }
//             return done(null, false);
//         })
//         .catch(err => console.error(err));
// }));
const adminEmail = "admin@163.com";
const adminPassword = "Programmer!123";
// const adminUser = new Users({
//     name: "admin",
//     email: 'admin@163.com',
//     password: 'Programmer!123',
// });
// adminUser.save()
//     .then((admin1) => {
//         console.log('Admin user saved:', admin1);
//     })
//     .catch((error) => {
//         console.error('Error saving admin user:', error);
//     });
console.log(1123);

app.post("/api/user/login", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      console.log(1);
      if (!user) {
        return res.status(404).json({
          success: false,
          err: "User not found!",
        });
      }
      if (req.body.email !== "admin@163.com") {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            throw err;
          }
          if (!result) {
            return res.status(401).json({
              success: false,
              err: "Password is incorrect",
            });
          }
        });
      }
      const userPayload = {
        admin: "admin@163.com",
        adminToken: "Programmer!123",
        userId: user._id,
        email: user.email,
      };

      const secret = process.env.SECRET;
      const authToken = jwt.sign(userPayload, secret, {
        expiresIn: "500m",
      });
      //authorize the admin super account

      res.json({
        success: true,
        authToken: authToken,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        err: "Server error",
      });
    });

  if (
    req.body.password === "programmer!123" &&
    req.body.email === "admin@163.com"
  ) {
    admin = 1;
  }
});

//
//
app.get("/api/post", (req, res) => {
  try {
    console.log(123);
    const { page } = req.query;
    console.log(page);
    const limit = 10;
    const skip = (page - 1) * limit;

    // const posts = Post.find().sort('-createdAt').skip(skip).limit(limit);
    Post.find()
      .limit(limit)
      .skip(skip)
      .sort("-createdAt")
      .then((posts) => {
        // console.log(posts);
        res.json(posts);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for creating a new post
app.post("/api/posts/", (req, res) => {
  console.log(req.auth.email);
  console.log(req.auth.email);
  if (!req.auth.email) {
    return res.status(404).json("Unauthorized");
  }
  const { title, content, language } = req.body;
  console.log(req.body.language);
  new Post({
    title: title,
    content: content,
    language: language,
    email: req.auth.email,
    // userId: userId
  })
    .save()
    .then(() => {
      console.log("Saved successfully");
    })
    .catch((err) => {
      "Saved failed";
    });
});

// Route for getting comments for a specific post
app.post("/api/posts/comments", (req, res) => {
  console.log(111);

  const { postId } = req.body;
  console.log(postId);
  try {
    Comment.find({ postId })
      .sort("-createdAt")
      .then((comments) => {
        console.log(comments);
        console.log(1);
        res.json(comments);
      });
  } catch (err) {
    res.status(510).json({ message: err.message });
  }
});

// Route for creating a new comment for a specific post
app.post("/api/comments", (req, res) => {
  const { postId, content } = req.body;

  try {
    new Comment({
      postId: postId,
      content: content,
      email: req.auth.email,
    })
      .save()
      .then(() => {
        console.log("Saved comment successfully");
      })
      .catch((err) => {
        "Saved comment failed";
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an existing post by ID
app.get("/api/posts/:postId", async (req, res) => {
  console.log(req.auth.email);
  console.log(req.auth.admin);
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (req.auth.email === req.auth.admin) {
    console.log("Admin account logged in!");
    return res.json({ post });
  } else {
    if (post.email !== req.auth.email) {
      return res.status(403).json({ message: "Not authorized to update post" });
    }
    console.log(post);
    return res.json({ post });
  }
});
//change the post content
app.put("/api/posts/:postId", async (req, res) => {
  console.log(req.auth.email);
  console.log(req.auth.admin);
  console.log(admin);
  // if (req.auth.email === req.auth.admin) {
  //     admin = 1
  // }
  if (!req.auth.email) {
    return res.status(404).json("Unauthorized");
  }
  const { postId } = req.params;

  const { title, content } = req.body;

  if (req.auth.email === req.auth.admin) {
    console.log("Admin account logged in!");
    const post = await Post.findById(postId);
    post.title = title;
    post.content = content;
    post.updateAt = Date.now();

    await post.save();
    return res.json({ post });
  } else {
    try {
      const post = await Post.findById(postId);

      console.log(postId);
      if (!postId) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (post.email !== req.auth.email) {
        return res
          .status(403)
          .json({ message: "Not authorized to update post" });
      }
      console.log(post);
      post.title = title;
      post.content = content;
      post.updateAt = Date.now();

      await post.save();
      return res.json({ post });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
});

/**UPDATE the comment */
app.put("/api/:commentId", async (req, res) => {
  // if (req.body.password === "programmer!123" && req.body.email === "admin@163.com") {
  //     admin = 1
  // }
  if (!req.auth.email) {
    return res.status(404).json("Unauthorized");
  }
  const { commentId } = req.params;
  console.log(commentId);
  console.log(111333);
  const { content } = req.body;
  console.log(content);
  if (req.auth.email === req.auth.admin) {
    const comment = await Comment.findById(commentId);

    console.log(comment);

    comment.content = content;
    comment.updateAt = Date.now();

    await comment.save();
    return res.json({ message: "Success!" });
  } else {
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      if (comment.email !== req.auth.email) {
        return res
          .status(403)
          .json({ message: "Not authorized to update post" });
      }
      console.log(comment);

      comment.content = content;
      comment.updateAt = Date.now();
      // console.log(comment.updateAt);
      await comment.save();
      return res.json({ message: "Success!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
});
// DELETE a post by ID
app.delete("/api/posts/:postId", async (req, res) => {
  // console.log(req.user.id);

  const dpost = await Post.findById(req.params.postId);
  if (req.auth.email === req.auth.admin) {
    await dpost.deleteOne();
    return res.json({ message: "Post deleted" });
  } else {
    if (!dpost) {
      return res.json({ message: "Post not found" });
    }
    console.log(dpost.email);
    console.log(req.auth.email);
    if (dpost.email !== req.auth.email) {
      return res.json({ message: "Not authorized to delete post" });
    }

    await dpost.deleteOne();
    return res.json({ message: "Post deleted" });
  }
});

// Update an existing comment by ID
app.get("/api/:commentId", async (req, res) => {
  Comment.findById(req.params.commentId).then((comment) => {
    res.json(comment);
  });
});

/**DELETE the comment */

app.delete("/api/:commentId", async (req, res) => {
  // console.log(req.user.id);
  const dcomment = await Comment.findById(req.params.commentId);
  console.log(req.auth.email);
  console.log(req.auth.admin);
  console.log(admin);
  if (req.auth.email === req.auth.admin) {
    await dcomment.deleteOne();
    return res.json({ message: "Comment deleted" });
  } else {
    if (!dcomment) {
      return res.json({ message: "Comment not found" });
    }
    console.log(dcomment.email);
    console.log(req.auth.email);
    if (dcomment.email !== req.auth.email) {
      return res.json({ message: "Not authorized to delete Comment" });
    }

    await dcomment.deleteOne();
    return res.json({ message: "Comment deleted" });
  }
});

// POST route for voting on a post
app.post("/api/posts/postId/vote", async (req, res) => {
  console.log("aaaaa");
  const { postId } = req.body;
  const { userId } = req.auth;
  console.log(userId);
  // Check if user has already voted on this post
  const post = await Post.findById(postId);
  if (req.auth.email === req.auth.admin) {
    post.votes.push(userId);
    await post.save();
  } else {
    if (!post) {
      return res.json({ message: "Post not found" });
    }
    if (!userId) {
      return res.json({ message: "Not authorized to update post" });
    }
    if (post.votes.includes(userId)) {
      return res.json({ message: "User has already voted on this post" });
    }
    post.votes.push(userId);
    await post.save();
  }

  // return res.json(post);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
