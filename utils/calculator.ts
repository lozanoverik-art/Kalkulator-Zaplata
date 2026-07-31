// src/utils/calculator.ts
import { TAX_YEARS, CURRENT_YEAR } from "./config";

export interface SalaryResult {
  gross: number;
  net: number;
  employeeTaxes: {
    doo: number;
    dzpo: number;
    health: number;
    total: number;
    incomeTax: number;
  };
  employerTaxes: {
    doo: number;
    dzpo: number;
    health: number;
    total: number;
  };
  totalCost: number;
}

export function calculateSalary(grossInput: number, config: any): SalaryResult {
  // 1. Превръщаме всичко в стотинки (центове), за да няма проблем с плаващата запетая!
  const gross = Math.round(grossInput * 100);
  const minWage = Math.round(config.MIN_WAGE * 100);
  const maxInsurable = Math.round(config.MAX_INSURABLE_INCOME * 100);

  // Осигурителен доход (ограничен от минимума и максимума за годината)
  const insurableIncome = Math.min(Math.max(gross, minWage), maxInsurable);

  // --- ОСИГУРОВКИ ОТ СЛУЖИТЕЛЯ ---
  const empDoo = Math.round(insurableIncome * config.EMPLOYEE_DOO);
  const empDzpo = Math.round(insurableIncome * config.EMPLOYEE_DZPO);
  const empHealth = Math.round(insurableIncome * config.EMPLOYEE_HEALTH);
  const empTotalIns = empDoo + empDzpo + empHealth;

  // Данък ДОД (10% върху остатъка, само ако има положителен остатък)
  const taxableBase = Math.max(0, gross - empTotalIns);
  const incomeTax = Math.round(taxableBase * config.INCOME_TAX);

  // Чиста сума
  const net = gross - empTotalIns - incomeTax;

  // --- ОСИГУРОВКИ ОТ РАБОТОДАТЕЛЯ ---
  const erDoo = Math.round(insurableIncome * config.EMPLOYER_DOO);
  const erDzpo = Math.round(insurableIncome * config.EMPLOYER_DZPO);
  const erHealth = Math.round(insurableIncome * config.EMPLOYER_HEALTH);
  const erTotalIns = erDoo + erDzpo + erHealth;

  // Пълен разход
  const totalCost = gross + erTotalIns;

  // Връщаме обратно в Евро/Лева (делено на 100)
  return {
    gross: gross / 100,
    net: net / 100,
    employeeTaxes: {
      doo: empDoo / 100,
      dzpo: empDzpo / 100,
      health: empHealth / 100,
      total: empTotalIns / 100,
      incomeTax: incomeTax / 100,
    },
    employerTaxes: {
      doo: erDoo / 100,
      dzpo: erDzpo / 100,
      health: erHealth / 100,
      total: erTotalIns / 100,
    },
    totalCost: totalCost / 100,
  };
}

export function calculateGrossFromNet(targetNet: number, config: any): SalaryResult {
  // Използваме Binary Search, за да намерим точното Бруто за търсеното Нето
  let low = targetNet;
  let high = targetNet * 2; // Груба горна граница
  let bestGross = targetNet;

  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    const res = calculateSalary(mid, config);
    
    if (res.net < targetNet) {
      low = mid;
    } else {
      bestGross = mid;
      high = mid;
    }
  }

  return calculateSalary(Math.round(bestGross * 100) / 100, config);
}