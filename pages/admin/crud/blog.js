import Admin from "../../../components/auth/Admin";
import CreateBlog from "../../../components/crud/CreateBlog"


const CategoryTag = () => {
  return (
    <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create a new Blog</h2>
            </div>
            <div className="col-md-12">
              <CreateBlog />
            </div>
            
          </div>
        </div>
      </Admin>
  );
};

export default CategoryTag;