import { useEffect, useState } from 'react';
import { getCookie } from '../../actions/auth';
import {
  createCategory,
  getCategories,
  getSingleCategory,
  removeCategory
} from '../../actions/category';
import { TextField, Box, Button, Stack ,Divider} from '@mui/material';
// import FilledInput from '@mui/material/FilledInput';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie('token');

  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };
  
  const showcategories = () => {
    
    return (
      <Stack
        spacing={2}
        direction="row"
        mt={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        {categories.map((e, i) => {
          return (
            <Button
              variant="contained"
              key={i}
              onDoubleClick={() => handleDelete(e.slug)}
              title="Double click to Delete"
            >
              {e.name}
            </Button>
          );
        })}
      </Stack>
    );
  };

  const handleDelete = (slug) => {
    let alert = window.confirm('Are you sure you want to delete this category?');
    if (alert) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          name: '',
          error: false,
          success: false,
          removed: !removed,
          reload: !reload
        });
      }
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    createCategory({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          removed: false,
          reload: !reload
        });
      }
    });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      name: event.target.value,
      error: false,
      success: false,
      removed: ''
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p>Category already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed</p>;
    }
  };

  const handleMouseMove = (event) => {
    setValues({ ...values, error: false, success: false, removed: '' });
  };

  const newCategoryForm = () => (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' }
      }}
      noValidate
      autoComplete="off"
      onSubmit={clickSubmit}
    >
      {!error ? (
        <TextField
          id="outlined-name"
          label="Category"
          value={name}
          onChange={handleChange}
        />
      ) : (
        /* <FormControl error variant="standard"> 
        <InputLabel hhtmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"   
          value={name}
          onChange={handleChange}
          aria-describedby="component-error-text"
        />
        {error && <FormHelperText id="component-error-text">Error</FormHelperText>}
      </FormControl> */
        <TextField
          error
          id="outlined-error-helper-text"
          label="Error"
          // defaultValue="Hello World"
          helperText={showError()}
          value={name}
          onChange={handleChange}
        />
      )}
      <div>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </div>
    </Box>
  );

  return (
    <>
      {showSuccess()}
      {/* {showError()} */}
      {showRemoved()}
      <div onMouseMove={handleMouseMove}>
        {newCategoryForm()}
        {showcategories()}
      </div>
    </>
  );
};

export default Category;
