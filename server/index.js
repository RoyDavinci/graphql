const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2900;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
	"/graphql/:id",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

const main = async () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then(function () {
			console.log("Connected to mongoose");
			app.listen(PORT, function () {
				console.log(`App Listening in on http://localhost:${PORT}`);
			});
		})
		.catch((err) => console.error(err));
};

main();
