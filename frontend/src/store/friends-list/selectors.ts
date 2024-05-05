import { NameSpace } from '../../const';
import { Friend, State } from '../../types';

export const getFriendsList = (state: State): Friend[] =>
  state[NameSpace.FriendsList].friends;

export const isFriendsListLoading = (state: State): boolean =>
  state[NameSpace.FriendsList].isDataLoading;
