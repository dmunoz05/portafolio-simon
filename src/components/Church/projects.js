export const projects = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  img: `/church/${i + 1}.jpg`,
  alt: `Bodas & Eventos ${i + 1}`,
  category: 'Bodas & Eventos',
  name: `Evento ${i + 1}`,
  year: '2024',
  desc: 'Momentos únicos e irrepetibles capturados con sensibilidad y precisión.',
}));
