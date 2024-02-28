'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Button from '../_components/ui/Button';
import { v4 as uuid } from 'uuid';

export default function Converter() {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const [date, setDate] = useState<string>(formattedDate);
  const [min, setMin] = useState<string>('');
  const [max, setMax] = useState<string>('');
  const [moneyHave, setMoneyHave] = useState<number>(0);
  const [moneyWantTo, setMoneyWantTo] = useState<number>(0);
  const [currentCurrency, setCurrentCurrency] = useState<string>('USD');
  const [changedCurrency, setChangedCurrency] = useState<string>('UAH');
  const [arr, setArr] = useState<
    Array<{ id: string; date: string; moneyHave: string; moneyWantTo: string }>
  >([]);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const timeStamp = currentDate.setDate(currentDate.getDate() - 7);
    const maxDate = new Date(timeStamp).toISOString().slice(0, 10);
    setDate(formattedDate);
    setMin(maxDate);
    setMax(formattedDate);
  }, []);

  const fullYear = new Date(date);
  const year = fullYear.getFullYear();
  const month = fullYear.getMonth() + 1;
  const day = fullYear.getDate();

  const filteredCurrencies = Object.keys(data?.conversion_rates || {}).filter(function (item) {
    return ['USD', 'UAH', 'RUB', 'EUR', 'GBH', 'CNY'].includes(item);
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/c484d39fab216f3bc0a25e85/history/${currentCurrency}/${year}/${month}/${day}`,
          {
            next: {
              revalidate: 3600,
            },
          },
        );
        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    fetchData();
  }, [year, month, day, currentCurrency]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setArr(function (prevObj) {
      if (arr.length >= 10) arr.shift();
      return [
        ...prevObj,
        {
          id: uuid(),
          date: date,
          moneyHave: `${moneyHave} ${currentCurrency}`,
          moneyWantTo: `${moneyWantTo} ${changedCurrency}`,
        },
      ];
    });
  };

  const handleClick = () => {
    setArr([]);
  };

  const moneyHaveEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setMoneyHave(val);
      const convertedMoney = val * data?.conversion_rates[changedCurrency];
      setMoneyWantTo(isNaN(convertedMoney) ? 0 : parseFloat(convertedMoney.toFixed(2)));
    } else {
      setMoneyHave(0);
      setMoneyWantTo(0);
    }
  };

  const moneyWantToEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setMoneyWantTo(val);
      const convertedMoney = val / data?.conversion_rates[changedCurrency];
      setMoneyHave(isNaN(convertedMoney) ? 0 : parseFloat(convertedMoney.toFixed(2)));
    } else {
      setMoneyHave(0);
      setMoneyWantTo(0);
    }
  };

  return (
    <>
      <section className='bg-sky-100 py-20 px-52'>
        <main className='bg-white'>
          <h2 className='font-bold text-4xl pt-14 pl-12'>Конвертер валют</h2>
          <form className='flex justify-between items-center px-16 pb-14' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6 justify-center items-start'>
              <label htmlFor='i-have' className='font-medium text-xl text-gray-400 mt-16'>
                В мене є:
              </label>
              <div className='flex justify-start items-center gap-3.5'>
                <input
                  type='number'
                  id='i-have'
                  className='font-normal text-xl text-gray-400 text-center py-4 border-2 border-gray-300 rounded outline-none'
                  placeholder='1000'
                  value={moneyHave === 0 ? '' : moneyHave}
                  onChange={moneyHaveEvent}
                />
                <select
                  name='currency'
                  id='i-have'
                  className='font-normal text-xl text-gray-400 py-4 pl-4 pr-2 border-2 border-gray-300 rounded outline-none cursor-pointer'
                  value={currentCurrency}
                  onChange={e => setCurrentCurrency(e.target.value)}
                >
                  {filteredCurrencies
                    .map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    .slice(0, 10)}
                </select>
              </div>
              <input
                type='date'
                id='i-have'
                name='i-have'
                value={date}
                min={min}
                max={max}
                onChange={e => setDate(e.target.value)}
                className='block p-4 text-gray-400 border-2 border-gray-300 rounded outline-none'
              />
            </div>
            <Image
              src='/arrows.svg'
              width={22}
              height={22}
              alt='arrows'
              className='cursor-pointer mt-7'
            />
            <div className='grid gap-6'>
              <label htmlFor='want-to' className='font-medium text-xl text-gray-400 mt-16'>
                Хочу придбати:
              </label>
              <div className='flex justify-start items-center gap-3.5'>
                <input
                  type='number'
                  id='want-to'
                  className='font-normal text-xl text-gray-400 text-center py-4 border-2 border-gray-300 rounded outline-none'
                  placeholder='38.7'
                  value={moneyWantTo === 0 ? '' : moneyWantTo}
                  onChange={moneyWantToEvent}
                />
                <select
                  name='currency'
                  id='want-to'
                  className='font-normal text-xl text-gray-400 py-4 pl-4 pr-2 border-2 border-gray-300 rounded outline-none cursor-pointer'
                  value={changedCurrency}
                  onChange={e => setChangedCurrency(e.target.value)}
                >
                  {filteredCurrencies
                    .map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))
                    .slice(0, 10)}
                </select>
              </div>
              <Button btnStyle='col px-14 py-6 bg-blue-700 text-sky-100 rounded ml-auto'>
                Зберегти результат
              </Button>
            </div>
          </form>
        </main>
      </section>
      <section className='py-20 px-52 bg-white'>
        <main className='bg-sky-100 pt-10 px-16 pb-14'>
          <div className='flex justify-between items-center'>
            <p className='font-medium text-3xl'>Історія конвертації</p>
            <Button btnStyle='bg-blue-700 text-sky-100 py-5 px-14 rounded' onClick={handleClick}>
              Очистити історію
            </Button>
          </div>
          {!arr.length && (
            <p className='font-medium text-3xl py-6 px-8 text-center border-white'>
              Історія конвертації відсутня
            </p>
          )}
          <div className='grid grid-cols-2 gap-y-4 gap-x-12 mt-8'>
            {arr.map((item: any) => (
              <div
                key={item.id}
                className='flex justify-center items-center gap-5 p-4 bg-white rounded'
              >
                <p className='font-normal text-lg text-gray-300'>{item.date}</p>
                <p className='font-normal text-lg text-gray-400'>{item.moneyHave}</p>
                <Image
                  src='/arrowToRight.svg'
                  width={14}
                  height={10}
                  alt='arrow'
                  className='w-auto'
                />
                <p className='font-normal text-lg text-gray-400'>{item.moneyWantTo}</p>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  );
}
