import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity'
import { EmailModule } from './email/email.module'
import { ConfigModule } from '@nestjs/config'
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'guang',
      database: 'email_login_test',
      synchronize: true,
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
    }),
    EmailModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
