//  ACTION TYPES
export const PROFILE_TYPES = {
  CHANGE_AVATAR: 'CHANGE_AVATAR',
  CHANGE_WORK: 'CHANGE_WORK',
  CHANGE_LINKS: 'CHANGE_LINKS',
  CHANGE_DISCRIPTION: 'CHANGE_DISCRIPTION'
};

// ACTION CREATORS
export const cangeAvatar = () => ({
  type: PROFILE_TYPES.CHANGE_AVATAR
});

export const cangeWork = () => ({
  type: PROFILE_TYPES.CHANGE_WORK
});

export const cangeLinks = () => ({
  type: PROFILE_TYPES.CHANGE_LINKS
});

export const cangeDiscription = () => ({
  type: PROFILE_TYPES.CHANGE_DISCRIPTION
});
