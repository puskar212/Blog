import React from 'react';

/*
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          theme={'snow'} // pass false to use minimal theme
        />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      insertStar: insertStar
    }
  },
  clipboard: {
    matchVisual: false
  }
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color'
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string
};

export default Editor;
