export const projects = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  img: `/animals/${i + 1}.jpg`,
  alt: `Animales ${i + 1}`,
  category: 'Animales',
  name: `Animal ${i + 1}`,
  year: '2024',
  desc: 'Fotografía de naturaleza y fauna, capturando la belleza y carácter de cada ser.',
}));
