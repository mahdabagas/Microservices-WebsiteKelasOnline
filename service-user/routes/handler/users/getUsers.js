const { User } = require("../../../models");

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || [];

  const sqlOption = {
    attributes: ["id", "name", "email", "role", "profession", "avatar"],
  };

  if (userIds.length) {
    sqlOption.where = {
      id: userIds,
    };
  }
  const users = await User.findAll(sqlOption);

  return res.json({
    status: "succes",
    data: users,
  });
};
