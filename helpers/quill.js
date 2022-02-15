export const QuillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],
    ['image'] //add image here
  ]
};

export const QuillFormats = [
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
  'link',
  'image',
  'video',
  'code-block'
];

// Editor.modules = {
//   toolbar: {
//     container: "#toolbar",
//     handlers: {
//       insertStar: insertStar
//     }
//   },
//   clipboard: {
//     matchVisual: false,
//   }
// };

// Editor.formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "color"
// ];
