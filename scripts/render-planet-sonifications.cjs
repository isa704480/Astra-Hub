const fs = require("node:fs");
const path = require("node:path");

const outputDir = path.resolve(__dirname, "../assets/sonification");
const sampleRate = 22050;
const durationSeconds = 5;
const tracks = {
  mercury: { frequency: 392, modulation: 0.7, harmonics: [0.28, 0.12] },
  venus: { frequency: 246.94, modulation: 0.19, harmonics: [0.44, 0.08] },
  earth: { frequency: 261.63, modulation: 0.32, harmonics: [0.22, 0.16] },
  moon: { frequency: 174.61, modulation: 0.08, harmonics: [0.34, 0.12] },
  mars: { frequency: 146.83, modulation: 0.48, harmonics: [0.38, 0.18] },
  jupiter: { frequency: 98, modulation: 0.13, harmonics: [0.4, 0.23] },
  saturn: { frequency: 123.47, modulation: 0.24, harmonics: [0.3, 0.16] },
  uranus: { frequency: 207.65, modulation: 0.11, harmonics: [0.25, 0.09] },
  neptune: { frequency: 110, modulation: 0.36, harmonics: [0.32, 0.2] },
};

function createWave({ frequency, modulation, harmonics }) {
  const sampleCount = Math.floor(sampleRate * durationSeconds);
  const dataSize = sampleCount * 2;
  const wave = Buffer.alloc(44 + dataSize);

  wave.write("RIFF", 0);
  wave.writeUInt32LE(36 + dataSize, 4);
  wave.write("WAVE", 8);
  wave.write("fmt ", 12);
  wave.writeUInt32LE(16, 16);
  wave.writeUInt16LE(1, 20);
  wave.writeUInt16LE(1, 22);
  wave.writeUInt32LE(sampleRate, 24);
  wave.writeUInt32LE(sampleRate * 2, 28);
  wave.writeUInt16LE(2, 32);
  wave.writeUInt16LE(16, 34);
  wave.write("data", 36);
  wave.writeUInt32LE(dataSize, 40);

  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const vibrato = Math.sin(2 * Math.PI * modulation * time) * 0.012;
    const phase = 2 * Math.PI * frequency * (1 + vibrato) * time;
    const tone =
      Math.sin(phase) +
      harmonics[0] * Math.sin(phase * 2.01) +
      harmonics[1] * Math.sin(phase * 3.97);
    const edgeFade = Math.min(1, time / 0.2, (durationSeconds - time) / 0.2);
    const fade = Math.max(0, edgeFade) * (0.66 + 0.1 * Math.sin(time * 0.7));
    const sample = Math.max(-1, Math.min(1, tone * fade * 0.34));
    wave.writeInt16LE(Math.round(sample * 32767), 44 + index * 2);
  }

  return wave;
}

fs.mkdirSync(outputDir, { recursive: true });
for (const [name, settings] of Object.entries(tracks)) {
  fs.writeFileSync(path.join(outputDir, `${name}.wav`), createWave(settings));
}
