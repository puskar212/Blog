import { useState , useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { createTag, getTags, getSingleTag, removeTag } from "../../actions/tag";
import {TextField,Box,Button,Stack,Divider} from '@mui/material';



const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const showTags = () => {
    return (
    <Stack
        spacing={2}
        direction="row"
        mt={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
    {tags.map((e, i) => {
      return (
        <Button variant="contained"
          key={i}
          onDoubleClick={() => handleDelete(e.slug)}
          title="Double click to Delete"
        >
          {e.name}
        </Button>
      );
    })}
    </Stack>
    )
  };

  const handleDelete = (slug) => {
    let alert = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (alert) {
      deleteTag(slug);
    }
  };

  const deleteTag = (slug) => {
      console.log(slug);
    removeTag(slug, token).then((data) => {
        console.log(data)
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          name: "",
          error: false,
          success: false,
          removed: !removed,
          reload: !reload,
        });
      }
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    createTag({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: false,
          reload: !reload,
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
      removed: "",
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">CTagis removed</p>;
    }
  };

  const handleMouseMove = (event) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  const newTagForm = () => (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '50ch' }
    }}
    noValidate
    autoComplete="off"
    onSubmit={clickSubmit}
  >
        {!error ? (<TextField
        id="outlined-name"
        label="Tag"
        value={name}
        onChange={handleChange}
      />) :
      (<TextField
        error
        id="outlined-error-helper-text"
        label="Tag"
        // defaultValue="Hello World"
        helperText={showError()}
        value={name}
      onChange={handleChange}
      />)}
      <div>
      <Button variant="contained" type='submit'>Create</Button>
      </div>
      </Box>
  );

  return (
    <>
      {showSuccess()}
      {/* {showError()} */}
      {showRemoved()}
      <div onMouseMove={handleMouseMove}>
        {newTagForm()}
        {showTags()}
      </div>
    </>
  );
};

export default Tag;
