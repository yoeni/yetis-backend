CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";



CREATE TABLE IF NOT EXISTS "User" (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username varchar(255) UNIQUE,
  email varchar(255),
  password varchar(255),
  name varchar(255),
  last_login date DEFAULT current_timestamp,
  location varchar(255),
  userType int
);

CREATE TABLE IF NOT EXISTS "Order" (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  content varchar(255),
  orderedBy uuid REFERENCES "User" (id),
  courierId uuid REFERENCES "User" (id),
  created_at date DEFAULT current_timestamp,
  location varchar(255),
  status int
);


CREATE OR REPLACE FUNCTION defore_delete_user()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM "Order" WHERE orderedBy = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_delete_user_trigger
BEFORE DELETE ON "User"
FOR EACH ROW
EXECUTE FUNCTION defore_delete_user();

-- Funcs
CREATE OR REPLACE FUNCTION getSalt()
  RETURNS text AS
$$
BEGIN
	RETURN '$2a$06$x.9wWG5KH75vjDr1w.eYM.';
END;
$$
LANGUAGE 'plpgsql';