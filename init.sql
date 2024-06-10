CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Funcs
CREATE OR REPLACE FUNCTION getSalt()
  RETURNS text AS
$$
BEGIN
	RETURN '$2a$06$x.9wWG5KH75vjDr1w.eYM.';
END;
$$
LANGUAGE 'plpgsql';

CREATE TABLE IF NOT EXISTS "User" (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username varchar UNIQUE,
  email varchar,
  password varchar,
  name varchar,
  last_login date,
  location varchar,
  userType int,
);

CREATE TABLE IF NOT EXISTS "Order" (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  content varchar
  orderedBy uuid REFERENCES "User" (user_id),
  courierId uuid REFERENCES "User" (user_id),
  created_at date,
  location varchar,
  status int,
);

