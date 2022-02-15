import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";
import {  Paper } from '@mui/material';


const CategoryTag = () => {
  return (
      <Admin>
        <Paper
      elevation={24}
      sx={{
        width: '100vw',
        height: '100vh'
      }}
    >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Categories and Tags</h2>
            </div>
            <div className="col-md-6">
              <Category />
            </div>
            <div className="col-md-6">
              <Tag />
            </div>
          </div>
        </div>
        </Paper>
      </Admin>
  );
};

export default CategoryTag;
