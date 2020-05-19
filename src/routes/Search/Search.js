import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import styled from 'styled-components';
import FatText from '../../components/form/FatText';
import { useQuery } from 'react-apollo-hooks';
import { SEARCH_QUERY } from './SearchQueries';
import Loader from '../../components/common/Loader';
import UserCard from '../../components/search/UserCard';
import defaultAvatar from '../../images/common/default-avatar.jpg';

const Container = styled.div`
  height: 50vh;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

function Search() {
  const location = useLocation();
  const { q } = qs.parse(location.search);
  const { data, loading } = useQuery(SEARCH_QUERY, { skip: !q, variables: { term: q } });

  console.log(data);

  return (
    <Container>
      <Section>
        {data?.searchUser.length === 0 ? (
          <FatText text="No Users Found" />
        ) : (
          data?.searchUser.map((user) => (
            <UserCard
              key={user.id}
              username={user.username}
              isFollowing={user.isFollowing}
              url={user.avatar || defaultAvatar}
              isSelf={user.isSelf}
            />
          ))
        )}
      </Section>
      <Section>
        {data?.searchPost.length === 0 ? (
          <FatText text="No Posts Found" />
        ) : (
          data?.searchPost.map((post) => null)
        )}
      </Section>

      {!q && <FatText text="Search for something" />}
      {loading && <Loader />}
    </Container>
  );
}

export default Search;
