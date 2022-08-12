import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import logo from '../../public/logo.svg'

import { AiOutlineCalendar, AiOutlineUser} from 'react-icons/ai'

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

 export default function Home() {
  return(
    <main className={styles.main}>
      <img src={logo} alt="logo" />
      <article className={styles.post}>
        <strong> Como utilizar os hooks </strong>
        <span> Pensando em sincronização em vez de ciclos da vida </span>
        <div>
          <time> <AiOutlineCalendar /> 15 mar 2022 </time>
          <p> <AiOutlineUser />Joseph Oliveira </p>
        </div>
      </article>
    </main>
  );
}

 export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient({});
    const postsResponse = await prismic.getByType('posts');

    return {
      props: postsResponse
    }
 };
