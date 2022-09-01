const express = require("express");
const router = express.Router();

//require the addPage module from the views folder
const { addPage } = require("../views");
const { Page } = require("../models");

function generateSlug(title) {
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

// router.post("/", async (req, res, next) => {
//   // STUDENT ASSIGNMENT:
//   // add definitions for `title` and `content`

//   try {
//     const page = await Page.create({
//       title: req.body.title,
//       content: req.body.content,
//     });
//     // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
//     res.redirect("/");
//   } catch (error) {
//     next(error);
//   }
// });

// POST /wiki
router.post("/", async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    const page = await Page.create(req.body);
    await page.setAuthor(user);
    res.redirect("/wiki/" + page.slug);
  } catch (error) {
    next(error);
  }
});

// router.post("/", (req, res, next) => {
//   res.json(req.body);
//   //res.send("got to POST /wiki/");
// });

router.get("/add", (req, res) => {
  res.send(addPage());
});

module.exports = router;
