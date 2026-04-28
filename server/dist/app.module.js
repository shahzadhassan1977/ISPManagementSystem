"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const auth_module_1 = require("./auth/auth.module");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const api_log_entity_1 = require("./common/entities/api-log.entity");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const log_service_1 = require("./common/services/log.service");
const bullmq_1 = require("@nestjs/bullmq");
const log_queue_module_1 = require("./common/log-queue.module");
const area_controller_1 = require("./area/area.controller");
const area_module_1 = require("./area/area.module");
const company_controller_1 = require("./company/company.controller");
const company_module_1 = require("./company/company.module");
const payment_service_1 = require("./payment/payment.service");
const payment_module_1 = require("./payment/payment.module");
const payment_controller_1 = require("./payment/payment.controller");
const product_controller_1 = require("./product/product.controller");
const product_module_1 = require("./product/product.module");
const subscription_module_1 = require("./subscription/subscription.module");
const subscription_controller_1 = require("./subscription/subscription.controller");
const productdetail_module_1 = require("./productdetail/productdetail.module");
const subarea_module_1 = require("./subarea/subarea.module");
const subarea_controller_1 = require("./subarea/subarea.controller");
const subarea_service_1 = require("./subarea/subarea.service");
const productdetail_service_1 = require("./productdetail/productdetail.service");
const subscriptiondetail_service_1 = require("./subscriptiondetail/subscriptiondetail.service");
const productdetail_controller_1 = require("./productdetail/productdetail.controller");
const employeesubarea_module_1 = require("./employeesubarea/employeesubarea.module");
const employeesubarea_controller_1 = require("./employeesubarea/employeesubarea.controller");
const employeesubarea_service_1 = require("./employeesubarea/employeesubarea.service");
const area_service_1 = require("./area/area.service");
const employee_service_1 = require("./employee/employee.service");
const employee_controller_1 = require("./employee/employee.controller");
const employee_module_1 = require("./employee/employee.module");
const company_service_1 = require("./company/company.service");
const customer_module_1 = require("./customer/customer.module");
const customer_controller_1 = require("./customer/customer.controller");
const customer_service_1 = require("./customer/customer.service");
const product_service_1 = require("./product/product.service");
const subscription_service_1 = require("./subscription/subscription.service");
const subscriptiondetail_module_1 = require("./subscriptiondetail/subscriptiondetail.module");
const subscriptiondetail_controller_1 = require("./subscriptiondetail/subscriptiondetail.controller");
const usersetting_controller_1 = require("./usersetting/usersetting.controller");
const usersetting_module_1 = require("./usersetting/usersetting.module");
const portalsetting_controller_1 = require("./portalsetting/portalsetting.controller");
const portalsetting_module_1 = require("./portalsetting/portalsetting.module");
const change_log_entity_1 = require("./common/entities/change-log.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([api_log_entity_1.ApiLog]),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: 'localhost',
                    port: 6379,
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
                entities: [api_log_entity_1.ApiLog, change_log_entity_1.ChangeLog],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            log_queue_module_1.LogQueueModule,
            area_module_1.AreaModule,
            subarea_module_1.SubareaModule,
            company_module_1.CompanyModule,
            employee_module_1.EmployeeModule,
            customer_module_1.CustomerModule,
            product_module_1.ProductModule,
            productdetail_module_1.ProductdetailModule,
            subscription_module_1.SubscriptionModule,
            subscriptiondetail_module_1.SubscriptiondetailModule,
            payment_module_1.PaymentModule,
            employeesubarea_module_1.EmployeeSubareaModule,
            usersetting_module_1.UsersettingModule,
            portalsetting_module_1.PortalsettingModule
        ],
        controllers: [
            app_controller_1.AppController,
            user_controller_1.UserController,
            auth_controller_1.AuthController,
            area_controller_1.AreaController,
            subarea_controller_1.SubareaController,
            company_controller_1.CompanyController,
            employee_controller_1.EmployeeController,
            customer_controller_1.CustomerController,
            product_controller_1.ProductController,
            subscription_controller_1.SubscriptionController,
            subscriptiondetail_controller_1.SubscriptiondetailController,
            payment_controller_1.PaymentController,
            productdetail_controller_1.ProductdetailController,
            employeesubarea_controller_1.EmployeeSubareaController,
            usersetting_controller_1.UsersettingController,
            portalsetting_controller_1.PortalsettingController
        ],
        providers: [
            app_service_1.AppService,
            user_service_1.UserService,
            auth_service_1.AuthService,
            log_service_1.LogService,
            {
                provide: 'APP_INTERCEPTOR',
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            area_service_1.AreaService,
            subarea_service_1.SubareaService,
            employee_service_1.EmployeeService,
            company_service_1.CompanyService,
            customer_service_1.CustomerService,
            payment_service_1.PaymentService,
            product_service_1.ProductService,
            productdetail_service_1.ProductdetailService,
            subscription_service_1.SubscriptionService,
            subscriptiondetail_service_1.SubscriptiondetailService,
            employeesubarea_service_1.EmployeeSubareaService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map