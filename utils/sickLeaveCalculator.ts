// src/utils/sickLeaveCalculator.ts

export interface SickLeaveResult {
  employerDays: number;
  employerAmount: number;
  noiDays: number;
  noiAmount: number;
  totalAmount: number;
  averageDailyWage: number;
}

export function calculateSickLeave(
  grossWage: number, 
  totalSickDays: number, 
  workingDaysInMonth: number = 21
): SickLeaveResult {
  if (grossWage <= 0 || totalSickDays <= 0) {
    return {
      employerDays: 0,
      employerAmount: 0,
      noiDays: 0,
      noiAmount: 0,
      totalAmount: 0,
      averageDailyWage: 0,
    };
  }

  // Среднодневно брутно възнаграждение за месеца
  const dailyWage = grossWage / workingDaysInMonth;

  // Първите 3 дни се плащат от работодателя (70%)
  const employerDays = Math.min(totalSickDays, 3);
  const employerAmount = employerDays * (dailyWage * 0.70);

  // От 4-тия ден нататък се плаща от НОИ (80%)
  const noiDays = Math.max(0, totalSickDays - 3);
  const noiAmount = noiDays * (dailyWage * 0.80);

  const totalAmount = employerAmount + noiAmount;

  return {
    employerDays,
    employerAmount,
    noiDays,
    noiAmount,
    totalAmount,
    averageDailyWage: dailyWage,
  };
}