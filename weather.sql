-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Database: `weatherapp`
--

CREATE DATABASE IF NOT EXISTS `weatherapp`;
USE `weatherapp`;

-- --------------------------------------------------------

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(10) DEFAULT NULL,
  `main_weather` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `icon` varchar(10) DEFAULT NULL,
  `temperature` float NOT NULL,
  `humidity` float NOT NULL,
  `pressure` float NOT NULL,
  `wind_speed` float NOT NULL,
  `wind_deg` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weather`
--

INSERT INTO `weather` (`id`, `city`, `country`, `main_weather`, `description`, `icon`, `temperature`, `humidity`, `pressure`, `wind_speed`, `wind_deg`, `created_at`) VALUES
(1, 'Nottingham', 'GB', 'Clouds', 'overcast clouds', '04d', 9.5, 78, 1015, 3.5, 220, '2026-06-28 10:15:00'),
(2, 'Nottingham', 'GB', 'Rain', 'light rain', '10d', 8.2, 85, 1012, 4.1, 195, '2026-06-29 14:30:00'),
(3, 'London', 'GB', 'Clouds', 'scattered clouds', '03d', 12.3, 65, 1018, 5.2, 180, '2026-06-30 09:00:00'),
(4, 'Manchester', 'GB', 'Rain', 'moderate rain', '10d', 7.8, 90, 1010, 6.0, 240, '2026-06-30 11:45:00'),
(5, 'Nottingham', 'GB', 'Clear', 'clear sky', '01d', 14.1, 55, 1020, 2.8, 160, '2026-07-01 08:20:00');

COMMIT;
