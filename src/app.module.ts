import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'mysql',
      port:3306,
      username:'user_crud',
      password:'root',
      database:'db_crud',
      autoLoadEntities:true,
      synchronize: true,

    }),
    BreedsModule,
    CatsModule,
    UsersModule,
    AuthModule, 

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
