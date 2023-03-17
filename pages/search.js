import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'
import NewsArticles from '../components/NewsArticles'

export default function Search({ articles }) {
    const router = useRouter()
    const { q } = router.query

    return (
        <div>
            <Head>
                <title>{q} - Search Results | Somraj's News Site</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />

            </Head>

            <div className="container mx-auto">
                <h1 className="text-4x1 font-bold mt-8 mb-4 justify-center text-center text-white">Search Results for "{q}" </h1>
                <p className="border-b-8 pt-4"></p>
                <NewsArticles articles={articles} />
            </div>
        </div>
    )
}

export async function getServerSideProps({ query }) {
    try {
        const { q } = query
        const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(
            q
          )}&apiKey=f0d705cdde7f4416a9c6aaa70d662f50&pageSize=50`
        )

        return {
            props: {
                articles: data.articles,
            },
        }
    } catch (error) {
        console.error(error)

        return {
            props: {
                articles: null,
            },
        }
    }
}