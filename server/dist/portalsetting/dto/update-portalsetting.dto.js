"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePortalSettingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_portalsetting_dto_1 = require("./create-portalsetting,dto");
class UpdatePortalSettingDto extends (0, mapped_types_1.PartialType)(create_portalsetting_dto_1.CreatePortalSettingDto) {
}
exports.UpdatePortalSettingDto = UpdatePortalSettingDto;
//# sourceMappingURL=update-portalsetting.dto.js.map