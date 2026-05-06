export const projects = Array.from({ length: 39 }, (_, i) => ({
  id: i + 1,
  img: `/gastronomy/${i + 1}.jpg`,
  alt: `Gastronomía ${i + 1}`,
  category: 'Gastronomía',
  name: `Gastronomía ${i + 1}`,
  year: '2024',
  desc: 'Fotografía gastronómica que resalta texturas, colores y la esencia del plato.',
}));
