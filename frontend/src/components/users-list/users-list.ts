import { UserCardType } from '../user-card/user-card';

export enum UsersListType {
  UsersCatalog = 'users-catalog',
  FriendsList = 'friends-list',
}

type UsersListTypeDiff = {
  styleClass: string;
  cardType: UserCardType;
};

type UsersListTypeDiffs = {
  [type: string]: UsersListTypeDiff;
};

export const UsersListTypeDiffs: UsersListTypeDiffs = {
  [UsersListType.UsersCatalog]: {
    styleClass: 'users-catalog',
    cardType: UserCardType.Default,
  },
  [UsersListType.FriendsList]: {
    styleClass: 'friends-list',
    cardType: UserCardType.Friend,
  },
};
