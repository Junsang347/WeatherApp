



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
); 



