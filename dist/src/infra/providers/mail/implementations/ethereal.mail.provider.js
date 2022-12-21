"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherealMailProvider = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EtherealMailProvider {
    constructor() {
        nodemailer_1.default
            .createTestAccount()
            .then(() => {
            const transporter = nodemailer_1.default.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'brittany.sauer83@ethereal.email',
                    pass: 'r8WaVpgHGW1tfFkqQC',
                },
            });
            this.client = transporter;
        })
            .catch((err) => console.log(err));
    }
    sendMail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultMail = yield this.client.sendMail({
                to: data.to,
                from: data.from,
                subject: data.subject,
                text: data.text,
                html: data.html,
            });
            console.log('Message sent: %s', resultMail.messageId);
            console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(resultMail));
        });
    }
}
exports.EtherealMailProvider = EtherealMailProvider;
