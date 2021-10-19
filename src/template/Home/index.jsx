import './style.css';
// import { Component } from 'react';
import { useEffect, useState, useCallback} from 'react';

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar'


export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(12);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const noMorePosts = (page + postsPerPage) >= allPosts.length;
  const filterPosts = !!searchValue ? (
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
  ) : posts;

  const handleLoadPosts = useCallback( async (page, postsPerPage) => {

    setLoading(true);
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
    setLoading(false);
  },[])

  const handleloadMorePosts = () => {

    const nextPage = (page + postsPerPage);
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPost)

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  }

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  },[handleLoadPosts, postsPerPage])




  

 


  return (
    <section className="container">
      <div className='container-SearchBar'>
        {!!searchValue && (<h1>Buscar por: {searchValue}</h1>)}

        <SearchBar
          handleChange={handleChange}
          searchValue={searchValue}
        />
      </div>


      {filterPosts.length > 0 && (
        <Posts posts={filterPosts} />
      )}


      {filterPosts.length === 0 && !loading && (
        <h2>Nenhuma busca encontrada 😔</h2>
      )}


      {!searchValue && !loading && (
        <Button text='Load More Posts'
          onClick={handleloadMorePosts}
          disabled={noMorePosts}
        />
      )}

    </section>
  );


};

// Comentado apenas para fins de estudo e comparação

// export class Home extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 12,
//     searchValue: '',
//     loading: false
//   };


//   componentDidMount() {
//     document.title = 'Aprendendo-React';
//     this.loadPosts();
//   }




//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     this.setState({ loading: true })

//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       ...this.state,
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//       loading: false

//     })
//   }

//   loadMorePosts = () => {
//     const {
//       posts,
//       allPosts,
//       page,
//       postsPerPage
//     } = this.state;

//     const nextPage = (page + postsPerPage);
//     const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage)
//     posts.push(...nextPost)

//     this.setState({ posts, page: nextPage });
//   }

//   handleChange = (e) => {
//     const { value } = e.target;

//     this.setState({ searchValue: value });

//   }


//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue, loading } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;


//     const filterPosts = !!searchValue ? (
//       allPosts.filter(post => {
//         return post.title.toLowerCase().includes(
//           searchValue.toLowerCase()
//         );
//       })
//     ) : posts;

//     return (
//       <section className="container">
//         <div className='container-SearchBar'>
//           {!!searchValue && (<h1>Buscar por: {searchValue}</h1>)}

//           <SearchBar
//             handleChange={this.handleChange}
//             searchValue={searchValue}
//           />
//         </div>


//         {filterPosts.length > 0 && (
//           <Posts posts={filterPosts} />
//         )}


//         {filterPosts.length === 0 && !loading  && (
//           <h2>Nenhuma busca encontrada 😔</h2>
//         )}


//         {!searchValue && !loading&& (
//           <Button text='Load More Posts'
//             onClick={this.loadMorePosts}
//             disabled={noMorePosts}
//           />
//         )}

//       </section>
//     );
//   }
// };

