import React from 'react';
import { ReactDOM } from 'react';
import S3FileUpload from 'react-s3';

const config = {
  bucketName: 'myawadh',
  dirName: 'photos' /* optional */,
  region: 'ap-south-1',
  accessKeyId: 'AKIAR3MM5O55BPMXBGMO',
  secretAccessKey: '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'
};

const PhotoUpload = () => {
  const upload = (e) => {
    console.log(e.target.files[0]);
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input type="file" onChange={upload} />
    </div>
  );
};

export default PhotoUpload;
