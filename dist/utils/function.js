"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectData = void 0;
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(item => [item, 1]));
};
exports.getSelectData = getSelectData;
//# sourceMappingURL=function.js.map