// src/utils/config.ts

export type YearConfig = {
    year: number;
    MIN_WAGE: number;
    MAX_INSURABLE_INCOME: number;
    // Служител
    EMPLOYEE_DOO: number;
    EMPLOYEE_DZPO: number;
    EMPLOYEE_HEALTH: number;
    INCOME_TAX: number;
    // Работодател
    EMPLOYER_DOO: number;
    EMPLOYER_DZPO: number;
    EMPLOYER_HEALTH: number;
};

export const TAX_YEARS: Record<number, YearConfig> = {
    2026: {
        year: 2026,
        MIN_WAGE: 620.20, // 1213 лв.
        MAX_INSURABLE_INCOME: 2111.64, // 4130 лв.
        EMPLOYEE_DOO: 0.0838, 
        EMPLOYEE_DZPO: 0.0220, 
        EMPLOYEE_HEALTH: 0.0320, 
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2025: {
        year: 2025,
        MIN_WAGE: 550.66, // 1077 лв.
        MAX_INSURABLE_INCOME: 2111.64, // 4130 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2024: {
        year: 2024,
        MIN_WAGE: 477.04, // 933 лв.
        MAX_INSURABLE_INCOME: 1917.34, // 3750 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2023: {
        year: 2023,
        MIN_WAGE: 398.81, // 780 лв.
        MAX_INSURABLE_INCOME: 1738.39, // 3400 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2022: {
        year: 2022,
        MIN_WAGE: 363.02, // 710 лв.
        MAX_INSURABLE_INCOME: 1533.88, // 3000 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2021: {
        year: 2021,
        MIN_WAGE: 332.34, // 650 лв.
        MAX_INSURABLE_INCOME: 1533.88, // 3000 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2020: {
        year: 2020,
        MIN_WAGE: 311.89, // 610 лв.
        MAX_INSURABLE_INCOME: 1533.88, // 3000 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2019: {
        year: 2019,
        MIN_WAGE: 286.32, // 560 лв.
        MAX_INSURABLE_INCOME: 1329.36, // 2600 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2018: {
        year: 2018,
        MIN_WAGE: 260.76, // 510 лв.
        MAX_INSURABLE_INCOME: 1329.36, // 2600 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2017: {
        year: 2017,
        MIN_WAGE: 235.19, // 460 лв.
        MAX_INSURABLE_INCOME: 1329.36, // 2600 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    },
    2016: {
        year: 2016,
        MIN_WAGE: 214.74, // 420 лв.
        MAX_INSURABLE_INCOME: 1329.36, // 2600 лв.
        EMPLOYEE_DOO: 0.0838,
        EMPLOYEE_DZPO: 0.0220,
        EMPLOYEE_HEALTH: 0.0320,
        INCOME_TAX: 0.1000,
        EMPLOYER_DOO: 0.1092,
        EMPLOYER_DZPO: 0.0280,
        EMPLOYER_HEALTH: 0.0480,
    }
};

export const CURRENT_YEAR = 2026;