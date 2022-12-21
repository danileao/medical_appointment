"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = exports.dateToString = exports.formatDateUTC = exports.formatDate = exports.getDayOfWeek = exports.compareEndTimeIsAfter = exports.formatDateHour = exports.validateTime = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
// Validar o horário de atendimento
// Validar se o horário de término é maior que horário de início
function validateTime(time) {
    // 99:99
    return (0, dayjs_1.default)(formatDateHour(time)).isValid();
}
exports.validateTime = validateTime;
function formatDateHour(time) {
    const date = (0, dayjs_1.default)().format('YYYY-MM-DD '); //2022-12-25
    const dateTimeFormat = new Date(`${date} ${time}`); // 2022-12-25 23:55
    return (0, dayjs_1.default)(dateTimeFormat);
}
exports.formatDateHour = formatDateHour;
function compareEndTimeIsAfter(startTime, endTime) {
    return formatDateHour(endTime).isAfter(formatDateHour(startTime));
}
exports.compareEndTimeIsAfter = compareEndTimeIsAfter;
function getDayOfWeek(date) {
    return (0, dayjs_1.default)(date).day();
}
exports.getDayOfWeek = getDayOfWeek;
function formatDate(date, format) {
    return (0, dayjs_1.default)(date).format(format);
}
exports.formatDate = formatDate;
function formatDateUTC(date, format) {
    return (0, dayjs_1.default)(date).utc().format(format);
}
exports.formatDateUTC = formatDateUTC;
function dateToString(date) {
    return (0, dayjs_1.default)(date).format('YYYY-MM-DD').toString();
}
exports.dateToString = dateToString;
function toDate(date) {
    return (0, dayjs_1.default)(date).toDate();
}
exports.toDate = toDate;
