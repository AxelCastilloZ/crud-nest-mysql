import { BadRequestException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { hash } from 'crypto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/rol.enum';


@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly jwtService:JwtService
    ){}
    

    async register({name,email,password}: RegisterDto){
        const user= await this.usersService.findOneByEmail(email);

        if(user){
           throw new BadRequestException('ya existe un usuario con ese nombre');
        }
        await this.usersService.create({
        name,
        email,
        password: await bcryptjs.hash(password,10)
       });

       return{
        name,
        email
       }
        
    }

    async login({email,password}:LoginDto){
        const user= await this.usersService.findOneByEmail(email);

        if(!user){
            throw new UnauthorizedException('email not found');
        }
        const isPasswordValid=await bcryptjs.compare(password,user.password);

        if(!isPasswordValid){
        throw new UnauthorizedException('password is wrong');
        }

        const payload= {email: user.email,role:user.role}

        const token = await this.jwtService.signAsync(payload);


        return {
            token,
            email,
        };
    }

    async profile({ email }: { email: string }) {
        const user = await this.usersService.findOneByEmail(email);
      
        if (!user) {
          throw new UnauthorizedException('Usuario no encontrado');
        }
      
        const { password, ...safeUser } = user;
        return safeUser;
      }
      


}
