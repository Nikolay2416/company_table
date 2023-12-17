import { FC, useState } from 'react';
import { Button, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { singleAllEmployees, deleteEmployees } from '../../store/slices/companySlice';
import { useAppSelector, useAppDispatch } from '../../hooks/store';

import { EmployeeModal } from '../employeeModal/EmployeeModal';
import { EmployeeTableItem } from '../employeeTableItem/EmployeeTableItem';

import cls from './employeeTable.module.css';

export const EmployeeTable: FC = () => {
  const { company } = useAppSelector((state) => state.companies);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onChangeSelectAll = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    dispatch(singleAllEmployees(isChecked));
  };

  const onRemove = () => {
    dispatch(deleteEmployees());
  };

  const newEmployee = company
    .filter((company) => company.checked === true)
    .map((company) => company.employeeCompanies)
    .flat();

  const employeeRender = newEmployee.map(({ id, idCompany, surname, name, job, checked }) => {
    return (
      <EmployeeTableItem
        key={id}
        id={id}
        idCompany={idCompany}
        surname={surname}
        name={name}
        job={job}
        checked={checked}
      />
    );
  });

  return (
    <div>
      <div className={cls.heading}>
        <h3>Сотрудники</h3>
        <div>
          <Checkbox onChange={onChangeSelectAll}>Выдилить все</Checkbox>
        </div>
      </div>
      <div className={cls.buttons}>
        <Button onClick={() => setIsModalOpen(true)} className={cls.button}>
          Добавить сотрудника
        </Button>
        <EmployeeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Button onClick={() => onRemove()} className={cls.button}>
          Удалить сотрудника
        </Button>
      </div>
      <div>
        <div className={cls.columns}>
          <p> </p>
          <p>Фамилия</p>
          <p>Имя</p>
          <p>Должность</p>
        </div>
        {employeeRender}
      </div>
    </div>
  );
};