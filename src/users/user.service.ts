import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { Token } from '@/auth/token';
import { LoginUserDto } from './dto/login-user.dto';
import UserAdapter from './user.adapter';
import { UserRepository } from './user.repository';
import bcrypt from "bcrypt";
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly adapter: UserAdapter,
    protected readonly token: Token,
  ) {}

  public async create(newUser: CreateUserDto): Promise<void> {
    const existsUser: User | null = await this.validateEmailOrUsername(newUser);

    if (existsUser) {
      throw new Error('Usuário já existe');
    }

    const createdUsuario = ({...newUser, password:`${bcrypt.hashSync(newUser.password, 10)}`})
    await this.userRepository.create(createdUsuario)
  }

  public async findAll(){
    return await this.userRepository.findAll()
  }

  public async findById(id: string){
    await this.userRepository.findById(id)
  }

  public async updateById(updateUsuarioDto: UpdateUserDto){
    await this.userRepository.updateById(updateUsuarioDto)
  }

  public async deleteById(id: string){
    await this.userRepository.deleteById(id)
  }

  public async login(loginUser: LoginUserDto): Promise<string> {
    const foundUser: User | null = await this.validateEmailOrUsername(
      loginUser as CreateUserDto,
    );

    if (!foundUser) {
      throw new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
    }

    const userIsValid: boolean | null = bcrypt.compareSync(loginUser.password, foundUser.password)

    if (!userIsValid) {
      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }

    return this.token.generateToken(foundUser);
  }

  private async validateEmailOrUsername(
    user: LoginUserDto,
  ): Promise<User | null> {
    return this.userRepository.findByEmailOrUsername(user.email, user.username);
  }
}
