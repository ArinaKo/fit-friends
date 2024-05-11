export enum UserCardType {
  Default = 'user',
  Friend = 'friend',
}

type UserCardTypeDiff = {
  styleClass: string;
  hashtagsListClass: string;
  hashtagsItemsClass?: string;
};

type UserCardTypeDiffs = {
  [type: string]: UserCardTypeDiff;
};

export const UserCardTypeDiffs: UserCardTypeDiffs = {
  [UserCardType.Default]: {
    styleClass: 'thumbnail-user',
    hashtagsListClass: 'thumbnail-user__hashtags-list',
    hashtagsItemsClass: 'thumbnail-user__hashtags-item',
  },
  [UserCardType.Friend]: {
    styleClass: 'thumbnail-friend',
    hashtagsListClass: 'thumbnail-friend__training-types-list',
  },
};
