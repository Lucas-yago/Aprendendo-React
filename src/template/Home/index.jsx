import './style.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchBar } from '../../components/SearchBar'


export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 12,
    searchValue: '',
    loading: false
  };


  componentDidMount() {
    this.loadPosts();
  }




  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    this.setState({ loading: true })
    
    const postsAndPhotos = await loadPosts();
    this.setState({
      ...this.state,
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
      loading: false

    })
  }

  loadMorePosts = () => {
    const {
      posts,
      allPosts,
      page,
      postsPerPage
    } = this.state;

    const nextPage = (page + postsPerPage);
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPost)

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ searchValue: value });

  }


  render() {
    const { posts, page, postsPerPage, allPosts, searchValue, loading } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;


    const filterPosts = !!searchValue ? (
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
    ) : posts;

    return (
      <section className="container">
        <div className='container-SearchBar'>
          {!!searchValue && (<h1>Buscar por: {searchValue}</h1>)}

          <SearchBar
            handleChange={this.handleChange}
            searchValue={searchValue}
          />
        </div>


        {filterPosts.length > 0 && (
          <Posts posts={filterPosts} />
        )}


        {filterPosts.length === 0 && !loading  && (
          <h2>Nenhuma busca encontrada 😔</h2>
        )}


        {!searchValue && !loading&& (
          <Button text='Load More Posts'
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        )}

      </section>
    );
  }
};

