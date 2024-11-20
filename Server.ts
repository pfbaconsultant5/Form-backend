import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import clientPackage from "./Controller/ClientPackageController";

const app = express();

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: false,
    })
);

app.use(bodyParser.json({ limit: "50mb" }));

app.use(cookieParser());

const corsOptions = {
    origin: "*",
    Credential: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/clientpackage", clientPackage);

const PORT = 9097;

app.listen(PORT, () => {
    console.log("clientpackage Service running on port 9097");
});