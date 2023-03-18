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
        <div className="wavy-bg h-[100px]  text-center justify-center flex  relative" >
          <img 
            src='/mask.png'
            alt="logo"
            className="relative"
          />
          <h1 className="font-bold mt-5">Top News Articles</h1>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
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
    const { data } = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=faca45ac98004d0b9cbd2efc7f227b27&pageSize=50')

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