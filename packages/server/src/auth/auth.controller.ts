import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessToken } from './model/auth.model';
import { UserLogInDto, UserSignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() user: UserSignupDto): Promise<AccessToken> {
    return await this.authService.signUp(user);
  }

  @Post('/login')
  async logIn(@Body() user: UserLogInDto): Promise<AccessToken> {
    return await this.authService.logIn(user);
  }
}
