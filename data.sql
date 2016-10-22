CREATE DATABASE  IF NOT EXISTS `bamazon` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bamazon`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: bamazon
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(200) NOT NULL,
  `DepartmentName` varchar(30) NOT NULL,
  `Price` decimal(7,2) NOT NULL,
  `StockQuantity` int(11) NOT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Acer Aspire E 15 E5-575G-76YK 15.6-inch Full HD Notebook(Intel Core i7, NVIDIA 940MX,8 GB ,256GB SSD, Windows 10 Home 64-bit Edition),Black','Acer',699.99,230),(2,'TeckNet 2.4G Nano Wireless Mouse, 5 Buttons (M002)','Tecknet',9.99,250),(3,'Apple MacBook MLHE2LL/A 12-Inch Laptop with Retina Display (Gold, 256 GB) NEWEST VERSION','Apple',1249.00,150),(4,'Acer Predator 34-inch Curved UltraWide QHD (3440 x 1440) NVIDIA G-Sync Widescreen Display (X34 bmiphz)','Acer',1243.95,25),(5,'EVGA GeForce GTX 1080 FTW GAMING ACX 3.0, 8GB GDDR5X, RGB LED, 10CM FAN, 10 Power Phases, Double BIOS, DX12 OSD Support (PXOC) Graphics Card 08G-P4-6286-KR','EVGA',679.99,1250),(6,'Intel Core i7 6700K 4.00 GHz Unlocked Quad Core Skylake Desktop Processor, Socket LGA 1151 [BX80662I76700K]','Intel',329.00,300),(7,'MSI Computer DIMM LGA 2011-3 Motherboard X99A GODLIKE GAMING CARBON','MSI',557.99,4),(8,'Intel SSD 600p Series SSDPEKKW512G7X1 (512 GB, M.2 80mm PCIe NVMe 3.0 x4, 3D1, TLC) Reseller Single Pack','Intel',179.95,22),(9,'ASUS RT-AC5300 Wireless AC5300 Tri-Band Gigabit Router, AiProtection with Trend Micro for Complete Network Security','Asus',369.96,3),(10,'Raumfeld Stereo M Wireless Streaming Bookshelf Speakers (Pair, Black)','Raumfeld',1299.00,4),(11,'Edifier R1290T Powered Bookshelf Speakers','Edifier',99.99,7),(12,'Final Fantasy XV - PlayStation 4','Square Enix',59.99,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bamazon'
--

--
-- Dumping routines for database 'bamazon'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-22 14:12:01
