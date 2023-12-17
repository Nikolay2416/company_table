import { FC, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button, Checkbox, Spin } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { changeAllEmployeeArray, deleteCompanies, downloadCompanies } from '../../store/slices/companySlice';
import { useAppSelector, useAppDispatch } from '../../hooks/store';

import { CompanyModal } from '../companyModal/CompanyModal';
import { CompanyTableItem } from '../сompanyTableItem/CompanyTableItem';
 
import cls from './companyTable.module.css';

export const CompanyTable: FC = () => {
  const { company } = useAppSelector((state) => state.companies);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onChangeSelectAll = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    dispatch(changeAllEmployeeArray(isChecked));
  };

  const onRemove = () => {
    dispatch(deleteCompanies());
  };

  const addCompanies = () => {
    dispatch(downloadCompanies());
  };

  const companies = company.map(({ id, name, address, employeeCompanies, checked }) => {
    return (
      <CompanyTableItem
        key={id}
        id={id}
        name={name}
        address={address}
        employeeCompanies={employeeCompanies}
        checked={checked}
      />
    );
  });

  return (
    <div>
      <div className={cls.heading}>
        <h3>Компания</h3>
        <div>
          <Checkbox onChange={onChangeSelectAll}>Выдилить все</Checkbox>
        </div>
      </div>
      <div className={cls.buttons}>
        <Button onClick={() => setIsModalOpen(true)} className={cls.button}>
          Добавить компанию
        </Button>
        <CompanyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Button onClick={() => onRemove()} className={cls.button}>
          Удалить компанию
        </Button>
      </div>
      <div>
        <div className={cls.columns}>
          <p> </p>
          <p>Название компании</p>
          <p>Кол-во сотрудников</p>
          <p>Адрес</p>
        </div>
        <InfiniteScroll
          dataLength={company.length}
          next={addCompanies}
          hasMore={company.length > 20 ? true : false}
          loader={
            <div className={cls.spinBody}>
              <Spin className={cls.spin} />
            </div>
          }
        >
          {companies}
        </InfiniteScroll>
      </div>
    </div>
  );
};
