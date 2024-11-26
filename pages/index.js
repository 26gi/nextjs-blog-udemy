import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import utilStyles from "@/styles/utils.module.css";

import Link from "next/link";
import utilStyle from "../styles/utils.module.css";
import { getPostData } from "@/lib/posts";

// SSGの場合(外部から一度だけデータを取得する静的生成)
export async function getStaticProps() {
  const allPostData = getPostData();

  return {
    props: {
      allPostData,
    },
  };
}

// SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostData }) {
  return (
    <Layout>
      <section className={utilStyle.headingMd}>
        <p>私は駆け出しのWebエンジニアです/好きなフレームワークはNext.jsです</p>
      </section>

      <section>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link className={utilStyle.boldText} href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
