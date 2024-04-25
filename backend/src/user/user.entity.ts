import { genSalt, hash, compare } from 'bcrypt';
import { Entity } from '@app/core';
import {
  FullUser,
  MetroStation,
  UserLevel,
  UserRole,
  UserSex,
  WorkoutDuration,
  WorkoutType,
} from '@app/types';
import { SALT_ROUNDS } from './user.const';
import { FileEntity } from 'src/file-vault/file.entity';

export class UserEntity implements FullUser, Entity<string> {
  public id?: string;
  public name: string;
  public email: string;
  public avatar?: string | FileEntity | null;
  public dateOfBirth?: Date;
  public role: UserRole;
  public sex: UserSex;
  public description?: string;
  public location: MetroStation;
  public backgroundImage: string | FileEntity;
  public level: UserLevel;
  public workoutTypes: WorkoutType[];
  public isReady: boolean;
  public passwordHash?: string;
  public certificates?: string[] | FileEntity[];
  public achievements?: string;
  public caloriesToLose?: number;
  public caloriesPerDay?: number;
  public timeForWorkout?: WorkoutDuration;

  constructor(user: FullUser) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar:
        this.avatar instanceof FileEntity ? this.avatar.toPOJO() : this.avatar,
      dateOfBirth: this.dateOfBirth,
      role: this.role,
      sex: this.sex,
      description: this.description,
      location: this.location,
      backgroundImage:
        this.backgroundImage instanceof FileEntity
          ? this.backgroundImage.toPOJO()
          : this.backgroundImage,
      level: this.level,
      workoutTypes: this.workoutTypes,
      isReady: this.isReady,
      passwordHash: this.passwordHash,
      certificates:
        this.certificates && this.role === UserRole.Coach
          ? this.certificates.map((certificate) =>
              certificate instanceof FileEntity
                ? certificate.toPOJO()
                : certificate,
            )
          : undefined,
      achievements: this.achievements,
      caloriesToLose: this.caloriesToLose,
      caloriesPerDay: this.caloriesPerDay,
      timeForWorkout: this.timeForWorkout,
    };
  }

  public populate(data: FullUser): void {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.avatar =
      typeof data.avatar === 'object' && data.avatar
        ? FileEntity.fromObject(data.avatar)
        : data.avatar;
    this.dateOfBirth = data.dateOfBirth;
    this.role = data.role;
    this.sex = data.sex;
    this.description = data.description;
    this.location = data.location;
    this.backgroundImage =
      typeof data.backgroundImage === 'object'
        ? FileEntity.fromObject(data.backgroundImage)
        : data.backgroundImage;
    this.level = data.level;
    this.workoutTypes = data.workoutTypes;
    this.isReady = data.isReady;
    this.passwordHash = data.passwordHash;
    if (data.certificates) {
      this.certificates = data.certificates.map((certificate) =>
        typeof certificate === 'object'
          ? FileEntity.fromObject(certificate)
          : certificate,
      );
    }
    this.achievements = data.achievements;
    this.caloriesToLose = data.caloriesToLose;
    this.caloriesPerDay = data.caloriesPerDay;
    this.timeForWorkout = data.timeForWorkout;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash!);
  }

  static fromObject(data: FullUser): UserEntity {
    return new UserEntity(data);
  }
}
