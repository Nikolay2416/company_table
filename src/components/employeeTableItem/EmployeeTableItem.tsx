import { FC, useState, ChangeEvent } from 'react';
import { Checkbox, Input } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { allocateEmployee, updateEmployeeInfo } from '../../store/slices/companySlice';
import { useAppDispatch } from '../../hooks/store';

import cls from './employeeTableItem.module.css';

interface EmployeeTableItemProps {
  id: string;
  idCompany: string;
  surname: string;
  name: string;
  job: string;
  checked: boolean;
}

export const EmployeeTableItem: FC<EmployeeTableItemProps> = ({ id, idCompany, surname, name, job, checked }) => {
  const [editedSurname, setEditedSurname] = useState<string>('');
  const [editedName, setEditedName] = useState<string>('');
  const [editedJob, setEditedJb] = useState<string>('');
  const dispatch = useAppDispatch();

  const onChangeSelect = (e: CheckboxChangeEvent, id: string) => {
    const isChecked = e.target.checked;
    dispatch(allocateEmployee({ isChecked, id }));
  };

  const onChangeEmployeeInfo = (e: ChangeEvent<HTMLInputElement>, id: string, field: string) => {
    const updatedValue = e.target.value;
    if (field === 'surname') {
      setEditedSurname(updatedValue);
    } else if (field === 'name') {
      setEditedName(updatedValue);
    } else if (field === 'job') {
      setEditedJb(updatedValue);
    }
    dispatch(updateEmployeeInfo({ id, idCompany, [field]: updatedValue }));
  };

  return (
    <div key={id} className={`${cls.line} ${checked ? cls.lineActive : ''}`}>
      <div>
        <Checkbox checked={checked} onChange={(e) => onChangeSelect(e, id)}></Checkbox>
      </div>
      <Input
        value={editedSurname || surname}
        onChange={(e) => onChangeEmployeeInfo(e, id, 'surname')}
        className={cls.input}
      />
      <Input value={editedName || name} onChange={(e) => onChangeEmployeeInfo(e, id, 'name')} className={cls.input} />
      <Input value={editedJob || job} onChange={(e) => onChangeEmployeeInfo(e, id, 'job')} className={cls.input} />
    </div>
  );
};
