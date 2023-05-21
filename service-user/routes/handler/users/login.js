const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  // Schema ketentuan request
  const schema = {
    email: "email|empty:false",
    password: "string|min:6",
  };
  // Validasi request yang dikirim apakah sudah sesuai dengan schema
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }
  // Mencari user sesuai dengan request email
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }
  // Apabila user sudah ditemukan maka request email akan dibandingkan dengan password pada database
  const isValdPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValdPassword) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }
  // Response bila request email dan password sudah benar
  res.json({
    status: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      profession: user.profession,
    },
  });
};
