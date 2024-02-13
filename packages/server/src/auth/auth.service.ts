import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserSignupDto, UserLogInDto } from './dto/auth.dto';
import { AccessToken } from './model/auth.model';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService, private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async signUp(user: UserSignupDto): Promise<AccessToken> {
    try {
      const newUser = await this.userService.createUser(user);
      const payload = { id: newUser.id, role: newUser.role, type: 'access' };

      return {
        accessToken: this.jwtService.sign(payload, { expiresIn: this.configService.get('JWT_EXPIRATION') })
      };
    } catch (error) {
      return error;
    }
  }

  async logIn(user: UserLogInDto): Promise<AccessToken> {
    const validUser = await this.userService.validUserData(user.email, user.password);
    if (!validUser) {
      throw new UnauthorizedException('User email or password incorrect');
    }

    const payload = { id: validUser.id, role: validUser.role, type: 'access' };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: this.configService.get('JWT_EXPIRATION') })
    };
  }
}
