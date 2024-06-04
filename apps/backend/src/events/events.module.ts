import { Module } from '@nestjs/common';
import { EditTextGateway } from './edit-text/edit-text.gateway';

@Module({
    providers: [EditTextGateway]
})
export class EventsModule {}
