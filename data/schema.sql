-- SQLite / PostgreSQL compatible schema for discussion purposes.
-- Candidates are NOT expected to implement this; it exists for the
-- "normalise and discuss scaling" portion of the interview.

CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  height VARCHAR(10),
  mass VARCHAR(10),
  hair_color VARCHAR(50),
  skin_color VARCHAR(50),
  eye_color VARCHAR(50),
  birth_year VARCHAR(20),
  gender VARCHAR(20),
  homeworld VARCHAR(255),
  created TIMESTAMP,
  edited TIMESTAMP,
  url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS films (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS people_films (
  person_id INT REFERENCES people(id),
  film_id INT REFERENCES films(id),
  PRIMARY KEY (person_id, film_id)
);

-- For full-text search discussion:
-- CREATE INDEX idx_people_name_trgm ON people USING gin (name gin_trgm_ops);
-- CREATE INDEX idx_people_name_lower ON people (LOWER(name));
