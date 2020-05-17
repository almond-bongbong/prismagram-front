import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../components/common/Loader';
import styled from 'styled-components';
import Post from './Post';
import { Helmet } from 'react-helmet';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          avatar
          username
        }
      }
      createdAt
    }
  }
`;

function Feed() {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Container>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {data?.seeFeed?.map((p) => (
        <Post
          key={p.id}
          id={p.id}
          author={p.user}
          files={p.files}
          caption={p.caption}
          location={p.location}
          likeCount={p.likeCount}
          isLiked={p.isLiked}
          comments={p.comments}
          createdAt={p.createdAt}
        />
      ))}
      {loading && <Loader />}
    </Container>
  );
}

export default Feed;
