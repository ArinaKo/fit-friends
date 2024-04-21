export type UserFiles = {
  avatar?: Blob;
};

export type CoachFiles = UserFiles & {
  certificates?: Blob[];
};
