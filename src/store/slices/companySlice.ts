import { createSlice, nanoid } from '@reduxjs/toolkit';
import { InitialStateCompany, Company } from '../../type/typeCompany';

const initialState: InitialStateCompany = {
  company: [],
};

generateCompanies(50, 1, true);

export const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    changeEmployeeArray: (state, action) => {
      const newCompany = state.company.map((company) => {
        if (company.id === action.payload.id) {
          return { ...company, checked: action.payload.isChecked };
        }
        return company;
      });
      state.company = newCompany;
    },

    changeAllEmployeeArray: (state, action) => {
      const newCompany = state.company.map((company) => {
        return { ...company, checked: action.payload };
      });
      state.company = newCompany;
    },

    allocateEmployee: (state, action) => {
      const newCompany = state.company.map((company) => {
        const newEmployee = company.employeeCompanies.map((employee) => {
          if (employee.id === action.payload.id) {
            return { ...employee, checked: action.payload.isChecked };
          }
          return employee;
        });
        return { ...company, employeeCompanies: newEmployee };
      });
      state.company = newCompany;
    },

    singleAllEmployees: (state, action) => {
      const newCompany = state.company.map((company) => {
        const newEmployee = company.employeeCompanies.map((employee) => {
          return { ...employee, checked: action.payload };
        });
        return { ...company, employeeCompanies: newEmployee };
      });
      state.company = newCompany;
    },

    deleteCompanies: (state) => {
      state.company = state.company.filter((company) => company.checked === false);
    },

    deleteEmployees: (state) => {
      const newCompany = state.company.map((company) => {
        if (company.checked === false) return company;
        const newEmployee = company.employeeCompanies.filter((employee) => employee.checked === false);
        return { ...company, employeeCompanies: newEmployee };
      });
      state.company = newCompany;
    },

    addCompany: (state, action) => {
      const newCompany = {
        id: nanoid(),
        name: action.payload.name,
        address: action.payload.address,
        checked: false,
        employeeCompanies: [],
      };
      state.company = [newCompany, ...state.company];
    },

    addEmployee: (state, action) => {
      const newCompany = state.company.map((company) => {
        if (company.id === action.payload.idCompany) {
          const newEmployee = {
            id: nanoid(),
            idCompany: action.payload.idCompany,
            surname: action.payload.surname,
            name: action.payload.name,
            job: action.payload.job,
            checked: false,
          };

          return {
            ...company,
            employeeCompanies: [newEmployee, ...company.employeeCompanies],
          };
        }
        return company;
      });
      state.company = newCompany;
    },

    updateCompanyInfo: (state, action) => {
      const newCompany = state.company.map((company) => {
        if (company.id === action.payload.id) {
          return {
            ...company,
            name: action.payload.updatedName || company.name,
            address: action.payload.updatedAddress || company.address,
          };
        }
        return company;
      });
      state.company = newCompany;
    },

    updateEmployeeInfo: (state, action) => {
      const newCompany = state.company.map((company) => {
        if (company.id === action.payload.idCompany) {
          const newEmployee = company.employeeCompanies.map((employee) => {
            if (employee.id === action.payload.id) {
              return {
                ...employee,
                surname: action.payload.surname || employee.surname,
                name: action.payload.name || employee.name,
                job: action.payload.job || employee.job,
              };
            }
            return employee;
          });

          return { ...company, employeeCompanies: newEmployee };
        }
        return company;
      });
      state.company = newCompany;
    },

    downloadCompanies: (state) => {
      const count: number = state.company.length + 50;
      const initialCount: number = state.company.length + 1;
      generateCompanies(count, initialCount, false, state);
    },
  },
});

function generateCompanies(count: number, initialCount: number, isInitial: boolean, state?: InitialStateCompany) {
  const newCompany: Company[] = [];
  for (let i = initialCount; i <= count; i++) {
    const id = nanoid();
    newCompany.push({
      id: id,
      name: `Компания ${i}`,
      address: `Адрес компании ${i}`,
      checked: false,
      employeeCompanies: [
        {
          id: nanoid(),
          idCompany: id,
          surname: `Фамилия 1`,
          name: `Имя 1`,
          job: `Должность 1`,
          checked: false,
        },
        {
          id: nanoid(),
          idCompany: id,
          surname: `Фамилия 2`,
          name: `Имя 2`,
          job: `Должность 2`,
          checked: false,
        },
      ],
    });
  }
  if (isInitial) {
    initialState.company = newCompany;
  } else if (state) {
    state.company = [...state.company, ...newCompany];
  }
}

export const {
  changeEmployeeArray,
  changeAllEmployeeArray,
  allocateEmployee,
  singleAllEmployees,
  deleteCompanies,
  deleteEmployees,
  addCompany,
  addEmployee,
  updateCompanyInfo,
  updateEmployeeInfo,
  downloadCompanies,
} = companySlice.actions;
export default companySlice.reducer;
