import Redirect from '../../components/redirect/redirect';
import { useSelector } from 'react-redux';
import PersonelPanel from '../../components/personelpanel/personelpanel';
import AdminPanel from '../../components/adminpanel/adminpanel';
import UserPanel from '../../components/userpanel/userpanel';
import Head from 'next/head';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const headPageContent = (
    <Head>
      <title>Profil użytkownika</title>
    </Head>
  );

  if (user.type === 'ADMIN') {
    return (
      <>
        {headPageContent}
        <div className='profile__container'>
          <AdminPanel />
          <PersonelPanel />
        </div>
      </>
    );
  }

  if (user.type === 'PERSONEL') {
    return (
      <>
        {headPageContent}
        <div className='profile__container'>
          <PersonelPanel />
        </div>
      </>
    );
  }

  if (user.type === 'USER') {
    return (
      <>
        {headPageContent}
        <div className='profile__container'>
          <UserPanel user={user} />
        </div>
      </>
    );
  }

  return (
    <>
      {headPageContent}
      <Redirect path={'/'}>Brak danych o użytkowniku.</Redirect>
    </>
  );
};

export default ProfilePage;
