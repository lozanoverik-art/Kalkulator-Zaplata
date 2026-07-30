// src/utils/helpers.ts
import { SalaryResult } from './calculator';

// Конвертира Евро в Лева (фиксиран курс)
export function toBGN(eurAmount: number): string {
  return (eurAmount * 1.95583).toFixed(2);
}

// Генерира данните за PieChart графиката спрямо резултата
export function generateChartData(result: SalaryResult | null, showEmployerCost: boolean) {
  if (!result) return [];

  const data = [
    { name: 'Чиста Заплата', value: result.net, color: '#10b981' }, // Зелено
    { name: 'Осиг. (Служител)', value: result.employeeTaxes.total - result.employeeTaxes.incomeTax, color: '#f59e0b' }, // Оранжево
    { name: 'Данък ДОД', value: result.employeeTaxes.incomeTax, color: '#ef4444' } // Червено
  ];

  if (showEmployerCost) {
    data.push({ name: 'Осиг. (Работодател)', value: result.employerTaxes.total, color: '#3b82f6' }); // Синьо
  }

  return data;
}