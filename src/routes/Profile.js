import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import styled from 'styled-components';
import Avatar from '../components/common/Avatar';
import defaultAvatar from '../images/common/default-avatar.jpg';
import FatText from '../components/form/FatText';
import { Helmet } from 'react-helmet';
import FollowButton from '../components/search/FollowButton';
import SquarePost from '../components/post/SqurePost';
import Button from '../components/form/Button';

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const GET_USER = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      name
      username
      avatar
      isFollowing
      isSelf
      bio
      postsCount
      followingCount
      followersCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

function Profile() {
  const params = useParams();
  const { data, loading } = useQuery(GET_USER, { variables: { username: params.username } });
  const [logoutMutation] = useMutation(LOG_OUT);
  const {
    id,
    name,
    username,
    avatar,
    isFollowing,
    isSelf,
    bio,
    postsCount,
    followingCount,
    followersCount,
    posts,
  } = data?.seeProfile || {};

  console.log(data);

  if (loading) return <Loader />;

  return data?.seeProfile ? (
    <Container>
      <Helmet>
        <title>{username} | Prismagram</title>
      </Helmet>
      <Header>
        <HeaderColumn>
          <Avatar size="lg" url={avatar || defaultAvatar} />
        </HeaderColumn>
        <HeaderColumn>
          <UsernameRow>
            <Username>{username}</Username>{' '}
            {isSelf ? (
              <Button onClick={logoutMutation} text="Log Out" />
            ) : (
              <FollowButton isFollowing={isFollowing} id={id} />
            )}
          </UsernameRow>
          <Counts>
            <Count>
              <FatText text={postsCount.toString()} /> posts
            </Count>
            <Count>
              <FatText text={followersCount.toString()} /> followers
            </Count>
            <Count>
              <FatText text={followingCount.toString()} /> following
            </Count>
          </Counts>
          <FullName text={name} />
          <Bio>{bio}</Bio>
        </HeaderColumn>
      </Header>
      <Posts>
        {posts &&
          posts.map((post) => (
            <SquarePost
              key={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0]}
            />
          ))}
      </Posts>
    </Container>
  ) : (
    <FatText text="Sorry, Not found user" />
  );
}

export default Profile;
