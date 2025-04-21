import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';
import { Auth } from './decorators/auth.decorator';


interface RequestWithUser extends Request{
    user:{
        email:string;
        role:string;
    }
}



@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,){}


    @Post('register')
    register(@Body() registerdto:RegisterDto){
    
        return this.authService.register(registerdto);
    }

    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth(Role.User)
    profileInfo(@Req() req: RequestWithUser){
      return this.authService.profile(req.user);
    }


    @Get('lol')
    @Auth(Role.Admin)
    profileInf(@Req() req: RequestWithUser){
      return this.authService.profile(req.user);
    }



}
