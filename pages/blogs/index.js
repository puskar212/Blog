import Head from "next/document";
import Link from "next/link";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogSkip,
  blogsLimit,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    return listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      console.log(data);
      console.log(data.blogs);

      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load More
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((e, i) => {
      return (
        <div key={i}>
          <Card e={e} />
          <hr />
        </div>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => {
      return (
        <Link href={`/categories/${c.slug}`} key={i}>
          <a className="btn btn-primary ml-1 mr-1 mt-3">{c.name}</a>
        </Link>
      );
    });
  };
  const showAllTags = () => {
    return tags.map((t, i) => {
      return (
        <Link href={`/categories/${t.slug}`} key={i}>
          <a className="btn btn-outline-primary ml-1 mr-1 mt-3">{t.name}</a>
        </Link>
      );
    });
  };
  const showLoadedBlogs = () => {
    return loadedBlogs.map((e, i) => {
      return (
        <div key={i}>
          <Card e={e} />
          <hr />
        </div>
      );
    });
  };

  return (
      <div>
        <div className="container-fluid">
          <div className="header">
            <div className="col-md-12 pt-3">
              <h1 className="font-weight-bold text-center">Blogs</h1>
            </div>
            <div className="section">
              <div className="pb-5 text-center">
                {showAllCategories()}
                <br />
                {showAllTags()}
              </div>
            </div>
          </div>
          <div className="container-fluid">{showAllBlogs()}
          </div>
          <div className="container-fluid">{showLoadedBlogs()}
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
          </div>
        </div>
      </div>
  );
};

// getInitialProps use to server server render page. it is a life cycle method which comes with nextjs.
//  It can only be used in pages not in component. return is important if nothing to return , then return empty object

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default Blogs;
