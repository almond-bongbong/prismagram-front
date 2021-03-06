export const defaults = {
  isLoggedIn: !!localStorage.getItem('token'),
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem('token', token);
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });

      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem('token');
      cache.writeData({
        data: {
          isLoggedIn: false,
        },
      });
      window.location = '/';

      return null;
    },
  },
};
