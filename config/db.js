const mongoose = require("mongoose");
require('dotenv').config();

try {

  console.log(process.env.DATABASE)
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    tls:true,
    tlsCAFile: `global-bundle.pem`,
    tlsAllowInvalidHostnames:true,
    tlsAllowInvalidCertificates:true
  });
  console.log("==============Mongodb Database Connected Successfully==============");
} catch (err) {
  console.log("Database Not Connected");
}
