import CharacterBulder from "../components/3DCharacterBuilder/Builder";
import { NextPage } from "next";
import HeaderComponent from "../components/Header/HeaderComponent";
import FooterComponent from "../components/Footer/FooterComponent";
import styles from '../styles/Home.module.css'
const Home: NextPage = () => {
  return (
    <>

    <main className={styles.main}>
    <div className="mt-42">
      <CharacterBulder></CharacterBulder>
    </div>
    </main>

    </>
  );
};

export default Home;
