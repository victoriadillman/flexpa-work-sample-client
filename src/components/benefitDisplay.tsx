import { useEffect, useState } from "react";
import Payment from "./paymentDisplay";

export default function BenefitDisplay({ benefit }: any){
  const [payments, setPayments ] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    let newPayments: React.ReactNode[] = []
    const paymentInfo = benefit.entry[0].resource.total;

    // Generating information from benefit resource for display in a component
    for (let i = 0; i < 3; i++) {
      const instance = paymentInfo[i];

      // Handling for no payment instances
      if (!instance) {
        break;
      }

      // Handling for various category naming conventions
      let category: string = instance.category.text;
      if (!category) category = "Undetermined Category";
      else if (category[category.length -1] === '.') category = category.slice(0, category.length-1);

      // Concating the number with currency into one string value
      const amount: string = `${instance.amount.value} ${instance.amount.currency}`;

      newPayments.push(<Payment category={category} amount={amount} key={`payment-${i}`}/>)
    }

    setPayments(newPayments);
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl">Most recent patient payment details:</h2>
      <br/>
      {payments}
    </div>
  )
}