import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CatsModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3308,
      username:'user_crud',
      password:'root',
      database:'db_crud',
      autoLoadEntities:true,
      synchronize: true,

    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
