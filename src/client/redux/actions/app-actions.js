//  ACTION TYPES
export const APP_TYPES = {
  SAY_HI: 'SAY_HI',
  SAY_BYE: 'SAY_BYE'
};

// ACTION CREATORS
export const sayHiAC = () => ({
  type: APP_TYPES.SAY_HI
});

export const sayByeAC = () => ({
  type: APP_TYPES.SAY_BYE
});
