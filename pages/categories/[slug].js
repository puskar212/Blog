import Head from "next/head";
import { getSingleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import Card from "../../components/blog/Card";

const Category = ({ category, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Blog ${category.name}`} />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
      <meta property="og:description" content={`Blog ${category.name}`} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  return (
    <>
      {head()}
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                {blogs.map((e, i) => (
                  <div>
                    <Card key={i} e={e} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
    </>
  );
};

Category.getInitialProps = ({ query }) => {
  console.log(query);
  return getSingleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      return { category: data.category, blogs: data.blogs, query };
    }
  });
};

export default Category;
