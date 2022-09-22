import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Profile, AllTags, TagedPosts, UserInfo, OthersProfile, AllUsers } from "./pages";
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth); // авторизован или нет 

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="/post/:id" element={<FullPost/>} />

          <Route path="/TagedPosts/:id" element={<TagedPosts/>} />

          <Route path="/posts/:id/edit" element={<AddPost/>} />

          <Route path="/add-post" element={<AddPost/>} />

          <Route path="/profile" element={<Profile/>} />

          <Route path="/allTags" element={<AllTags/>} />

          <Route path="/othersProfile/:id" element={<OthersProfile/>} />

          <Route path="/allUsers" element={<AllUsers/>} />

          <Route path="/login" element={<Login/>} />

          <Route path="/register" element={<Registration/>} />

        </Routes>
      </Container>
    </>
  );
}

export default App;
