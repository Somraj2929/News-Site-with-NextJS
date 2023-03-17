import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import NewsArticles from '../components/NewsArticles'

export default function Category({ articles }) {
  const router = useRouter()
  const { category } = router.query

  return (
    <div>
      <Head>
        <title>{category} News | My News Website</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

      </Head>

      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mt-8 mb-4 justify-center text-center text-white">{category.charAt(0).toUpperCase() + category.slice(1)} News</h1>
        <p className="border-b-8 pt-4"></p>
        <NewsArticles articles={articles} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const { category } = context.query;

    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=f0d705cdde7f4416a9c6aaa70d662f50&pageSize=50`
    );

    return {
      props: {
        articles: data.articles,
        category,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        articles: [],
        category: '',
      },
    };
  }
}


// export async function getServerSideProps({ category }) {
//   try {
    
   
//     const { data } = await axios.get(
//       `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=f0d705cdde7f4416a9c6aaa70d662f50`
//     )

//     return {
//       props: {
//         articles: data.articles,
//         category,
//       },
//     }
//   } catch (error) {
//     console.error(error)

//     return {
//       props: {
//         articles: [],
//         category: '',
//       },
//     }
//   }
// }

