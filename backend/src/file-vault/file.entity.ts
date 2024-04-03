import { Entity } from '@app/core';
import { File } from '@app/types';

export class FileEntity implements File, Entity<string> {
  public id?: string;
  public originalName: string;
  public subDirectory: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;

  public toPOJO() {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      subDirectory: this.subDirectory,
    };
  }

  public populate(data: File): FileEntity {
    this.id = data.id;
    this.originalName = data.originalName;
    this.size = data.size;
    this.mimetype = data.mimetype;
    this.hashName = data.hashName;
    this.subDirectory = data.subDirectory;
    this.path = data.path;

    return this;
  }

  static fromObject(data: File): FileEntity {
    return new FileEntity().populate(data);
  }
}