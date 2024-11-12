const Roles = require("../models/roles");
const Users = require("../models/users");
const bcrypt = require("bcrypt");


const dummyData = async () => {
    const roleCount = await Roles.count();
    if (roleCount === 0) {
        const roles = await Roles.bulkCreate([
            { name: "Admin" },
            { name: "Personel" },
        ]);
        const usersCount = await Users.count();
        if (usersCount === 0) {
            const users = await Users.bulkCreate([
                {name: "Erim", surname: "Bilek", email: "erimbilek26@gmail.com", password: await bcrypt.hash("123456", 10),roleId:1},
            ]);
        }
    }
};

module.exports = dummyData;