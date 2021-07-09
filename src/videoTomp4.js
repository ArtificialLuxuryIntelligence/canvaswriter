const { createFFmpeg, fetchFile } = FFmpeg;
let ffmpeg = createFFmpeg({ log: true });

const transcode = async ({ target: { files } }) => {
  const { name } = files[0];
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  } else {
    console.log('already loaded');
  }
  ffmpeg.FS('writeFile', name, await fetchFile(files[0]));
  await ffmpeg.run('-i', name, 'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');
  const video = document.getElementById('player');
  video.src = URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' })
  );
};

//converts blob to mp4 encoded blob
const transcodeBlob = async (blob, fps = 30) => {
  const name = 'myfile.mp4';
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  } else {
    console.log('already loaded');
  }
  ffmpeg.FS('writeFile', name, new Uint8Array(await blob.arrayBuffer()));

  // await ffmpeg.run('-i', name, `-filter:v`, `fps=${fps}`, 'output.mp4');

  //clone last frame for 'hold' seconds
  let hold = 0.2; //small number required so the last frame isn't missed (for some reason..)
  await ffmpeg.run(
    '-i',
    name,
    `-vf`,
    `tpad=stop_mode=clone:stop_duration=${hold},fps=${fps}`, //clone
    'output.mp4'
  );

  const data = await ffmpeg.FS('readFile', 'output.mp4');
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
