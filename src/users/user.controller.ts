import { Controller, Post, Body, Delete, Put, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<void> {
    await this.userService.create(user);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    return { token: await this.userService.login(user) };
  }

  @Get()
  async findAll(){
    return await this.userService.findAll();
  }

  @Get("/:id")
  async findById(@Param() id: string){
    return await this.userService.findById(id);
  }

  @Put("/:id")
  async updateById(@Body() updateUserDto: UpdateUserDto){
    return await this.userService.updateById(updateUserDto); 
  }

  @Delete("/:id")
  async deleteById(@Param() id: string){
    return await this.userService.deleteById(id);     
  }
}
