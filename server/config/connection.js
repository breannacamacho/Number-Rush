const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://breannacamacho1:<EiCi33daz2EsNt3y>@cluster0.fy7lz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || "mongodb://127.0.0.1:27017/number-rush",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
