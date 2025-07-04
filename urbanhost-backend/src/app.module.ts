import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module'; // ✅ Corrigido: caminho sem "/jwt"
import { PropertyModule } from './property/property.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    UserModule,
    AuthModule,       // 🔥 Certifique-se de que seja o auth.module.ts correto
    PropertyModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
