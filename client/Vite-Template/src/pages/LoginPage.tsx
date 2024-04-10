
import Header from '@/components/Header/Header';
import styles from './LoginPage.module.css'; 
import Hero from '@/components/Hero/Hero';
import HeroInformative from '@/components/InformativeSection/HeroInformative';

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <HeroInformative/>
    </div>
  );
};

export default LoginPage;

  