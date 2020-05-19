import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../form/Input';
import useInput from '../../hooks/useInput';
import Icons from '../common/Icons';
import { useQuery } from 'react-apollo-hooks';
import { ME } from '../../CommonQueries';

const Container = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
  z-index: 100;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

function Header() {
  const [search, handleSearch] = useInput('');
  const navigate = useNavigate();
  const { data } = useQuery(ME);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate({
      pathname: 'search',
      search: `?q=${search}`,
    });
  };

  return (
    <Container>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Icons.Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={submitSearch}>
            <SearchInput value={search} onChange={handleSearch} placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Icons.Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <Icons.HeartEmpty />
          </HeaderLink>
          {data?.seeMyProfile ? (
            <HeaderLink to={`/${data.seeMyProfile.username}`}>
              <Icons.User />
            </HeaderLink>
          ) : (
            <HeaderLink to="/#">
              <Icons.User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Container>
  );
}

export default Header;
