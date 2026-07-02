export const MEDIA = {
  video: {
    label:       'Virtual Site Tour',
    description: 'A guided look at the Wasimi building site, grounds, and surroundings.',
    youtubeId:   import.meta.env.VITE_YOUTUBE_ID ?? null,
  },
  audio: [
    {
      id:      'founding-vision',
      title:   'The Founding Vision',
      speaker: 'EGFM Leadership',
      url:     import.meta.env.VITE_AUDIO_1_URL ?? null,
    },
    {
      id:      'site-blessing',
      title:   'Prayer & Site Blessing',
      speaker: 'EGFM Leadership',
      url:     import.meta.env.VITE_AUDIO_2_URL ?? null,
    },
  ],
}
