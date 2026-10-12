import { useEffect, useState } from "react";
import mockPeople from "./mock-people.json";
import { Person } from "./types";

// Mirrors the backend contract: GET /people?page=<n>&limit=<n>
// -> { data: Person[], meta: { total, page, limit } }
const fetchPeople = async (page = 1, limit = 100) => {
  const offset = (page - 1) * limit;
  const data = (mockPeople as Person[]).slice(offset, offset + limit);
  return { data, meta: { total: mockPeople.length, page, limit } };
};

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPeople()
      .then((json) => setPeople(json.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { people, loading, error };
};
