import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import FatText from '../../components/form/FatText';
import Avatar from '../../components/common/Avatar';
import Icons from '../../components/common/Icons';
import styled from 'styled-components';
import defaultAvatar from '../../images/common/default-avatar.jpg';
import TextareaAutosize from 'react-autosize-textarea';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { ADD_COMMENT, TOGGLE_LIKE } from './PostQueries';
import { toast } from 'react-toastify';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { ME } from '../../CommonQueries';
import moment from 'moment';

const Container = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
  a {
    color: inherit;
    text-decoration: none;
  }
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

const Files = styled.div`
  overflow: hidden;
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
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

const TextArea = styled(TextareaAutosize)`
  border: 0;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: 0;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Caption = styled.div`
  margin: 10px 0;
`;

function Post({ id, author, files, likeCount, isLiked, comments, createdAt, caption, location }) {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [localComments, setLocalComments] = useState(comments);
  const [comment, handleComment, setComment] = useInput('');
  const [currentImage, setCurrentImage] = useState(0);
  const { data } = useQuery(ME);
  const me = data?.seeMyProfile;
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id, isLike: !localIsLiked },
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment },
  });

  const slide = useCallback(() => {
    const totalFiles = files.length;
    setTimeout(() => {
      setCurrentImage((prev) => (prev === totalFiles - 1 ? 0 : prev + 1));
    }, 3000);
  }, [files]);

  useEffect(() => {
    slide();
  }, [slide, currentImage]);

  const toggleLike = async () => {
    setLocalIsLiked((prev) => !prev);

    try {
      const { data } = await toggleLikeMutation();
      const { result } = data?.toggleLike;
      setLocalIsLiked(result);
    } catch (e) {
      toast.error("Can't register like");
    }
  };

  useUpdateEffect(() => {
    setLocalLikeCount((prev) => (localIsLiked ? prev + 1 : prev - 1));
  }, [localIsLiked]);

  const handleCommentKeyPress = async (e) => {
    if (e.charCode === 13) {
      e.preventDefault();

      setLocalComments((prev) =>
        prev.concat({
          id: new Date().getTime(),
          text: comment,
          user: {
            username: me.username,
          },
        })
      );
      setComment('');

      try {
        await addCommentMutation();
      } catch (e) {
        toast.error("Can't send comment");
      }
    }
  };

  return (
    <Container>
      <Header>
        <Avatar size="sm" url={author.avatar || defaultAvatar} />
        <UserColumn>
          <Link to={`/${author.username}`}>
            <FatText text={author.username} />
            <Location>{location}</Location>
          </Link>
        </UserColumn>
      </Header>
      <Files>
        {files &&
          files.map((f, i) => (
            <File key={f.id} id={f.id} src={f.url} showing={i === currentImage} />
          ))}
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={toggleLike}>
            {localIsLiked ? <Icons.HeartFull /> : <Icons.HeartEmpty />}
          </Button>
          <Button>
            <Icons.Comment />
          </Button>
        </Buttons>
        <FatText text={localLikeCount === 1 ? '1 like' : `${localLikeCount} likes`} />
        <Caption>
          <FatText text={author.username} /> {caption}
        </Caption>
        {localComments && (
          <Comments>
            {localComments.map((comment) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username} />
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}
        <Timestamp>{moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}</Timestamp>
        <TextArea
          value={comment}
          onChange={handleComment}
          onKeyPress={handleCommentKeyPress}
          placeholder="Add a comment..."
        />
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
