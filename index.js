import express from 'express';
import bodyParser from 'body-parser';

import { createReadStream } from 'fs';
import crypto from 'crypto';
import http from 'http';
import m from 'mongoose'
import UserModel from './models/User.js'

import appSrc from './app.js';

const user = UserModel(m);
const app = appSrc(express, bodyParser, createReadStream, crypto, http, user);

app.listen(process.env.PORT);
