"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const communication_service_1 = require("./communication.service");
const communication_controller_1 = require("./communication.controller");
const email_config_entity_1 = require("./entities/email-config.entity");
const sms_config_entity_1 = require("./entities/sms-config.entity");
const communication_log_entity_1 = require("./entities/communication-log.entity");
const payment_notification_entity_1 = require("./entities/payment-notification.entity");
let CommunicationModule = class CommunicationModule {
};
exports.CommunicationModule = CommunicationModule;
exports.CommunicationModule = CommunicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                email_config_entity_1.EmailConfig,
                sms_config_entity_1.SmsConfig,
                communication_log_entity_1.CommunicationLog,
                payment_notification_entity_1.PaymentNotification,
            ]),
        ],
        controllers: [communication_controller_1.CommunicationController],
        providers: [communication_service_1.CommunicationService],
        exports: [communication_service_1.CommunicationService, typeorm_1.TypeOrmModule],
    })
], CommunicationModule);
//# sourceMappingURL=communication.module.js.map