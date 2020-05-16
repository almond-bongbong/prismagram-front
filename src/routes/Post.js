import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import Avatar from '../components/post/Avatar';
import FatText from '../components/form/FatText';
import Icons from '../components/common/Icons';
import styled from 'styled-components';
import defaultAvatar from '../images/common/default-avatar.jpg';

const Container = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div``;

const File = styled.img`
  max-width: 100%;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

function Post({ id, author, files, likeCount, isLiked, comments, createdAt, caption, location }) {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [comment, handleComment] = useInput('');

  return (
    <Container>
      <Header>
        <Avatar size="sm" url={author.avatar || defaultAvatar} />
        <UserColumn>
          <FatText text={author.username} />
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>{files && files.map((f) => <File key={f.id} id={f.id} src={f.url} />)}</Files>
      <Meta>
        <Buttons>
          <Button>{isLiked ? <Icons.HeartFull /> : <Icons.HeartEmpty />}</Button>
          <Button>
            <Icons.Comment />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
        <Timestamp>{createdAt}</Timestamp>
      </Meta>
    </Container>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({}).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  createdAt: PropTypes.string.isRequired,
};

Post.defaultProps = {
  comments: [],
};

export default Post;
