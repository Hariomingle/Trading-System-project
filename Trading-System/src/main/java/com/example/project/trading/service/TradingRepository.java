package com.example.project.trading.service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.trading.model.Trading;
@Repository
public interface TradingRepository extends JpaRepository<Trading, Integer>{


}
