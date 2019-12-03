import React from 'react';

export const getInitialInfo = async() => {
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