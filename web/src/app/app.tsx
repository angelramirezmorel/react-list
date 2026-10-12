import { useState } from "react";
import { List } from "../components";
import { Person as PersonType } from "../core/types";
import { usePeople } from "../core/usePeople";
import * as styles from "./app.module.scss";
import { Person } from "./person";
import { PersonDetails } from "./person-details";

export function App() {
  const { people, loading, error } = usePeople();
  const [selected, setSelected] = useState<PersonType>();

  return (
    <main className={styles.main}>
      {selected ? (
        <PersonDetails person={selected} onBack={() => setSelected(undefined)} />
      ) : (
        <>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <List className={styles.list}>
            {people.map((p) => (
              <li key={p.name}>
                <Person person={p} onSelect={() => setSelected(p)} />
              </li>
            ))}
          </List>
        </>
      )}
    </main>
  );
}
