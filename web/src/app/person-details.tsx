import { Code, Loading } from '../components';
import * as styles from './person-details.module.scss';
import { Person } from '../core/types';

interface Props {
  person: Person;
  onBack?: () => void;
}

export const PersonDetails = ({ person, onBack }: Props) => {

  if (!person) return <Loading />;

  return (
    <div className={styles.details}>
      <button type="button" className={styles.back} onClick={() => onBack?.()}>
        ← Go back
      </button>

      <Code>{JSON.stringify(person, null, 2)}</Code>
    </div>
  );
};
