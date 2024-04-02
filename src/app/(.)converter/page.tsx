'use client';

import Image from 'next/image';
import { Suspense, useEffect } from 'react';
import Button from '../_components/ui/Button';
import useConverterStore from '../../store/store';
import Loading from '../loading';

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
      <Suspense fallback={<Loading />}>
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
      </Suspense>
    </>
  );
}
