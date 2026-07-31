"use client";

import { useState, useEffect } from "react";
import {
  calculateSalary,
  calculateGrossFromNet,
  SalaryResult,
} from "../utils/calculator";
import { TAX_YEARS, CURRENT_YEAR } from "../utils/config";
import { toBGN } from "../utils/helpers";
import { generateTaxInsights, AdvisorInsight } from "../utils/taxAdvisor";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Building2,
  Calendar,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Lock,
} from "lucide-react";

export default function CalculatorWidget() {
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);
  const currentConfig = TAX_YEARS[selectedYear] || TAX_YEARS[CURRENT_YEAR];
  const [calcMode, setCalcMode] = useState<"grossToNet" | "netToGross">(
    "grossToNet",
  );
  const [inputValue, setInputValue] = useState<string>("1000");
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [showEmployerCost, setShowEmployerCost] = useState<boolean>(false);
  const [insights, setInsights] = useState<AdvisorInsight[]>([]);
  const [showInsights, setShowInsights] = useState<boolean>(false);

  useEffect(() => {
    const numericValue = Number(inputValue);
    if (!isNaN(numericValue) && numericValue > 0) {
      const calculatedResult =
        calcMode === "grossToNet"
          ? calculateSalary(numericValue, currentConfig)
          : calculateGrossFromNet(numericValue, currentConfig);

      setResult(calculatedResult);
      setInsights(generateTaxInsights(calculatedResult, currentConfig));
    } else {
      setResult(null);
      setInsights([]);
    }
  }, [inputValue, calcMode, selectedYear, currentConfig]);

  const chartData = result
    ? [
        { name: "Чиста Заплата", value: result.net, color: "#10b981" },
        {
          name: "Осиг. (Служител)",
          value: result.employeeTaxes.total - result.employeeTaxes.incomeTax,
          color: "#f59e0b",
        },
        {
          name: "Данък ДОД",
          value: result.employeeTaxes.incomeTax,
          color: "#ef4444",
        },
        ...(showEmployerCost
          ? [
              {
                name: "Осиг. (Работодател)",
                value: result.employerTaxes.total,
                color: "#3b82f6",
              },
            ]
          : []),
      ]
    : [];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-lg">
          <p className="text-sm font-bold text-gray-900">{payload[0].name}</p>
          <p
            className="text-sm font-semibold"
            style={{ color: payload[0].payload.color }}
          >
            {payload[0].value.toFixed(2)} €{" "}
            <span className="text-xs text-gray-500 font-normal ml-1">
              (~{toBGN(payload[0].value)} лв.)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 transition-colors">
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-700 font-medium">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck size={16} className="text-emerald-600" />
          По нормативи на НАП и НОИ
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock size={16} className="text-blue-600" />
          Фиксиран курс БНБ: 1 EUR = 1.95583 BGN
        </span>
      </div>

      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ЛЯВА КОЛОНА: Входни данни */}
        <div className="space-y-6 flex flex-col">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-300">
            <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Calendar size={18} className="text-blue-600" />
              Данъчна година:
            </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent text-gray-900 font-bold text-sm outline-none cursor-pointer"
            >
              {Object.keys(TAX_YEARS)
                .reverse()
                .map((year) => (
                  <option key={year} value={year} className="bg-white">
                    {year} г.
                  </option>
                ))}
            </select>
          </div>

          <div className="bg-gray-100 p-1 rounded-xl flex items-center relative border border-gray-200">
            <button
              onClick={() => setCalcMode("grossToNet")}
              className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all z-10 ${
                calcMode === "grossToNet"
                  ? "bg-white text-blue-700 shadow-md border border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Бруто към Нето
            </button>
            <button
              onClick={() => setCalcMode("netToGross")}
              className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all z-10 ${
                calcMode === "netToGross"
                  ? "bg-white text-blue-700 shadow-md border border-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Нето към Бруто
            </button>
          </div>

          <div className="pt-2">
            <label className="block text-gray-900 font-bold mb-3 text-base">
              {calcMode === "grossToNet"
                ? "Твоята брутна заплата"
                : "Твоя желана нетна сума"}
            </label>

            <div className="relative">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full text-4xl font-black text-gray-900 border-b-4 border-blue-300 focus:border-blue-600 outline-none pb-2 bg-transparent transition-colors"
                placeholder="0"
                min="0"
                step="any"
                inputMode="decimal"
              />
              <span className="absolute right-0 bottom-4 text-gray-600 font-bold text-xl">
                EUR
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-600 mt-3 font-medium px-1 gap-1">
              <span>
                Мин. праг:{" "}
                <strong className="text-gray-900">
                  {Math.round(currentConfig.MIN_WAGE)} €
                </strong>
              </span>
              <span>
                Макс. осиг. доход:{" "}
                <strong className="text-gray-900">
                  {Math.round(currentConfig.MAX_INSURABLE_INCOME)} €
                </strong>
              </span>
            </div>

            <div className="mt-8 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showEmployerCost}
                    onChange={() => setShowEmployerCost(!showEmployerCost)}
                  />
                  <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 peer-checked:after:border-white"></div>
                </div>
                <span className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <Building2 size={18} className="text-blue-600" />
                  Пълен разход за работодателя?
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* ДЯСНА КОЛОНА: Резултати */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-between h-full">
          {!result ? (
            <div className="h-full flex items-center justify-center text-gray-500 font-semibold text-sm">
              Въведи валидна сума за резултат
            </div>
          ) : (
            <div className="space-y-6 flex flex-col h-full">
              <div className="text-center pb-5 border-b border-gray-300">
                <p className="text-gray-600 font-bold uppercase tracking-wider text-xs mb-1">
                  {calcMode === "grossToNet"
                    ? "Ти получаваш чисто"
                    : "Необходима брутна заплата"}
                </p>
                <div className="text-4xl md:text-5xl font-black text-emerald-600 leading-tight">
                  {calcMode === "grossToNet"
                    ? result.net.toFixed(2)
                    : result.gross.toFixed(2)}{" "}
                  <span className="text-2xl text-emerald-500 font-bold">€</span>
                </div>
                <div className="text-gray-600 font-medium mt-1 text-sm">
                  (~{" "}
                  {toBGN(calcMode === "grossToNet" ? result.net : result.gross)}{" "}
                  лв.)
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5 text-left">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex flex-col justify-center">
                    <span className="block text-[11px] text-emerald-800 font-bold uppercase mb-0.5">
                      На час (168 ч.)
                    </span>
                    <span className="text-lg font-black text-emerald-700">
                      {(result.net / 168).toFixed(2)} €
                    </span>
                  </div>

                  <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex flex-col justify-center">
                    <span className="block text-[11px] text-red-800 font-bold uppercase mb-0.5">
                      Данъчна тежест
                    </span>
                    <span className="text-lg font-black text-red-700">
                      {(
                        (result.employeeTaxes.total / result.gross) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Графика с Легенда (Подобрен UX) */}
              <div className="flex flex-col md:flex-row items-center gap-4 py-2">
                <div className="h-32 w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={60}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/2 space-y-2">
                  {chartData.map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-xs font-medium text-gray-700"
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        ></span>
                        {entry.name}
                      </span>
                      <span className="font-bold text-gray-900">
                        {(
                          (entry.value /
                            (result.gross +
                              (showEmployerCost
                                ? result.employerTaxes.total
                                : 0))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 text-sm pt-2 border-t border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    Брутна заплата:
                  </span>
                  <span className="font-bold text-gray-900">
                    {result.gross.toFixed(2)} €
                  </span>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-700 font-medium">
                    Общо осигуровки:
                  </span>
                  <span className="font-bold text-orange-600">
                    -{" "}
                    {(
                      result.employeeTaxes.doo +
                      result.employeeTaxes.dzpo +
                      result.employeeTaxes.health
                    ).toFixed(2)}{" "}
                    €
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-700 font-medium">
                    Данък ДОД (10%):
                  </span>
                  <span className="font-bold text-red-600">
                    - {result.employeeTaxes.incomeTax.toFixed(2)} €
                  </span>
                </div>
              </div>

              {showEmployerCost && (
                <div className="mt-auto pt-4 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-900 text-sm">
                      Пълен разход на фирмата:
                    </span>
                    <div className="text-right">
                      <span className="text-blue-900 font-black block text-lg">
                        {result.totalCost.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Съветник */}
      {insights.length > 0 && (
        <div className="px-6 md:px-10 pb-6 border-b border-gray-100">
          <div className="border border-blue-200 rounded-2xl overflow-hidden transition-colors bg-blue-50/50">
            <button
              onClick={() => setShowInsights(!showInsights)}
              className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm text-blue-900 hover:bg-blue-100/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lightbulb size={18} className="text-amber-500" />
                Експертен анализ и данъчни особености
              </span>
              {showInsights ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {showInsights && (
              <div className="p-4 md:p-5 pt-0 space-y-3">
                {insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {insight.type === "success" && (
                        <CheckCircle2 size={18} className="text-emerald-600" />
                      )}
                      {insight.type === "warning" && (
                        <AlertCircle size={18} className="text-amber-500" />
                      )}
                      {insight.type === "info" && (
                        <Info size={18} className="text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Декларация за поверителност за успокоение на параноята */}
      <div className="bg-slate-100 py-4 px-4 sm:px-6 text-xs text-slate-600 text-center border-t border-slate-200">
        <p className="leading-relaxed">
          <span className="inline-flex align-middle mr-1.5 -mt-0.5">
            <ShieldCheck size={16} className="text-slate-500" />
          </span>
          <strong>100% Поверителност:</strong> Изчисленията се извършват изцяло
          във вашия браузър. Не съхраняваме вашия IP адрес или въведените от вас
          суми.
        </p>
      </div>
    </div>
  );
}
