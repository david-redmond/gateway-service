import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import authenticateToken from "./middleware/authenticateToken";
import getUserData from "./context/getUserData";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/api/cart", authenticateToken, async (req: any, res) => {
    try {
        const user = await getUserData(req.user._id);
        // if (!user) {
        //     console.error("Error GET / : user not found", req.params.userId);
        //     return res.status(404).send("Not Found");
        // }
        res.status(200).json({user, cart: []});
    } catch (error) {
        console.error(
            "Error GET / : Server Error",
            error.code,
            error.message,
            error.config,
        );
        res.status(500).send("Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
});
