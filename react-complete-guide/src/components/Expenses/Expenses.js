import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import Card from '../UI/Card'

function Expenses(props) {
  return (
    <Card className="expenses">
      {props.items.map((exp) => (
        <ExpenseItem
          key={exp.id}
          title={exp.title}
          amount={exp.amount}
          date={exp.date}
        />
      ))}
    </Card>
  );
}

export default Expenses;
