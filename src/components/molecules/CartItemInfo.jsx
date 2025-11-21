import Text from "../atoms/Text";

function CartItemInfo({ name, price }) {
  return (
    <>
      <Text variant="h6">{name}</Text>
      <Text className="text-muted">${price}</Text>
    </>
  );
}

export default CartItemInfo;
