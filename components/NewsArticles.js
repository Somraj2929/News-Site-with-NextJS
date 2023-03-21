


import { useMemo, useState } from "react";

const NewsArticles = ({ articles }) => {
    const [sortBy, setSortBy] = useState('');  //for default sorting based on published date
    const [page, setPage] = useState(1); //default page number
    const [visibleArticles, setVisibleArticles] = useState([]);

    const itemsPerPage = 9; //number of articles to show per page


    //sorting of articles
    // const sortedArticles = articles.sort((a, b) => {
    //     if(sortBy === 'title') {
    //         return a.title.localeCompare(b.title);  //sort by title
    //     } else if (sortBy === 'source') {
    //         return a.source.name.localeCompare(b.source.name);  //sort be source
    //     } else{
    //         //sort by default(i.e. published date)
    //         return new Date(b.publishedAt) - new Date(a.publishedAt);
    //     }
    // });



    //sortings
    const sortedArticles = useMemo(() => {
        if(sortBy) {
            return [...articles].sort((a, b)=> {
                if(sortBy === "publishedAt"){
                    return new Date(b.publishedAt) - new Date(a.publishedAt);
                } else if( sortBy === "source"){
                    return a.source.name.localeCompare(b.source.name)
                }
                
                return (a[sortBy] && b[sortBy]) ? a[sortBy].localeCompare(b[sortBy]) : 0;
                
            });
        }
        return articles;
    }, [articles, sortBy])

    const startIndex = (page -1) * itemsPerPage;
    //const newVisibleArticles = sortedArticles.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);

    const handleSortChange = (e) => {
        const sortByValue = e.target.value
        setSortBy(sortByValue);
        let sortedArticles;
        if (sortByValue === ""){
            sortedArticles = articles;
        } else if(sortByValue === "source"){
            sortedArticles = [...articles].sort((a, b) => {
                return a.source.name.localeCompare(b.source.name)
            })
        } else {
            sortedArticles = [...articles].sort((a,b) => {
                return (a[sortByValue] && b[sortByValue]) ? a[sortByValue].localeCompare(b[sortByValue]) : 0;

            })
        }
        setVisibleArticles(sortedArticles.slice(0, itemsPerPage))
        setPage(1); //this will reset page number when sorting changes
    };


    //updating visibleArticles when page or sortdArticles change
    useMemo(() => {
        const newVisibleArticles = sortedArticles.slice(startIndex, startIndex + itemsPerPage)
        setVisibleArticles(newVisibleArticles);
    },[page, sortedArticles]);


    const handleNextPageClick = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPageClick = () => {
        if (page > 1){
            setPage(page - 1);
        }
    };

    return (
        <div className="flex flex-wrap mx-auto">
            <div className="w-full flex justify-center mb-4 mt-4">
                <label htmlFor="sort" className="mr-2 text-white font-semibold leading-loose">
                    Sort by:
                </label>
                <select
                    name="sort"
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border text-black border-gray-300 rounded-md px-3 py-1 font-semibold sm:bg-zinc-100 md:bg-zinc-100 lg:bg-zinc-100 bg-zinc-100 hover:cursor-pointer"
                    
                    
                >
                    <option value="">--Select--</option>
                    <option value="publishedAt">Published Date</option>
                    <option value="title">Title</option>
                    <option value="source">Source</option>
                </select>
            </div>
            {visibleArticles.map((article) => (
                <div key={article.url} className="w-full sm-w-full  md:w-1/2 lg:w-1/3 p-4">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <div className="bg-white shadow-md  hover:shadow-2xl rounded-lg overflow-hidden">
                            <img
                                className="w-full h-56 object-cover object-center"
                                src={article.urlToImage}
                                alt={article.title}
                            />
                            <div className="p-4">
                                <h2  className="text-lg font-bold mb-2 text-black">{article.title}</h2>
                                <p className="text-sm text-black">{article.description}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            ))}

            <div className="w-full flex justify-center mt-8">
                <button 
                    onClick={handlePrevPageClick}
                    disabled={page === 1}
                    className="bg-white hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded-l"
                >
                    Prev
                </button>
                <button
                    onClick={handleNextPageClick}
                    disabled={page === totalPages}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-r"
                >
                    Next
                </button>
            </div>
        </div>
    );


}

export default NewsArticles












// const NewsArticles = ({ articles }) => {






//     return (
//         <div className="flex flex-wrap">
//             {articles.map((article)=>(
//                 <div key={article.url} className="w-full md:w-1/2 lg:w-1/3 p-4">
//                     {/* <Link href={`/article/?q=${encodeURIComponent(article.source.name)}`} passHref legacyBehavior> */}
//                         <a href={article.url} target="_blank" rel="noopener noreferrer">
//                             <div className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
//                                 <img
//                                     className="w-full h-56 object-cover object-center"
//                                     src={article.urlToImage}
//                                     alt={article.title}
//                                 />
//                                 <div className="p-4">
//                                     <h2 className="text-lg font-bold mb-2">{article.title}</h2>
//                                     <p className="text-sm text-grey-700">
//                                         {article.description}
//                                     </p>
//                                     <p className="text-sm text-gray-500 mt-2">
//                                         {new Date(article.publishedAt).toLocaleDateString('en-US', {
//                                                                                                         year: 'numeric',
//                                                                                                         month: 'long',
//                                                                                                         day: 'numeric',
//                                                                                                     })}
//                                     </p>
//                                 </div>
//                             </div>
//                         </a>
//                     {/* </Link> */}
//                 </div>
//             ))}

//         </div>
//     )
// }

// export default NewsArticles