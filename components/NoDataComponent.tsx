const NoDataComponent = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center text-primaryDark font-medium py-8">
      No products added yet. Select a product to add to the sale.
    </div>
  );
};

export default NoDataComponent;
