// src/app/page.tsx
"use client";

import CalculatorWidget from "./CalculatorWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-24 transition-colors duration-300">
      {/* Чист и минималистичен хедър */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 py-4 sticky top-0 z-50 transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex justify-center items-center">
          <div className="font-black text-2xl tracking-tighter cursor-pointer">
            <span className="text-blue-600 dark:text-blue-400">Calc</span>
            <span className="text-gray-900 dark:text-white">.bg</span>
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-12">
        {/* МАРКЕТИНГОВО ПОСЛАНИЕ (CATCHY HERO) */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase border border-blue-200 dark:border-blue-900">
            Най-прецизният калкулатор за заплати в България
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Изчисли своята{" "}
            <span className="text-blue-600 dark:text-blue-400">
              нетна заплата
            </span>{" "}
            с пълна детайлност.
          </h1>
          {/* <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-medium">
            Единственият калкулатор с 10-годишен исторически архив (2016–2026
            г.), експертен данъчен съветник и мигновени изчисления Бруто към
            Нето.
          </p> */}
        </div>

        {/* Единствен и мощен уиджет за заплати */}
        <CalculatorWidget />
      </div>
    </main>
  );
}
