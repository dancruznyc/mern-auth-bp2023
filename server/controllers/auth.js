const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Basic Signup
// exports.signup = (req, res) => {
//   //console.log("req body on signup", req.body);
//   const { name, email, password } = req.body;

//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({ error: "Email is taken" });
//     }
//   });

//   let newUser = new User({ name, email, password });
//   newUser.save((err, success) => {
//     if (err) {
//       console.log("Signup error", err);
//       return res.status(400).json({ error: err });
//     } else {
//       res.json({
//         message: "Signup success! Please signin",
//       });
//     }
//   });
// };

// Signup with Confirmation email
exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activiation link`,
      html: `
      <h1>Please use the following link to activate your account</h1>
      <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
      <hr/>
      <p>This email may contain sensitive information</p>
      <p>${process.env.CLIENT_URL}</p>
      `,
    };
    sgMail
      .send(emailData)
      .then((sent) => {
        // console.log("sign up email sent", sent);
        return res.json({
          message: `Email has been sent to ${email}. Follow the instructions to activate your account.`,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          message: err.message,
        });
      });
  });
};

// account activation
exports.accountActivation = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log("jwt verify in account act error", err);
        return res.status(401).json({ error: "Expired Link. Signup again." });
      }
      const { name, email, password } = jwt.decode(token);
      const user = new User({ name, email, password });

      user.save((err, user) => {
        if (err) {
          console.log("save user in acct activ error", err);
          return res
            .status(401)
            .json({ error: "Error saving user in DB. Try signup again." });
        }
        return res.json({ message: "Signup Successful!. Please sign in." });
      });
    });
  } else {
    return res.json({ message: "Somthing went wrong. Try again!" });
  }
};

// sign in
exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check if the user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USer with that email does not exist. Please sign up.",
      });
    }
    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email or password is incorrect.",
      });
    }
    // generate token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};
