import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo-hooks';
import { FOLLOW, UNFOLLOW } from '../../routes/User/UserQueries';
import Button from '../form/Button';

function FollowButton({ isFollowing, id }) {
  const [localIsFollowing, setLocalIsFollowing] = useState(isFollowing);
  const [followMutation, { loading: loadingFollow }] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation, { loading: loadingUnfollow }] = useMutation(UNFOLLOW, {
    variables: { id },
  });

  const handleClick = async () => {
    setLocalIsFollowing((prev) => !prev);

    if (localIsFollowing) {
      await unfollowMutation();
    } else {
      await followMutation();
    }
  };

  return loadingFollow || loadingUnfollow ? (
    <Button text="····" />
  ) : (
    <Button type="button" onClick={handleClick} text={localIsFollowing ? 'Unfollow' : 'Follow'} />
  );
}

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButton;
