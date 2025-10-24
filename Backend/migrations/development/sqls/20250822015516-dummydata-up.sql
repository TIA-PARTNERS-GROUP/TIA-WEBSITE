
INSERT INTO users (id, first_name, last_name, contact_email) VALUES
(3, 'Bob', 'Smith', 'bobsmith@email.com'),
(4, 'Alice', 'Smith', 'alicesmith@email.com'),
(5, 'Steve', 'Smith', 'stevesmith@email.com'),
(6, 'Sarah', 'Chen', 'sarahchen@email.com'),
(7, 'Mike', 'Rodriguez', 'mikerodriguez@email.com'),
(8, 'Jessica', 'Wong', 'jessicawong@email.com'),
(9, 'David', 'Thompson', 'davidthompson@email.com'),
(10, 'Lisa', 'Park', 'lisapark@email.com'),
(11, 'Robert', 'Johnson', 'robertjohnson@email.com'),
(12, 'Amanda', 'Foster', 'amandafoster@email.com'),
(13, 'James', 'Kumar', 'jameskumar@email.com'),
(14, 'Maria', 'Gonzalez', 'mariagonzalez@email.com');

INSERT INTO user_logins (user_id, login_email, password_hash) VALUES
(3, 'bobsmith@email.com', '$argon2id$v=19$m=16,t=2,p=1$aEhyazNFeENsNGUyVHhIaA$Soit2BqqR8CzvMEjdHM6gA'),
(4, 'alicesmith@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(5, 'stevesmith@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(6, 'sarahchen@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(7, 'mikerodriguez@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(8, 'jessicawong@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(9, 'davidthompson@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(10, 'lisapark@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(11, 'robertjohnson@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(12, 'amandafoster@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(13, 'jameskumar@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA'),
(14, 'mariagonzalez@email.com', '$argon2id$v=19$m=16,t=2,p=1$ZnNWV1d2NmhEcHdqS1dnVQ$3BS7qPg660+dTHHM7KwbmA');

INSERT INTO business_categories (id, name) VALUES 
(1, 'AI Services'),
(2, 'Software Development'),
(3, 'Sales and Marketing'),
(4, 'Cloud Computing & Infrastructure'),
(5, 'Cybersecurity Services'),
(6, 'Data Analytics & AI'),
(7, 'E-commerce Solutions'),
(8, 'FinTech & Financial Services'),
(9, 'HealthTech'),
(10, 'EdTech'),
(11, 'IoT & Hardware'),
(12, 'Blockchain & Web3'),
(13, 'Mobile Development'),
(14, 'SaaS Products'),
(15, 'IT Consulting'),
(16, 'DevOps & Infrastructure'),
(17, 'UI/UX Design'),
(18, 'QA & Testing Services'),
(19, 'AR/VR Development'),
(20, 'Game Development');

INSERT INTO businesses (id, operator_user_id, name, tagline, contact_name, contact_phone_no, contact_email, description, business_category_id) VALUES
(1, 3, 'BS Industries', 'BS is the BeSt', 'Bob Smith', '0123456789', 'bobsmith@email.com', 'We make things!!', 2),
(2, 4, 'A-Team', 'AT our best', 'Alice Smith', '0123456789', 'alicesmith@email.com', 'We make things!!', 2),
(3, 5, 'Steve''s Lava Chicken', 'It''s tasty as hell!', 'Steve', '0123456789', 'stevesmith@email.com', 'It''s a lava attack!', 7),
(101, 6, 'Digital Marketing Pro', 'Grow Your Business Online', 'Sarah Chen', '0123456789', 'sarahchen@email.com', 'Specializes in social media and online advertising campaigns', 3),
(102, 7, 'WebFlow Masters', 'Beautiful, Functional Websites', 'Mike Rodriguez', '0123456789', 'mikerodriguez@email.com', 'Creates high-converting landing pages and business websites', 13),
(103, 8, 'Content Creators Co', 'Engaging Content That Converts', 'Jessica Wong', '0123456789', 'jessicawong@email.com', 'Produces engaging blog content and video marketing materials', 3),
(201, 9, 'Thompson Construction', 'Building Your Future', 'David Thompson', '0123456789', 'davidthompson@email.com', 'Commercial construction specialist with 15 years experience', 11),
(202, 10, 'Park Engineering Solutions', 'Engineering Excellence', 'Lisa Park', '0123456789', 'lisapark@email.com', 'Licensed engineer for complex architectural projects', 11),
(203, 11, 'Johnson Electrical Systems', 'Powering Your Projects', 'Robert Johnson', '0123456789', 'robertjohnson@email.com', 'Commercial electrical contractor for large-scale projects', 11),
(301, 12, 'Amanda Foster Consulting', 'Scale Your Business', 'Amanda Foster', '0123456789', 'amandafoster@email.com', 'Serial entrepreneur who has scaled 3 businesses to 7-figures', 15),
(302, 13, 'James Kumar Consulting', 'Optimize Your Operations', 'James Kumar', '0123456789', 'jameskumar@email.com', 'Operations expert who streamlines business processes', 15),
(303, 14, 'Maria Gonzalez Consulting', 'Boost Your Sales', 'Maria Gonzalez', '0123456789', 'mariagonzalez@email.com', 'Sales guru with proven track record in B2B markets', 15);

INSERT INTO connection_types (id, name) VALUES 
(1, 'Alliance'),
(2, 'Complementary'),
(3, 'Mastermind');

INSERT INTO business_connections (initiating_business_id, receiving_business_id, connection_type_id, active, date_initiated) VALUES 
(1, 101, 2, 1, CURRENT_TIME()),
(2, 102, 2, 1, CURRENT_TIME()),
(1, 103, 2, 1, CURRENT_TIME()),
(201, 202, 1, 1, CURRENT_TIME()),
(201, 203, 1, 1, CURRENT_TIME()),
(202, 203, 1, 1, CURRENT_TIME()),
(301, 302, 3, 1, CURRENT_TIME()),
(301, 303, 3, 1, CURRENT_TIME()),
(302, 303, 3, 1, CURRENT_TIME()),
(1, 201, 1, 1, CURRENT_TIME()),
(2, 301, 2, 1, CURRENT_TIME()),
(101, 303, 2, 1, CURRENT_TIME()),
(102, 2, 2, 1, CURRENT_TIME());

INSERT INTO daily_activities (id, name, description) VALUES 
(1, 'Connection', 'Make a connection with another business');

INSERT INTO business_skills (id, name) VALUES
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

INSERT INTO regions (id, name) VALUES
('nsw', 'New South Wales'),
('vic', 'Victoria'),
('qld', 'Queensland'),
('wa', 'Western Australia'),
('sa', 'South Australia'),
('tas', 'Tasmania'),
('nt', 'Northern Territory'),
('act', 'Australian Capital Territory');

INSERT INTO business_types (id, name) VALUES (1, 'Technology');

INSERT INTO skill_categories (id, name, business_type_id) VALUES 
(1, 'General', 1),
(2, 'Software Development', 1),
(3, 'Networking', 1),
(4, 'Security', 1);

INSERT INTO skills (id, category_id, name, picture) VALUES
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

INSERT INTO strength_categories (id, name) VALUES 
(1, 'Financial'),
(2, 'Operational Efficiency'),
(3, 'Products & Services'),
(4, 'Customers & Market Position');

INSERT INTO strengths (id, category_id, name) VALUES 
(1, 1, 'High Profit Margins'),
(2, 1, 'Strong Cash Flow'),
(3, 1, 'Diverse Revenue Streams'),
(4, 1, 'Low Debt-to-Equity Ratio'),
(5, 2, 'Efficient Supply Chain'),
(6, 2, 'Proprietary Technology or Systems'),
(7, 2, 'Low Production Costs'),
(8, 2, 'Proven Project Management Methodology'),
(9, 3, 'Proprietary IP/Patents'),
(10, 3, 'Proven Quality & Reliability'),
(11, 3, 'Unique Value Proposition (UVP)'),
(12, 4, 'Loyal & Diversified Customer Base'),
(13, 4, 'Large Market Share'),
(14, 4, 'Strong Customer Relationships');

INSERT INTO user_skills (skill_id, user_id) VALUES 
(1, 3), (2, 3), (9, 3), (11, 3), (13, 3),
(1, 4), (2, 4), (11, 4), (13, 4), (12, 4),
(13, 5), (11, 5), (8, 5),
(13, 6), (11, 6),
(13, 7), (1, 7), (11, 7),
(13, 8), (11, 8),
(4, 9), (6, 9), (14, 9), (11, 9),
(4, 10), (12, 10), (11, 10), (14, 10),
(4, 11), (5, 11), (7, 11), (14, 11),
(9, 12), (11, 12), (10, 12),
(9, 13), (11, 13), (12, 13),
(9, 14), (11, 14), (10, 14);

INSERT INTO user_strengths (strength_id, user_id) VALUES 
(6, 3), (8, 3), (11, 3), (10, 3), (2, 3),
(7, 4), (10, 4), (8, 4), (5, 4), (12, 4),
(13, 5), (12, 5), (11, 5), (2, 5),
(14, 6), (10, 6), (12, 6), (11, 6),
(7, 7), (5, 7), (8, 7), (10, 7),
(12, 8), (10, 8), (14, 8), (11, 8),
(2, 9), (10, 9), (12, 9), (4, 9),
(6, 10), (5, 10), (10, 10), (8, 10),
(13, 11), (12, 11), (10, 11), (2, 11),
(1, 12), (11, 12), (14, 12), (9, 12),
(8, 13), (5, 13), (6, 13), (14, 13),
(14, 14), (12, 14), (11, 14), (1, 14);

INSERT INTO business_services (service_id, business_id, description) VALUES
(1, 1, 'Custom web application development'),
(2, 1, 'Enterprise software solutions'),
(3, 1, 'Cloud migration services'),
(4, 2, 'Mobile app development'),
(5, 2, 'E-commerce platform development'),
(6, 2, 'API integration services'),
(7, 3, 'Online food ordering system'),
(8, 3, 'Restaurant management software'),
(9, 3, 'Delivery logistics platform'),
(10, 101, 'Social media marketing campaigns'),
(11, 101, 'Google Ads management'),
(12, 101, 'Brand strategy development'),
(13, 102, 'Responsive website design'),
(14, 102, 'Landing page optimization'),
(15, 102, 'Website performance auditing'),
(16, 103, 'Content marketing strategy'),
(17, 103, 'Video production services'),
(18, 103, 'Blog content creation'),
(19, 201, 'Commercial building construction'),
(20, 201, 'Project management services'),
(21, 201, 'Construction consulting'),
(22, 202, 'Structural engineering design'),
(23, 202, 'Building certification'),
(24, 202, 'Engineering project management'),
(25, 203, 'Electrical system installation'),
(26, 203, 'Smart building solutions'),
(27, 203, 'Electrical safety audits'),
(28, 301, 'Business scaling strategy'),
(29, 301, 'Growth consulting'),
(30, 301, 'Executive coaching'),
(31, 302, 'Process optimization'),
(32, 302, 'Operational efficiency analysis'),
(33, 302, 'Workflow automation consulting'),
(34, 303, 'Sales team training'),
(35, 303, 'B2B sales strategy'),
(36, 303, 'Customer acquisition planning');

INSERT INTO business_clients (client_id, business_id, description) VALUES
(1, 1, 'Medium to large enterprises'),
(2, 1, 'Healthcare organizations'),
(3, 1, 'Financial institutions'),
(4, 1, 'Educational institutions'),
(5, 2, 'Startups and scale-ups'),
(6, 2, 'E-commerce businesses'),
(7, 2, 'Educational technology companies'),
(8, 3, 'Corporate offices and businesses'),
(9, 3, 'Event organizers and venues'),
(10, 3, 'Educational campuses'),
(11, 101, 'Consumer brands and retailers'),
(12, 101, 'Technology startups'),
(13, 101, 'Hospitality businesses'),
(14, 102, 'Professional service firms'),
(15, 102, 'Real estate agencies'),
(16, 102, 'Non-profit organizations'),
(17, 103, 'B2B technology companies'),
(18, 103, 'Manufacturing businesses'),
(19, 103, 'Healthcare providers'),
(20, 201, 'Commercial property developers'),
(21, 201, 'Corporate facility managers'),
(22, 201, 'Government agencies'),
(23, 202, 'Architecture and design firms'),
(24, 202, 'Construction companies'),
(25, 202, 'Property development groups'),
(26, 203, 'Commercial building owners'),
(27, 203, 'Industrial facilities'),
(28, 203, 'Office complex managers'),
(29, 301, 'SaaS and technology companies'),
(30, 301, 'Manufacturing businesses'),
(31, 301, 'Retail chains'),
(32, 302, 'Logistics and supply chain companies'),
(33, 302, 'Healthcare organizations'),
(34, 302, 'Technology firms'),
(35, 303, 'Software companies'),
(36, 303, 'Service-based businesses'),
(37, 303, 'Manufacturing companies');