type TotalCalculationProps = {
  total: number;
  taxAmount: number;
  grandTotal: number;
  tax: number;
};
const TotalCalculation = ({
  total,
  taxAmount,
  tax,
  grandTotal,
}: TotalCalculationProps) => {
  return (
    <div className="w-[400px] grid grid-cols-1 gap-5">
      <div className="grid grid-cols-3 gap-5">
        <span className="text-primaryDark font-bold text-lg col-span-2">
          Sub Total
        </span>
        <span className="text-primaryDark font-bold text-lg">${total}</span>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <span className="text-primaryDark font-bold text-lg">Tax</span>
        <span>{tax}%</span>
        <span className="text-primaryDark font-bold text-lg">${taxAmount}</span>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <span className="text-primaryDark font-bold text-lg col-span-2">
          Grand Total
        </span>
        <span className="text-primaryDark font-bold text-lg">
          ${grandTotal}
        </span>
      </div>
    </div>
  );
};

export default TotalCalculation;
