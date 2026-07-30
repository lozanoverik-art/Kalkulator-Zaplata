// src/utils/taxAdvisor.ts
import { SalaryResult } from './calculator';
import { YearConfig } from './config';
import { toBGN } from './helpers';

export interface AdvisorInsight {
  type: 'info' | 'success' | 'warning';
  title: string;
  description: string;
}

export function generateTaxInsights(result: SalaryResult, config: YearConfig): AdvisorInsight[] {
  const insights: AdvisorInsight[] = [];

  // 1. Проверка за минимална работна заплата
  if (result.gross <= config.MIN_WAGE) {
    insights.push({
      type: 'warning',
      title: 'Минимално възнаграждение',
      description: `Тази сума е равна или близка до официалната минимална работна заплата за годината (${config.MIN_WAGE.toFixed(2)} € / ~${toBGN(config.MIN_WAGE)} лв.). Законодателството забранява осигуряване под този праг за пълен работен ден.`
    });
  }

  // 2. Проверка за Максимален осигурителен доход (МОД)
  if (result.gross > config.MAX_INSURABLE_INCOME) {
    const overLimit = result.gross - config.MAX_INSURABLE_INCOME;
    insights.push({
      type: 'success',
      title: 'Доход над максималния осигурителен праг',
      description: `Вашата брутна заплата надвишава максималния осигурителен доход за годината (${config.MAX_INSURABLE_INCOME.toFixed(2)} €). Това означава, че върху сумата над този лимит (${overLimit.toFixed(2)} €) НЕ се удържа лична осигуровка, а само данък ДОД. Това повишава вашата нетна ефективност!`
    });
  } else {
    insights.push({
      type: 'info',
      title: 'Осигурителен праг',
      description: `Вашият доход е под максималния осигурителен праг (${config.MAX_INSURABLE_INCOME.toFixed(2)} € / ~${toBGN(config.MAX_INSURABLE_INCOME)} лв.). Всички осигуровки се начислят върху пълния размер на брутната ви заплата.`
    });
  }

  // 3. Изчисляване на обща тежест за служителя (Осигуровки + Данък спрямо Бруто)
  const totalEmployeeTaxes = (result.employeeTaxes.total);
  const taxBurdenPercent = ((totalEmployeeTaxes / result.gross) * 100).toFixed(1);

  insights.push({
    type: 'info',
    title: 'Данъчно-осигурителна тежест',
    description: `От вашата брутна заплата общо ${taxBurdenMessage(Number(taxBurdenPercent))} (${totalEmployeeTaxes.toFixed(2)} €) отиват за държавата под формата на осигуровки и данък общ доход (ДОД). Чистият ви коефициент на възвръщаемост е ${(100 - Number(taxBurdenPercent)).toFixed(1)}%.`
  });

  return insights;
}

function taxBurdenMessage(percent: number): string {
  return `${percent}%`;
}