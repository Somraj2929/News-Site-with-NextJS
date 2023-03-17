import Head from 'next/head'
import axios from 'axios'
import NewsArticles from '@/components/newsarticles'
import SearchBar from '@/components/SearchBar'
import CategoryMenu from '@/components/CategoryMenu'




export default function Home({ articles }){
  return (
    <div>
      <Head>
        <title>Somraj's News App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

      </Head>

      <div className="container mx-auto">
        <div className="bg-white h-[70px]  text-center justify-center flex mb-2 relative" >
          <img 
            src='/mask.png'
            alt="logo"
            className="relative"
          />
          <h1 className="font-bold mt-5">Top News Articles</h1>
        </div>
        
        <SearchBar />
        <CategoryMenu />
        <NewsArticles articles={articles} />
      </div>
    </div>
  )
}

export async function getServerSideProps(){
  try{
    const { data } = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=f0d705cdde7f4416a9c6aaa70d662f50&pageSize=50')

    return {
      props: {
        articles: data.articles,
      },
    }
  } catch (error) {
    console.error(error)

    return {
      props: {
        articles: [],
      },
    }
  }
}