interface Currency {
	id: string;
	date: string;
	moneyHave: string;
	moneyWantTo: string;
}

export interface HandleSubmit {
	date: string;
	data: any;
	arr: Currency[];
	min: string;
	max: string;
	year: number;
	month: number;
	day: number;
	moneyHave: number;
	moneyWantTo: number;
	currentCurrency: string;
	changedCurrency: string;
	setMin: (min: string) => void;
	setMax: (max: string) => void;
	setDate: (date: string) => void;
	submitForm: () => void;
	handleClick: () => void;
	fetchData: () => void;
	setMoneyHave: (moneyHave: number) => void;
	setMoneyWantTo: (moneyWantTo: number) => void;
	setCurrentCurrency: (currentCurrency: string) => void;
	setChangedCurrency: (changedCurrency: string) => void;
	initializeDate: () => void;
	moneyHaveEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
	moneyWantToEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
	filteredCurrencies: string[];
}