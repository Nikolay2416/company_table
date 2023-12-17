export interface InitialStateCompany {
  company: Company[];
}

export interface Company {
  id: string,
  name: string,
  address: string,
  checked: boolean,
  employeeCompanies: Employee[]
}

export interface Employee {
  id: string,
  idCompany: string,
  surname: string,
  name: string,
  job: string,
  checked: boolean,
}