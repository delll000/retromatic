import Text from "../atoms/Text";

function CardBody({ title }) {
  return (
    <Text as="p" className="text-center fw-semibold">
      {title}
    </Text>
  );
}

export default CardBody;
