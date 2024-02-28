export default async function getData(fullDate: string) {
  try {
    const res = await fetch(
      `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${fullDate}&json`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );
    return await res.json();
  } catch (error) {
    console.error('Error: ', error);
  }
}
