"use client";
import React from 'react'
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state: RootState) => state?.auth.user);
  console.log(user);

  return (
    <div>Home</div>
  )
}

export default Home