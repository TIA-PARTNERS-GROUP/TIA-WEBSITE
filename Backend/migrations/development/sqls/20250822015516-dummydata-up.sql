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
VALUES 
  (1, "Alliance"),
  (2, "Complementary"),
  (3, "Mastermind");


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

-- Complementary Partners
INSERT INTO users (first_name, last_name, contact_email)
VALUES 
  ('Sarah', 'Chen', NULL),
  ('Mike', 'Rodriguez', NULL),
  ('Jessica', 'Wong', NULL);

INSERT INTO businesses (id, operator_user_id, name, tagline, contact_name, contact_phone_no, contact_email, description)
VALUES
  (101, (SELECT id FROM users WHERE first_name='Sarah' AND last_name='Chen'), 'Digital Marketing Pro', NULL, 'Sarah Chen', NULL, NULL, 'Specializes in social media and online advertising campaigns'),
  (102, (SELECT id FROM users WHERE first_name='Mike' AND last_name='Rodriguez'), 'WebFlow Masters', NULL, 'Mike Rodriguez', NULL, NULL, 'Creates high-converting landing pages and business websites'),
  (103, (SELECT id FROM users WHERE first_name='Jessica' AND last_name='Wong'), 'Content Creators Co', NULL, 'Jessica Wong', NULL, NULL, 'Produces engaging blog content and video marketing materials');

-- Alliance Partners
INSERT INTO users (first_name, last_name, contact_email)
VALUES
  ('David', 'Thompson', NULL),
  ('Lisa', 'Park', NULL),
  ('Robert', 'Johnson', NULL);

INSERT INTO businesses (id, operator_user_id, name, tagline, contact_name, contact_phone_no, contact_email, description)
VALUES
  (201, (SELECT id FROM users WHERE first_name='David' AND last_name='Thompson'), 'Thompson Construction', NULL, 'David Thompson', NULL, NULL, 'Commercial construction specialist with 15 years experience'),
  (202, (SELECT id FROM users WHERE first_name='Lisa' AND last_name='Park'), 'Park Engineering Solutions', NULL, 'Lisa Park', NULL, NULL, 'Licensed engineer for complex architectural projects'),
  (203, (SELECT id FROM users WHERE first_name='Robert' AND last_name='Johnson'), 'Johnson Electrical Systems', NULL, 'Robert Johnson', NULL, NULL, 'Commercial electrical contractor for large-scale projects');

-- Mastermind Partners
INSERT INTO users (first_name, last_name, contact_email)
VALUES
  ('Amanda', 'Foster', NULL),
  ('James', 'Kumar', NULL),
  ('Maria', 'Gonzalez', NULL);

INSERT INTO businesses (id, operator_user_id, name, tagline, contact_name, contact_phone_no, contact_email, description)
VALUES
  (301, (SELECT id FROM users WHERE first_name='Amanda' AND last_name='Foster'), 'Amanda Foster Consulting', NULL, 'Amanda Foster', NULL, NULL, 'Serial entrepreneur who has scaled 3 businesses to 7-figures'),
  (302, (SELECT id FROM users WHERE first_name='James' AND last_name='Kumar'), 'James Kumar Consulting', NULL, 'James Kumar', NULL, NULL, 'Operations expert who streamlines business processes'),
  (303, (SELECT id FROM users WHERE first_name='Maria' AND last_name='Gonzalez'), 'Maria Gonzalez Consulting', NULL, 'Maria Gonzalez', NULL, NULL, 'Sales guru with proven track record in B2B markets');

INSERT INTO business_skills (id, name)
VALUES
  (1, 'App Development'),
  (2, 'Cloud Solutions'),
  (3, 'Cyber Security'),
  (4, 'Data Cabling'),
  (5, 'Electronic Security Solutions'),
  (6, 'Internet Communications'),
  (7, 'IP Phone Solutions (VOIP)'),
  (8, 'IT Helpdesk'),
  (9, 'IT Strategy'),
  (10, 'Managed IT Services'),
  (11, 'Project Management'),
  (12, 'Systems Integration'),
  (13, 'Web Development'),
  (14, 'Wireless Solutions');

INSERT INTO regions (id, name)
VALUES
  ('nsw', 'New South Wales'),
  ('vic', 'Victoria'),
  ('qld', 'Queensland'),
  ('wa', 'Western Australia'),
  ('sa', 'South Australia'),
  ('tas', 'Tasmania'),
  ('nt', 'Northern Territory'),
  ('act', 'Australian Capital Territory');

INSERT INTO business_types (id, name)
VALUES (1, 'Technology');

INSERT INTO skill_categories (id, name, business_type_id)
VALUES 
  (1, 'General', 1),
  (2, 'Software Development', 1),
  (3, 'Networking', 1),
  (4, 'Security', 1);

INSERT INTO skills (id, category_id, name, picture)
VALUES
  (1, 2, 'App Development', NULL),
  (2, 2, 'Cloud Solutions', NULL),
  (3, 4, 'Cyber Security', NULL),
  (4, 3, 'Data Cabling', NULL),
  (5, 4, 'Electronic Security Solutions', NULL),
  (6, 3, 'Internet Communications', NULL),
  (7, 3, 'IP Phone Solutions (VOIP)', NULL),
  (8, 1, 'IT Helpdesk', NULL),
  (9, 1, 'IT Strategy', NULL),
  (10, 1, 'Managed IT Services', NULL),
  (11, 1, 'Project Management', NULL),
  (12, 1, 'Systems Integration', NULL),
  (13, 2, 'Web Development', NULL),
  (14, 3, 'Wireless Solutions', NULL);