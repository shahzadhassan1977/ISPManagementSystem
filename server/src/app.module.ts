import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ApiLog } from './common/entities/api-log.entity';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LogService } from './common/services/log.service';
import { BullModule } from '@nestjs/bullmq';
import { LogQueueModule } from './common/log-queue.module';
import { AreaController } from './area/area.controller';
import { AreaModule } from './area/area.module';
import { CompanyController } from './company/company.controller';
import { CompanyModule } from './company/company.module';
import { PaymentService } from './payment/payment.service';
import { PaymentModule } from './payment/payment.module';
import { PaymentController } from './payment/payment.controller';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionController } from './subscription/subscription.controller';
import { ProductdetailModule } from './productdetail/productdetail.module';
import { SubareaModule } from './subarea/subarea.module';
import { SubareaController } from './subarea/subarea.controller';
import { SubareaService } from './subarea/subarea.service';
import { ProductdetailService } from './productdetail/productdetail.service';
import { SubscriptiondetailService } from './subscriptiondetail/subscriptiondetail.service';
import { ProductdetailController } from './productdetail/productdetail.controller';
import { EmployeeSubareaModule } from './employeesubarea/employeesubarea.module';
import { EmployeeSubareaController } from './employeesubarea/employeesubarea.controller';
import { EmployeeSubareaService } from './employeesubarea/employeesubarea.service';
import { AreaService } from './area/area.service';
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';
import { CompanyService } from './company/company.service';
import { CustomerModule } from './customer/customer.module';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { ProductService } from './product/product.service';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptiondetailModule } from './subscriptiondetail/subscriptiondetail.module';
import { SubscriptiondetailController } from './subscriptiondetail/subscriptiondetail.controller';
import { UsersettingController } from './usersetting/usersetting.controller';
import { UsersettingModule } from './usersetting/usersetting.module';
import { PortalsettingController } from './portalsetting/portalsetting.controller';
import { PortalsettingModule } from './portalsetting/portalsetting.module';
import { CommunicationModule } from './communication/communication.module';
import { ChangeLog } from './common/entities/change-log.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([ApiLog]),
    ConfigModule.forRoot({ isGlobal:true}),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // dev only
      entities: [ApiLog, ChangeLog],
    }),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    LogQueueModule,
    AreaModule,
    SubareaModule,
    CompanyModule,
    EmployeeModule, 
    CustomerModule,   
    ProductModule,
    ProductdetailModule,    
    SubscriptionModule,
    SubscriptiondetailModule,
    PaymentModule,
    CommunicationModule,
    EmployeeSubareaModule,
    UsersettingModule,
    PortalsettingModule
    ],
  controllers: [
    AppController,
    UserController,
    AuthController, 
    AreaController,
    SubareaController, 
    CompanyController, 
    EmployeeController,
    CustomerController, 
    ProductController,    
    SubscriptionController,
    SubscriptiondetailController,
    PaymentController,
    ProductdetailController,
    EmployeeSubareaController,
    UsersettingController,
    PortalsettingController
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    LogService,
    {
    provide: 'APP_INTERCEPTOR',
    useClass: LoggingInterceptor,
    },
    AreaService,
    SubareaService,
    EmployeeService,
    CompanyService,
    CustomerService,
    PaymentService,
    ProductService,
    ProductdetailService,
    SubscriptionService,
    SubscriptiondetailService,
    EmployeeSubareaService
  ],
})
export class AppModule {}
