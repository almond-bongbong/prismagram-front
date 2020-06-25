import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './localState';
const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : '';
};

export default new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
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
