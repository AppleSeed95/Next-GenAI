'use client'
import React from 'react';
import { Icons } from '~/home/(user)/_components/icons';
import { downloadImageAction } from '../../_lib/server/server-action';

type DownloadImageIconProps = {
  imageUrl: string;
  fileName: string;
}

const DownloadImageIcon: React.FC<DownloadImageIconProps> = ({ imageUrl, fileName }) => {
  // const downloadImage = async () => {
  //   const authToken = localStorage.getItem('csrfSecret');
  //   console.log(authToken);
  //   try {
  //     const response = await fetch(imageUrl, {
  //       mode: 'cors',
  //       headers: {
  //         'Authorization': `Bearer ${authToken}`,
  //         'Content-Type': 'application/json'  // Use other content type headers as needed
  //       }
  //     });

  //     // const payload = {
  //     //   url: imageUrl,
  //     // };
  //     // const response = await downloadImageAction(payload);

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     console.log(response);
  //     const blob = await response.blob();
  //     console.log(blob);
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     console.log(a);
  //     a.style.display = 'none';
  //     a.href = url;
  //     a.download = fileName;
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error downloading the image:', error);
  //   }
  // };

  const downloadImage = () => {
    fetch(imageUrl, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
      });
  };
  return (
    <div onClick={downloadImage} className="cursor-pointer">
      <Icons.download />
    </div>
  );
};

export default DownloadImageIcon;
