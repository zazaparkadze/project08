interface RolesList {
  root: number;
  admin: number;
  editor: number;
  user: number;
}
export const rolesList: RolesList = {
  root: 1969,
  admin: 5150,
  editor: 1984,
  user: 2001,
};

interface CustomerRoles extends RolesList {
  logged: boolean;
  tokens: number;
}

export const guestRoles: Partial<CustomerRoles> = {
  logged: true,
  user: 2001,
  tokens: 100,
};
