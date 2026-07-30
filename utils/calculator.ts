// src/utils/calculator.ts
import { YearConfig, TAX_YEARS, CURRENT_YEAR } from './config';

export interface SalaryResult {
  gross: number;
  net: number;
  taxBase: number;
  employeeTaxes: {
    doo: number;
    dzpo: number;
    health: number;
    incomeTax: number;
    total: number;
  };
  // Добавяме липсващите полета за работодател
  employerTaxes: {
    doo: number;
    dzpo: number;
    health: number;
    total: number;
  };
  totalCost: number; 
}

export function calculateSalary(grossWage: number, config: YearConfig = TAX_YEARS[CURRENT_YEAR]): SalaryResult {
  const insurableIncome = Math.min(grossWage, config.MAX_INSURABLE_INCOME);

  // Сметки за служителя
  const empDoo = insurableIncome * config.EMPLOYEE_DOO;
  const empDzpo = insurableIncome * config.EMPLOYEE_DZPO;
  const empHealth = insurableIncome * config.EMPLOYEE_HEALTH;
  const empTotalInsurances = empDoo + empDzpo + empHealth;

  const taxBase = grossWage - empTotalInsurances;
  const incomeTax = taxBase * config.INCOME_TAX;
  const totalEmployeeTaxes = empTotalInsurances + incomeTax;

  const netWage = grossWage - totalEmployeeTaxes;

  // Сметки за работодателя
  const employerDoo = insurableIncome * config.EMPLOYER_DOO;
  const employerDzpo = insurableIncome * config.EMPLOYER_DZPO;
  const employerHealth = insurableIncome * config.EMPLOYER_HEALTH;
  const totalEmployerTaxes = employerDoo + employerDzpo + employerHealth;

  return {
    gross: grossWage,
    net: netWage,
    taxBase,
    employeeTaxes: {
      doo: empDoo,
      dzpo: empDzpo,
      health: empHealth,
      incomeTax,
      total: totalEmployeeTaxes,
    },
    employerTaxes: {
      doo: employerDoo,
      dzpo: employerDzpo,
      health: employerHealth,
      total: totalEmployerTaxes,
    },
    totalCost: grossWage + totalEmployerTaxes,
  };
}

export function calculateGrossFromNet(netWage: number, config: YearConfig = TAX_YEARS[CURRENT_YEAR]): SalaryResult {
    const totalEmployeeInsuranceRate = config.EMPLOYEE_DOO + config.EMPLOYEE_DZPO + config.EMPLOYEE_HEALTH;
    const taxRate = config.INCOME_TAX;
    
    let grossWage = netWage / ((1 - totalEmployeeInsuranceRate) * (1 - taxRate));
    
    if (grossWage > config.MAX_INSURABLE_INCOME) {
        const cappedInsurance = config.MAX_INSURABLE_INCOME * totalEmployeeInsuranceRate;
        grossWage = (netWage / (1 - taxRate)) + cappedInsurance;
    }
    
    grossWage = Math.max(grossWage, config.MIN_WAGE);
    
    return calculateSalary(grossWage, config);
}