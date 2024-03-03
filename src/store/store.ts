import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { HandleSubmit } from '../interfaces/data.interface';

const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);
const timeStamp = currentDate.setDate(currentDate.getDate() - 7);
const minDate = new Date(timeStamp).toISOString().slice(0, 10);

const useConverterStore = create<HandleSubmit>((set, get) => ({
	moneyHave: 0,
	setMoneyHave: (moneyHave: number) => set({ moneyHave }),
	moneyWantTo: 0,
	setMoneyWantTo: (moneyWantTo: number) => set({ moneyWantTo }),
	currentCurrency: 'USD',
	setCurrentCurrency: (currentCurrency: string) => set({ currentCurrency }),
	changedCurrency: 'UAH',
	setChangedCurrency: (changedCurrency: string) => set({ changedCurrency }),
	arr: [],
	data: {},
	date: formattedDate,
	year: currentDate.getFullYear(),
	month: currentDate.getMonth() + 1,
	day: currentDate.getDate(),
	min: minDate,
	setMin: (min: string) => set({ min }),
	max: formattedDate,
	setMax: (max: string) => set({ max }),
	filteredCurrencies: [],
	setDate: (date: string) => {
		const parsedDate = new Date(date);
		set((state) => ({
			...state,
			date: date,
			year: parsedDate.getFullYear(),
			month: parsedDate.getMonth() + 1,
			day: parsedDate.getDate(),
		}));
	},

	initializeDate: () => {
		set({ date: formattedDate, min: minDate, max: formattedDate });
	},

	fetchData: async () => {
		try {
			const response = await fetch(`https://v6.exchangerate-api.com/v6/c484d39fab216f3bc0a25e85/history/${get().currentCurrency}/${get().year}/${get().month}/${get().day}`);
			const jsonData = await response.json();
			set((state) => ({
				...state,
				data: jsonData,
				filteredCurrencies: Object.keys(jsonData?.conversion_rates || {}).filter(function (item) {
					return ['USD', 'UAH', 'RUB', 'EUR', 'GBP', 'CNY'].includes(item);
				}),
			}));
		} catch (error) {
			console.log('Error: ', error);
		}
	},


	submitForm: () => {
		if (get().arr.length >= 10) get().arr.shift()
		set((state) => ({
			...state,
			arr: [
				...state.arr,
				{
					id: uuid(),
					date: state.date,
					moneyHave: `${state.moneyHave} ${state.currentCurrency}`,
					moneyWantTo: `${state.moneyWantTo} ${state.changedCurrency}`,
				}
			]
		}));
	},

	handleClick: () => {
		set({ arr: [] });
	},

	moneyHaveEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseFloat(e.target.value);
		if (!isNaN(val)) {
			set((state) => ({
				moneyHave: val,
				moneyWantTo: isNaN(val * state.data?.conversion_rates[state.changedCurrency])
					? 0
					: parseFloat((val * state.data?.conversion_rates[state.changedCurrency]).toFixed(2)),
			}));
		} else {
			set({ moneyHave: 0, moneyWantTo: 0 });
		}
	},

	moneyWantToEvent: (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = parseFloat(e.target.value);
		if (!isNaN(val)) {
			set((state) => ({
				moneyWantTo: val,
				moneyHave: isNaN(val / state.data?.conversion_rates[state.changedCurrency])
					? 0
					: parseFloat((val / state.data?.conversion_rates[state.changedCurrency]).toFixed(2)),
			}));
		} else {
			set({ moneyHave: 0, moneyWantTo: 0 });
		}
	},
}));

export default useConverterStore;
