import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './localState';
const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

export default new ApolloClient({
  uri: 'http://localhost:4000',
  clientState: {
    defaults,
    resolvers,
  },
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: getToken(),
      },
    });
  },
  queryDeduplication: false,
});
