import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';

const ItemType = 'IMAGE';

const DraggableImage = ({ image, index, moveImage, handleRemove }) => {
  const ref = React.useRef(null);
  
  const [, refDrop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
        return;
      }
      
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, refDrag] = useDrag({
    type: ItemType,
    item: { type: ItemType, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  refDrag(refDrop(ref));

  return (
    <Box 
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      position="relative" 
      width={120} 
      height={120}
    >
      <img src={image.data_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <Box position="absolute" top={0} right={0}>
        <IconButton 
          size="small"
          color="error" 
          onClick={() => handleRemove(index)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

function ImageUpload({ files, setPhotos }) {

  const onDrop = useCallback((acceptedFiles) => {
    const imageObjects = acceptedFiles.map(file => ({
      file,
      data_url: URL.createObjectURL(file)
    }));
    setPhotos(prev => [...prev, ...imageObjects]);
  }, [setPhotos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemove = (index) => {
    const newPhotos = [...files];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const moveImage = (fromIndex, toIndex) => {
    const newPhotos = [...files];
    const [movedItem] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, movedItem);
    setPhotos(newPhotos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box p={2}>
        <Box {...getRootProps()} style={{border: '2px dashed gray', padding: '20px', textAlign: 'center'}}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </Box>
        <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
          {files.map((image, index) => (
            <DraggableImage
              key={index}
              image={image}
              index={index}
              moveImage={moveImage}
              handleRemove={handleRemove}
            />
          ))}
        </Box>
      </Box>
    </DndProvider>
  );
}

export default ImageUpload;
