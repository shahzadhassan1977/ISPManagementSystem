import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class CreateExpenseDto {  
    
        @ApiProperty()
        title!: string;
    
        @ApiProperty()
        month!: string;
    
        @ApiProperty()
        year!: string;
    
        @ApiProperty()
        amount!: number;
    
        @ApiProperty()        
        expenseDate!: Date;
    
        @ApiProperty()
        description!: string;
    
        @ApiProperty()
        category!: string;
    
        @ApiProperty()
        paymentMethod!: string;
    
        @ApiProperty()
        isActive!: boolean;
            
        @ApiProperty()
        createdBy!: number;
        
        @ApiProperty()
        updatedBy!: number;

        @ApiProperty()
        createdAt!: string;

        @ApiProperty()
        updatedAt!: string;
        
        @ApiProperty()
        branchId!: number;
            
        @ApiProperty()
        vendorId!: number;
            
        @ApiProperty()
        employeeId!: number;
            
        @ApiProperty()
        invoiceNo!: string;
        
        @ApiProperty()
        attachment!: string;
        
        @ApiProperty()
        approvedBy!: number;
        
        @ApiProperty()
        status!: string;
}
