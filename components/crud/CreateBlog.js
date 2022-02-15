import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie } from '../../actions/auth';
import { isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import UplaodTest from '../../pages/photo/index';
import { useS3Upload } from 'next-s3-upload';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CustomButton = () => <span className="octicon octicon-star"  />;

function insertStar() {
  alert("Hello! I am an alert box!!");
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

const CreateBlog = ({ router }) => {
  // const router = useRouter()
  // console.log(props);
  // console.log(router);

  const blogFromLocalStorage = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };
  // const titleFromLocalStorage = () => {
  //   if (typeof window === "undefined") {
  //     return false;
  //   }
  //   if (localStorage.getItem("title")) {
  //     return JSON.parse(localStorage.getItem("title"));
  //   } else {
  //     return false;
  //   }
  // };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  // const [titleStore, setTitleStore] = useState(titleFromLocalStorage());
  const [body, setBody] = useState(blogFromLocalStorage());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false
  });

  const { error, sizeError, success, formData, title, hidePublishButton } = values;
  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };
  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (event) => {
    event.preventDefault();

    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new blog ${title} has been created`
        });
      }
      setBody('');
      setCategories([]);
      setTags([]);
    });
  };

  console.log('values >>>>>>>>>>>>>>>>>> ', values);

  const handleChange = (event) => {
    console.log('E >>>>>>>>>>>>> ', event);

    const details =
      [event.target.name] === 'photo' ? event.target.files[0] : event.target.value;

    formData.set([event.target.name], details);
    setValues({ ...values, [event.target.name]: details, formData, error: '' });

    // if (typeof window !== "undefined") {
    //   localStorage.setItem("title", JSON.stringify(name));
    // }
  };

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  const handleBody = (event) => {
    // console.log(event);

    setBody(event);
    formData.set('body', event);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(event));
    }
  };

  const toggleCategories = (id) => () => {
    setValues({ ...values, error: '' });

    const clickedCategory = checkedCategories.indexOf(id);
    const X = [...checkedCategories];

    if (clickedCategory === -1) {
      X.push(id);
    } else {
      X.splice(clickedCategory, 1);
    }

    // console.log(X);
    setCheckedCategories(X);
    formData.set('categories', X);
  };
  const toggleTags = (id) => () => {
    setValues({ ...values, error: '' });

    const clickedTag = checkedTags.indexOf(id);
    const T = [...checkedTags];

    if (clickedTag === -1) {
      T.push(id);
    } else {
      T.splice(clickedTag, 1);
    }

    // console.log(T);
    setCheckedTags(T);
    formData.set('tags', T);
  };

  const showCategories = () => {
    // console.log(categories);

    return (
      categories &&
      categories.map((e, i) => {
        return (
          <li key={i} className="list-unstyled">
            <input
              type="checkbox"
              onChange={toggleCategories(e._id)}
              className="mr-2"
            />
            <label className="form-check-lebel">{e.name}</label>
          </li>
        );
      })
    );
  };
  const showTags = () => {
    // console.log(tags);

    return (
      tags &&
      tags.map((e, i) => {
        return (
          <li key={i} className="list-unstyled">
            <input type="checkbox" onChange={toggleTags(e._id)} className="mr-2" />
            <label className="form-check-lebel">{e.name}</label>
          </li>
        );
      })
    );
  };

  const showError = () => {
    return (
      <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
      </div>
    );
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? '' : 'none' }}
      >
        {success}
      </div>
    );
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            value={title}
            className="form-control"
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="form-group">
        <CustomToolbar />
          <ReactQuill
            value={body}
            modules={QuillModules}
            formats={QuillFormats}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {/* {JSON.stringify(router)} */}
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
              <hr />
              <div className="text-muted">Max size : 1mb</div>
              {/* <label className="btn btn-outline-info">
                Upload Featured Image */}
              {/* <input
                  onChange={handleChange}
                  name="photo"
                  type="file"
                  accept="image/*"
                  hidden
                /> */}
              <FileInput
                onChange={handleFileChange}
                name="photo"
                type="file"
                accept="image/*"
                hidden
              />
              <button onClick={openFileDialog}>Upload file</button>
              {/* </label> */}
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
