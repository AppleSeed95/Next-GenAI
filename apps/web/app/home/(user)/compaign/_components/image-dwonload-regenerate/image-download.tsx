'use client'
import React from 'react';
import { Icons } from '~/home/(user)/_components/icons';

type DownloadImageIconProps = {
  imageUrl: string;
  fileName: string;
}

const DownloadImageIcon: React.FC<DownloadImageIconProps> = ({ imageUrl, fileName }) => {
  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl, {
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log(response);
      const blob = await response.blob();
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      console.log(a);
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <div onClick={downloadImage} className="cursor-pointer">
      <Icons.download />
    </div>
  );
};

export default DownloadImageIcon;
