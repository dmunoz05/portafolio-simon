export const projects = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  img: `/portraits/${i + 1}.jpg`,
  alt: `Retrato ${i + 1}`,
  category: 'Retratos',
  name: `Retrato ${i + 1}`,
  year: '2024',
  desc: 'Retratos que capturan la esencia y personalidad de cada individuo.',
}));
