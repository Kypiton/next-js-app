'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import Button from '../_components/ui/Button';
import useConverterStore from '../../store/store';

export default function Converter() {
  const data = useConverterStore();

  useEffect(() => {
    data.initializeDate();
  }, []);

  useEffect(() => {
    data.fetchData();
  }, [data.year, data.month, data.day, data.currentCurrency]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    data.submitForm();
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
                  value={data.moneyHave === 0 ? '' : data.moneyHave}
                  onChange={data.moneyHaveEvent}
                />
                <select
                  name='currency'
                  id='i-have'
                  className='font-normal text-xl text-gray-400 py-4 pl-4 pr-2 border-2 border-gray-300 rounded outline-none cursor-pointer'
                  value={data.currentCurrency}
                  onChange={e => data.setCurrentCurrency(e.target.value)}
                >
                  {data.filteredCurrencies.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type='date'
                id='i-have'
                name='i-have'
                value={data.date}
                min={data.min}
                max={data.max}
                onChange={e => data.setDate(e.target.value)}
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
                  value={data.moneyWantTo === 0 ? '' : data.moneyWantTo}
                  onChange={data.moneyWantToEvent}
                />
                <select
                  name='currency'
                  id='want-to'
                  className='font-normal text-xl text-gray-400 py-4 pl-4 pr-2 border-2 border-gray-300 rounded outline-none cursor-pointer'
                  value={data.changedCurrency}
                  onChange={e => data.setChangedCurrency(e.target.value)}
                >
                  {data.filteredCurrencies.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
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
            <Button
              btnStyle='bg-blue-700 text-sky-100 py-5 px-14 rounded'
              onClick={data.handleClick}
            >
              Очистити історію
            </Button>
          </div>
          {!data.arr.length && (
            <p className='font-medium text-3xl py-6 px-8 text-center border-white'>
              Історія конвертації відсутня
            </p>
          )}
          <div className='grid grid-cols-2 gap-y-4 gap-x-12 mt-8'>
            {data.arr.map((item: any) => (
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
