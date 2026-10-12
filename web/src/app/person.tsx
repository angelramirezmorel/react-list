import { Card } from '../components';
import { Person as PersonType } from '../core/types';
import * as styles from './person.module.scss';

interface Props {
  person: PersonType;
  onSelect?: () => void;
}

export const Person = ({ person, onSelect }: Props) => (
  <Card className={styles.card} onClick={() => onSelect?.()}>
    <h2 className={styles.name}>{person.name}</h2>
    <div>
      {person?.homeworld !== 'unknown' && (
        <div className={styles.paragraph}>
          <h3 className={styles.title}>From:</h3> {person?.homeworld}
        </div>
      )}
      <h3 className={styles.title}>Appears in:</h3>
      <ul>
        {person.films.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  </Card>
);
