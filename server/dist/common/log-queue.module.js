"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogQueueModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const log_processor_1 = require("./log.processor");
const log_service_1 = require("./services/log.service");
const typeorm_1 = require("@nestjs/typeorm");
const api_log_entity_1 = require("./entities/api-log.entity");
const change_log_entity_1 = require("./entities/change-log.entity");
let LogQueueModule = class LogQueueModule {
};
exports.LogQueueModule = LogQueueModule;
exports.LogQueueModule = LogQueueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({
                name: 'log-queue',
            }),
            typeorm_1.TypeOrmModule.forFeature([api_log_entity_1.ApiLog, change_log_entity_1.ChangeLog]),
        ],
        providers: [log_processor_1.LogProcessor, log_service_1.LogService],
        exports: [bullmq_1.BullModule],
    })
], LogQueueModule);
//# sourceMappingURL=log-queue.module.js.map