-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2021 at 12:29 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectb_nodejs_mysql_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `country` varchar(100) NOT NULL,
  `gender` tinyint(4) NOT NULL,
  `user_type` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `full_name`, `dob`, `country`, `gender`, `user_type`, `status`, `created_at`, `updated_at`) VALUES
(1, 'johndoe1', 'johndoe@gmail.com', '$2a$12$.8EP4GGi0o8eGgArDj0GU.yTHZaIq/kHHT37NSmnPj7dOtUwes/cy', 'John Doe', '2021-11-01', 'Pakistan', 0, 'Professional', 1, '2021-11-08 08:56:24', '2021-11-08 08:56:24'),
(3, 'janedoe2', 'janedoe2@gmail.com', '1111', 'Jane Doe', '2021-11-01', 'Pakistan', 0, 'Professional', 1, '2021-11-08 09:15:58', '2021-11-08 09:15:58'),
(4, 'johnwick', 'johnwick@gmail.com', '1111', 'John Wick', '2009-10-11', 'Pakistan', 0, 'professional', 1, '2021-11-08 04:38:43', '2021-11-08 04:38:43'),
(5, 'janewick', 'janewick@gmail.com', '$2a$10$UHytMFHoqu/FTtfimHMG7uS1f7QhZhmG7gDhW5s9fUf503oVEzGIe', 'Jane Wick', '2009-10-05', 'Pakistan', 1, 'Professional', 1, '2021-11-12 11:23:02', '2021-11-12 11:23:02'),
(6, 'janewick2', 'janewick2@gmail.com', '$2a$10$vcLpN4nT9te3mgZIof7OsubfA6RIeJJ/3HkBw3XacFEdtTC69YDWO', 'Jane Wick Jr.', '2009-09-05', 'Pakistan', 1, 'Professional', 1, '2021-11-12 11:25:59', '2021-11-12 11:25:59'),
(7, 'ukhan2', 'uzair@gmail.com', '$2a$10$N/T2wGKhFgVU.sScgVh23.GVYgNyMW8reNqYeZxbDDyZ3J6MjfPEa', 'Khan Uzair', '2010-05-12', 'India', 0, 'Professional', 1, '2021-11-12 14:58:25', '2021-11-12 14:58:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
