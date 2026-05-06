export const projects = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  img: `/concerts/${i + 1}.jpg`,
  alt: `Concierto ${i + 1}`,
  category: 'Conciertos',
  name: `Concierto ${i + 1}`,
  year: '2024',
  desc: 'Fotografía de evento en vivo, capturando la energía y emoción del momento.',
}));
