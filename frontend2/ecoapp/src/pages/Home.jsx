import { useEffect, useState } from 'react';

const Home = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUsername(user.username);
      } catch (err) {
        console.error('Error parsing user from localStorage', err);
      }
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome{username ? `, ${username}` : ''}!
      </h1>
    </div>
  );
};

export default Home;
