const express = require('express')
const app = express();
app.use(express.json());
const port = 5000;

const mediaGalaryData = {
  photos: [],
  audioRecordings: [],
  videoRecordings: []
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send(mediaGalaryData)
})

app.post('/addPhoto', (req, res) => {
  var photo = req.body;
  if (!photo.src) {
    res.status(400).send('invalid photo')
    return;
  }
  mediaGalaryData.photos.push(photo);
  res.send(photo);
})

app.post('/addAudio', (req, res) => {
  if (!req.body) {
    res.status(400).send('invalid audio')
    return;
  }
  var recording = { id: mediaGalaryData.audioRecordings.length, src: req.body }
  mediaGalaryData.audioRecordings.push(recording);
  res.send(recording);
})

//        fetch(serverAddress + '/addAudio', {
//             method: 'POST',
//             body: JSON.stringify(blob),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })

app.post('/addVideo', (req, res) => {
  var video = req.body;
  if (!video.src) {
    res.status(400).send('invalid video')
    return;
  }
  mediaGalaryData.audioRecordings.push(video);
  res.send(video);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})