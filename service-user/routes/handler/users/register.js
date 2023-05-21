const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
// bcrypt untuk menghash password
// fstes-validator untuk membuat ketentuan dari request yang diterima

module.exports = async (req, res) => {
  // Schema Ketentuan dari request
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
  };

  // Validasi apakah request sesuai dengan schema
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }
  // Request sudah sesuai dengan schema
  // Mencari user pada database yang sesuai dengan request email
  const user = await User.findOne({
    where: { email: req.body.email },
  });
  // Apabila ada maka akan emnampilkan email already
  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email already exist",
    });
  }
  // Req email sudah tidak ada yang sama pada database
  // Req Password akan dihash
  const password = await bcrypt.hash(req.body.password, 10);

  // Req data akan ditambahkan pada database user
  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const createUser = await User.create(data);
  // Menampilkan keterangan bahwa user berhasil ditambahkan/register
  return res.json({
    status: "success",
    data: {
      id: createUser.id,
    },
  });
};
