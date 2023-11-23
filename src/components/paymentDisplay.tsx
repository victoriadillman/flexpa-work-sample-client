interface PaymentProps {
  category: string,
  amount: string,
  key: string,
}

export default function Payment({ category, amount }: PaymentProps) {
  return (
    <div>
      <p>{`${category}: ${amount}`}</p>
    </div>
  )
}