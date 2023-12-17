import { FC, useState, ChangeEvent } from 'react';
import { Checkbox, Input } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { changeEmployeeArray, updateCompanyInfo } from '../../store/slices/companySlice';
import { useAppDispatch } from '../../hooks/store';
import { Employee } from '../../type/typeCompany';

import cls from './сompanyTableItem.module.css';

interface CompanyTableItemProps {
  id: string;
  name: string;
  address: string;
  employeeCompanies: Employee[];
  checked: boolean;
}

export const CompanyTableItem: FC<CompanyTableItemProps> = ({ id, name, address, employeeCompanies, checked }) => {
  const [editedName, setEditedName] = useState<string>('');
  const [editedAddress, setEditedAddress] = useState<string>('');
  const dispatch = useAppDispatch();

  const onChangeSelect = (e: CheckboxChangeEvent, id: string) => {
    const isChecked = e.target.checked;
    dispatch(changeEmployeeArray({ isChecked, id }));
  };

  const onChangeCompanyInfo = (e: ChangeEvent<HTMLInputElement>, id: string, field: string) => {
    const updatedValue = e.target.value;
    if (field === 'name') {
      setEditedName(updatedValue);
    } else if (field === 'address') {
      setEditedAddress(updatedValue);
    }
    dispatch(updateCompanyInfo({ id, [field]: updatedValue }));
  };

  return (
    <div key={id} className={`${cls.line} ${checked ? cls.lineActive : ''}`}>
      <div>
        <Checkbox checked={checked} onChange={(e) => onChangeSelect(e, id)}></Checkbox>
      </div>
      <Input value={editedName || name} onChange={(e) => onChangeCompanyInfo(e, id, 'name')} />
      <p>{employeeCompanies.length}</p>
      <Input
        value={editedAddress || address}
        onChange={(e) => onChangeCompanyInfo(e, id, 'address')}
        className={cls.inputAddress}
      />
    </div>
  );
};
