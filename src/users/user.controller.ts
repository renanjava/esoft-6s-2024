import { Controller, Post, Body, Delete, Get, Param, Patch } from '@nestjs/common';
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

  @Get(":id")
  async findById(@Param('id') id: string){
    return await this.userService.findById(id);
  }

  @Patch(":id")
  async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
    return await this.userService.updateById(id, updateUserDto); 
  }

  @Delete(":id")
  async deleteById(@Param('id') id: string){
    return await this.userService.deleteById(id);     
  }
}
