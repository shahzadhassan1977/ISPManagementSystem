import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): {
        message: string;
    };
}
