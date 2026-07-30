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
        <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-lg">
          <p className="text-sm font-bold text-gray-900">{payload[0].name}</p>
          <p
            className="text-sm font-semibold"
            style={{ color: payload[0].payload.color }}
          >
            {payload[0].value.toFixed(2)} €{" "}
            <span className="text-xs text-gray-400 font-normal ml-1">
              (~{toBGN(payload[0].value)} лв.)
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-colors">
      {/* Дискретна лента със знаци за доверие */}
      <div className="bg-gray-50 border-b border-gray-100 py-3 px-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 font-medium">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck size={15} className="text-emerald-500" />
          По нормативи на НАП и НОИ
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock size={15} className="text-blue-500" />
          Фиксиран курс БНБ: 1 EUR = 1.95583 BGN
        </span>
      </div>

      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ЛЯВА КОЛОНА: Входни данни и настройки */}
        <div className="space-y-6 flex flex-col">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
              <Calendar size={16} className="text-blue-500" />
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

          <div className="bg-gray-100 p-1 rounded-xl flex items-center relative transition-colors">
            <button
              onClick={() => setCalcMode("grossToNet")}
              className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-all z-10 ${
                calcMode === "grossToNet"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Бруто към Нето
            </button>
            <button
              onClick={() => setCalcMode("netToGross")}
              className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-lg transition-all z-10 ${
                calcMode === "netToGross"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Нето към Бруто
            </button>
          </div>

          <div className="pt-2">
            <label className="block text-gray-700 font-bold mb-3 text-base">
              {calcMode === "grossToNet"
                ? "Твоята брутна заплата"
                : "Твоя желана нетна сума"}
            </label>

            <div className="relative">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full text-4xl font-black text-gray-900 border-b-4 border-blue-200 focus:border-blue-600 outline-none pb-2 bg-transparent transition-colors"
                placeholder="0"
                min="0"
                step="any"
                inputMode="decimal"
              />
              <span className="absolute right-0 bottom-4 text-gray-400 font-bold text-xl">
                EUR
              </span>
            </div>
            {/* Информационен ред за лимитите на годината */}
            <div className="flex flex-col sm:flex-row sm:justify-between text-[11px] md:text-xs text-gray-400 mt-2.5 font-medium px-1 gap-1">
              <span>
                Мин. заплата:{" "}
                <strong className="text-gray-500">
                  {Math.round(currentConfig.MIN_WAGE)} €
                </strong>
                <span className="opacity-70">
                  {" "}
                  (~{toBGN(currentConfig.MIN_WAGE)} лв.)
                </span>
              </span>
              <span>
                Макс. осиг. доход:{" "}
                <strong className="text-gray-500">
                  {Math.round(currentConfig.MAX_INSURABLE_INCOME)} €
                </strong>
                <span className="opacity-70">
                  {" "}
                  (~{toBGN(currentConfig.MAX_INSURABLE_INCOME)} лв.)
                </span>
              </span>
            </div>

            <div className="mt-8 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 transition-colors">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showEmployerCost}
                    onChange={() => setShowEmployerCost(!showEmployerCost)}
                  />
                  <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Building2 size={15} className="text-blue-500" />
                  Колко реално струваш на работодателя?
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* ДЯСНА КОЛОНА: Резултати */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative flex flex-col justify-between">
          {!result ? (
            <div className="h-full flex items-center justify-center text-gray-400 font-medium text-sm">
              Въведи валидна сума за резултат
            </div>
          ) : (
            <div className="space-y-6 flex-1 flex flex-col">
              <div className="text-center pb-5 border-b border-gray-200/60">
                <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">
                  {calcMode === "grossToNet"
                    ? "Ти получаваш чисто"
                    : "Необходима брутна заплата"}
                </p>
                <div className="text-4xl md:text-5xl font-black text-emerald-500 leading-tight">
                  {result.net.toFixed(2)}{" "}
                  <span className="text-2xl text-emerald-400 font-bold">€</span>
                </div>
                <div className="text-gray-400 font-medium mt-1 text-xs md:text-sm">
                  (~{" "}
                  {toBGN(calcMode === "grossToNet" ? result.net : result.gross)}{" "}
                  лв.)
                </div>
              </div>

              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
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

              <div className="space-y-2.5 text-sm pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Брутна заплата:</span>
                  <span className="font-bold text-gray-900">
                    {result.gross.toFixed(2)} €
                  </span>
                </div>

                {/* Главен ред за общи осигуровки */}
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-500">Общо осигуровки:</span>
                  <span className="font-bold text-orange-500">
                    -{" "}
                    {(
                      result.employeeTaxes.doo +
                      result.employeeTaxes.dzpo +
                      result.employeeTaxes.health
                    ).toFixed(2)}{" "}
                    €
                  </span>
                </div>

                {/* Детайлна разбивка с отстъп */}
                <div className="pl-3 mt-1.5 mb-2.5 space-y-1.5 text-xs text-gray-500 border-l-[1.5px] border-gray-200">
                  <div className="flex justify-between">
                    <span>
                      ДОО (Фонд Пенсии){" "}
                      <span className="text-[10px] text-gray-400 ml-1">
                        8.38%
                      </span>
                    </span>
                    <span>{result.employeeTaxes.doo.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      ДЗПО (Универсален){" "}
                      <span className="text-[10px] text-gray-400 ml-1">
                        2.20%
                      </span>
                    </span>
                    <span>{result.employeeTaxes.dzpo.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Здравно осигуряване{" "}
                      <span className="text-[10px] text-gray-400 ml-1">
                        3.20%
                      </span>
                    </span>
                    <span>{result.employeeTaxes.health.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500">Данък ДОД (10%):</span>
                  <span className="font-bold text-red-500">
                    - {result.employeeTaxes.incomeTax.toFixed(2)} €
                  </span>
                </div>
              </div>

              {showEmployerCost && (
                <div className="mt-4 pt-4 border-t border-dashed border-gray-200 bg-blue-50/60 p-4 rounded-xl">
                  <h4 className="font-bold text-blue-900 mb-3 text-xs uppercase tracking-wide">
                    Разходи за работодателя
                  </h4>

                  <div className="space-y-1.5 text-xs text-blue-800/70 mb-3">
                    <div className="flex justify-between">
                      <span>
                        ДОО (Фонд Пенсии и др.){" "}
                        <span className="text-[10px] opacity-70 ml-1">
                          10.92%
                        </span>
                      </span>
                      <span>+ {result.employerTaxes.doo.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        ДЗПО (Универсален){" "}
                        <span className="text-[10px] opacity-70 ml-1">
                          2.80%
                        </span>
                      </span>
                      <span>+ {result.employerTaxes.dzpo.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        Здравно осигуряване{" "}
                        <span className="text-[10px] opacity-70 ml-1">
                          4.80%
                        </span>
                      </span>
                      <span>+ {result.employerTaxes.health.toFixed(2)} €</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-blue-200/60">
                    <span className="font-bold text-blue-900 text-sm">
                      Общ разход:
                    </span>
                    <div className="text-right">
                      <span className="text-blue-900 font-black block text-base">
                        {result.totalCost.toFixed(2)} €
                      </span>
                      <span className="text-[11px] text-blue-600/80 font-medium block mt-0.5">
                        (~ {toBGN(result.totalCost)} лв.)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* СГЪВАЕМ ФИНАНСОВ СЪВЕТНИК */}
      {insights.length > 0 && (
        <div className="px-6 md:px-10 pb-8">
          <div className="border border-blue-100 rounded-2xl overflow-hidden transition-colors bg-blue-50/30">
            <button
              onClick={() => setShowInsights(!showInsights)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left font-bold text-xs md:text-sm text-blue-900 hover:bg-blue-50/60 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-500" />
                Експертен анализ и данъчни особености за {selectedYear} г.
              </span>
              {showInsights ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>

            {showInsights && (
              <div className="p-4 md:p-5 pt-0 space-y-3">
                {insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-gray-100 shadow-2xs"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {insight.type === "success" && (
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      )}
                      {insight.type === "warning" && (
                        <AlertCircle size={16} className="text-amber-500" />
                      )}
                      {insight.type === "info" && (
                        <Info size={16} className="text-blue-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-0.5">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
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
    </div>
  );
}
