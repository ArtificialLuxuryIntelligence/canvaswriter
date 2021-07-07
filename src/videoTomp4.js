const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

const transcode = async ({ target: { files } }) => {
  const { name } = files[0];
  await ffmpeg.load();
  ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
  await ffmpeg.run('-i', name, 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');
  const video = document.getElementById('player');
  video.src = URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' })
  );
};

//converts blob to mp4 encoded blob
const transcodeBlob = async (blob) => {
  const name = 'myfile.mp4';
  await ffmpeg.load();
  ffmpeg.FS('writeFile', name, new Uint8Array(await blob.arrayBuffer()));
  await ffmpeg.run('-i', name, 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');
  return new Blob([data.buffer], { type: 'video/mp4' });
};

// const transcode = async (blob) => {
//   const name = 'record.webm';

//   let blobData = ffmpeg.transcode(new Uint8Array(await blob.arrayBuffer()));
//   await ffmpeg.load();
//   await ffmpeg.write(name, blobData);

//   await ffmpeg.transcode(name, 'output.mp4');
//   const data = ffmpeg.read('output.mp4');
//   let outputBlob = new Blob([data.buffer]);
//   return outputBlob;
// };

export { transcodeBlob, transcode };
