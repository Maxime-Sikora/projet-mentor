export const initSubject = [
  { name: 'Mathématiques' },
  { name: 'Français' },
  { name: 'Eductation civique' },
  { name: 'Education physique et sportive' },
  { name: 'Musique' },
];

export const initLevel = [
  { name: 'Elementaire' },
  { name: 'Maternelle' },
  { name: 'Collège' },
  { name: 'Lycée' },
  { name: 'Université' },
];

export const formatStringToSql = (str: string | undefined | null): string =>
  str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
