-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Apr 16, 2023 at 08:53 PM
-- Server version: 8.0.32
-- PHP Version: 8.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `aid` int NOT NULL,
  `line1` varchar(255) NOT NULL,
  `line2` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zip` int NOT NULL,
  `username` varchar(40) NOT NULL,
  `address_isdeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`aid`, `line1`, `line2`, `city`, `state`, `zip`, `username`, `address_isdeleted`) VALUES
(1, '123 Main St', 'Apt 1', 'nytown', 'CA', 12345, 'user1@example.com', 1),
(2, '456 Oak St', NULL, 'Othertown', 'NY', 67890, 'user2@example.com', 0),
(3, '789 Elm St', NULL, 'Someville', 'MA', 23456, 'user3@example.com', 0),
(4, '10 Pine St', 'Unit 2B', 'Anycity', 'CA', 34567, 'user4@example.com', 0),
(5, '20 Maple St', NULL, 'Otherville', 'NY', 89012, 'user5@example.com', 0),
(6, '30 Birch St', NULL, 'Sometown', 'MA', 45678, 'user6@example.com', 0),
(7, '40 Cedar St', 'Apt 3C', 'Anyplace', 'CA', 56789, 'user7@example.com', 0),
(8, '50 Oak St', NULL, 'Otherplace', 'NY', 12345, 'user8@example.com', 0),
(9, '60 Elm St', NULL, 'Someplace', 'MA', 67890, 'user9@example.com', 0),
(10, '70 Pine St', 'Unit 4B', 'Anystate', 'CA', 23456, 'user10@example.com', 0),
(11, '80 Maple St', NULL, 'Otherstate', 'NY', 34567, 'user11@example.com', 0),
(12, '90 Birch St', NULL, 'Somestate', 'MA', 89012, 'user12@example.com', 0),
(13, '100 Cedar St', 'Apt 5C', 'Anytown', 'CA', 45678, 'user13@example.com', 0),
(14, '110 Oak St', NULL, 'Othertown', 'NY', 56789, 'user14@example.com', 0),
(15, '120 Elm St', NULL, 'Someville', 'MA', 12345, 'user15@example.com', 0),
(16, '130 Pine St', 'Unit 6B', 'Anycity', 'CA', 67890, 'user16@example.com', 0),
(17, '140 Maple St', NULL, 'Otherville', 'NY', 23456, 'user17@example.com', 0),
(18, '150 Birch St', NULL, 'Sometown', 'MA', 34567, 'user18@example.com', 0),
(19, '160 Cedar St', 'Apt 7C', 'Anyplace', 'CA', 89012, 'user19@example.com', 0),
(20, '170 Oak St', NULL, 'Otherplace', 'NY', 45678, 'user20@example.com', 0),
(21, '180 Elm St', NULL, 'Someplace', 'MA', 56789, 'user21@example.com', 0),
(22, '190 Pine St', 'Unit 8B', 'Anystate', 'CA', 12345, 'user22@example.com', 0),
(23, '123 Main St', 'Apt 1', 'Anytown', 'CAA', 12345, 'user1@example.com', 1),
(24, '123 Main St', 'Apt 1', 'Anytown', 'CAA', 12345, 'user1@example.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `bankaccount`
--

CREATE TABLE `bankaccount` (
  `accountid` int NOT NULL,
  `accountnumber` varchar(10) NOT NULL,
  `branchcode` varchar(10) NOT NULL,
  `bank` varchar(50) NOT NULL,
  `routingnumber` varchar(20) NOT NULL,
  `bankaccount_isdeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bankaccount`
--

INSERT INTO `bankaccount` (`accountid`, `accountnumber`, `branchcode`, `bank`, `routingnumber`, `bankaccount_isdeleted`) VALUES
(1, '12345678', '001', 'Bank of America', '111000025', 1),
(2, '87654321', '002', 'Chase', '021000021', 0),
(3, '11112222', '003', 'Wells Fargo', '121000248', 0),
(4, '33334444', '004', 'Citibank', '021000089', 0),
(5, '55556666', '005', 'TD Bank', '031101266', 0),
(6, '77778888', '006', 'Capital One', '031176110', 0),
(7, '99990000', '007', 'US Bank', '123103729', 0),
(8, '11223344', '008', 'PNC Bank', '043000096', 0),
(9, '55667788', '009', 'Fifth Third Bank', '042000013', 0),
(10, '99001122', '010', 'SunTrust Bank', '061000104', 0),
(11, '33445566', '011', 'KeyBank', '041001039', 0),
(12, '77889900', '012', 'HSBC', '021001088', 0),
(13, '22110033', '013', 'BB&T', '053101121', 0),
(14, '44556677', '014', 'Regions Bank', '062005690', 0),
(15, '77882233', '015', 'M&T Bank', '022000046', 0),
(16, '55443323', '016', 'Comerica Bank', '072000091', 1),
(17, '88997766', '017', 'Huntington Bank', '044000024', 0),
(18, '66554433', '018', 'Bank of the West', '121100782', 0),
(19, '11223344', '019', 'Zions Bank', '124000054', 0),
(20, '77889900', '020', 'First Citizens Bank', '053100300', 0),
(21, '33445566', '021', 'BMO Harris Bank', '071025661', 0),
(22, '44556677', '022', 'First Horizon Bank', '084000026', 0),
(23, '77882233', '023', 'Webster Bank', '211170101', 0),
(24, '55443322', '024', 'Associated Bank', '075900575', 0),
(25, '88997766', '025', 'Arvest Bank', '082900872', 0),
(26, '172', '1829', 'chase', '182', 1),
(27, '172', '1829', 'chase', '182', 1),
(28, '55443323', '016', 'Comerica Bank', '072000091', 1),
(29, '55443323', '016', 'Comerica Bank', '072000091', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `pid` int NOT NULL,
  `sid` int NOT NULL,
  `username` varchar(40) NOT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `pid` int NOT NULL,
  `sid` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`pid`, `sid`, `quantity`, `price`, `discount`) VALUES
(1, 26, 10, 99.99, 0.05),
(2, 27, 5, 199.99, 0.10),
(3, 28, 15, 49.99, 0.00),
(3, 29, 20, 299.99, 0.10),
(5, 30, 8, 149.99, 0.05),
(6, 31, 12, 79.99, 0.75),
(7, 32, 6, 249.99, 0.15),
(8, 32, 18, 29.99, 0.00),
(9, 32, 3, 999.99, 0.20),
(10, 35, 1, 499.99, 0.00),
(11, 36, 7, 119.99, 0.05),
(12, 37, 4, 599.99, 0.10),
(13, 38, 2, 899.99, 0.00),
(14, 39, 9, 69.99, 0.00),
(14, 40, 13, 39.99, 0.00),
(14, 41, 11, 149.99, 0.05),
(17, 42, 16, 89.99, 0.00),
(18, 42, 22, 19.99, 0.00),
(20, 45, 14, 69.99, 0.05),
(21, 46, 17, 119.99, 0.00),
(22, 47, 10, 299.99, 0.10),
(23, 48, 6, 499.99, 0.15),
(24, 26, 8, 599.99, 0.00),
(25, 27, 4, 899.99, 0.20);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `pid` int NOT NULL,
  `oid` int NOT NULL,
  `sid` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `oid` int NOT NULL,
  `status` enum('PLACED','PACKED','INTRANSIT','DELIVERED','CANCELED') NOT NULL,
  `timestamp` datetime NOT NULL,
  `username` varchar(40) NOT NULL,
  `aid` int NOT NULL,
  `payid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payid` int NOT NULL,
  `paymentstatus` enum('SUCCESS','PENDING','FAILED','REFUND') NOT NULL,
  `accountid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` int NOT NULL,
  `pname` varchar(50) NOT NULL,
  `pdesc` varchar(200) NOT NULL,
  `pcategory` enum('FASHION','HOME','TOYS','HEALTH','ELECTRONICS') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `pname`, `pdesc`, `pcategory`) VALUES
(1, 'T-shirt', '100% cotton, available in various colors and sizes', 'FASHION'),
(2, 'Sofa', 'Comfortable sofa, perfect for your living room', 'HOME'),
(3, 'Remote Control Car', 'Remote-controlled car for kids', 'TOYS'),
(4, 'Vitamin C Supplement', 'Boost your immunity with our Vitamin C supplement', 'HEALTH'),
(5, 'Smartphone', '5G smartphone with high-end features', 'ELECTRONICS'),
(6, 'Yoga Mat', 'Comfortable yoga mat for home workouts', 'HEALTH'),
(7, 'Bluetooth Speaker', 'Wireless speaker with great sound quality', 'ELECTRONICS'),
(8, 'LED TV', 'Smart TV with high resolution and a wide viewing angle', 'ELECTRONICS'),
(9, 'Throw Pillow', 'Decorative pillow for your couch or bed', 'HOME'),
(10, 'Laptop', 'Lightweight laptop with a long battery life', 'ELECTRONICS'),
(11, 'Cotton Dress', 'Elegant cotton dress for women', 'FASHION'),
(12, 'Bar Stool', 'Stylish bar stool with a modern design', 'HOME'),
(13, 'RC Drone', 'Remote-controlled drone with a built-in camera', 'TOYS'),
(14, 'Multivitamin Supplement', 'Complete multivitamin supplement for overall health', 'HEALTH'),
(15, 'Wireless Earbuds', 'True wireless earbuds with noise-cancellation', 'ELECTRONICS'),
(16, 'Yoga Block', 'Supportive yoga block for deeper stretches', 'HEALTH'),
(17, 'Smartwatch', 'Fitness tracker with heart rate monitor and GPS', 'ELECTRONICS'),
(18, 'Gaming Console', 'Next-gen gaming console with powerful hardware', 'ELECTRONICS'),
(19, 'Floor Lamp', 'Elegant floor lamp for your living room', 'HOME'),
(20, 'Tablet', 'Lightweight tablet for reading and browsing', 'ELECTRONICS'),
(21, 'Leather Jacket', 'Stylish leather jacket for men', 'FASHION'),
(22, 'Area Rug', 'Soft and comfortable area rug for your home', 'HOME'),
(23, 'Board Game', 'Classic board game for family game night', 'TOYS'),
(24, 'Protein Powder', 'Whey protein powder for muscle recovery and growth', 'HEALTH'),
(25, 'Wireless Headphones', 'Noise-cancelling headphones with Bluetooth connectivity', 'ELECTRONICS'),
(26, 'Resistance Bands', 'Set of resistance bands for full-body workouts', 'HEALTH'),
(27, 'Smart Thermostat', 'Energy-efficient thermostat with smart features', 'ELECTRONICS'),
(28, 'Coffee Table', 'Stylish coffee table for your living room', 'HOME'),
(29, 'Smart Speaker', 'Voice-controlled speaker with virtual assistant', 'ELECTRONICS'),
(30, 'Ankle Boots', 'Fashionable ankle boots for women', 'FASHION'),
(31, 'Dining Chair', 'Comfortable dining chair for your home', 'HOME'),
(32, 'Remote Control Helicopter', 'Miniature remote-controlled helicopter for indoor flying', 'TOYS'),
(33, 'Fish Oil Supplement', 'Omega-3 fish oil supplement for heart health', 'HEALTH'),
(34, 'Wireless Charger', 'Fast wireless charger for your smartphone', 'ELECTRONICS'),
(35, 'Foam Roller', 'High-density foam roller for muscle recovery and mobility', 'HEALTH'),
(36, 'Smart Lock', 'Smart lock with keyless entry and remote control', 'ELECTRONICS'),
(37, 'Air Purifier', 'HEPA air purifier for cleaner indoor air', 'HOME'),
(38, 'Digital Camera', 'Compact digital camera for high-quality photos', 'ELECTRONICS'),
(39, 'Winter Jacket', 'Warm and comfortable jacket for cold weather', 'FASHION'),
(40, 'Accent Chair', 'Stylish accent chair for your living room', 'HOME'),
(41, 'Model Car Kit', 'DIY model car kit for kids and adults', 'TOYS'),
(42, 'Calcium Supplement', 'Calcium supplement for strong bones and teeth', 'HEALTH'),
(43, 'Wireless Mouse', 'Ergonomic wireless mouse for your computer', 'ELECTRONICS'),
(44, 'Foam Mattress', 'Comfortable foam mattress for a good nights sleep', 'HOME'),
(45, 'Smart Doorbell', 'Video doorbell with motion detection and two-way audio', 'ELECTRONICS');

-- --------------------------------------------------------

--
-- Table structure for table `productrating`
--

CREATE TABLE `productrating` (
  `pid` int NOT NULL,
  `username` varchar(40) NOT NULL,
  `rating` decimal(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productrating`
--

INSERT INTO `productrating` (`pid`, `username`, `rating`) VALUES
(1, 'user1@example.com', 3.80),
(1, 'user13@example.com', 4.20),
(1, 'user21@example.com', 4.50),
(2, 'user1@example.com', 4.50),
(2, 'user2@example.com', 4.80),
(2, 'user20@example.com', 3.90),
(3, 'user2@example.com', 3.90),
(3, 'user24@example.com', 3.20),
(3, 'user4@example.com', 3.50),
(4, 'user4@example.com', 4.40),
(4, 'user5@example.com', 4.60),
(4, 'user6@example.com', 4.80),
(5, 'user7@example.com', 4.20),
(5, 'user8@example.com', 4.00),
(5, 'user9@example.com', 3.90),
(6, 'user10@example.com', 3.60),
(6, 'user11@example.com', 3.50),
(6, 'user12@example.com', 3.20),
(7, 'user13@example.com', 4.70),
(7, 'user14@example.com', 4.50),
(8, 'user1@example.com', 3.90),
(8, 'user18@example.com', 4.10),
(8, 'user19@example.com', 4.00),
(9, 'user1@example.com', 4.70),
(9, 'user10@example.com', 4.80),
(9, 'user19@example.com', 4.90),
(10, 'user10@example.com', 3.20),
(10, 'user11@example.com', 3.60),
(10, 'user2@example.com', 3.40);

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `sid` int NOT NULL,
  `sname` varchar(20) NOT NULL,
  `accountid` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`sid`, `sname`, `accountid`) VALUES
(26, 'John Doe', 1),
(27, 'Jane Smith', 2),
(28, 'Mike Johnson', 3),
(29, 'Sarah Lee', 4),
(30, 'David Kim', 5),
(31, 'Emily Chen', 23),
(32, 'Karen Wong', 6),
(33, 'Peter Chang', 7),
(34, 'Tom Lee', 8),
(35, 'Amy Park', 9),
(36, 'Lucy Wang', 10),
(37, 'Kevin Huang', 11),
(38, 'Grace Kim', 12),
(39, 'Henry Chen', 13),
(40, 'Lisa Lin', 14),
(41, 'Andrew Wu', 15),
(42, 'Michelle Wang', 16),
(43, 'Steven Liu', 17),
(44, 'Samantha Lee', 18),
(45, 'Rachel Kim', 19),
(46, 'Catherine Kim', 20),
(47, 'Simon Lee', 21),
(48, 'Alice Kim', 21);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `lname` varchar(40) NOT NULL,
  `fname` varchar(40) NOT NULL,
  `isadmin` tinyint(1) NOT NULL DEFAULT '0',
  `phone` varchar(40) NOT NULL,
  `preferredaddress` int DEFAULT NULL,
  `preferredaccount` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `lname`, `fname`, `isadmin`, `phone`, `preferredaddress`, `preferredaccount`) VALUES
('admin@example.com', 'admin', 'admin', 'admin', 1, '123-456-7890', NULL, NULL),
('user1@example.com', 'password1', 'Doe', 'John', 0, '123-456-7890', 24, 24),
('user10@example.com', 'password10', 'Lee', 'Ava', 0, '012-345-6789', NULL, NULL),
('user11@example.com', 'password11', 'Garcia', 'Noah', 0, '123-456-7890', NULL, NULL),
('user12@example.com', 'password12', 'Brown', 'Emma', 0, '234-567-8901', NULL, NULL),
('user13@example.com', 'password13', 'Jones', 'Liam', 0, '345-678-9012', NULL, NULL),
('user14@example.com', 'password14', 'Wilson', 'Isabella', 0, '456-789-0123', NULL, NULL),
('user15@example.com', 'password15', 'Taylor', 'Mason', 0, '567-890-1234', NULL, NULL),
('user16@example.com', 'password16', 'Martin', 'Avery', 0, '678-901-2345', NULL, NULL),
('user17@example.com', 'password17', 'Davis', 'Ella', 0, '789-012-3456', NULL, NULL),
('user18@example.com', 'password18', 'Miller', 'Jackson', 0, '890-123-4567', NULL, NULL),
('user19@example.com', 'password19', 'Anderson', 'Mia', 0, '901-234-5678', NULL, NULL),
('user2@example.com', 'password2', 'Smith', 'Jane', 0, '234-567-8901', NULL, NULL),
('user20@example.com', 'password20', 'Garcia', 'Jacob', 0, '012-345-6789', NULL, NULL),
('user21@example.com', 'password21', 'Wilson', 'Sophia', 0, '123-456-7890', NULL, NULL),
('user22@example.com', 'password22', 'Johnson', 'Avery', 0, '234-567-8901', NULL, NULL),
('user23@example.com', 'password23', 'Smith', 'Ethan', 0, '345-678-9012', NULL, NULL),
('user24@example.com', 'password24', 'Davis', 'Emma', 0, '456-789-0123', NULL, NULL),
('user25@example.com', 'password25', 'Martin', 'Jackson', 0, '567-890-1234', NULL, NULL),
('user3@example.com', 'password3', 'Brown', 'Michael', 0, '345-678-9012', NULL, NULL),
('user4@example.com', 'password4', 'Davis', 'Emily', 0, '456-789-0123', NULL, NULL),
('user5@example.com', 'password5', 'Miller', 'David', 0, '567-890-1234', NULL, NULL),
('user6@example.com', 'password6', 'Wilson', 'Olivia', 0, '678-901-2345', NULL, NULL),
('user7@example.com', 'password7', 'Johnson', 'William', 0, '789-012-3456', NULL, NULL),
('user8@example.com', 'password8', 'Anderson', 'Sophia', 0, '890-123-4567', NULL, NULL),
('user9@example.com', 'password9', 'Martin', 'Joshua', 0, '901-234-5678', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userbank`
--

CREATE TABLE `userbank` (
  `accountid` int NOT NULL,
  `username` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userbank`
--

INSERT INTO `userbank` (`accountid`, `username`) VALUES
(1, 'user1@example.com'),
(16, 'user1@example.com'),
(26, 'user1@example.com'),
(27, 'user1@example.com'),
(28, 'user1@example.com'),
(29, 'user1@example.com'),
(17, 'user11@example.com'),
(18, 'user12@example.com'),
(19, 'user13@example.com'),
(20, 'user14@example.com'),
(21, 'user15@example.com'),
(22, 'user16@example.com'),
(23, 'user17@example.com'),
(24, 'user18@example.com'),
(25, 'user19@example.com'),
(2, 'user2@example.com'),
(3, 'user3@example.com'),
(4, 'user4@example.com'),
(5, 'user5@example.com'),
(6, 'user5@example.com'),
(7, 'user5@example.com'),
(8, 'user6@example.com'),
(9, 'user6@example.com'),
(10, 'user7@example.com'),
(11, 'user7@example.com'),
(12, 'user7@example.com'),
(13, 'user7@example.com'),
(14, 'user8@example.com'),
(15, 'user9@example.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`aid`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `bankaccount`
--
ALTER TABLE `bankaccount`
  ADD PRIMARY KEY (`accountid`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`username`,`pid`,`sid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`pid`,`sid`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`pid`,`sid`,`oid`),
  ADD KEY `oid` (`oid`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`oid`),
  ADD UNIQUE KEY `payid` (`payid`),
  ADD KEY `username` (`username`),
  ADD KEY `aid` (`aid`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payid`),
  ADD KEY `accountid` (`accountid`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `productrating`
--
ALTER TABLE `productrating`
  ADD PRIMARY KEY (`pid`,`username`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `accountid` (`accountid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`),
  ADD KEY `preferredaddress` (`preferredaddress`),
  ADD KEY `preferredaccount` (`preferredaccount`);

--
-- Indexes for table `userbank`
--
ALTER TABLE `userbank`
  ADD PRIMARY KEY (`accountid`,`username`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `aid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `bankaccount`
--
ALTER TABLE `bankaccount`
  MODIFY `accountid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `oid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `sid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `seller` (`sid`),
  ADD CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`),
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`sid`) REFERENCES `seller` (`sid`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`),
  ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`oid`) REFERENCES `order` (`oid`),
  ADD CONSTRAINT `items_ibfk_3` FOREIGN KEY (`sid`) REFERENCES `seller` (`sid`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`aid`) REFERENCES `address` (`aid`),
  ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`payid`) REFERENCES `payment` (`payid`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`accountid`) REFERENCES `userbank` (`accountid`);

--
-- Constraints for table `productrating`
--
ALTER TABLE `productrating`
  ADD CONSTRAINT `productrating_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`),
  ADD CONSTRAINT `productrating_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`);

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`accountid`) REFERENCES `bankaccount` (`accountid`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`preferredaddress`) REFERENCES `address` (`aid`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`preferredaccount`) REFERENCES `userbank` (`accountid`);

--
-- Constraints for table `userbank`
--
ALTER TABLE `userbank`
  ADD CONSTRAINT `userbank_ibfk_1` FOREIGN KEY (`accountid`) REFERENCES `bankaccount` (`accountid`),
  ADD CONSTRAINT `userbank_ibfk_2` FOREIGN KEY (`username`) REFERENCES `user` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
