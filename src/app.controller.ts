import { Controller, Get, HostParam, Ip, Req } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(@Ip() request: Request): string {
		console.log(request);
		return this.appService.getHello();
	}

	@Get('ab*cd')
	getTest(): string {
		return this.appService.getTest();
	}
}
