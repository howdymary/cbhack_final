const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

const soundEffects = {
  click: '/sounds/click.mp3',
  success: '/sounds/success.mp3',
  mission: '/sounds/mission.mp3'
};

const audioBuffers: Record<string, AudioBuffer> = {};

async function loadSound(url: string): Promise<AudioBuffer> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
}

export async function initializeSounds() {
  try {
    await Promise.all(
      Object.entries(soundEffects).map(async ([key, url]) => {
        audioBuffers[key] = await loadSound(url);
      })
    );
  } catch (error) {
    console.error('Failed to load sounds:', error);
  }
}

export function playSound(name: keyof typeof soundEffects) {
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffers[name];
  source.connect(audioContext.destination);
  source.start(0);
}
