import React from 'react';

export const getInitialState = async() => {
  const mockService = () => new Promise<{ email: string, name: string }>(res => setTimeout(()=>{
    res({
      name: 'troy',
      email: 'troy.lty@alipay.com',
    })
  }, 2000));
  const userInfo = await mockService();

  return {
    avatar: `avatarUrl`,
    gender: 'male',
    ...userInfo,
  };
}