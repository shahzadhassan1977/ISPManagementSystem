"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSmsConfigDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sms_config_dto_1 = require("./create-sms-config.dto");
class UpdateSmsConfigDto extends (0, mapped_types_1.PartialType)(create_sms_config_dto_1.CreateSmsConfigDto) {
}
exports.UpdateSmsConfigDto = UpdateSmsConfigDto;
//# sourceMappingURL=update-sms-config.dto.js.map