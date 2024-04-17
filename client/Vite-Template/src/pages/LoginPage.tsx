
import Header from '@/components/Header/Header';
import styles from './LoginPage.module.css'; 
import Hero from '@/components/Hero/Hero';
import HeroInformative from '@/components/InformativeSection/HeroInformative';
import { AllBalancesFungibleToken } from '@/FTComponents/AllBalancesFungibleToken';
import VideoHero from '@/components/VideoHero/VideoHero';

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <HeroInformative/>
      <VideoHero/>
    </div>
  );
};

export default LoginPage;

  