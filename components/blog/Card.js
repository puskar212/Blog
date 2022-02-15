import Link from "next/link";
import renderHtml from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const Card = ({ e }) => {
  const showBlogCategories = (e) => {
    return e.categories.map((c, i) => {
      return (
        <Link href={`/categories/${e.slug}`}>
          <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
        </Link>
      );
    });
  };
  const showBlogTags = (e) => {
    return e.tags.map((t, i) => {
      return (
        <Link href={`/categories/${e.slug}`}>
          <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
        </Link>
      );
    });
  };
  return (
    <div className="lead pb-4">
      <div>
        <Link href={`/blogs/${e.slug}`}>
          <a>
            <h2 className=" pt-3 pb-3 font-weight-bold">{e.title}</h2>
          </a>
        </Link>
      </div>
      <div>
        <p className="mark ml-1 pt-2 pb-2">
          Written By {e.postedBy.name} | Published
          {moment(e.updatedAt).fromNow()}
        </p>
      </div>
      <div>
        {showBlogCategories(e)}
        {showBlogTags(e)}
        <br />
        <br />
      </div>
      <div className="row">
        <div className="col-md-4">
            <div>
                <img className="img img-fluid" style={{maxHeight : 'auto' , width : '100%' }} src={`${API}/blog/photo/${e.slug}`} alt={e.title} />
            </div>
        </div>
        <div className="col-md-8">
          <div>
            <div className="pb-3"> {renderHtml(e.excerpt)}</div>
            <Link href={`/blogs/${e.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
