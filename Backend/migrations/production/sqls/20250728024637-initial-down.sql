-- Disable foreign key checks so drops succeed regardless of FK order
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `business_categories`;
DROP TABLE IF EXISTS `business_clients`;
DROP TABLE IF EXISTS `business_connections`;
DROP TABLE IF EXISTS `business_phases`;
DROP TABLE IF EXISTS `business_roles`;
DROP TABLE IF EXISTS `business_services`;
DROP TABLE IF EXISTS `business_skills`;
DROP TABLE IF EXISTS `business_strengths`;
DROP TABLE IF EXISTS `business_types`;
DROP TABLE IF EXISTS `businesses`;
DROP TABLE IF EXISTS `connection_types`;
DROP TABLE IF EXISTS `daily_activities`;
DROP TABLE IF EXISTS `daily_activity_enrolments`;
DROP TABLE IF EXISTS `feedback`;
DROP TABLE IF EXISTS `l2e_responses`;
DROP TABLE IF EXISTS `migrations`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `project_applicants`;
DROP TABLE IF EXISTS `project_business_categories`;
DROP TABLE IF EXISTS `project_business_skills`;
DROP TABLE IF EXISTS `project_regions`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `regions`;
DROP TABLE IF EXISTS `skill_categories`;
DROP TABLE IF EXISTS `skills`;
DROP TABLE IF EXISTS `strength_categories`;
DROP TABLE IF EXISTS `strengths`;
DROP TABLE IF EXISTS `subscriptions`;
DROP TABLE IF EXISTS `user_business_strengths`;
DROP TABLE IF EXISTS `user_case_studies`;
DROP TABLE IF EXISTS `user_daily_activity_progress`;
DROP TABLE IF EXISTS `user_dashboard_configs`;
DROP TABLE IF EXISTS `user_logins`;
DROP TABLE IF EXISTS `user_posts`;
DROP TABLE IF EXISTS `user_sessions`;
DROP TABLE IF EXISTS `user_skills`;
DROP TABLE IF EXISTS `user_strengths`;
DROP TABLE IF EXISTS `user_subscriptions`;
DROP TABLE IF EXISTS `user_testimonials`;
DROP TABLE IF EXISTS `users`;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;