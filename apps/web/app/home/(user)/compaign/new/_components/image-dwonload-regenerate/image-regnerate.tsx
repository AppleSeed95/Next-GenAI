'use client'
import React, { useState } from 'react';
import { Icons } from '~/home/(user)/_components/icons';

interface RegenerateImageIconProps {
  initialImageUrl: string;
}

const RegenerateImageIcon: React.FC<RegenerateImageIconProps> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const regenerateImage = async () => {
    try {
      // Simulate fetching a new image URL
      // Replace this with your actual image fetching logic
      const newImageUrl = await fetchNewImageUrl();
      console.log(newImageUrl);
      setImageUrl(newImageUrl);
    } catch (error) {
      console.error('Error regenerating the image:', error);
    }
  };

  const fetchNewImageUrl = async (): Promise<string> => {
    // Placeholder for fetching a new image URL
    // Replace with your actual API call
    return '/images/livingroom9.png';
  };

  return (
    <div onClick={regenerateImage} className="cursor-pointer">
      <Icons.regenerate />
    </div>
  );
};

export default RegenerateImageIcon;
