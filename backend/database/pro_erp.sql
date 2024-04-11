-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 11, 2024 at 07:26 PM
-- Server version: 8.0.36-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pro_erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `pro_menus`
--

CREATE TABLE `pro_menus` (
  `menu_id` int NOT NULL,
  `parent_menu_id` int DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `menu_name` varchar(555) DEFAULT NULL,
  `menu_icon` text,
  `url` text,
  `sub_menu` enum('0','1') NOT NULL DEFAULT '0',
  `menu_order` int DEFAULT NULL,
  `components_page` varchar(888) DEFAULT NULL,
  `components_load` enum('0','1') NOT NULL DEFAULT '0',
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `pro_menus`
--

INSERT INTO `pro_menus` (`menu_id`, `parent_menu_id`, `module_id`, `menu_name`, `menu_icon`, `url`, `sub_menu`, `menu_order`, `components_page`, `components_load`, `is_deleted`) VALUES
(1, NULL, 1, 'DashBoard', 'images/icons/dashboard.png', 'project_management', '0', 1, 'ProjectManagementPage', '1', '0'),
(2, NULL, 1, 'TimeLine', 'images/icons/pms/paper-plane.png', 'timeline', '0', 2, 'TimeLinePage', '1', '0'),
(3, NULL, 1, 'Events', 'images/icons/pms/event.png', 'events', '0', 3, 'EventsPage', '1', '0'),
(4, NULL, 1, 'Notes', 'images/icons/pms/post-it.png', 'notes', '0', 4, 'NotesPage', '1', '0'),
(5, NULL, 2, 'DashBoard', 'images/icons/dashboard.png', 'inventory_management', '0', 1, 'InventoryManagementPage', '1', '0'),
(6, NULL, 2, 'Store', 'images/icons/inventory/grocery-store.png', 'store', '0', 2, NULL, '0', '0'),
(7, NULL, 3, 'DashBoard', 'images/icons/dashboard.png', 'hrm', '0', 1, 'HumanResourceManagementPage', '1', '0'),
(8, NULL, 3, 'Self Services', 'images/icons/hrm/self-service.png', 'self_services', '1', 2, NULL, '0', '0'),
(9, NULL, 3, 'Leave', 'images/icons/hrm/leave.png', 'leave', '1', 3, NULL, '0', '0'),
(10, NULL, 3, 'Time', 'images/icons/hrm/calendar.png', 'time', '1', 4, NULL, '0', '0'),
(11, 8, 3, 'Employment', NULL, 'employment_view', '0', 1, 'EmploymentPage', '1', '0'),
(12, 8, 3, 'Contacts', NULL, 'contacts', '0', 2, NULL, '0', '0'),
(13, 8, 3, 'Personal', NULL, 'personal', '0', 3, NULL, '0', '0'),
(14, 8, 3, 'Statutory', NULL, 'statutory', '0', 4, NULL, '0', '0'),
(15, 8, 3, 'Bank', NULL, 'bank', '0', 5, NULL, '0', '0'),
(16, 8, 3, 'Family', NULL, 'family', '0', 6, NULL, '0', '0'),
(17, 8, 3, 'Nominee', NULL, 'nominee', '0', 7, NULL, '0', '0'),
(18, 8, 3, 'Immigration', NULL, 'immigration', '0', 8, NULL, '0', '0'),
(19, 8, 3, 'Driving Licenses', NULL, 'driving_licenses', '0', 9, NULL, '0', '0'),
(20, 8, 3, 'Skills', NULL, 'skills', '0', 10, NULL, '0', '0'),
(21, 8, 3, 'Languages', NULL, 'languages', '0', 11, NULL, '0', '0'),
(22, 8, 3, 'Qualifications', NULL, 'qualifications', '0', 12, NULL, '0', '0'),
(23, 8, 3, 'Social Details', NULL, 'social_details', '0', 13, NULL, '0', '0'),
(24, 8, 3, 'Assets List', NULL, 'assets_list', '0', 14, NULL, '0', '0'),
(25, 8, 3, 'Previous Experience', NULL, 'previous_experience', '0', 15, NULL, '0', '0'),
(26, 8, 3, 'CTC', NULL, 'ctc', '0', 16, NULL, '0', '0'),
(27, 8, 3, 'Payslip', NULL, 'payslip', '0', 17, NULL, '0', '0'),
(28, 8, 3, 'Download Payslip', NULL, 'download_payslip', '0', 18, NULL, '0', '0'),
(29, 8, 3, 'Yearly Payslip', NULL, 'yearly_payslip', '0', 19, NULL, '0', '0'),
(30, 8, 3, 'Monthly Report', NULL, 'monthly_report', '0', 20, NULL, '0', '0'),
(31, 8, 3, 'Download PF Card', NULL, 'pf_card', '0', 21, NULL, '0', '0'),
(32, 8, 3, 'View Tax Eligibility', NULL, 'view_tax_eligibility', '0', 22, NULL, '0', '0'),
(33, 8, 3, 'Tax Projection', NULL, 'tax_projection', '0', 23, NULL, '0', '0'),
(34, 8, 3, 'Download Tax Projection', NULL, 'download_tax_projection', '0', 24, NULL, '0', '0'),
(35, 8, 3, 'Download Form 16', NULL, 'download_form_sixty', '0', 25, NULL, '0', '0'),
(36, 8, 3, 'Declaration List', NULL, 'declaration_list', '0', 26, NULL, '0', '0'),
(37, 9, 3, 'My Leave Register', NULL, 'leave_register', '0', 1, NULL, '0', '0'),
(38, 9, 3, 'Leave Apply', NULL, 'leave_apply', '0', 2, NULL, '0', '0'),
(39, 9, 3, 'Outdoor Duty Apply', NULL, 'outdoor_duty_apply', '0', 3, NULL, '0', '0'),
(40, 9, 3, 'Comp.Off apply', NULL, 'comp_off_apply', '0', 4, NULL, '0', '0'),
(41, 9, 3, 'leave Encashment', NULL, 'leave_encashment', '0', 5, NULL, '0', '0'),
(42, 9, 3, 'Leave Adjustment', NULL, 'leave_adjustment', '0', 6, NULL, '0', '0'),
(43, 10, 3, 'My Attendance', NULL, 'my_attendance', '0', 1, NULL, '0', '0'),
(44, 10, 2, 'Holiday', NULL, 'holiday', '0', 2, NULL, '0', '0'),
(45, 10, 3, 'Shift Change', NULL, 'shift_change', '0', 3, NULL, '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `pro_modules`
--

CREATE TABLE `pro_modules` (
  `module_id` int NOT NULL,
  `module_name` text,
  `key` text,
  `components` text,
  `module_icon` text,
  `description` text,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `pro_modules`
--

INSERT INTO `pro_modules` (`module_id`, `module_name`, `key`, `components`, `module_icon`, `description`, `is_deleted`) VALUES
(1, 'Projects Management', 'project_management', 'Project', 'project-management.png', 'Turning Visions into Reality: Your Project Management Journey Starts Here.', '0'),
(2, 'Inventory Management', 'inventory_management', 'Inventory', 'stock-keeping-unit.png', 'Master Your Inventory, Empower Your Business: Simplify with Precision.', '1'),
(3, 'Human Resource Management', 'hrm', 'HRM', 'human-resource.png', 'Unleash Your Team\'s Potential: HR Solutions for Tomorrow\'s Success.', '1'),
(4, 'Customer Relationship Management', 'crm', 'CRM', 'management.png', 'Empowering Relationships: Elevate Your Customer Experience with CRM.', '1');

-- --------------------------------------------------------

--
-- Table structure for table `pro_timeline_post`
--

CREATE TABLE `pro_timeline_post` (
  `post_id` int NOT NULL,
  `post_description` text,
  `post_files` text,
  `created_by` text,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

--
-- Dumping data for table `pro_timeline_post`
--

INSERT INTO `pro_timeline_post` (`post_id`, `post_description`, `post_files`, `created_by`, `created`, `is_deleted`) VALUES
(1, 'nodeJs tutorial', '[\"PP.Mastering.Node.js.Nov.2013.www.EBooksWorld.ir.pdf\"]', '6617a08523a900f694dfb5c4', '2024-04-11 19:00:59', '0'),
(2, 'test', '[\"pexels-michael-burrows-7147454.jpg\",\"pexels-pixabay-159045.jpg\"]', '6617a08523a900f694dfb5c4', '2024-04-11 19:02:17', '0'),
(3, 'fdsfds fds fdsfdsfdsfdsf', '[\"pexels-alena-shekhovtcova-6074931.jpg\",\"pexels-michael-burrows-7147454.jpg\",\"pexels-pixabay-276267.jpg\",\"timeline (1).png\"]', '65f0652570b17cc443d42e02', '2024-04-11 19:03:49', '0'),
(4, 'Node', '[\"learning-nodejs-development.pdf\"]', '65f0652570b17cc443d42e02', '2024-04-11 19:06:51', '0'),
(5, 'Calendar Marathi.', '[\"Kalnirnay 2024.pdf\"]', '65f0652570b17cc443d42e02', '2024-04-11 19:13:04', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pro_menus`
--
ALTER TABLE `pro_menus`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indexes for table `pro_modules`
--
ALTER TABLE `pro_modules`
  ADD PRIMARY KEY (`module_id`);

--
-- Indexes for table `pro_timeline_post`
--
ALTER TABLE `pro_timeline_post`
  ADD PRIMARY KEY (`post_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pro_menus`
--
ALTER TABLE `pro_menus`
  MODIFY `menu_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `pro_modules`
--
ALTER TABLE `pro_modules`
  MODIFY `module_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pro_timeline_post`
--
ALTER TABLE `pro_timeline_post`
  MODIFY `post_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
