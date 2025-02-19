"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levels = void 0;
var client_1 = require("@prisma/client");
var extension_accelerate_1 = require("@prisma/extension-accelerate");
exports.levels = client_1.Level;
var prisma = new client_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
var globalForPrisma = global;
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
exports.default = prisma;
