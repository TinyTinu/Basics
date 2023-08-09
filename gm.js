const express = require('express');
const app = express();
const gm = require('gm').subClass({ imageMagick: true }); // Use the gm library with ImageMagick

app.use(express.json());

app.post('/resize', (req, res) => {
  // Assuming the uploaded image is in the "image" field of the request body
  const uploadedImage = req.body.image;

  // You can choose the desired width and height for the resized image
  const width = 300;
  const height = 200;

  // Resize the image using gm
  gm(uploadedImage)
    .resize(width, height)
    .toBuffer('PNG', (err, buffer) => {
      if (err) {
        console.error('Error resizing image:', err);
        return res.status(500).send('Error resizing image');
      }

      // Send the resized image as a response
      res.set('Content-Type', 'image/png');
      res.send(buffer);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// Che j 2
const gm = require('gm');
const path = require('path');

// Define the sizes you want to generate
const sizes = [
  { width: 100, height: 100 },
  { width: 200, height: 200 },
  // Add more sizes as needed
];

// Service function to resize image for multiple sizes
function resizeImageForMultipleSizes(filePath) {
  sizes.forEach(size => {
    const { width, height } = size;
    const outputFileName = `resized_${width}x${height}_${path.basename(filePath)}`;

    gm(filePath)
      .resize(width, height)
      .write(outputFileName, err => {
        if (err) {
          console.error(`Error resizing image: ${err}`);
        } else {
          console.log(`Image resized to ${width}x${height}: ${outputFileName}`);
        }
      });
  });
}

// Call the service function with the file path
const inputFilePath = '/path/to/your/input/image.jpg';
resizeImageForMultipleSizes(inputFilePath);



