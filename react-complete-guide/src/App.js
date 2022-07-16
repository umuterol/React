import Expenses from "./components/Expenses/Expenses";

function App() {
  const expenses = [
    {
      id: 1,
      title: "Toilet Paper",
      amount: 94.15,
      date: new Date(2021, 7, 30),
    },
    { id: 2, title: "New TV", amount: 994.12, date: new Date(2022, 7, 30) },
    {
      id: 3,
      title: "Car Insurance",
      amount: 294.15,
      date: new Date(2021, 5, 27),
    },
    {
      id: 4,
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2020, 7, 30),
    },
  ];
  return (
    <div>
      <p>Again React.</p>
      <Expenses items={expenses} />
    </div>
  );
}

export default App;
