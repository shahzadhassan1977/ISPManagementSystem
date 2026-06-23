"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationController = void 0;
const common_1 = require("@nestjs/common");
const communication_service_1 = require("./communication.service");
const create_email_config_dto_1 = require("./dto/create-email-config.dto");
const update_email_config_dto_1 = require("./dto/update-email-config.dto");
const create_sms_config_dto_1 = require("./dto/create-sms-config.dto");
const update_sms_config_dto_1 = require("./dto/update-sms-config.dto");
const send_email_dto_1 = require("./dto/send-email.dto");
const send_sms_dto_1 = require("./dto/send-sms.dto");
let CommunicationController = class CommunicationController {
    service;
    constructor(service) {
        this.service = service;
    }
    createEmailConfig(dto) {
        return this.service.createEmailConfig(dto);
    }
    findEmailConfigs() {
        return this.service.findEmailConfigs();
    }
    findEmailConfig(id) {
        return this.service.findEmailConfig(+id);
    }
    updateEmailConfig(id, dto) {
        return this.service.updateEmailConfig(+id, dto);
    }
    removeEmailConfig(id) {
        return this.service.removeEmailConfig(+id);
    }
    createSmsConfig(dto) {
        return this.service.createSmsConfig(dto);
    }
    findSmsConfigs() {
        return this.service.findSmsConfigs();
    }
    findSmsConfig(id) {
        return this.service.findSmsConfig(+id);
    }
    updateSmsConfig(id, dto) {
        return this.service.updateSmsConfig(+id, dto);
    }
    removeSmsConfig(id) {
        return this.service.removeSmsConfig(+id);
    }
    sendEmail(dto) {
        return this.service.sendEmail(dto);
    }
    sendSms(dto) {
        return this.service.sendSms(dto);
    }
};
exports.CommunicationController = CommunicationController;
__decorate([
    (0, common_1.Post)('email-config'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_email_config_dto_1.CreateEmailConfigDto]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "createEmailConfig", null);
__decorate([
    (0, common_1.Get)('email-config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "findEmailConfigs", null);
__decorate([
    (0, common_1.Get)('email-config/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "findEmailConfig", null);
__decorate([
    (0, common_1.Put)('email-config/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_email_config_dto_1.UpdateEmailConfigDto]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "updateEmailConfig", null);
__decorate([
    (0, common_1.Delete)('email-config/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "removeEmailConfig", null);
__decorate([
    (0, common_1.Post)('sms-config'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sms_config_dto_1.CreateSmsConfigDto]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "createSmsConfig", null);
__decorate([
    (0, common_1.Get)('sms-config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "findSmsConfigs", null);
__decorate([
    (0, common_1.Get)('sms-config/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "findSmsConfig", null);
__decorate([
    (0, common_1.Put)('sms-config/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_sms_config_dto_1.UpdateSmsConfigDto]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "updateSmsConfig", null);
__decorate([
    (0, common_1.Delete)('sms-config/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "removeSmsConfig", null);
__decorate([
    (0, common_1.Post)('send-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_email_dto_1.SendEmailDto]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)('send-sms'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_sms_dto_1.SendSmsDto]),
    __metadata("design:returntype", void 0)
], CommunicationController.prototype, "sendSms", null);
exports.CommunicationController = CommunicationController = __decorate([
    (0, common_1.Controller)('communication'),
    __metadata("design:paramtypes", [communication_service_1.CommunicationService])
], CommunicationController);
//# sourceMappingURL=communication.controller.js.map