import { InterfaceSubject } from 'src/subject/subject';

export type levelInterface = {
  id: number;
  name: string;
};

export type LevelSubjectInterface = {
  level: levelInterface;
  subject: InterfaceSubject;
};
