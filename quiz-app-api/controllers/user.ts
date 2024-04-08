import express, {Router} from "express";
import {getUser} from "../handlers/user";

export const router: Router = express.Router();

router.post('/', getUser);