INSERT INTO users (id, first_name, last_name, contact_email)
VALUES (3, "Bob", "Smith", "bobsmith@email.com");

INSERT INTO user_logins (user_id, login_email, password_hash)
VALUES (3, "bobsmith@email.com", "$argon2id$v=19$m=16,t=2,p=1$aEhyazNFeENsNGUyVHhIaA$Soit2BqqR8CzvMEjdHM6gA");

INSERT INTO businesses (id, operator_user_id, name, tagline, contact_name, contact_phone_no, contact_email, description)
VALUES (1, 3, "BS Industries", "BS is the BeSt", "Bob Smith", "0123456789", "bobsmith@email.com", "We make things!!");


INSERT INTO users (id, first_name, last_name, contact_email)
VALUES (4, "Alice", "Smith", "alicesmith@email.com");

INSERT INTO user_logins (user_id, login_email, password_hash)
VALUES (4, "alicesmith@email.com", "$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA");

INSERT INTO businesses (id, operator_user_id, name, tagline, contact_name, contact_phone_no, contact_email, description)
VALUES (2, 4, "A-Team", "AT our best", "Alice Smith", "0123456789", "alicesmith@email.com", "We make things!!");


INSERT INTO users (id, first_name, last_name, contact_email)
VALUES (5, "Steve", "Smith", "stevesmith@email.com");

INSERT INTO user_logins (user_id, login_email, password_hash)
VALUES (5, "stevesmith@email.com", "$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA");

INSERT INTO businesses (id, operator_user_id, name, tagline, contact_name, contact_phone_no, contact_email, description)
VALUES (3, 5, "Steve's Lava Chicken", "It's tasty as hell!", "Steve", "0123456789", "stevesmith@email.com", "It's a lava attack!");


INSERT INTO connection_types (id, name)
VALUES (1, "SmartConnect");

INSERT INTO business_connections (initiating_business_id, receiving_business_id, connection_type_id, active, date_initiated)
VALUES (1, 2, 1, 1, CURRENT_TIME());

INSERT INTO business_connections (initiating_business_id, receiving_business_id, connection_type_id, active, date_initiated)
VALUES (3, 1, 1, 1, CURRENT_TIME());

INSERT INTO daily_activities (id, name, description)
VALUES (1, "Connection", "Make a connection with another business");

INSERT INTO business_categories (id, name)
VALUES (1, "AI Services"),
       (2, "Software Development"),
       (3, "Sales and Marketing");