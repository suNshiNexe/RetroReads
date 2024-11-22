CREATE DATABASE  IF NOT EXISTS `db_rr` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_rr`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_rr
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbende`
--

DROP TABLE IF EXISTS `tbende`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbende` (
  `ENDE_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int NOT NULL,
  `ENDE_LOG` varchar(255) NOT NULL,
  `ENDE_NUM` int NOT NULL,
  `ENDE_COMP` varchar(50) DEFAULT NULL,
  `ENDE_CIDA` varchar(255) NOT NULL,
  `ENDE_UF` varchar(2) NOT NULL,
  `ENDE_CEP` varchar(9) NOT NULL,
  `ENDE_BRR` varchar(255) NOT NULL,
  PRIMARY KEY (`ENDE_ID`),
  KEY `USER_END_FK` (`USER_ID`),
  CONSTRAINT `USER_END_FK` FOREIGN KEY (`USER_ID`) REFERENCES `tbuser` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbende`
--

LOCK TABLES `tbende` WRITE;
/*!40000 ALTER TABLE `tbende` DISABLE KEYS */;
INSERT INTO `tbende` VALUES (1,1,'Teste',198,'T','São Paulo','SP','03383010','TESTE');
/*!40000 ALTER TABLE `tbende` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblvro`
--

DROP TABLE IF EXISTS `tblvro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblvro` (
  `LVRO_ID` int NOT NULL AUTO_INCREMENT,
  `LVRO_ISBN` varchar(50) NOT NULL,
  `LVRO_TITULO` varchar(255) NOT NULL,
  `LVRO_GEN` varchar(50) NOT NULL,
  `LVRO_PRCO` float NOT NULL,
  `LVRO_QNT_PG` int NOT NULL,
  `LVRO_EDIT` varchar(50) NOT NULL,
  `LVRO_ATR` varchar(255) NOT NULL,
  `LVRO_DT_LANC` date NOT NULL,
  `LVRO_AV` float NOT NULL,
  `LVRO_STT_LT` varchar(50) DEFAULT NULL,
  `LVRO_DN` int NOT NULL,
  `LVRO_QNT` int NOT NULL,
  PRIMARY KEY (`LVRO_ID`),
  KEY `DN_FK` (`LVRO_DN`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblvro`
--

LOCK TABLES `tblvro` WRITE;
/*!40000 ALTER TABLE `tblvro` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblvro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbngco`
--

DROP TABLE IF EXISTS `tbngco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbngco` (
  `NGCO_ID` int NOT NULL AUTO_INCREMENT,
  `NGCO_ID_COMP` int NOT NULL,
  `NGCO_ID_VEND` int NOT NULL,
  `NGCO_ID_LVRO` int NOT NULL,
  `NGCO_STT` varchar(50) NOT NULL,
  PRIMARY KEY (`NGCO_ID`),
  KEY `NGCO_ID_COMP_FK` (`NGCO_ID_COMP`),
  KEY `NGCO_ID_VEND_FK` (`NGCO_ID_VEND`),
  KEY `NGCO_ID_LVRO_FK` (`NGCO_ID_LVRO`),
  CONSTRAINT `NGCO_ID_COMP_FK` FOREIGN KEY (`NGCO_ID_COMP`) REFERENCES `tbuser` (`USER_ID`),
  CONSTRAINT `NGCO_ID_LVRO_FK` FOREIGN KEY (`NGCO_ID_LVRO`) REFERENCES `tblvro` (`LVRO_ID`),
  CONSTRAINT `NGCO_ID_VEND_FK` FOREIGN KEY (`NGCO_ID_VEND`) REFERENCES `tbuser` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbngco`
--

LOCK TABLES `tbngco` WRITE;
/*!40000 ALTER TABLE `tbngco` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbngco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbuser`
--

DROP TABLE IF EXISTS `tbuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbuser` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NM` varchar(255) NOT NULL,
  `USER_EMAIL` varchar(255) NOT NULL,
  `USER_FN` varchar(50) NOT NULL,
  `USER_PWD` varchar(255) NOT NULL,
  `USER_CN` varchar(50) NOT NULL,
  `USER_TP` int NOT NULL,
  `USER_FINAN` float DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USER_EMAIL` (`USER_EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbuser`
--

LOCK TABLES `tbuser` WRITE;
/*!40000 ALTER TABLE `tbuser` DISABLE KEYS */;
INSERT INTO `tbuser` VALUES (1,'Tuli Poliglota','arthurhevi@hotmail.com','11984573211','RetroReads2024','50515912808',1,NULL);
/*!40000 ALTER TABLE `tbuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_rr'
--

--
-- Dumping routines for database 'db_rr'
--
/*!50003 DROP FUNCTION IF EXISTS `FN_AUTHENTICATEUSER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `FN_AUTHENTICATEUSER`(
    p_email VARCHAR(255),
    p_password VARCHAR(255)
) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    DECLARE user_exists BOOLEAN;

    SELECT COUNT(*) INTO user_exists
    FROM tbuser
    WHERE user_email = p_email AND user_pwd = p_password;

    RETURN user_exists > 0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPILVRO` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`retroreads`@`%` PROCEDURE `SPILVRO`(
    IN p_lvro_isbn VARCHAR(50),
    IN p_lvro_titulo VARCHAR(255),
    IN p_lvro_gen VARCHAR(50),
    IN p_lvro_prco FLOAT,
    IN p_lvro_qnt_pg INT,
    IN p_lvro_edit VARCHAR(50),
    IN p_lvro_atr VARCHAR(255),
    IN p_lvro_dt_lanc DATE,
    IN p_lvro_av FLOAT,
    IN p_lvro_stt_lt VARCHAR(50),
    IN p_lvro_dn INT,
    IN p_lvro_qnt INT
)
BEGIN
    INSERT INTO TBLVRO (LVRO_ISBN, LVRO_TITULO, LVRO_GEN, LVRO_PRCO, LVRO_QNT_PG, LVRO_EDIT, LVRO_ATR, LVRO_DT_LANC, LVRO_AV, LVRO_STT_LT, LVRO_DN, LVRO_QNT)
    VALUES (p_lvro_isbn, p_lvro_titulo, p_lvro_gen, p_lvro_prco, p_lvro_qnt_pg, p_lvro_edit, p_lvro_atr, p_lvro_dt_lanc, p_lvro_av, p_lvro_stt_lt, p_lvro_dn, p_lvro_qnt);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPINGCO` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`retroreads`@`%` PROCEDURE `SPINGCO`(
    IN p_ngco_id_comp INT,
    IN p_ngco_id_vend INT,
    IN p_ngco_id_lvro INT,
    IN p_ngco_stt VARCHAR(50)
)
BEGIN
    INSERT INTO TBNGCO (NGCO_ID_COMP, NGCO_ID_VEND, NGCO_ID_LVRO, NGCO_STT)
    VALUES (p_ngco_id_comp, p_ngco_id_vend, p_ngco_id_lvro, p_ngco_stt);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SPI_REG` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SPI_REG`(
    IN p_user_nm VARCHAR(255),
    IN p_user_email VARCHAR(255),
    IN p_user_fn VARCHAR(50),
    IN p_user_pwd VARCHAR(255),
    IN p_user_cn VARCHAR(50),
    IN p_user_tp INT,
    IN p_ende_log VARCHAR(255),
    IN p_ende_num INT,
    IN p_ende_comp VARCHAR(50),
    IN p_ende_cida VARCHAR(255),
    IN p_ende_uf VARCHAR(2),
    IN p_ende_cep VARCHAR(9),
    IN p_ende_brr VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
    START TRANSACTION;

    -- Insert into TBUSER
    INSERT INTO TBUSER (USER_NM, USER_EMAIL, USER_FN, USER_PWD, USER_CN, USER_TP)
    VALUES (p_user_nm, p_user_email, p_user_fn, p_user_pwd, p_user_cn, p_user_tp);

    -- Get the last inserted USER_ID
    SET @last_user_id = LAST_INSERT_ID();

    -- Insert into TBENDE
    INSERT INTO TBENDE (USER_ID, ENDE_LOG, ENDE_NUM, ENDE_COMP, ENDE_CIDA, ENDE_UF, ENDE_CEP, ENDE_BRR)
    VALUES (@last_user_id, p_ende_log, p_ende_num, p_ende_comp, p_ende_cida, p_ende_uf, p_ende_cep, p_ende_brr);

    -- Commit the transaction
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-31 14:21:56
