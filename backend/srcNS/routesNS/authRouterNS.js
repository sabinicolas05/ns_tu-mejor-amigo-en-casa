import express from 'express';
import { loginUserNS } from"../controllersNS/authcontrollerNS.js";

export const authRouterNS = express.Router();
authRouterNS.post('/login',loginUserNS)