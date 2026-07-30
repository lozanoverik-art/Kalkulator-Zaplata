"use client";

import CalculatorWidget from "./CalculatorWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-24 transition-colors duration-300">
      {/* Чист и минималистичен хедър */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 py-4 sticky top-0 z-50 transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex justify-center items-center">
          <div className="font-black text-2xl tracking-tighter cursor-pointer">
            <span className="text-blue-600">Kalkulator</span>
            <span className="text-gray-900">Zaplata</span>
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-12">
        {/* МАРКЕТИНГОВО ПОСЛАНИЕ (CATCHY HERO) */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide uppercase border border-blue-200">
            Най-прецизният калкулатор за заплати в България
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Изчисли своята <span className="text-blue-600">нетна заплата</span>{" "}
            с пълна детайлност.
          </h1>
        </div>

        {/* Единствен и мощен уиджет за заплати */}
        <CalculatorWidget />
      </div>
      <section className="max-w-3xl mx-auto mt-16 p-6 sm:p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Често задавани въпроси (FAQ)
        </h2>

        <div className="space-y-4">
          {/* Въпрос 1 */}
          <details className="group bg-gray-50 rounded-xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-700">
              <span>Каква е разликата между брутна и нетна заплата?</span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
              <strong>Брутната заплата</strong> е основното възнаграждение,
              договорено с работодателя, преди да бъдат удържани данъци и
              осигуровки. <strong>Нетната заплата</strong> (чистата сума) е
              това, което реално получавате по банковата си сметка след всички
              задължителни държавни удръжки.
            </div>
          </details>

          {/* Въпрос 2 */}
          <details className="group bg-gray-50 rounded-xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-700">
              <span>Какви са удръжките от заплатата през 2026 година?</span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
              За сметка на служителя в България се удържат:
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>
                  <strong>ДОД (Данък общ доход):</strong> 10%
                </li>
                <li>
                  <strong>ДОО (Държавно обществено осигуряване):</strong> около
                  8.38% (зависи от категорията труд)
                </li>
                <li>
                  <strong>
                    ДЗПО (Допълнително задължително пенсионно осигуряване):
                  </strong>{" "}
                  2.20%
                </li>
                <li>
                  <strong>ЗО (Здравно осигуряване):</strong> 3.20%
                </li>
              </ul>
              Нашият калкулатор за заплати автоматично прилага всички актуални
              ставки на НАП и НОИ за 2026 г.
            </div>
          </details>

          {/* Въпрос 3 */}
          <details className="group bg-gray-50 rounded-xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-700">
              <span>Как работи този калкулатор за бруто и нето?</span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
              Калкулаторът предлага двупосочно изчисляване. Можете да въведете
              желаната от вас <strong>нетна сума</strong>, за да разберете каква
              брутна заплата трябва да поискате на интервю за работа, или да
              въведете <strong>брутната сума</strong> от трудовия си договор, за
              да видите точния размер на чистото си възнаграждение.
            </div>
          </details>

          {/* Въпрос 4 */}
          <details className="group bg-gray-50 rounded-xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-700">
              <span>Какво представлява пълният разход за работодателя?</span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
              Освен брутната заплата, работодателят е задължен да плаща
              допълнителни осигуровки за своя сметка (за фонд Пенсии, трудова
              злополука, ДЗПО и здравно осигуряване). Пълният разход показва
              реалната сума, която работодателят отделя от бюджета си за
              съответната позиция.
            </div>
          </details>

          {/* Въпрос 5 */}
          <details className="group bg-gray-50 rounded-xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-700">
              <span>
                Какво е максимален осигурителен доход и защо има таван?
              </span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
              Максималният осигурителен доход е държавно определен таван. Върху
              суми, които надвишават този праг, не се начисляват задължителни
              осигуровки за фонд Пенсии и здраве, а се дължи единствено 10%
              данък върху разликата. Нашият калкулатор автоматично съблюдава
              този таван за всяка избрана година.
            </div>
          </details>

          {/* Въпрос 6 */}
          <details className="group bg-gray-50 rounded-xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-700">
              <span>
                Защо обратният калкулатор (Нето към Бруто) изисква по-сложна
                формула?
              </span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
              Когато се търси брутната сума по желана нетна заплата, сметката не
              е просто просто умножение, защото осигуровките и данъците се
              преплитат последователно. Освен това, ако желаното нето изисква
              брута над максималния осигурителен доход, алгоритъмът пресмята
              фиксирания таван на осигуровките и облага остатъка единствено с
              10% данък.
            </div>
          </details>

          {/* Въпрос 7 */}
          <details className="group bg-gray-50 rounded-xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-700">
              <span>
                Влияят ли данъчните облекчения (например за деца) на
                калкулатора?
              </span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
              Стандартният калкулатор показва основните законови удръжки по общ
              месечен ред. Данъчните облекчения за деца или намалена
              работоспособност обикновено се ползват веднъж годишно чрез
              работодателя или с подаване на годишна данъчна декларация в НАП,
              поради което не се начисляват автоматично в месечния фиш.
            </div>
          </details>

          {/* Въпрос 8 */}
          <details className="group bg-gray-50 rounded-xl [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-700">
              <span>
                Как се определя часовата ставка, която калкулаторът показва?
              </span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
              Часовата ставка се базира на осреднен месец от 21 работни дни (или
              168 часа). Тъй като различните месеци в годината имат различен
              брой работни дни (обикновено от 19 до 23), реалната часова ставка
              за конкретен месец може леко да варира в зависимост от официалния
              календар.
            </div>
          </details>
        </div>
      </section>

      {/* SEO Schema.org разширение */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Каква е разликата между брутна и нетна заплата?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Брутната заплата е основното възнаграждение преди данъци и осигуровки. Нетната заплата (чистата сума) е това, което реално получавате след всички държавни удръжки.",
                },
              },
              {
                "@type": "Question",
                name: "Какви са удръжките от заплатата през 2026 година?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Удръжките включват: 10% ДОД, около 8.38% ДОО, 2.20% ДЗПО и 3.20% Здравно осигуряване за сметка на служителя.",
                },
              },
              {
                "@type": "Question",
                name: "Как работи този калкулатор за бруто и нето?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Калкулаторът предлага двупосочно изчисляване. Можете да въведете желаната от вас нетна сума, за да разберете каква брутна заплата трябва да поискате на интервю за работа, или да въведете брутната сума от трудовия си договор, за да видите точния размер на чистото си възнаграждение.",
                },
              },
              {
                "@type": "Question",
                name: "Какво представлява пълният разход за работодателя?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Освен брутната заплата, работодателят е задължен да плаща допълнителни осигуровки за своя сметка. Пълният разход показва реалната сума, която работодателят отделя от бюджета си за позицията.",
                },
              },
              {
                "@type": "Question",
                name: "Какво е максимален осигурителен доход и защо има таван?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Максималният осигурителен доход е държавно определен таван. Върху суми над този праг не се начисляват осигуровки, а се дължи само 10% данък върху разликата.",
                },
              },
              {
                "@type": "Question",
                name: "Защо обратният калкулатор (Нето към Бруто) изисква по-сложна формула?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Когато се търси брутната сума по желана нетна заплата, сметката изисква прецизно съобразяване с последователните удръжки и максималния осигурителен доход.",
                },
              },
              {
                "@type": "Question",
                name: "Влияят ли данъчните облекчения (например за деца) на калкулатора?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Стандартният калкулатор показва основните законови удръжки по общ ред. Облекченията за деца се ползват годишно и не променят месечния основен фиш автоматично.",
                },
              },
              {
                "@type": "Question",
                name: "Как се определя часовата ставка, която калкулаторът показва?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Часовата ставка се базира на осреднен месец от 21 работни дни или 168 часа.",
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
